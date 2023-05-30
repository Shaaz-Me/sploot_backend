import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        required: true,
        trim: true
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    }
});

const ArticleModel = mongoose.model("article",articleSchema);

export default ArticleModel;