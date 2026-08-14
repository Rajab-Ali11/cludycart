@echo off
echo ========================================
echo   CludyCart Backend Setup
echo ========================================
echo.

REM Check PHP
php -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] PHP not found. Install PHP 8.2+
    pause
    exit /b 1
)

REM Check Composer
composer -V >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Composer not found. Install from getcomposer.org
    pause
    exit /b 1
)

echo [1/5] Installing Laravel...
composer create-project laravel/laravel temp-laravel --prefer-dist
if errorlevel 1 (
    echo [ERROR] Failed to install Laravel
    pause
    exit /b 1
)

REM Move files from temp
echo [2/5] Setting up project structure...
xcopy /E /Y /Q temp-laravel\app\*.* app\ >nul
xcopy /E /Y /Q temp-laravel\bootstrap\*.* bootstrap\ >nul
xcopy /E /Y /Q temp-laravel\config\*.* config\ >nul
xcopy /E /Y /Q temp-laravel\database\*.* database\ >nul
xcopy /E /Y /Q temp-laravel\public\*.* public\ >nul
xcopy /E /Y /Q temp-laravel\resources\*.* resources\ >nul
xcopy /E /Y /Q temp-laravel\routes\*.* routes\ >nul
xcopy /E /Y /Q temp-laravel\storage\*.* storage\ >nul
copy /Y temp-laravel\artisan . >nul
copy /Y temp-laravel\composer.json . >nul
copy /Y temp-laravel\composer.lock . >nul

REM Cleanup
rmdir /S /Q temp-laravel

echo [3/5] Installing dependencies...
composer install --no-dev

echo [4/5] Setting up environment...
if not exist .env (
    copy .env.example .env
    php artisan key:generate
)

echo [5/5] Creating storage link...
php artisan storage:link

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo Next steps:
echo 1. Edit .env with your database credentials
echo 2. Run: php artisan migrate
echo 3. Run: php artisan db:seed
echo 4. Run: php artisan serve
echo.
echo Admin: http://localhost:8000/admin
echo Email: admin@cludycart.com
echo Password: password
echo.
pause
