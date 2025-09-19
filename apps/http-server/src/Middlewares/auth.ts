import { JWT_SECRET } from "@repo/common";
import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'

export const auth = (req: Request, res: Response, next: NextFunction)=>{
    try {
        const token = req.headers.authorization;
        if(typeof token == "undefined"){
            return
        }
        const decodedToken = jwt.verify(token, JWT_SECRET)
        console.log(decodedToken)
        if(!decodedToken){
            return res.status(404).json({
                message: "User is not authenticated"
            })
        }
        //@ts-ignore
        req.userId = (decodedToken as JwtPayload).userId;
        next()
    } catch (error) {
        return res.status(403).json({
            message: "User is not authenticated"
        })
    }
}