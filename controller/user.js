import Users from "../model/user";

// API thêm sản phẩm
export const create = async (req, res) => {
    try {
        const users = await new Users(req.body).save();
        res.json(users)    
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được sản phẩm"
        })
    }
}
// API list sản phẩm
export const list = async (req, res) => { 
    try {
        const users = await Users.find();
        res.json(users);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}
export const read = async (req, res) => {
    const filter = { _id: req.params.id}
    try {
        const users = await Users.findOne(filter);
        res.json(users);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}

export const remove = async (req, res) => {
    const condition = { _id: req.params.id}
    try {
        const users = await Users.findOneAndDelete(condition);
        res.json({
            message: "Đã xóa thành công",
            data: users
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
        const users = await Users.findOneAndUpdate(condition, doc, option);
        res.json(users);
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
        const result = Users.find({name: { $regex : new RegExp(searchString)}},(err,data)=>res.json(data));
    } catch (error) {
        res.status(400).json({
            message: " Có lỗi gì đó rồi",
        })
    }
}


export const userById = async (req, res, next, id) => {
    try {
        const user = await Users.findById(id).exec();
        if(!user){
            res.status(400).json({
                message: "Không tìm thấy user"
            })
        }
        req.profile = user;
        next();
    } catch (error) {
        
    }
}