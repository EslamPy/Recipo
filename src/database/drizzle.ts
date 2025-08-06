import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Handle build-time gracefully when database is not available
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl && process.env.NODE_ENV === 'production') {
  console.warn('DATABASE_URL not set in production environment');
}

// Use a placeholder connection for build-time if DATABASE_URL is not available
const connectionString = databaseUrl || 'postgresql://placeholder:placeholder@localhost:5432/placeholder';

export const client = postgres(connectionString, { 
  prepare: false,
  // Add connection timeout and error handling for build-time
  connect_timeout: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 30
});

export const db = drizzle(client);
