# Railway Database Setup - Luminous Love Project

## 🗄️ Database Connection Details

**Project:** luminous-love  
**Database:** railway  
**Host:** metro.proxy.rlwy.net:36066  
**User:** root  
**Password:** LgwFfAuAMYdaORDbALEpyqDWJfJrCWeB

## 🔗 Connection Strings

### For Netlify Environment Variables:
```
DATABASE_URL=mysql://root:LgwFfAuAMYdaORDbALEpyqDWJfJrCWeB@metro.proxy.rlwy.net:36066/railway
```

### For Local Development:
```
DB_HOST=metro.proxy.rlwy.net
DB_PORT=36066
DB_USER=root
DB_PASSWORD=LgwFfAuAMYdaORDbALEpyqDWJfJrCWeB
DB_NAME=railway
```

## 📋 Steps to Import Database Schema

### Step 1: Access Railway Dashboard
1. Go to [railway.app](https://railway.app)
2. Click on project "luminous-love"
3. Click on MySQL service

### Step 2: Import Schema
1. Go to "Query" tab
2. Copy the entire content from `PhoneBookSQL.sql`
3. Paste in the query editor
4. Click "Run"

### Step 3: Verify Import
Run this query to check tables:
```sql
SHOW TABLES;
```

Should show:
- contacts
- groups
- group_contact
- users

### Step 4: Test Data
Run this query to check data:
```sql
SELECT COUNT(*) as user_count FROM users;
```

Should return: 3 (existing users)

## ✅ Database Ready for Netlify

Once schema is imported, use this in Netlify:
```
DATABASE_URL=mysql://root:LgwFfAuAMYdaORDbALEpyqDWJfJrCWeB@metro.proxy.rlwy.net:36066/railway
SESSION_SECRET=phonebook-secret-2024
NODE_ENV=production
```
