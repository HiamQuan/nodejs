import Order from "../model/order";

// API thêm sản phẩm
export const create = async (req, res) => {
    const userId = req.params;
    try {
        const order = await new Order(req.body).save();
        res.json(order)    
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được sản phẩm"
        })
    }
}
// API list sản phẩm
export const list = async (req, res) => { 
    try {
        const order = await Order.find({status:false})
        .populate("userId")
        .populate("productId")
        .populate("teacherId")
        .exec();
        res.json(order);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}
export const read = async (req, res) => {
    const filter = { _id: req.params.id}
    try {
        const order = await Order.findOne(filter);
        res.json(order);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}

export const remove = async (req, res) => {
    const condition = { _id: req.params.id}
    try {
        const order = await Order.findOneAndDelete(condition);
        res.json({
            message: "Đã xóa thành công",
            data: order
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
        const order = await Order.findOneAndUpdate(condition, doc, option);
        res.json(order);
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
        const order = await Order.find(category).sort({[sortBy]: orderBy});
        res.json(order);
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
        const result = Order.find({name: { $regex : searchString, $options:"si" }},(err,data)=>res.json(data));
    } catch (error) {
        res.status(400).json({
            message: " Có lỗi gì đó rồi",
        })
    }
}