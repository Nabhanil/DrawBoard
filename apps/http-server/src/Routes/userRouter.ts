import { Router } from "express";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../config";
import { auth } from "../Middlewares/auth";

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

userRouter.post('/signup', async (req,res)=>{
    try {
        res.status(201).json({
            message: "Working signup"
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