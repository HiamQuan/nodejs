import product from "../model/product";

// API thêm sản phẩm
export const create = async (req, res) => {
    try {
        const products = await new product(req.body).save();
        res.json(products)    
    } catch (error) {
        res.status(400).json({
            message: "Không thêm được sản phẩm"
        })
    }
}
// API list sản phẩm
export const list = async (req, res) => { 
    try {
        const products = await product.find();
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}
export const read = async (req, res) => {
    const filter = { _id: req.params.id}
    try {
        const products = await product.findOne(filter);
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}

export const remove = async (req, res) => {
    const condition = { _id: req.params.id}
    try {
        const products = await product.findOneAndDelete(condition);
        res.json({
            message: "Đã xóa thành công",
            data: products
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
        const products = await product.findOneAndUpdate(condition, doc, option);
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}

export const listByCategory = async (req, res) => { 
    const category = {category:req.params.category}; 
    try {
        const products = await product.find(category);
        res.json(products);
    } catch (error) {
        res.status(400).json({
            message: "Lỗi không tìm được sản phẩm"
        })
    }
}

export const sort = async (req,res)=>{
    console.log(req.params);
    const products= await product.find().sort({[req.params.sort]:req.params.order});
    res.json(products);
}