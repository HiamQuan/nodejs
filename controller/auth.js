import User from "../model/user";
import jwt from 'jsonwebtoken';
import Teacher from "../model/teacher";


export const signup = async (req, res) => {
    const { email, name, password} = req.body
    try {
        const existUser = await User.findOne({email}).exec();
        if(existUser){
            return res.json({
                message: "Email đã tồn tại"
            })
        };
        const user = await new User({email, name, password}).save();
        return res.json({
            user: {
                _id: user._id,
                email: user.email,
                name: user.name
            }
        })
    } catch (error) {
        
    }
}
export const signin = async (req, res) => {
    const { email, password} = req.body;
    try {
        const user = await User.findOne({email}).exec();
        const teacher = await Teacher.findOne({email}).exec();
        console.log(teacher);
        if(!user && !teacher){
            return res.status(400).json({
                message: "email không tồn tại"
            })
        }
        if(user){
            if(!user.authenticate(password)){
                return res.status(400).json({
                    message: "Sai mật khẩu"
                })
            }
            const token = jwt.sign({_id: user._id }, "123456", { expiresIn: 60 * 360})

            return res.json({
                token,
                user: {
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    role: user.role 
                }
            })
        }
        if(teacher)
        {
            if(!teacher.authenticate(password)){
                return res.status(400).json({
                    message: "Sai mật khẩu"
                })
            }
            const token = jwt.sign({_id: teacher._id }, "123456", { expiresIn: 60 * 360})

            return res.json({
                token,
                user: {
                    _id: teacher._id,
                    email: teacher.email,
                    name: teacher.name,
                    role: teacher.role,
                }
            })
        }
    


    } catch (error) {
        res.status(400).json({
            message:"Không tìm thấy user"
        })
    }
}

