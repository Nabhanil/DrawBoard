import { WebSocketServer } from "ws";
import {parse} from 'url'

const wss = new WebSocketServer({port:3002});


wss.on("connection",(ws, req)=>{
    const url = req.url;
    console.log(url)
    const query = parse(req.url!, true).query;
    const roomId = query.roomId
    console.log(roomId)
    if(!roomId){
        ws.send("RoomId not available")
        ws.close();
    }
    ws.on("message",(message)=>{
        ws.send(message.toString())
    })
    ws.on("close", (code, reason) => {
    console.log(`Client disconnected. Code: ${code}, Reason: ${reason}`);
  });
})
