const express=require('express');
const app=express();


require("dotenv").config();
const PORT=process.env.PORT || 3000;

//middleware
//it helps to parse json from body
app.use(express.json());

//routes
const Blog=require('./routes/blog');

//mount
// app.use("/api/v1",Blog);

//database
const connectWithDb=require("./config/database"); 
connectWithDb();

//start the server
app.listen(PORT,()=>{
    console.log("App is started at port no 3000");
    
})
app.get("/",(req,res)=>{
    res.send('<h1>This is my homepage baby but have you lnow  ohjfdkjflka </h1>');
})