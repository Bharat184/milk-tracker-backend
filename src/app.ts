import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import sessionRoutes from "./routes/sessionRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/sessions", sessionRoutes);

app.use("/", (req: Request, res: Response) => {
    res.end('Page Not Found');
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
