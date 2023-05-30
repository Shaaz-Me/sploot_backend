import express from "express";
import userRoutes from "./userRoutes.js";
import UserController from "../controllers/UserController.js";
const router = express.Router();


// For Signup and Login
router.post("/signup",UserController.signup);
router.post("/login",UserController.login);

// Protected routes
// For update user profile, add and get articles
router.use("/",userRoutes);



export default router;