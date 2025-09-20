import express, { Router } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

import { auth } from "../Middlewares/auth";
import { userSchema } from "@repo/backend-common/config";
import { JWT_SECRET } from "@repo/common/config";
import { prismaClient } from "@repo/db/client";

const userRouter: Router = Router();

userRouter.get('/', (req,res)=>{
    try {
        res.status(201).json({
        message: "/ route working fine"
    })
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong at the '/' route",
            error
        })
    }
})

userRouter.use(express.json())
userRouter.post('/signup', async (req,res)=>{
    try {
        const {firstname, lastname, email, username, password} = req.body;
        console.log("Incoming request body:", req.body)

        const {success, error} = userSchema.safeParse(req.body)
        if(!success){
            return res.status(403).json({
                message: "Invalid credentials",
                error
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const response =await prismaClient.user.create({
            data:{
                firstname,
                lastname,
                username,
                email,
                password: hashedPassword
            }
        })
        if(!response){
            return res.status(400).json({
                message: "User creation failed",
            })
        }

        return res.status(200).json({
            message: "User created successfully",
            user: {
                name: response.firstname + " " + response.lastname,
                email: response.email,
                username: response.username
            }
        })
 
        
    } catch (error) {
        return res.status(500).json({
            message: "Server failed at /signup",
            error
        })
    }
})

userRouter.post('/signin', async(req,res)=>{
   try {

    const userId = 1;
    const token = jwt.sign({
        userId
    }, JWT_SECRET)
    res.status(201).json({
            message: "Working signin",
            token
        })
   } catch (error) {
    return res.status(500).json({
            message: "Server failed at /signin",
            error
        })
   } 
})


userRouter.post('/create-room', auth, async(req,res)=>{
    try {
        //@ts-ignore
    const userId = req.userId;
    const roomId = "123123"
    res.status(201).json({
        message:"roomId created successfully",
        roomId
    })
    } catch (error) {
        return res.status(500).json({
            message:"RoomId creation failed",
            error
        })
    }
})




export default userRouter