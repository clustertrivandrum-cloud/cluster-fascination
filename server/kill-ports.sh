#!/bin/bash

# Script to kill processes on common development ports
echo "Killing processes on ports 5005, 5009, 5050, 5173, 3000, 3001..."

# Kill processes on specific ports
for port in 5005 5009 5050 5173 3000 3001; do
    echo "Checking port $port..."
    pid=$(lsof -ti:$port)
    if [ ! -z "$pid" ]; then
        echo "Killing process $pid on port $port"
        kill -9 $pid
    else
        echo "Port $port is free"
    fi
done

# Kill any remaining node/nodemon processes
echo "Killing remaining Node.js processes..."
pkill -f "node.*server.js" 2>/dev/null
pkill -f nodemon 2>/dev/null

echo "Done! All ports should be free now."
