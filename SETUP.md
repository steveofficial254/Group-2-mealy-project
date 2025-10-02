# Mealy 

This guide will help you set up and run the Mealy application on **Windows**, **Linux**, and **macOS**.

## Prerequisites

### All Platforms
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **Python** (v3.8 or higher) - [Download](https://www.python.org/)
- **Git** - [Download](https://git-scm.com/)

---

## Initial Setup

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Group-2-mealy-project
```

---

## Backend Setup (Flask)

### Windows

1. **Navigate to server directory:**
   ```cmd
   cd server
   ```

2. **Create virtual environment:**
   ```cmd
   python -m venv venv
   ```

3. **Activate virtual environment:**
   ```cmd
   venv\Scripts\activate
   ```

4. **Install dependencies:**
   ```cmd
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   - Copy `.env` file or create one with:
   ```
   DATABASE_URL=sqlite:///mealy.db
   JWT_SECRET_KEY=super-secret-key
   SECRET_KEY=another-secret
   FLASK_ENV=development
   FLASK_DEBUG=True
   FLASK_PORT=5001
   ```

6. **Run the server:**
   ```cmd
   python app.py
   ```

### Linux / macOS

1. **Navigate to server directory:**
   ```bash
   cd server
   ```

2. **Create virtual environment:**
   ```bash
   python3 -m venv venv
   ```

3. **Activate virtual environment:**
   ```bash
   source venv/bin/activate
   ```

4. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables:**
   - Copy `.env` file or create one with:
   ```
   DATABASE_URL=sqlite:///mealy.db
   JWT_SECRET_KEY=super-secret-key
   SECRET_KEY=another-secret
   FLASK_ENV=development
   FLASK_DEBUG=True
   FLASK_PORT=5001
   ```

6. **Run the server:**
   ```bash
   python app.py
   ```

---

## Frontend Setup (React)

### All Platforms (Windows, Linux, macOS)

1. **Navigate to client directory:**
   ```bash
   cd client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Ensure `.env` file exists with:
   ```
   REACT_APP_API_URL=http://localhost:5001
   REACT_APP_GOOGLE_CLIENT_ID=YOUR_ACTUAL_GOOGLE_CLIENT_ID.apps.googleusercontent.com
   REACT_APP_APPLE_CLIENT_ID=your-apple-client-id
   ```

4. **Run the development server:**
   ```bash
   npm start
   ```

The application will open at `http://localhost:3000`

---

## Running Both Servers

### Option 1: Separate Terminals

**Terminal 1 - Backend:**
- Windows: `cd server && venv\Scripts\activate && python app.py`
- Linux/Mac: `cd server && source venv/bin/activate && python app.py`

**Terminal 2 - Frontend:**
```bash
cd client && npm start
```

### Option 2: Using npm Scripts (Recommended)

You can create a `package.json` in the root directory with scripts to run both:

```json
{
  "scripts": {
    "start:server": "cd server && python app.py",
    "start:client": "cd client && npm start",
    "start": "concurrently \"npm run start:server\" \"npm run start:client\""
  }
}
```

Then run:
```bash
npm install concurrently --save-dev
npm start
```

---

## Port Configuration

**Important:** The backend runs on port **5001** (not 5000).

- Backend: `http://localhost:5001`
- Frontend: `http://localhost:3000`

Make sure these ports are not in use by other applications.

---

## Database Initialization

The SQLite database will be created automatically on first run at:
- `server/mealy.db`

To reset the database, simply delete `mealy.db` and restart the server.

---

## Common Issues

### Issue 1: "Failed to fetch" error
**Solution:** Ensure backend is running on port 5001 and client `.env` has `REACT_APP_API_URL=http://localhost:5001`

### Issue 2: Python command not found
**Solution:**
- Windows: Use `python` or add Python to PATH
- Linux/Mac: Use `python3` or create an alias

### Issue 3: Port already in use
**Solution:**
- Windows: `netstat -ano | findstr :5001` then `taskkill /PID <PID> /F`
- Linux/Mac: `lsof -ti:5001 | xargs kill -9`

### Issue 4: Virtual environment activation issues
**Solution:**
- Windows: May need to run `Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser` in PowerShell
- Linux/Mac: Ensure `venv/bin/activate` has execute permissions: `chmod +x venv/bin/activate`

---

## Building for Production

### Backend
```bash
cd server
pip install gunicorn
gunicorn app:app --bind 0.0.0.0:5001
```

### Frontend
```bash
cd client
npm run build
```

The production build will be in `client/build/` directory.

---

## Environment Variables Summary

### Backend (.env in server/)
```
DATABASE_URL=sqlite:///mealy.db
JWT_SECRET_KEY=super-secret-key
SECRET_KEY=another-secret
FLASK_ENV=development
FLASK_DEBUG=True
FLASK_PORT=5001
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-secret>
```

### Frontend (.env in client/)
```
REACT_APP_API_URL=http://localhost:5001
REACT_APP_GOOGLE_CLIENT_ID=<your-google-client-id>
REACT_APP_APPLE_CLIENT_ID=<your-apple-client-id>
```

---

## Testing

### Backend Tests
```bash
cd server
pytest
```

### Frontend Tests
```bash
cd client
npm test
```

---

## Support

If you encounter any issues:
1. Check that all prerequisites are installed
2. Verify environment variables are set correctly
3. Ensure ports 3000 and 5001 are available
4. Check that virtual environment is activated for backend

---

## License

[Your License Here]
