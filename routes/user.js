const express=require("express");
const Router=express.Router;

const userRouter=Router();

//user signup 
userRouter.post("/signup",function(req,res){
    res.json({
        message:"Signup Successful"
    })
});

//user signin
userRouter.post("singin",function(req,res){
    res.json({
        message:"Signin Successful"
    })

});
//user sees all the bought courses
userRouter.get("/purchases",function(req,res){
    res.json({
        message:"My courses"
    })

});

module.exports={
    userRouter:userRouter
}