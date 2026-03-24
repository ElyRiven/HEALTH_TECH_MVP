import express from "express";
import { PORT } from "./config.js";
import pacientsRouter from "./routes/pacients.routes.js";

const app = express();

app.use(express.json());

app.use(pacientsRouter)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


