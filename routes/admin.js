const { Router }=require("express");

const adminRouter=Router();

adminRouter.post("/signup",function(req,res){
    res.json({
        message:"Admin signup"
    })
})

adminRouter.post("/signin",function(req,res){
    res.json({
        message:"Admin signin"
    })
})

adminRouter.post("/course",function(req,res){
    res.json({
        message:"Admin signin"
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