import express from "express";
import userAuth from "../middlewares/userAuth.js";
import ArticleController from "../controllers/ArticleController.js";
import UserController from "../controllers/UserController.js";
const router = express.Router();


// To store and get articles
router.post("/users/:userId/articles",userAuth,ArticleController.addArticle);
router.get("/articles",userAuth,ArticleController.getArticle);


// To update user profile
router.patch("/users/:userId",userAuth,UserController.updateUser);




export default router;