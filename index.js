const express=require('express');
const app=express();

const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');

//user signup 
app.post("/user/signup",function(req,res){
    res.json({
        message:"Signup Successful"
    })
});

//user signin
app.post("/user/singin",function(req,res){
    res.json({
        message:"Signin Successful"
    })

});
//user sees all the bought courses
app.get("/user/purchases",function(req,res){
    res.json({
        message:"My courses"
    })

});
//user buy courses
app.post("/course/purchase",function(req,res){
    res.json({
        message:"buy course"
    })

});

//user sees all the courses
app.post("/courses",function(req,res){
    res.json({
        message:"All courses"
    })

});





app.listen(3000);