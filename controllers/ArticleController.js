import ArticleModel from "../models/article.js";


class ArticleController {

    static addArticle = async (req,res) => {
        try {
            const userId = req.userId;
            const { title, description } = req.body;
            if( title , description ) {
                const newArticle = new ArticleModel({
                    title,
                    description,
                    createdBy: userId
                });
                await newArticle.save();
                res.status(201).send({statusCode: 201, status: "Success", message: "Article added"});
            }
            else {
                res.status(406).send({statusCode: 406, status: "failed", message: "All fields are required"});
            }
        } catch (error) {
            res.status(500).send({statusCode: 500, status: "failed", error: error, message: error.message});
        }
    }
    
    static getArticle = async (req,res) => {
        try {
            const userId = req.userId;
            const article = await ArticleModel.find({createdBy: userId}).populate({path:"createdBy", select: "name age email -_id"});
            res.status(200).send({statusCode: 200, status: "Success", data: article, message: "Articles fetched"});
        } catch (error) {
            res.status(500).send({statusCode: 500, status: "failed", error: error, message: error.message});
        }
    }

}

export default ArticleController;