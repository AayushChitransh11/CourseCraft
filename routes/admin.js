const { Router }=require("express");

const adminRouter=Router();

const {adminModel}=require("./db");
const jwt=require('jsonwebtoken');
const { JWT_ADMIN_PASSWORD }=require("../config");
const { adminMiddleware }=require("../middleware/admin");

adminRouter.post("/signup",async function(req,res){
    const {email, password, firstName, lastName}=req.body;
    //todo: hash the password so plaintext pw is not stored in the DB

    try{
    await adminModel.create({
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
})

adminRouter.post("/signin",async function(req,res){
    const { email, password}=req.body;
    
    const admin=await adminModel.findOne({
        email:email,
        password:password
    });

    if(admin){
        const token=jwt.sign({
            id: admin._id
        },JWT_ADMIN_PASSWORD);
        
        res.json({
            token:token
        })
    }else{
    res.status(403).json({
        message:"Invalid credentials!"
    })
    }
})

adminRouter.post("/course",adminMiddleware, async function(req,res){
    const adminId= req.userId;

    const {title, desciption, imageUrl, price,creatorId}=req.body;

    const course=await courseModel.create({
        title: title,
        desciption:desciption,
        imageUrl:imageUrl,
        price:price,
        creatorId:adminId

    })

    res.json({
        message:"Course Created",
        courseId: course._id
    })
})

adminRouter.put("/course",function(req,res){
    res.json({
        message:"Admin signin"
    })
})
adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message:"Admin signin"
    })
})

module.exports={
    adminRouter
}