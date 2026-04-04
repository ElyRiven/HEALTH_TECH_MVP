import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const dbConfig = {
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  password: String(process.env.DB_PASSWORD),
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT || "5432", 10),
};

console.log("Current STAGE:", process.env.STAGE);

if (process.env.STAGE === "production") {
  dbConfig.ssl = {
    rejectUnauthorized: false,
  };
}

export const pool = new Pool(dbConfig);
