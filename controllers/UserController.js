import validator from 'validator';
import UserModel from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class UserController {

    static signup = async(req,res) => {
        const { email, password, name, age } = req.body;
        try {
            if(email && password && name && age) {
                if(!validator.isEmail(email)){
                    res.status(406).send({statusCode: 406, status: "failed", message: "Enter a valid email"});
                }
                else{
                    const salt = await bcrypt.genSalt(10);
                    const hashPassword = await bcrypt.hash(password, salt);
                    const newUser = new UserModel({
                        email,
                        name,
                        age,
                        password: hashPassword
                    });
                    await newUser.save();
    
                    res.status(201).send({
                        statusCode: 201,
                        status: "Success",
                        message: "Successfully Registered"
                    });
                }
            }
            else {
                res.status(406).send({
                    statusCode: 406,
                    status: "failed",
                    message: "All fields are required"
                });
            }
        } catch (error) {
            res.status(500).send({statusCode: 500, status: "failed", error: error, message: error.message});
        }
    }


    static login = async (req,res) => {
        const { email, password } = req.body;
        try {
            if(validator.isEmail(email)){
                const user = await UserModel.findOne({email: email});
                if(user != null) {
                    const isMatch = await bcrypt.compare(password, user.password);
                    if(user.email === email && isMatch) {
                        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '2h' });
                        res.status(200).send({
                            statusCode: 200,
                            status: "Success",
                            data: {
                                userId: user._id,
                                name: user.name,
                                email: user.email,
                                age: user.age
                            },
                            token: token,
                            message: "Login Successful"
                        });
                    }
                    else{
                        res.send(405).send({statusCode: 405, status: "failed", message: "Email or Password is not valid"});
                    }
                }
                else {
                    res.status(405).send({statusCode: 405, status: "failed", message: "You are not registered user"});
                }
            }
            else {
                res.status(406).send({statusCode: 406, status: "failed", message: "Enter a valid email"});
            }
        } catch (error) {
            res.status(500).send({statusCode: 500, status: "failed", error: error, message: error.message});
        }
    }
    
    
    
    static updateUser = async (req,res) => {
        try {
            const { name , age } = req.body;
            const userId = req.userId;
            if(name && age) {
                await UserModel.findByIdAndUpdate({_id: userId}, {$set : { name: name, age: age}});
                res.status(202).send({statusCode: 202, status: "Success", message: "Fields has been updated"});
            }
            else if(name) {
                await UserModel.findByIdAndUpdate({_id: userId}, {$set : { name: name}});
                res.status(202).send({statusCode: 202, status: "Success", message: "Field has been updated"});
            }
            else if(age) {
                await UserModel.findByIdAndUpdate({_id: userId}, {$set : {age: age}});
                res.status(202).send({statusCode: 202, status: "Success", message: "Field has been updated"});
            }
            else{
                res.status(406).send({statusCode: 406, status: "failed", message: "All fields are required"});
            }
        } catch (error) {
            res.status(500).send({statusCode: 500, status: "failed", error: error, message: error.message});
        }
    }

}

export default UserController;