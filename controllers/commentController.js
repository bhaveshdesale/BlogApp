// //import model

// const Post=require("../models/postModel");
// const Comment=require("../models/commentModel");

// //business logic
// exports.createComment= async (req,res)=>{
//     try{
//         //first of all we have to make object of the comment
//         //fetch data from res body
//       //kisi post pe uper comment aati hai to kya comment aayi hai(body),
//       //kis post ke upar comment aayi hai(post),kisane comment ki hai(user)
//       //so for that we have to store that new comment id into the post   
//         const {post,user,body}=req.body;

//         //create a comment object
//         const comment=new Comment({
//             post,user,body


//         });
//         //save the new comment into the database
//         const savedComment=await comment.save();


//         //now we have to update it into post 1) find the post id, and then update it into comment array
//         //push used for update new entry pull used to delete the entry
//         const updatePost=await Post.findByIdAndUpdate(post, {$push:{comment: savedComment._id}},{new: true})


//            //populate the commnets array with comment documents
//               .populate("comments")
//               .exec();

//              res.json({
//                      post:updatePost,


//              });
               
//     }
//     catch(error){
//         return res.status(500).json({
//             error:"error while creating comments",


//         })


//     }


// }

// Import models
const Post = require("../models/postModel");
const Comment = require("../models/commentModel");

// Business logic
exports.createComment = async (req, res) => {
    try {
        // Destructure required fields from the request body
        const { post, user, body } = req.body;

        // Create a new comment object
        const comment = new Comment({
            post,
            user,
            body
        });

        // Save the new comment into the database
        const savedComment = await comment.save();

        // Update the post by pushing the new comment's ID to the post's comments array
        await Post.findByIdAndUpdate(
            post,
            { $push: { comments: savedComment._id } },
            { new: true }
        );

        // Find the updated post and populate its comments array
        const updatedPost = await Post.findById(post)
            .populate("comments")
            .exec();

        // Return the updated post in the response
        res.json({
            post: updatedPost,
        });
    } catch (error) {
        // Handle errors
        return res.status(500).json({
            error: "Error while creating comment",
        });
    }
};
