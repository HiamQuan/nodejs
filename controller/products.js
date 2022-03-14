import mongoose from "mongoose";

const Products = mongoose.model('Product', { name: String, price: Number, desc: String });

const product = new Products({name:"San pham A",price: 200, desc: "Day la mo ta"});


// List products
export const list = async (req, res) => { 
    res.json(product);
}
export const read = (req, res) => {
    res.json(product.find(item => item.id === +req.params.id));
}

// API thêm sản phẩm
export const create = async (req, res) => {
    try {
        const product = await new Products(req.body).save();
        res.json(product)    
    } catch (error) {
        res.status(400).json({
            message: "Not allow to add"
        })
    }
}
export const remove = (req, res) => {
    res.json(product.filter(item => item.id !== +req.params.id));
}
export const update = (req, res) => {
    res.json(product.map(item => item.id == req.params.id ? req.body : item));
}