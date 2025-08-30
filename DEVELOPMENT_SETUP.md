# Wrylo App Development Setup

This guide helps you run both the Django backend and React Native frontend on the same development environment for login functionality.

## Quick Start

### Option 1: Use the Automated Script (Recommended)
```bash
./start-dev.sh
```

This script will:
- Start Django backend on port 8000
- Start Expo frontend on port 8001
- Handle cleanup when you press Ctrl+C

### Option 2: Manual Setup

#### 1. Start Django Backend
```bash
cd book_app_backend
python3 -m venv venv  # Only first time
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt  # Only first time
python manage.py migrate  # Only first time or after model changes
python manage.py runserver 0.0.0.0:8000
```

#### 2. Start React Native Frontend (in new terminal)
```bash
npm install  # Only first time
npm start
```

## Configuration

### Backend (Django)
- **Port**: 8000
- **API Base**: http://localhost:8000/api
- **Database**: SQLite (db.sqlite3)
- **Authentication**: JWT tokens

### Frontend (React Native/Expo)
- **Port**: 8001
- **API Configuration**: Automatically detects platform
  - iOS Simulator: http://localhost:8000/api
  - Android Emulator: http://10.0.2.2:8000/api
  - Web: http://localhost:8000/api

## Login Testing

1. Make sure both services are running
2. Open the app on your device/emulator
3. Try logging in with existing credentials or register a new user
4. Check the Django logs for API calls

## Troubleshooting

### Port Already in Use
```bash
# Find and kill processes on ports 8000 and 8001
lsof -ti:8000 | xargs kill -9
lsof -ti:8001 | xargs kill -9
```

### Network Connectivity Issues
- Ensure your firewall allows connections on ports 8000 and 8001
- For physical devices, use your local IP instead of localhost
- Check that CORS is properly configured in Django settings

### Login Issues
1. Check Django logs: `tail -f book_app_backend/django.log`
2. Check browser/app console for network errors
3. Verify JWT tokens are being generated properly

## API Endpoints

- `POST /api/auth/register/` - User registration
- `POST /api/auth/login/` - User login
- `POST /api/auth/logout/` - User logout
- `GET /api/auth/user/` - Get current user info