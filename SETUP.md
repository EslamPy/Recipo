# Recipo Setup Guide

## Deployment Issue Resolution

Your application is showing an error page because it's missing required environment variables, particularly the `DATABASE_URL`.

## Quick Fix Steps:

### 1. Set Up Database
You need a PostgreSQL database. You can use:
- **Supabase** (free tier available)
- **Railway** (free tier available)
- **Neon** (free tier available)
- **Vercel Postgres** (if deploying on Vercel)

### 2. Get Database Connection String
After creating your database, get the connection string. It should look like:
```
postgresql://username:password@host:port/database
```

### 3. Set Environment Variables
In your deployment platform (Vercel, Netlify, etc.), add these environment variables:

#### Required:
- `DATABASE_URL` - Your PostgreSQL connection string

#### Optional (for full functionality):
- `GOOGLE_CLIENT_ID` - For Google OAuth login
- `GOOGLE_CLIENT_SECRET` - For Google OAuth login
- `EMAIL_HOST` - SMTP server (e.g., "smtp.gmail.com")
- `EMAIL_PORT` - SMTP port (e.g., "587")
- `EMAIL_SECURE` - "false" for TLS, "true" for SSL
- `EMAIL_USER` - Your email address
- `EMAIL_PASSWORD` - Your email password or app password
- `EMAIL_FROM` - From email address
- `EMAIL_FROM_NAME` - From name

### 4. Run Database Migrations
After setting up the database, you need to run migrations:

```bash
# Generate migrations (if needed)
npm run db:generate

# Push schema to database
npm run db:push

# Or run migrations
npm run db:migrate
```

### 5. Add Sample Data (Optional)
You can add sample data to test the application:

```bash
# Start the development server
npm run dev

# Visit http://localhost:3000/admin to add countries and recipes
```

## Environment Variables Reference

Copy the contents of `.env.example` and fill in your actual values:

```bash
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/recipo"

# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

# Email Configuration
EMAIL_HOST="smtp.gmail.com"
EMAIL_PORT="587"
EMAIL_SECURE="false"
EMAIL_USER="your-email@gmail.com"
EMAIL_PASSWORD="your-app-password"
EMAIL_FROM="noreply@recipo.com"
EMAIL_FROM_NAME="Recipo"
```

## Troubleshooting

1. **"DATABASE_URL not set"** - Add the DATABASE_URL environment variable
2. **"Connection refused"** - Check your database connection string
3. **"Table does not exist"** - Run database migrations
4. **"Authentication failed"** - Check database credentials

## Next Steps

1. Set up your database
2. Add the DATABASE_URL environment variable
3. Redeploy your application
4. The error should be resolved!

For more help, check the console logs in your deployment platform for specific error messages.