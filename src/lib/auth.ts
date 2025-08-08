import { betterAuth } from "better-auth";
import { db } from "@/database/drizzle";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin, emailOTP } from "better-auth/plugins";
import * as schema from "@/database/schema";
import { sendEmail, generateOTPEmailTemplate } from "./email";

// Generate a secure secret if none is provided (for development only)
const getAuthSecret = () => {
  if (process.env.BETTER_AUTH_SECRET) {
    return process.env.BETTER_AUTH_SECRET;
  }
  
  // Don't fail during build time - only warn in production runtime
  if (process.env.NODE_ENV === 'production' && !process.env.VERCEL_ENV) {
    console.warn('BETTER_AUTH_SECRET not set in production - using default secret. This is NOT secure!');
  } else {
    console.warn('BETTER_AUTH_SECRET not set - using default secret for development. Set BETTER_AUTH_SECRET in production!');
  }
  
  // Generate a consistent but insecure secret for build time
  return 'build-time-secret-change-in-production-' + Math.random().toString(36).substring(2);
};

// Check if Google OAuth is configured
const isGoogleConfigured = () => {
  return !!(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET);
};

// Base auth configuration
const baseAuthConfig = {
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  secret: getAuthSecret(),
  plugins: [
    nextCookies(),
    emailOTP({
      async sendVerificationOTP({ otp, email }) {
        console.log("Sending OTP code", otp, "to email", email);
        
        try {
          const emailTemplate = generateOTPEmailTemplate(otp);
          
          await sendEmail({
            to: email,
            subject: "Your Recipo Verification Code",
            html: emailTemplate,
          });
          
          console.log("Verification email sent successfully");
        } catch (error) {
          console.error("Failed to send verification email:", error);
          throw error;
        }
      },
    }),
    admin(),
  ],
  user: {
    additionalFields: {
      role: {
        type: "string" as const,
        required: false,
        defaultValue: "user",
        input: false, // don't allow user to set role
      },
    },
  },
};

// Create the final auth config with optional social providers
const createAuthConfig = () => {
  if (isGoogleConfigured()) {
    return {
      ...baseAuthConfig,
      socialProviders: {
        google: {
          clientId: process.env.GOOGLE_CLIENT_ID!,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
      },
    };
  } else {
    console.warn('Google OAuth not configured - Google login will not be available. Set GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to enable Google authentication.');
    return baseAuthConfig;
  }
};

export const auth = betterAuth(createAuthConfig());
