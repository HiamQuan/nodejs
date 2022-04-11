import mongoose from "mongoose";
import { Schema } from "mongoose";


const productSchema = new Schema({
    name: {
        type:String,
        minlength: 5,
    },
    price: {
       type: Number,
       min: 0
    },
    category:{
        type:String,
        required:true,
    },
    img:{
        type: String
    },
    desc:{
        type: String,
        required:true
    }
    
});



export default mongoose.model("Product", productSchema);

