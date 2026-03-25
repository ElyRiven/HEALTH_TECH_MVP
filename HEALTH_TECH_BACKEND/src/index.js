import express from "express";
import { PORT } from "./config.js";
import pacientsRouter from "./routes/pacients.routes.js";
import cors from "cors";

const app = express();

app.use(express.json());

const allowedOrigins = (process.env.CORS_ORIGIN || "http://localhost:5173").split(",");

app.use(cors({
  origin(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));

app.use(pacientsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


