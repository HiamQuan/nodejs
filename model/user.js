import mongoose,{Schema, ObjectId} from "mongoose";
import isEmail from "validator/lib/isEmail";

const userSchema = new Schema({
    email:{
        type: String,
        minlength: 5,
        unique: true,
        required: "Vui lòng điền email",
        validate: [isEmail,'Điền đúng định dạng email'],
    },
    password:{
        type: String,
        required: "Vui lòng điền email",
    },
    role:

});


export default mongoose.model("User",userSchema);
