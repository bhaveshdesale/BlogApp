const Post=require("../models/postModel");
const like=require("../models/LikeModels");
exports.likePost= async (req,res)=>{
    try{
        const {post,user}=req.body;
        const like=new Like({
            post,user,
        });
        const savedLike=await like.save();
        
        //updates the post collection basic on this
        const updatedPost=await Post.findByIdAndUpdate(post,{$push:{likes:savedLike._id}},{new:true})
        .populate("likes").exec();
        res.json({
            post:updatedPost,
        })
    }
    catch(error){
        return res.status(400).json({
            error:"Error while fecting post",
        })

    }
}

//unlike post
exports.unlikePost=async (req,res)=>{
    try{
    const deleteLike= await Like.findByIdAndDelete({post:post,_id:like});
    const updatePost=await Post.findByIdAndUpdate(post,{pull: {likes:deletedLike._id}},
        {new:true}
    );
    res.json({
        post:updatePost,
    });
}
    catch(error){
        return res.status(400).json({
        error :"Error while unliking post"
        });

    }
    }
