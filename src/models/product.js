import mongoose, {Schema,ObjectId} from "mongoose";

const productSchema = new Schema({
    name:{
        type: String,
        required: true,
        minglength: 5,
        unique: true,
    },
    price:{
        type: String,
        required: true,
        min: 1,
    },
    category:{
        type: ObjectId,
        required: true,
    },
},{timestamps: true});

export default mongoose.model("productSchema",productSchema) ;