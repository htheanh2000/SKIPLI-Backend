import express from "express";
import dotenv from "dotenv";
import cors from 'cors';
import  authRoutes from "./routes/auth";

// Load environment variables from .env file
dotenv.config();

const app = express();

app.use(cors({
    origin: '*'
  }));
app.use(express.json());

// Use the auth routes
app.use("/auth", authRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


