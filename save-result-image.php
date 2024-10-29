<?php
// api/save-result-image.php

header('Content-Type: application/json');

try {
    // Validate request
    if (!isset($_FILES['image']) || !isset($_POST['id']) || !isset($_POST['score'])) {
        throw new Exception('Missing required fields');
    }

    $uniqueId = $_POST['id'];
    $score = $_POST['score'];
    
    // Validate unique ID format
    if (!preg_match('/^raads_\d+_[a-z0-9]+$/', $uniqueId)) {
        throw new Exception('Invalid ID format');
    }

    // Set up paths
    $uploadDir = __DIR__ . '/results/';
    $filename = $uniqueId . '.jpg';
    $uploadPath = $uploadDir . $filename;
    
    // Ensure upload directory exists
    if (!file_exists($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }

    // Move uploaded file
    if (!move_uploaded_file($_FILES['image']['tmp_name'], $uploadPath)) {
        throw new Exception('Failed to save image');
    }

    // Create share URL
    $baseUrl = 'https://www.testautism.ro';
    $shareUrl = $baseUrl . '/share-result.php?id=' . urlencode($uniqueId);

    echo json_encode([
        'success' => true,
        'shareUrl' => $shareUrl
    ]);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>