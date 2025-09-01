import dotenv from "dotenv";

// Load env file depending on NODE_ENV
dotenv.config({
  path: `.env.${process.env.NODE_ENV || "dev"}`,
});

const { PORT = "8080", NODE_ENV = "dev" } = process.env;

export const Config = {
  PORT,
  NODE_ENV,
};
