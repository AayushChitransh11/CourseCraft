// const jwt=require('jsonwebtoken')
// const { JWT_USER_PASSWORD }=require("../config")
// function userMiddleware(req,res,next){
//     const token=req.headers.token;
//     const decoded=jwt.verify(token,JWT_USER_PASSWORD);

//     if(decoded){
//         req.userId=decoded.indexOf;
//         next()
//     }else{
//         req.status(403).json({
//             message:"You are not signed in!"
//         })
//     }
// }

// module.exports={
//     userMiddleware
// }

const jwt = require('jsonwebtoken');
const { JWT_USER_PASSWORD } = require("../config");

function userMiddleware(req, res, next) {
    const token = req.headers.token;

    if (!token) {
        return res.status(403).json({
            message: "You are not signed in!"
        });
    }

    try {
        const decoded = jwt.verify(token, JWT_USER_PASSWORD);
        req.userId = decoded.id; 
        next();
    } catch (error) {
        return res.status(403).json({
            message: "Invalid token!"
        });
    }
}

module.exports = {
    userMiddleware
};
