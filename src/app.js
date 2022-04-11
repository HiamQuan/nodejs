import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoute from '../routes/products';
import mongoose from "mongoose";
import authRoute from '../routes/auth';
import userRoute from '../routes/users';
import teacherRoute from '../routes/teacher';
import orderRoute from '../routes/order';
import { Server } from 'socket.io';


const app = express();

// middleware
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json())


//route
app.use("/api",productRoute);
app.use("/api",authRoute);
app.use("/api",userRoute);
app.use("/api",orderRoute);
app.use("/api",teacherRoute);


//socket io
const io = new Server({ 
    cors:{
        origin: "http://localhost:3000"
    }
 });

 let onlineUsers = [];

 const addUsers = (username,socketId) =>{
     !onlineUsers.some(user=>user.username === username) && onlineUsers.push({username,socketId});
 }

 const removeUsers = (socketId) =>{
     onlineUsers = onlineUsers.filter(user => user.socketId !== socketId);
 }

 const getUsers = (username) =>{
     return onlineUsers.find(user=>user.username === username);
 }

io.on("connection", (socket) => {
    console.log("Connected on port 3002");
    
    socket.on("newUser", (username) =>{
        addUsers(username,socket.id);
    })

    socket.on("sendNotification",async ({senderName,receiverName,type})=>{
        const receiver = getUsers(receiverName)
        await io.emit("getNotification",{
            senderName: senderName,
            type,
        })
    })

    socket.on("disconnect",()=>{
        console.log("Disconnected");
        removeUsers(socket.id);
    })
});

io.listen(3002);

//connect database
mongoose.connect("mongodb://0.0.0.0:27017/ngongquan")
.then(() => console.log("Kết nối db thành công"))
.catch((error)=> console.log(error))




//connection
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server is running port", PORT);
})