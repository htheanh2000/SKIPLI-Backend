const express = require("express");
const dotenv = require("dotenv");
import  authRoutes from "./routes/auth";

// Load environment variables from .env file
dotenv.config();

const app = express();
app.use(express.json());

// Use the auth routes
app.use("/auth", authRoutes);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));


