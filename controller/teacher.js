import Teacher from "../model/teacher";

// API thêm sản phẩm
export const create = async (req, res) => {
    const { email, name, password} = req.body
  
    try {
        const existUser = await Teacher.findOne({email}).exec();
        if(existUser){
            res.json({
                message: "Email đã tồn tại"
            })
        };
        const teacher = await new Teacher({email, name, password}).save();
        res.json({
            teacher: {
                _id: teacher._id,
                email: teacher.email,
                name: teacher.name,
                password: teacher.password,
            }
        })
    } catch (error) {
        
    }
}
// API list sản phẩm
export const list = async (req, res) => { 
    try {
        const teacher = await Teacher.find();
        res.json(teacher);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}
export const read = async (req, res) => {
    const filter = { _id: req.params.id}
    try {
        const teacher = await Teacher.findOne(filter);
        res.json(teacher);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}

export const remove = async (req, res) => {
    const condition = { _id: req.params.id}
    try {
        const teacher = await Teacher.findOneAndDelete(condition);
        res.json({
            message: "Đã xóa thành công",
            data: teacher
        });
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}
export const update = async (req, res) => {
    const condition = { _id: req.params.id};
    const doc = req.body;
    const option = { new: true};
    try {
        const teacher = await Teacher.findOneAndUpdate(condition, doc, option);
        res.json(teacher);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}

export const listByCategoryAndSort = async (req, res) => { 
    const sortBy = req.query.sortBy ? req.query.sortBy : "";
    const orderBy = req.query.orderBy ? req.query.orderBy : "";
    const category = {category:req.params.category}; 
    try {
        const teacher = await Teacher.find(category).sort({[sortBy]: orderBy});
        res.json(teacher);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}


export const search = async (req,res) => {
    // POST /search?q=inputtext
    const searchString = req.query.searchText ? req.query.searchText : "";
    console.log(searchString);
    try {
        const result = Teacher.find({name: { $regex : searchString, $options:"si" }},(err,data)=>res.json(data));
    } catch (error) {
        res.status(400).json({
            message: " Có lỗi gì đó rồi",
        })
    }
}