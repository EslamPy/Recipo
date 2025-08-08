# Deployment Guide for Recipo

## The Issue

Your application is showing a "Something went wrong!" error because essential environment variables are missing. The application requires several environment variables to function properly.

## Required Environment Variables

Create a `.env` file (or set environment variables in your deployment platform) with the following values:

### 1. Database Configuration
```bash
DATABASE_URL="postgresql://username:password@host:port/database_name"
```
**This is REQUIRED** - Your application needs a PostgreSQL database to store recipes, users, and other data.

### 2. Authentication Secret
```bash
BETTER_AUTH_SECRET="your-secure-random-secret-here"
```
**This is REQUIRED** - Generate a secure random string (at least 32 characters) for session encryption.

You can generate one using:
```bash
openssl rand -base64 32
```

### 3. Google OAuth (Optional)
```bash
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```
**Optional** - Only needed if you want Google login functionality.

### 4. Email Configuration (Optional)
```bash
SMTP_HOST="your-smtp-host"
SMTP_PORT="587"
SMTP_USER="your-smtp-username"
SMTP_PASS="your-smtp-password"
FROM_EMAIL="noreply@yourdomain.com"
```
**Optional** - Only needed for email verification during user registration.

## Deployment Steps

### For Vercel:
1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the required environment variables above
5. Redeploy your application

### For Railway:
1. Go to your Railway dashboard
2. Select your project
3. Go to Variables tab
4. Add the required environment variables above
5. Redeploy your application

### For Other Platforms:
1. Set the environment variables in your deployment platform
2. Ensure you have a PostgreSQL database provisioned
3. Run database migrations if needed
4. Redeploy the application

## Database Setup

If you don't have a database yet, you can use:

- **Vercel Postgres** (if using Vercel)
- **Railway PostgreSQL** (if using Railway)
- **Supabase** (free tier available)
- **PlanetScale** (MySQL alternative)
- **Neon** (serverless PostgreSQL)

After setting up your database, make sure to:
1. Set the `DATABASE_URL` environment variable
2. Run database migrations (if your platform supports it)

## Quick Fix

**Minimum required environment variables to get your app working:**

```bash
DATABASE_URL="your_postgresql_connection_string"
BETTER_AUTH_SECRET="$(openssl rand -base64 32)"
```

Set these two environment variables in your deployment platform and redeploy. Your application should work without the "Something went wrong!" error.

## Verification

After setting the environment variables and redeploying:

1. Visit your application URL
2. You should see the homepage instead of the error
3. Check the deployment logs for any remaining issues
4. Test basic functionality like viewing recipes

## Troubleshooting

If you're still seeing errors:

1. Check your deployment platform logs
2. Verify the `DATABASE_URL` is correct and the database is accessible
3. Ensure the `BETTER_AUTH_SECRET` is set and at least 32 characters
4. Check that your database has the required tables (you may need to run migrations)

## Support

If you continue to have issues, check:
- Your deployment platform's documentation
- Database connection troubleshooting guides
- Application logs for specific error messages