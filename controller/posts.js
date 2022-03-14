import mongoose from "mongoose";

const Post = mongoose.model('post', { name: String, view: Number, desc: String });

const post = new Post({title:"San pham A",view: 20, desc: "Day la mo ta"});


// List posts
export const list = async (req, res) => { 
    res.json(post);
}
export const read = (req, res) => {
    res.json(post.find(item => item.id === +req.params.id));
}

// API thêm sản phẩm
export const create = async (req, res) => {
    try {
        const post = await new posts(req.body).save();
        res.json(post)    
    } catch (error) {
        res.status(400).json({
            message: "Not allow to add"
        })
    }
}
export const remove = (req, res) => {
    res.json(post.filter(item => item.id !== +req.params.id));
}
export const update = (req, res) => {
    res.json(post.map(item => item.id == req.params.id ? req.body : item));
}