import {badreq, unauthorized} from "../error/main.js";
import User from "../model/user.js"
import CustomError from "../error/customError.js";
import bcrypt from "bcryptjs"
import Jwt from "jsonwebtoken";
import {} from "dotenv/config"
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body
        // if(!email || !password)
        // {
        //     throw new badreq("Please Provide Email and Password")
        // }
        
        const user = await User.findOne({email})

        if(!user)
        {
            throw new unauthorized("Invalid Credentials")
        }

        const isPasswordMatch = await user.compare(password)
        if(!isPasswordMatch)
        {
            throw new unauthorized("Invalid Credentials");
        }

        const token = user.createJWT()

        req.headers.authorization = `Bearer ${token}`

        res.cookie("token", token, { maxAge: 900000, httpOnly: true });
        
        res.status(200).json({user:{name: user.name}, token})

    } catch (error) {

        next(error)
    }
};


const register = async (req, res, next) => {
    try {
        const {name, password, email} = req.body
        // if(!name || !password || !email)
        // {
        //     throw new badreq("Provide Name, Password and Email")
        // }
        const user = await User.create({...req.body});

        const token = user.createJWT()

        res.status(201).json({token})

    }
    catch (error) 
    {
        next(error)
    };
};


export {
    login,
    register
};
