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

export const listByCategoryAndSort = async (req, res) => { 
    const sortBy = req.query.sortBy ? req.query.sortBy : "price";
    const orderBy = req.query.orderBy ? req.query.orderBy : "asc";
    const category = {category:req.params.category}; 
    try {
        const products = await product.find(category).sort({[sortBy]: orderBy});
        console.log(products);
        res.json(products);
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
        const result = product.find({name: { $regex : searchString, $options:"si" }},(err,data)=>res.json(data));
    } catch (error) {
        res.status(400).json({
            message: " Có lỗi gì đó rồi",
        })
    }
}