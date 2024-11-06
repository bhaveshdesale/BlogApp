//  // import mongoose
//  const mongoose=require('mongoose');


//  //route handler using schema
//  const commentSchema=new mongoose.Schema({
//     post:{
//         //whenever you want to refer one model for another model then refer it by id
//         //below code is for reffering id from another model(object)
//         type: mongoose.Schema.Types.ObjectId,
//         ref:"Post",//This is reference to the post model
         
//     },
//     user:{
//         type:String,
//         required:true
//     },
//     body:{
//         type:String,
//         required:true
//     }


//  });


//  //exports
// module.exports=mongoose.model("Comment",commentSchema )

// commentController.js
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

exports.createComment = async (req, res) => {
    try {
        const { post, user, body } = req.body;
        
        // Check if required fields are present
        if (!post || !user || !body) {
            return res.status(400).json({ error: "Post, user, and body are required" });
        }

        // Create and save the new comment
        const comment = new Comment({ post, user, body });
        const savedComment = await comment.save();

        // Update the associated post with the comment's ID
        await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true }
        );

        res.status(200).json({ message: "Comment created successfully", comment: savedComment });
    } catch (error) {
        console.error("Error while creating a comment:", error);
        res.status(500).json({ error: "Error while creating comments" });
    }
};
