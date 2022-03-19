import Product from "../models/product";


// API gọi list sản phẩm

export const list = async (req,res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }
    catch(error){
        res.status(404).json({
            message:"Lỗi ko kết nối được"
        });
    }
}