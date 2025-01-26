const { Router }=require("express");
const { userMiddleware } = require("../middleware/user");
const { purchaseModel, courseModel } = require("./db");

const courseRouter=Router();

//user buy courses
courseRouter.post("/purchase",userMiddleware,async function(req,res){
   const userId=req.userId;
   const {courseId}=req.body;

   await purchaseModel.create({
    userId,
    courseId
   })
   res.json({
    message:"You have successfully bought the course"
})

});

//user sees all the courses
courseRouter.get("/preview",async function(req,res){
    const courses=await courseModel.find({});
    res.json({
        courses
    })

});

module.exports={
    courseRouter
}