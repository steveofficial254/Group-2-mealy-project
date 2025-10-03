# Mealy Project - Render Deployment Guide

## 📋 Complete Step-by-Step Deployment Instructions

This guide will help you deploy the Mealy full-stack application on Render.com

---



## 📦 Part 1: Deploy Backend (Flask API)

### Step 1.1: Create New Web Service

1. Go to [https://dashboard.render.com](https://dashboard.render.com)
2. Click the **"New +"** button (top right)
3. Select **"Web Service"**
4. Click **"Connect account"** to connect your GitHub
5. Find and select your `Group-2-mealy-project` repository
6. Click **"Connect"**

### Step 1.2: Configure Backend Settings

Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `mealy-backend` |
| **Region** | Choose closest to your location (e.g., Oregon USA) |
| **Branch** | `main` |
| **Root Directory** | `server` |
| **Runtime** | `Python 3` |
| **Build Command** | `pip install -r requirements.txt` |
| **Start Command** | `gunicorn app:app --bind 0.0.0.0:$PORT` |
| **Instance Type** | `Free` |

### Step 1.3: Add Environment Variables

Click **"Advanced"** button, then scroll to **"Environment Variables"** section.

Click **"Add Environment Variable"** and add each of these:

```bash
# Required Variables
DATABASE_URL=sqlite:///mealy.db
JWT_SECRET_KEY=mealy_jwt_secret_2024_prod_8k9m2n4p6q8r0s2t4u6v8w0x2y4z6a8b
SECRET_KEY=mealy_flask_secret_2024_prod_1a3c5e7g9i1k3m5o7q9s1u3w5y7z9b2d
FLASK_ENV=production
FLASK_DEBUG=False
PORT=10000
```

**Optional (for Google OAuth - if you have credentials):**
```bash
GOOGLE_CLIENT_ID=your-actual-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-actual-google-client-secret
```

### Step 1.4: Deploy Backend

1. Click **"Create Web Service"** button at the bottom
2. Wait 3-5 minutes while Render builds and deploys your backend
3. Watch the logs to ensure everything builds successfully
4. Once deployed, you'll see: **"Your service is live 🎉"**

### Step 1.5: Test Backend & Copy URL

1. At the top of the page, you'll see your backend URL (e.g., `https://mealy-backend.onrender.com`)
2. **COPY THIS URL** - you'll need it for the frontend
3. Test it by visiting: `https://mealy-backend.onrender.com/health`
4. You should see: `{"ok": true}`

✅ **Backend is now live!**

---

## 🎨 Part 2: Deploy Frontend (React App)

### Step 2.1: Create New Static Site

1. Go back to Render Dashboard: [https://dashboard.render.com](https://dashboard.render.com)
2. Click **"New +"** button
3. Select **"Static Site"**
4. Find and select your `Group-2-mealy-project` repository
5. Click **"Connect"**

### Step 2.2: Configure Frontend Settings

Fill in the following settings:

| Field | Value |
|-------|-------|
| **Name** | `mealy-frontend` |
| **Branch** | `main` |
| **Root Directory** | `client` |
| **Build Command** | `npm install && npm run build` |
| **Publish Directory** | `client/build` |

### Step 2.3: Add Environment Variables

Click **"Advanced"** button, then scroll to **"Environment Variables"**.

**IMPORTANT:** Replace `https://mealy-backend.onrender.com` with YOUR actual backend URL from Step 1.5

```bash
REACT_APP_API_URL=https://mealy-backend.onrender.com
DISABLE_ESLINT_PLUGIN=true
CI=false
```

### Step 2.4: Deploy Frontend

1. Click **"Create Static Site"** button
2. Wait 5-8 minutes while Render builds your React app
3. Watch the logs to ensure everything builds successfully
4. Once deployed, you'll see: **"Your site is live 🎉"**

### Step 2.5: Get Frontend URL

1. Copy your frontend URL (e.g., `https://mealy-frontend.onrender.com`)
2. Open it in your browser
3. You should see the Mealy application!

✅ **Frontend is now live!**

---

## ✅ Part 3: Testing Your Deployment

### Test 1: Backend Health Check
```
URL: https://mealy-backend.onrender.com/health
Expected: {"ok": true}
```

### Test 2: Backend API Info
```
URL: https://mealy-backend.onrender.com/
Expected: JSON with API endpoints list
```

### Test 3: Frontend Application
```
URL: https://mealy-frontend.onrender.com
Expected: Mealy home page loads
```

### Test 4: Full Integration Test
1. Go to your frontend URL
2. Click "Register" or "Login"
3. Try to create an account
4. If successful, your frontend and backend are connected! ✅

---

## 🔑 Environment Variables Reference

### Backend Environment Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `DATABASE_URL` | `sqlite:///mealy.db` | Database connection string |
| `JWT_SECRET_KEY` | `mealy_jwt_secret_2024_prod_8k9m2n4p6q8r0s2t4u6v8w0x2y4z6a8b` | JWT token encryption key |
| `SECRET_KEY` | `mealy_flask_secret_2024_prod_1a3c5e7g9i1k3m5o7q9s1u3w5y7z9b2d` | Flask session encryption |
| `FLASK_ENV` | `production` | Flask environment mode |
| `FLASK_DEBUG` | `False` | Disable debug mode in production |
| `PORT` | `10000` | Port number (Render default) |

### Frontend Environment Variables

| Variable | Value | Purpose |
|----------|-------|---------|
| `REACT_APP_API_URL` | `https://mealy-backend.onrender.com` | Backend API endpoint |
| `DISABLE_ESLINT_PLUGIN` | `true` | Disable ESLint in build |
| `CI` | `false` | Prevent treating warnings as errors |

---

## 🐛 Troubleshooting Common Issues

### Issue 1: Backend Returns 503 Error
**Solution:**
- Go to Render Dashboard → Your backend service
- Click "Logs" tab
- Look for error messages
- Common issues:
  - Missing environment variables
  - Python package installation failed
  - Port binding error

### Issue 2: Frontend Shows "Cannot Connect to Server"
**Solution:**
- Verify `REACT_APP_API_URL` is set correctly
- Make sure it points to your actual backend URL
- Must be set BEFORE building (rebuild if you add it later)
- Check backend is running (visit /health endpoint)

### Issue 3: Build Fails
**Solution:**
- Check "Root Directory" is correct (`server` for backend, `client` for frontend)
- Verify build commands are correct
- Check logs for specific error messages

### Issue 4: "CORS Error" in Browser Console
**Solution:**
- Backend already has CORS configured
- Make sure you're using HTTPS URLs (not HTTP)
- Clear browser cache and try again

### Issue 5: Database Errors
**Solution:**
- SQLite works for testing but isn't great for production
- For production, consider upgrading to PostgreSQL:
  1. Create PostgreSQL database on Render
  2. Copy the "Internal Database URL"
  3. Update `DATABASE_URL` environment variable

---

## 🔄 Redeploying After Changes

### If You Make Code Changes:

**Option 1: Automatic (Recommended)**
- Push changes to GitHub
- Render will automatically rebuild and redeploy

**Option 2: Manual**
- Go to Render Dashboard
- Click on your service
- Click "Manual Deploy" → "Deploy latest commit"

### If You Change Environment Variables:
1. Go to service in Render Dashboard
2. Click "Environment" tab
3. Update the variable
4. Service will automatically redeploy

---

## 📝 Important Notes

1. **Free Tier Limitations:**
   - Free services spin down after 15 minutes of inactivity
   - First request after spin-down takes 30-60 seconds
   - Upgrade to paid tier for always-on services

2. **Security Notes:**
   - The provided secret keys are for deployment purposes
   - For a production app, generate your own secure random keys
   - Never commit `.env` files to GitHub

3. **Database:**
   - SQLite works but data is lost when service restarts
   - For persistent data, use PostgreSQL (available on Render)

4. **OAuth Setup:**
   - Google/Apple OAuth won't work without proper credentials
   - Get credentials from Google Cloud Console / Apple Developer
   - Add them to backend environment variables

---

## 🎉 Success Checklist

- [ ] Backend service created and deployed
- [ ] Backend URL copied and tested (`/health` returns `{"ok": true}`)
- [ ] Frontend service created with correct `REACT_APP_API_URL`
- [ ] Frontend deployed successfully
- [ ] Frontend URL opens and shows Mealy app
- [ ] Can register/login successfully
- [ ] Both URLs bookmarked for future reference

---

## 📞 Support

If you encounter issues:

1. Check Render logs first (click "Logs" in dashboard)
2. Review this guide's troubleshooting section
3. Verify all environment variables are set correctly
4. Check that Root Directory is correct for both services

---

## 🔗 Your Deployment URLs

After deployment, record your URLs here:

**Backend URL:** `_________________________________`

**Frontend URL:** `_________________________________`

---

**Deployment Date:** `_________________________________`

**Deployed By:** `_________________________________`

---


