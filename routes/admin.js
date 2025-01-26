const { Router }=require("express");

const adminRouter=Router();

const {adminModel}=require("./db");
const {courseModel}=require("./db")
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

adminRouter.post("/signin", async function (req, res) {
    const { email, password } = req.body;

    try {
        const admin = await adminModel.findOne({
            email: email,
            password: password,
        });

        if (admin) {
            const token = jwt.sign(
                { id: admin._id },
                JWT_ADMIN_PASSWORD
            );

            // Send the token as a response and exit
            return res.json({ token });
        } else {
            // Ensure this response exits the function
            return res.status(403).json({ message: "Invalid credentials!" });
        }
    } catch (err) {
        // Catch unexpected errors and send a server error response
        console.error(err);
        return res.status(500).json({ message: "Internal server error" });
    }
});


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

adminRouter.put("/course",adminMiddleware,async function(req,res){
    const adminId= req.userId;

    const {title, desciption, imageUrl, price, courseId}=req.body;


    const course=await courseModel.updateOne({
        _id: courseId,
        creatorId: adminId
    },{
        title: title,
        desciption:desciption,
        imageUrl:imageUrl,
        price:price,
    })

    res.json({
        message:"Course Updated!",
        courseId: course._id
    })
})
adminRouter.get("/course/bulk",adminMiddleware, async function(req,res){
    const adminId= req.userId;

    const {title, desciption, imageUrl, price, courseId}=req.body;


    const courses=await courseModel.find({
        creatorId: adminId
    });

    res.json({
        message:"All Courses",
       courses
    })
})

module.exports={
    adminRouter
}