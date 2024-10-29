<?php
// share-result.php

// Validate ID parameter
$id = $_GET['id'] ?? '';
if (!preg_match('/^raads_\d+_[a-z0-9]+$/', $id)) {
    header('Location: /');
    exit;
}

// Check if image exists
$imagePath = __DIR__ . '/results/' . $id . '.jpg';
if (!file_exists($imagePath)) {
    header('Location: /');
    exit;
}

// Get the full URL to the image
$imageUrl = 'https://www.testautism.ro/results/' . $id . '.jpg';
$pageUrl = 'https://www.testautism.ro/share-result.php?id=' . urlencode($id);
?>
<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rezultate Test RAADS-R</title>
    
    <!-- Facebook Open Graph tags -->
    <meta property="og:type" content="website">
    <meta property="og:title" content="Rezultatele mele la testul RAADS-R">
    <meta property="og:description" content="Iată rezultatele mele la testul RAADS-R pentru screening-ul autismului.">
    <meta property="og:image" content="<?php echo htmlspecialchars($imageUrl); ?>">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:url" content="<?php echo htmlspecialchars($pageUrl); ?>">
    
    <!-- Redirect to main page after a short delay -->
    <script>
        setTimeout(function() {
            window.location.href = '/';
        }, 1000);
    </script>
</head>
<body>
    <p>Redirecționare...</p>
</body>
</html>