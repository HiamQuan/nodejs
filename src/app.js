import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import productRoute from '../routes/products';
import mongoose from "mongoose";
import authRoute from '../routes/auth';
import userRoute from '../routes/users';
import teacherRoute from '../routes/teacher';
import orderRoute from '../routes/order';


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

//connect database
mongoose.connect("mongodb://0.0.0.0:27017/ngongquan")
.then(() => console.log("Kết nối db thành công"))
.catch((error)=> console.log(error))




//connection
const PORT = 3001;
app.listen(PORT, () => {
    console.log("Server is running port", PORT);
})