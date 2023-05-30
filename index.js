import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import apiRoutes from "./routes/registrationRoutes.js";
import connectDb from "./config/connectDb.js";

const app = express();

// apply cors policy for react app
app.use(cors());

const port = process.env.PORT || 8000;
const DATABASE_URL = process.env.DATABASE_URL;
const DATABASE_NAME = process.env.DATABASE_NAME;

// Database connection
connectDb(DATABASE_URL,DATABASE_NAME);

// JSON
app.use(express.json());

app.use("/api",apiRoutes);




app.listen(port,()=>{console.log(`Server is running on port ${port}`);});