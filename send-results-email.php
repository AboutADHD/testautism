<?php
// Strict error reporting
declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '0');

// Load environment variables
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Content-Type: application/json; charset=UTF-8');

// CORS headers - adjust the origin to match your domain
header('Access-Control-Allow-Origin: https://www.testautism.ro');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Configuration
$config = [
    'api_key' => $_ENV['MAILERLOO_API_KEY'],
    'from_email' => $_ENV['FROM_EMAIL'] ?? 'rezultate@testautism.ro',
    'from_name' => $_ENV['FROM_NAME'] ?? 'Test Autism RAADS-R',
    'max_pdf_size' => 10 * 1024 * 1024, // 10MB
    'allowed_mime_types' => ['application/pdf'],
];

/**
 * Response handler
 */
function sendResponse(int $statusCode, array $data): void {
    http_response_code($statusCode);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit;
}

/**
 * Logger
 */
function logError(string $message, array $context = []): void {
    $logEntry = date('Y-m-d H:i:s') . " - {$message} - " . json_encode($context) . "\n";
    error_log($logEntry, 3, __DIR__ . '/logs/email_errors.log');
}

/**
 * Validate request method
 */
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    sendResponse(200, ['message' => 'OK']);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse(405, ['error' => 'Method not allowed']);
}

try {
    // Validate CSRF token if implemented
    if (!isset($_POST['csrf_token']) || !validateCSRFToken($_POST['csrf_token'])) {
        throw new Exception('Invalid CSRF token');
    }

    // Validate and sanitize email
    $recipientEmail = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
    if (!$recipientEmail) {
        throw new Exception('Invalid email address');
    }

    // Validate score
    $score = filter_var($_POST['score'] ?? '', FILTER_VALIDATE_INT);
    if ($score === false || $score < 0) {
        throw new Exception('Invalid score value');
    }

    // Sanitize interpretation
    $interpretation = htmlspecialchars($_POST['interpretation'] ?? '', ENT_QUOTES, 'UTF-8');
    if (empty($interpretation)) {
        throw new Exception('Missing interpretation');
    }

    // Validate PDF file
    if (!isset($_FILES['pdf']) || $_FILES['pdf']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('PDF file is missing or invalid');
    }

    // Check file size
    if ($_FILES['pdf']['size'] > $config['max_pdf_size']) {
        throw new Exception('PDF file is too large');
    }

    // Verify MIME type
    $finfo = new finfo(FILEINFO_MIME_TYPE);
    $mimeType = $finfo->file($_FILES['pdf']['tmp_name']);
    if (!in_array($mimeType, $config['allowed_mime_types'], true)) {
        throw new Exception('Invalid file type');
    }

    // Read PDF file
    $pdfContent = file_get_contents($_FILES['pdf']['tmp_name']);
    if ($pdfContent === false) {
        throw new Exception('Could not read PDF file');
    }

    // Initialize Mailerloo client with retries
    $maxRetries = 3;
    $attempt = 1;
    $mailerloo = new \Mailerloo\Client($config['api_key']);

    // Prepare email content with proper encoding
    $htmlContent = "
        <!DOCTYPE html>
        <html lang='ro'>
        <head>
            <meta charset='UTF-8'>
            <title>Rezultatele testului RAADS-R</title>
        </head>
        <body style='font-family: Arial, sans-serif; line-height: 1.6; color: #333;'>
            <div style='max-width: 600px; margin: 0 auto; padding: 20px;'>
                <h1 style='color: #2196F3; margin-bottom: 20px;'>Rezultatele testului RAADS-R</h1>

                <p>Bună ziua,</p>

                <p>Vă mulțumim pentru completarea testului RAADS-R. Găsiți atașat rezultatele complete ale testului.</p>

                <div style='background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                    <p style='margin: 0;'><strong>Scor total:</strong> {$score}</p>
                    <p style='margin: 10px 0 0 0;'><strong>Interpretare:</strong> {$interpretation}</p>
                </div>

                <div style='background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                    <p style='margin: 0; color: #856404;'>
                        <strong>IMPORTANT:</strong> Acest test este destinat <strong>EXCLUSIV</strong> în scop informativ și
                        <strong>NU</strong> trebuie utilizat ca un instrument de diagnostic. Pentru evaluări profesionale,
                        vă recomandăm să vizitați <a href='https://www.doctoradhd.com' style='color: #856404; font-weight: bold;'>www.doctoradhd.com</a>
                    </p>
                </div>

                <p>Pentru mai multe informații și resurse, vizitați:</p>
                <ul style='padding-left: 20px;'>
                    <li><a href='https://www.testautism.ro' style='color: #2196F3;'>www.testautism.ro</a></li>
                    <li><a href='https://www.suntautist.ro' style='color: #2196F3;'>www.suntautist.ro</a></li>
                </ul>

                <p>Cu considerație,<br>Echipa Test Autism</p>

                <div style='margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;'>
                    <p>Acest email a fost generat automat. Vă rugăm să nu răspundeți la acest mesaj.</p>
                    <p>Data generării: " . date('d.m.Y H:i:s') . "</p>
                </div>
            </div>
        </body>
        </html>
    ";

    // Initialize success flag
    $emailSent = false;

    // Retry loop for email sending
    while ($attempt <= $maxRetries && !$emailSent) {
        try {
            // Prepare email data
            $emailData = [
                'to' => $recipientEmail,
                'from_email' => $config['from_email'],
                'from_name' => $config['from_name'],
                'subject' => 'Rezultatele testului RAADS-R',
                'html' => $htmlContent,
                'attachments' => [
                    [
                        'content' => base64_encode($pdfContent),
                        'type' => 'application/pdf',
                        'name' => 'rezultate_test_raads_r.pdf'
                    ]
                ],
                'track_opens' => true,
                'track_clicks' => true
            ];

            // Send email
            $response = $mailerloo->sendEmail($emailData);

            // Verify response
            if (!isset($response['id'])) {
                throw new Exception('Invalid API response');
            }

            $emailSent = true;

            // Log success
            error_log("Email sent successfully to {$recipientEmail} (ID: {$response['id']})");

        } catch (Exception $e) {
            if ($attempt === $maxRetries) {
                throw new Exception('Failed to send email after ' . $maxRetries . ' attempts: ' . $e->getMessage());
            }
            $attempt++;
            sleep(1); // Wait before retry
        }
    }

    // Return success response
    sendResponse(200, [
        'success' => true,
        'message' => 'Email trimis cu succes'
    ]);

} catch (Exception $e) {
    // Log error with context
    logError('Email sending error', [
        'message' => $e->getMessage(),
        'recipient' => $recipientEmail ?? 'unknown',
        'score' => $score ?? 'unknown'
    ]);

    // Return error response
    sendResponse(500, [
        'error' => 'A apărut o eroare la trimiterea email-ului. Vă rugăm să încercați din nou.'
    ]);
}

/**
 * CSRF token validation function - implement as needed
 */
function validateCSRFToken(string $token): bool {
    // Implement CSRF validation logic
    // This is a placeholder - implement proper CSRF validation
    return true;
}
?>