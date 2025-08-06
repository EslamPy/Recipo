import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// Handle build-time gracefully when database is not available
const databaseUrl = process.env.DATABASE_URL;

// During build or when DATABASE_URL is missing, use a placeholder that won't actually connect
const connectionString = databaseUrl || 'postgresql://user:pass@localhost:5432/db';

let client: ReturnType<typeof postgres>;
let db: ReturnType<typeof drizzle>;

try {
  const options = databaseUrl ? {
    prepare: false,
    connect_timeout: 10,
    idle_timeout: 20,
    max_lifetime: 60 * 30
  } : {
    // Build-time options that prevent actual connection
    prepare: false,
    connection: {
      host: 'localhost',
      port: 5432,
      database: 'placeholder',
      username: 'placeholder',
      password: 'placeholder'
    },
    transform: {
      undefined: null
    }
  };

  client = postgres(connectionString, options);
  db = drizzle(client);

  // Log appropriate messages
  if (!databaseUrl) {
    if (process.env.NODE_ENV === 'production') {
      console.warn('DATABASE_URL not set in production - some features may not work');
    } else {
      console.warn('DATABASE_URL not set - using placeholder connection for development/build');
    }
  }
} catch (error) {
  console.error('Failed to initialize database connection:', error);
  
  // Create a fallback connection
  const fallbackClient = postgres('postgresql://localhost:5432/fallback');
  db = drizzle(fallbackClient);
}

export { client, db };
