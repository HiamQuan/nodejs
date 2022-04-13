import mongoose from "mongoose";
import { Schema } from "mongoose";


const { ObjectId } = mongoose.Schema;

const orderSchema = new Schema({
    userId: {
        type: ObjectId,
        ref:"User"
    },
    productId:{
        type: ObjectId,
        ref: "Product"
    },
    teacherId:{
        type:ObjectId,
        ref:"Teacher"
    },
    time:{
        type:Date,
    },
    schedule:{
        day:{
            type:String,
        },
        hour:{
            type:String,
        }
    },
    status:{
        type: Boolean,
        default: false
    },
    
},{ timestamps : true});



export default mongoose.model("Order", orderSchema);