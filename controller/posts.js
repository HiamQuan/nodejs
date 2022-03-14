import mongoose from "mongoose";

const Post = mongoose.model("Post",{title: String, desc: String});

const posts = new Post();


// List post
export const list = (order,res) => {
    res.json();
}

export const read = (order,res) => {
    res.json(posts.find((item) => item.id=== order.params.id));
}

// API 