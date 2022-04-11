import mongoose from "mongoose";
import { Schema } from "mongoose";
import{ createHmac } from "crypto"



const teacherSchema = new Schema({
    name:{
        type: String,
        minlength:[5,"Tên quá ngắn"]
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0
    },
    img:{
        type:String
    },
    experience:{
        type: String,
    },
    available:{
        type: String
    }
    
},{ timestamps : true});

teacherSchema.methods = {
    authenticate(password){ //123456
        return this.password == this.encrytPassword(password);
    },
    encrytPassword(password){
        
        if(!password) return 
        try {
            return createHmac("sha256", "abcs").update(password).digest("hex");
        } catch (error) {
            console.log(error)
        }
    }
}
// trước khi execute .save() thì chạy middleware sau.
teacherSchema.pre("save", function(next){
    this.password = this.encrytPassword(this.password);
    next();
})



export default mongoose.model("Teacher", teacherSchema);