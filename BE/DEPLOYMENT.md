# Backend Deployment Guide

## Prerequisites

- GitHub repository with your code
- Database (MySQL) - can be local or cloud-based
- Node.js knowledge

## Option 1: Railway (Recommended - Easiest)

### Step 1: Prepare Your Code

1. **Update your database connection** to use environment variables
2. **Ensure all dependencies** are in package.json
3. **Test locally** with `npm start`

### Step 2: Deploy to Railway

1. **Go to [railway.app](https://railway.app)** and sign up with GitHub
2. **Click "New Project"** → "Deploy from GitHub repo"
3. **Select your repository**
4. **Configure environment variables:**
   - `PORT` = (auto-set by Railway)
   - `NODE_ENV` = `production`
   - `SESSION_SECRET` = `your-secret-key`
   - Database connection variables (see below)

### Step 3: Set Up Database

1. **Add MySQL service** in Railway dashboard
2. **Get connection details** from Railway
3. **Set environment variables:**
   ```
   DB_HOST=your-railway-mysql-host
   DB_USER=your-railway-mysql-user
   DB_PASSWORD=your-railway-mysql-password
   DB_NAME=your-railway-mysql-database
   ```

### Step 4: Deploy

1. **Railway will auto-deploy** when you push to GitHub
2. **Get your backend URL** from Railway dashboard
3. **Test the health endpoint:** `https://your-app.railway.app/health`

## Option 2: Render (Free Alternative)

### Step 1: Deploy to Render

1. **Go to [render.com](https://render.com)** and sign up
2. **Click "New"** → "Web Service"
3. **Connect your GitHub repository**
4. **Configure:**
   - **Name:** `phonebook-backend`
   - **Environment:** `Node`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Plan:** Free

### Step 2: Set Environment Variables

1. **Go to Environment tab**
2. **Add variables:**
   ```
   NODE_ENV=production
   SESSION_SECRET=your-secret-key
   DB_HOST=your-database-host
   DB_USER=your-database-user
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   ```

## Option 3: Vercel (Fast & Free)

### Step 1: Deploy to Vercel

1. **Go to [vercel.com](https://vercel.com)** and sign up
2. **Import your GitHub repository**
3. **Configure:**
   - **Framework Preset:** Node.js
   - **Root Directory:** `BE`
   - **Build Command:** `npm install`
   - **Output Directory:** (leave empty)
   - **Install Command:** `npm install`

### Step 2: Set Environment Variables

1. **Go to Project Settings** → Environment Variables
2. **Add your variables** (same as above)

## Database Options

### Option A: Railway MySQL (Easiest)

- **Free tier:** 1GB storage
- **Auto-configured** with Railway
- **No setup required**

### Option B: PlanetScale (Free MySQL)

1. **Go to [planetscale.com](https://planetscale.com)**
2. **Create free account**
3. **Create new database**
4. **Get connection string**
5. **Import your SQL schema**

### Option C: Supabase (PostgreSQL)

1. **Go to [supabase.com](https://supabase.com)**
2. **Create free project**
3. **Use PostgreSQL instead of MySQL**
4. **Update your code accordingly**

## Environment Variables Setup

### Required Variables:

```bash
# Server Configuration
PORT=5000
NODE_ENV=production
SESSION_SECRET=your-super-secret-key-here

# Database Configuration
DB_HOST=your-database-host
DB_USER=your-database-user
DB_PASSWORD=your-database-password
DB_NAME=your-database-name
DB_PORT=3306

# CORS Origins (comma-separated)
ALLOWED_ORIGINS=https://your-netlify-app.netlify.app,http://localhost:3000
```

## Update Database Connection

You'll need to update your `dbSingleton.js` to use environment variables:

```javascript
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "phonebook",
  port: process.env.DB_PORT || 3306,
});

module.exports = connection;
```

## Testing Your Deployment

1. **Health Check:** `GET https://your-backend-url.com/health`
2. **Should return:** `{"status":"OK","message":"Server is running"}`

## Troubleshooting

### Common Issues:

1. **CORS Errors:** Update allowed origins in server.js
2. **Database Connection:** Check environment variables
3. **Port Issues:** Ensure PORT is set correctly
4. **Session Issues:** Set SESSION_SECRET environment variable

### Debug Steps:

1. **Check deployment logs** in your hosting platform
2. **Test endpoints** with Postman or curl
3. **Verify environment variables** are set correctly
4. **Check database connectivity**

## Next Steps

After successful deployment:

1. **Get your backend URL**
2. **Update frontend API configuration**
3. **Test all endpoints**
4. **Deploy frontend to Netlify**
5. **Update CORS origins** with your Netlify URL
