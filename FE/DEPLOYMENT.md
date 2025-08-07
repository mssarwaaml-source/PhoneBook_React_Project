# Deployment Guide for Phone Book App

## Prerequisites

- Your backend API deployed and accessible via HTTPS
- Git repository with your code

## Step 1: Update API URLs for Production

Before deploying, you need to update the API base URL in your code to point to your deployed backend.

### Option A: Using Environment Variables (Recommended)

1. Create a `.env.production` file in the FE directory:

```
VITE_API_BASE_URL=https://your-backend-url.com
```

2. Replace `https://your-backend-url.com` with your actual deployed backend URL.

### Option B: Manual Update

If you prefer to update manually, replace all instances of `http://localhost:5000` in your code with your deployed backend URL.

## Step 2: Deploy to Netlify

### Method 1: Deploy via Netlify UI (Recommended)

1. **Go to [Netlify](https://netlify.com)** and sign up/login
2. **Click "New site from Git"**
3. **Connect your Git repository** (GitHub, GitLab, or Bitbucket)
4. **Select your repository**
5. **Configure build settings:**
   - **Base directory:** `FE` (if your frontend is in a subdirectory)
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
6. **Click "Deploy site"**

### Method 2: Deploy via Netlify CLI

1. **Install Netlify CLI:**

   ```bash
   npm install -g netlify-cli
   ```

2. **Navigate to your frontend directory:**

   ```bash
   cd FE
   ```

3. **Build your project:**

   ```bash
   npm run build
   ```

4. **Deploy to Netlify:**
   ```bash
   netlify deploy --prod --dir=dist
   ```

## Step 3: Configure Environment Variables in Netlify

1. **Go to your Netlify dashboard**
2. **Navigate to Site settings > Environment variables**
3. **Add the following variable:**
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://your-backend-url.com`
4. **Redeploy your site**

## Step 4: Test Your Deployment

1. **Visit your Netlify URL**
2. **Test all functionality:**
   - Login/Signup
   - Add/Edit/Delete contacts
   - Group management
   - Image uploads

## Troubleshooting

### Common Issues:

1. **CORS Errors:** Ensure your backend allows requests from your Netlify domain
2. **API Connection Issues:** Verify your backend URL is correct and accessible
3. **Build Failures:** Check that all dependencies are properly installed

### Backend CORS Configuration:

Make sure your backend allows requests from your Netlify domain:

```javascript
// In your backend CORS configuration
app.use(
  cors({
    origin: ["https://your-netlify-app.netlify.app", "http://localhost:3000"],
    credentials: true,
  })
);
```

## Important Notes

- **HTTPS Required:** Netlify serves over HTTPS, so your backend must also support HTTPS
- **Environment Variables:** Use `VITE_` prefix for variables accessible in the frontend
- **Build Process:** Netlify will automatically run `npm run build` during deployment
- **Custom Domain:** You can add a custom domain in Netlify settings

## Next Steps

After successful deployment:

1. **Test all features thoroughly**
2. **Update your course submission with the Netlify URL**
3. **Document any issues or improvements needed**
