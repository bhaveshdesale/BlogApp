const express = require("express");
const router = express.Router();

// Import the comment controller
const { createComment } = require("../controllers/CommentController");
const {createPost,getAllPosts}=require("../controllers/PostController");
const {likedPost,unlikePost}=require("../controllers/LikeController");


// Define the route to create a comment
router.post("/comments/create", createComment);
router.post("/posts/create",createPost);
router.get("/posts",getAllPosts);
router.post("/likes/like",likedPost);
router.post("/likes/unlikes",unlikePost);

// Export the router
module.exports = router;


