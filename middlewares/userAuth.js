import dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";

const userAuth = async (req,res,next) =>{
    try {
        const {authorization} = req.headers;   
        if(authorization && authorization.startsWith('Bearer')) {
            const token = authorization.split(' ')[1];
            const { userId } = jwt.verify(token,process.env.JWT_SECRET_KEY);
            if(!req.params.userId || userId === req.params.userId){
                req.userId = userId;
                next();
            }
            else{
                res.status(401).send({statusCode: 401, status: "failed", message: "Invalid url parameter"});
            }
        }
        else{
            res.status(401).send({statusCode: 401, status: "failed", message: "Unauthorized User"});
        }
    } catch (error) {
        res.status(500).send({statusCode: 500, status: "failed", error: error, message: error.message});
    }
}

export default userAuth;