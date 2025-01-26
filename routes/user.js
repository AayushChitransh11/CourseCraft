const express=require("express");
const { userModel }=require("./db");
const jwt=require("jsonwebtoken");
const { JWT_USER_PASSWORD }=require("../config")

const Router=express.Router;

const userRouter=Router();

//user signup 
userRouter.post("/signup",async function(req,res){
    const {email, password, firstName, lastName}=req.body;
    //todo: hash the password so plaintext pw is not stored in the DB

    try{
    await userModel.create({
        email:email,
        password:password,
        firstName:firstName,
        lastName:lastName
    })}
    catch(error){
        res.json({
            message:"Signup failed!"
        })
    }
    res.json({
        message:"Signup Successful!"
    })
});

//user signin
userRouter.post("/signin",async function(req,res){
    const { email, password}=req.body;
    
    const user=await userModel.findOne({
        email:email,
        password:password
    });

    if(user){
        const token=jwt.sign({
            id: user._id
        },JWT_USER_PASSWORD);
        
        res.json({
            token:token
        })
    }else{
    res.status(403).json({
        message:"Invalid credentials!"
    })
    }
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