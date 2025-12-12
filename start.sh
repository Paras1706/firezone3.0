#!/bin/bash
# Fire Zone 2.0 - Complete Startup Script for Linux/Mac

echo ""
echo "===================================="
echo "Fire Zone 2.0 - Startup Script"
echo "===================================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "ERROR: This script must be run from the project root directory!"
    exit 1
fi

echo "Starting Fire Zone 2.0..."
echo ""

# Check MongoDB
echo "[1/3] Checking MongoDB..."
if pgrep -x "mongod" > /dev/null; then
    echo "✓ MongoDB is running"
else
    echo "WARNING: MongoDB is not running. Please start MongoDB manually."
    echo "Download from: https://www.mongodb.com/try/download/community"
fi

echo ""
echo "[2/3] Starting Backend Server..."
cd server && npm run dev &
BACKEND_PID=$!
sleep 3

echo ""
echo "[3/3] Starting Frontend Server..."
cd .. && npm run dev &
FRONTEND_PID=$!

echo ""
echo "===================================="
echo "✅ Both servers are starting!"
echo ""
echo "Frontend: http://127.0.0.1:3000/Fire-Zone-2.0/"
echo "Backend:  http://localhost:5000/api"
echo ""
echo "Press Ctrl+C to stop both servers."
echo "===================================="

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
