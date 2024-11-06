<?php
declare(strict_types=1);
error_reporting(E_ALL);
ini_set('display_errors', '1');

// Load environment variables
require_once __DIR__ . '/vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Debug function
function debug_log($message, $data = null) {
    $log = date('Y-m-d H:i:s') . " - $message";
    if ($data !== null) {
        $log .= " - " . json_encode($data);
    }
    error_log($log . "\n", 3, __DIR__ . '/logs/debug.log');
}

// Headers
header('Content-Type: application/json; charset=UTF-8');
header('Access-Control-Allow-Origin: https://www.testautism.ro');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

try {
    // Read JSON input
    $input = json_decode(file_get_contents('php://input'), true);
    if (!$input) {
        throw new Exception('Invalid JSON input');
    }

    debug_log('Received request', $input);

    // Validate email
    if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
        throw new Exception('Invalid email address');
    }

    // Create temp directory if needed
    $tempDir = __DIR__ . '/temp';
    if (!is_dir($tempDir)) {
        mkdir($tempDir, 0755, true);
    }

    // Process PDF
    if (empty($input['pdfData'])) {
        throw new Exception('Missing PDF data');
    }

    // Clean base64 data
    $pdfData = $input['pdfData'];
    if (strpos($pdfData, 'data:application/pdf;base64,') === 0) {
        $pdfData = substr($pdfData, strlen('data:application/pdf;base64,'));
    }

    // Save PDF temporarily
    $pdfContent = base64_decode($pdfData);
    $tempFile = $tempDir . '/rezultate_' . uniqid() . '.pdf';
    file_put_contents($tempFile, $pdfContent);

    // Prepare HTML content
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
                    <p style='margin: 0;'><strong>Scor total:</strong> {$input['score']}</p>
                    <p style='margin: 10px 0 0 0;'><strong>Interpretare:</strong> {$input['interpretation']}</p>
                </div>
                <div style='background-color: #fff3cd; padding: 15px; border-radius: 5px; margin: 20px 0;'>
                    <p style='margin: 0; color: #856404;'>
                        <strong>IMPORTANT:</strong> Acest test este destinat <strong>EXCLUSIV</strong> în scop informativ și
                        <strong>NU</strong> trebuie utilizat ca un instrument de diagnostic. Pentru evaluări profesionale, 
                        vă recomandăm să vizitați <a href='https://www.doctoradhd.com'>www.doctoradhd.com</a>
                    </p>
                </div>
                <p>Pentru mai multe informații și resurse, vizitați:</p>
                <ul>
                    <li><a href='https://www.testautism.ro'>www.testautism.ro</a></li>
                    <li><a href='https://www.suntautist.ro'>www.suntautist.ro</a></li>
                </ul>
                <p>Cu considerație,<br>Echipa Test Autism</p>
            </div>
        </body>
        </html>
    ";

    // Plain text version
    $plainContent = strip_tags(str_replace(['<br>', '</p>', '</div>'], "\n", $htmlContent));

    // Initialize cURL
    $ch = curl_init();

    // Prepare the email data exactly as in Mailerloo's example
    $postFields = [
        "from" => $_ENV['FROM_NAME'] . " <" . $_ENV['FROM_EMAIL'] . ">",
        "to" => $input['email'],
        "subject" => "Rezultatele testului RAADS-R",
        "plain" => $plainContent,
        "html" => $htmlContent,
        "attachment" => base64_encode(file_get_contents($tempFile)),
        "filename" => "rezultate_test_raads_r.pdf"
    ];

    debug_log('Sending request to Mailerloo', [
        'to' => $postFields['to'],
        'from' => $postFields['from'],
        'attachment_size' => strlen($postFields['attachment'])
    ]);

    // Set cURL options exactly as in the example
    curl_setopt($ch, CURLOPT_URL, 'https://smtp.maileroo.com/send');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $postFields);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'X-API-Key: ' . $_ENV['MAILERLOO_API_KEY']
    ]);

    // Execute request
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

    debug_log('Mailerloo response', [
        'http_code' => $httpCode,
        'response' => $response
    ]);

    if (curl_errno($ch)) {
        throw new Exception('Curl error: ' . curl_error($ch));
    }

    curl_close($ch);

    // Check response
    if ($httpCode !== 200) {
        throw new Exception('API error: ' . $response);
    }

    // Clean up temp file
    unlink($tempFile);

    // Send success response
    http_response_code(200);
    echo json_encode([
        'success' => true,
        'message' => 'Email trimis cu succes'
    ]);

} catch (Exception $e) {
    debug_log('Error', [
        'message' => $e->getMessage(),
        'trace' => $e->getTraceAsString()
    ]);

    // Clean up temp file if it exists
    if (isset($tempFile) && file_exists($tempFile)) {
        unlink($tempFile);
    }

    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>
