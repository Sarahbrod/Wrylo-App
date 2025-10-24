#!/bin/bash

# Development startup script for Wrylo App
# Runs both Django backend and Expo frontend

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Starting Wrylo App Development Environment${NC}"

# Check if ports are available
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo -e "${YELLOW}⚠️  Port $1 is already in use${NC}"
        return 1
    fi
    return 0
}

# Start Django backend
start_backend() {
    echo -e "${GREEN}📚 Starting Django Backend (Port 8000)...${NC}"
    cd book_app_backend
    
    # Check if virtual environment exists
    if [ ! -d "venv" ]; then
        echo -e "${YELLOW}Creating virtual environment...${NC}"
        python3 -m venv venv
    fi
    
    # Activate virtual environment
    source venv/bin/activate
    
    # Install requirements
    pip install -r requirements.txt
    
    # Run migrations
    python manage.py migrate
    
    # Start Django server
    python manage.py runserver 0.0.0.0:8000 &
    BACKEND_PID=$!
    
    cd ..
    echo -e "${GREEN}✅ Backend started on http://localhost:8000${NC}"
}

# Start Expo frontend
start_frontend() {
    echo -e "${GREEN}📱 Starting Expo Frontend (Port 8001)...${NC}"
    
    # Install dependencies if needed
    if [ ! -d "node_modules" ]; then
        echo -e "${YELLOW}Installing npm dependencies...${NC}"
        npm install
    fi
    
    # Start Expo
    npm start &
    FRONTEND_PID=$!
    
    echo -e "${GREEN}✅ Frontend started on http://localhost:8001${NC}"
}

# Cleanup function
cleanup() {
    echo -e "\n${YELLOW}🛑 Shutting down development environment...${NC}"
    if [ ! -z "$BACKEND_PID" ]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [ ! -z "$FRONTEND_PID" ]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    # Kill any remaining processes on our ports
    lsof -ti:8000 | xargs kill -9 2>/dev/null
    lsof -ti:8001 | xargs kill -9 2>/dev/null
    echo -e "${GREEN}✅ Cleanup complete${NC}"
    exit 0
}

# Set trap for cleanup on script exit
trap cleanup SIGINT SIGTERM EXIT

# Check ports
if ! check_port 8000; then
    echo -e "${RED}❌ Port 8000 is busy. Please free it up first.${NC}"
    exit 1
fi

if ! check_port 8001; then
    echo -e "${RED}❌ Port 8001 is busy. Please free it up first.${NC}"
    exit 1
fi

# Start services
start_backend
sleep 3  # Give backend time to start
start_frontend

echo -e "\n${GREEN}🎉 Development environment is ready!${NC}"
echo -e "${BLUE}📚 Backend API: http://localhost:8000/api${NC}"
echo -e "${BLUE}📱 Frontend: http://localhost:8001${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop both services${NC}"

# Keep script running
wait