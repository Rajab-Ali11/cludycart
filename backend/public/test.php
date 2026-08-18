<?php
// Test 1: PHP version
echo "PHP Version: " . phpversion() . "<br>";

// Test 2: Check if vendor exists
$vendorPath = __DIR__ . '/backend/vendor/autoload.php';
echo "Vendor autoload exists: " . (file_exists($vendorPath) ? 'YES' : 'NO') . "<br>";

// Test 3: Check .env
$envPath = __DIR__ . '/backend/.env';
echo ".env exists: " . (file_exists($envPath) ? 'YES' : 'NO') . "<br>";

// Test 4: Check DB connection
$envContent = file_get_contents($envPath);
preg_match('/DB_HOST=(.*)/', $envContent, $hostMatch);
preg_match('/DB_DATABASE=(.*)/', $envContent, $dbMatch);
preg_match('/DB_USERNAME=(.*)/', $envContent, $userMatch);
preg_match('/DB_PASSWORD=(.*)/', $envContent, $passMatch);

echo "<br>DB Config:<br>";
echo "Host: " . ($hostMatch[1] ?? 'NOT FOUND') . "<br>";
echo "Database: " . ($dbMatch[1] ?? 'NOT FOUND') . "<br>";
echo "Username: " . ($userMatch[1] ?? 'NOT FOUND') . "<br>";

try {
    $pdo = new PDO(
        "mysql:host=" . trim($hostMatch[1]) . ";port=3306",
        trim($userMatch[1]),
        trim($passMatch[1]),
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );
    echo "<br>DB Connection: SUCCESS<br>";
    
    $pdo->exec("CREATE DATABASE IF NOT EXISTS " . trim($dbMatch[1]));
    echo "Database created/verified<br>";
    
    $pdo->exec("USE " . trim($dbMatch[1]));
    $tables = $pdo->query("SHOW TABLES")->fetchAll(PDO::FETCH_COLUMN);
    echo "Tables: " . implode(', ', $tables) . "<br>";
    
} catch (PDOException $e) {
    echo "<br>DB Connection FAILED: " . $e->getMessage() . "<br>";
}

// Test 5: Try running Laravel
echo "<br><h3>Laravel Test:</h3>";
try {
    require $vendorPath;
    echo "Autoloader loaded OK<br>";
} catch (Throwable $e) {
    echo "Autoloader ERROR: " . $e->getMessage() . "<br>";
}
