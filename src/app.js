import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import productsRoute from "./routes/product";


const app = new express();

// middewares
app.use(cors());
app.use(morgan('tiny'));
app.use(express.json());

// route
app.use("/api",productsRoute);


//connect db
mongoose.connect("mongodb://0.0.0.0:27017/ngongquan")
.then(()=>console.log("Kết nối thành công"))
.catch((error)=>console.log(error));



const PORT= 3001;

app.listen(PORT,() =>{
    console.log("Server is running",PORT);
})