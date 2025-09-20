import { WebSocketServer } from "ws";
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "@repo/common/config";

const wss = new WebSocketServer({port:3002});


wss.on("connection",(ws, req)=>{
    
    const url = req.url;
    const query = new URLSearchParams(url?.split('?')[1])
    const token = query.get("token") || ""
    const decodedToken = jwt.verify(token, JWT_SECRET)
    if(!decodedToken){
        ws.close();
        return;
    }
    ws.on("message",(message)=>{
        ws.send(message.toString())
    })
    ws.on("close", (code, reason) => {
    console.log(`Client disconnected. Code: ${code}, Reason: ${reason}`);
  });
})
