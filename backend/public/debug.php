<!DOCTYPE html>
<html>
<head><title>Laravel Debug</title></head>
<body>
<h1>Laravel Debug Info</h1>
<pre>
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

echo "=== PHP Info ===\n";
echo "PHP Version: " . phpversion() . "\n";
echo "Extensions: " . implode(', ', get_loaded_extensions()) . "\n\n";

echo "=== File Check ===\n";
echo "CWD: " . getcwd() . "\n\n";

$checks = [
    'backend/vendor/autoload.php' => 'Vendor Autoload',
    'backend/.env' => '.env File',
    'backend/bootstrap/app.php' => 'Bootstrap App',
    'backend/routes/web.php' => 'Web Routes',
    'backend/routes/api.php' => 'API Routes',
    'backend/storage/' => 'Storage Folder',
    'backend/storage/logs/' => 'Storage Logs',
    'backend/storage/framework/' => 'Storage Framework',
    'backend/bootstrap/cache/' => 'Bootstrap Cache',
];

foreach ($checks as $path => $label) {
    $exists = file_exists($path);
    $writable = is_writable($path);
    echo "$label: " . ($exists ? 'EXISTS' : 'MISSING') . " | Writable: " . ($writable ? 'YES' : 'NO') . "\n";
}

echo "\n=== Database Test ===\n";
try {
    $env = parse_ini_file('backend/.env');
    $dsn = "mysql:host=" . $env['DB_HOST'] . ";port=" . ($env['DB_PORT'] ?? 3306);
    $pdo = new PDO($dsn, $env['DB_USERNAME'], $env['DB_PASSWORD'], [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);
    echo "DB Connection: SUCCESS\n";
    $pdo->exec("USE " . $env['DB_DATABASE']);
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables (" . count($tables) . "): " . implode(', ', $tables) . "\n";
} catch (Exception $e) {
    echo "DB Error: " . $e->getMessage() . "\n";
}

echo "\n=== Laravel Test ===\n";
try {
    require_once 'backend/vendor/autoload.php';
    echo "Autoloader: OK\n";
    $app = require_once 'backend/bootstrap/app.php';
    echo "App bootstrap: OK\n";
} catch (Throwable $e) {
    echo "Error: " . $e->getMessage() . "\n";
    echo "File: " . $e->getFile() . ":" . $e->getLine() . "\n";
}
?>
</pre>
</body>
</html>
