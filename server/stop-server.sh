#!/bin/bash

echo "🛑 Stopping server processes..."

# Kill any existing node processes on port 5000
lsof -ti:5000 | xargs kill -9 2>/dev/null || echo "No processes on port 5000"

# Kill any nodemon processes
pkill -f "nodemon" 2>/dev/null || echo "No nodemon processes"

# Kill any node server.js processes
pkill -f "node server.js" 2>/dev/null || echo "No server.js processes"

echo "✅ Server stopped successfully"


