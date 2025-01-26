require('dotenv').config();
const express=require('express');


const app=express();
app.use(express.json());

const { userRouter }=require("./routes/user");
const { courseRouter }=require("./routes/course");
const { adminRouter }=require("./routes/admin")
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');

app.use("/user",userRouter);
app.use("/course",courseRouter);
app.use("/admin",adminRouter);

async function main(){
    await mongoose.connect(process.env.MONGO_URL);
    app.listen(3000);
    console.log("Listening on 3000");
}

main()