import dotenv from "dotenv";
import path from "path";

// Default env = development
const nodeEnv = process.env.NODE_ENV || "development";

// Load corresponding .env file (e.g., .env.development, .env.production)
dotenv.config({
  path: path.resolve(process.cwd(), `.env.${nodeEnv}`),
});

// Provide safe defaults
const { PORT = "8080", NODE_ENV = nodeEnv } = process.env;

export const Config = {
  PORT: Number(PORT),
  NODE_ENV,
};
