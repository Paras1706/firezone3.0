@echo off
REM Fire Zone 2.0 - Complete Startup Script

echo.
echo ====================================
echo Fire Zone 2.0 - Startup Script
echo ====================================
echo.

REM Check if we're in the right directory
if not exist "package.json" (
    echo ERROR: This script must be run from the project root directory!
    exit /b 1
)

echo Starting Fire Zone 2.0...
echo.

REM Start MongoDB (optional - comment out if using Atlas)
echo [1/3] Checking MongoDB...
tasklist | find /i "mongod.exe" >nul
if errorlevel 1 (
    echo WARNING: MongoDB is not running. Please start MongoDB manually.
    echo Download from: https://www.mongodb.com/try/download/community
) else (
    echo ✓ MongoDB is running
)

echo.
echo [2/3] Starting Backend Server...
start "Fire Zone Backend" cmd /k "cd server && npm run dev"
timeout /t 3 /nobreak

echo.
echo [3/3] Starting Frontend Server...
start "Fire Zone Frontend" cmd /k "npm run dev"

echo.
echo ====================================
echo ✅ Both servers are starting!
echo.
echo Frontend: http://127.0.0.1:3000/Fire-Zone-2.0/
echo Backend:  http://localhost:5000/api
echo.
echo Close either window to stop that server.
echo ====================================
pause
