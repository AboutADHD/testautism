<?php
$request = $_SERVER['REQUEST_URI'];
$path = parse_url($request, PHP_URL_PATH);
$path = ltrim($path, '/');

// Handle root
if (empty($path)) {
    if (file_exists('index.html')) {
        include 'index.html';
        exit;
    }
}

// Handle clean URLs
if (!empty($path) && !strpos($path, '.')) {
    $htmlFile = $path . '.html';
    if (file_exists($htmlFile)) {
        include $htmlFile;
        exit;
    }
}
?>