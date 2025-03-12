const User = require("../models/userModel")
const catchAsync = require("../utils/catchAsync")
const factoryFn=require('./factoryController')
 

// exports.createUser=catchAsync(async(req,res,next)=>{
//     console.log(req.body)
//     res.send("this is the route to create the user mannually by the admin")
// })
exports.createUser=factoryFn.createOne(User)