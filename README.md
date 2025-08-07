# Phone Book Application

A full-stack phone book application built with React frontend and Node.js backend.

## Features

- ✅ User authentication (login/signup)
- ✅ Contact management (add, edit, delete)
- ✅ Group management
- ✅ Image upload for contacts
- ✅ Search functionality
- ✅ Responsive design

## Tech Stack

- **Frontend:** React, Vite, CSS Modules
- **Backend:** Node.js, Express, MySQL
- **Database:** MySQL
- **Deployment:** Netlify (Frontend), Railway (Backend + Database)

## Project Structure

```
├── FE/                 # React frontend
│   ├── src/
│   ├── package.json
│   └── vite.config.js
├── BE/                 # Node.js backend
│   ├── Router/
│   ├── server.js
│   └── package.json
└── PhoneBookSQL.sql    # Database schema
```

## Deployment

- **Frontend:** Deployed on Netlify
- **Backend:** Deployed on Railway
- **Database:** MySQL on Railway

## Environment Variables

### Backend (Railway)
```
MYSQL_URL=${{ MySQL.MYSQL_URL }}
NODE_ENV=production
SESSION_SECRET=your-secret-key
```

### Frontend (Netlify)
```
VITE_API_BASE_URL=https://your-backend-url.railway.app
```

## Course Requirements

- ✅ React application
- ✅ 7+ screens/pages
- ✅ Web API with database
- ✅ 3+ plugins/features (react-toastify, multer, react-select)
- ✅ Professional design
- ✅ Deployed and accessible