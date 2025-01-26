const { Router }=require("express");

const courseRouter=Router();

//user buy courses
courseRouter.post("/purchase",function(req,res){
    res.json({
        message:"buy course"
    })

});

//user sees all the courses
courseRouter.get("/preview",function(req,res){
    res.json({
        message:"All courses"
    })

});

module.exports={
    courseRouter
}