const Dep = require("../models/depModel")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const factoryFn=require('./factoryController')
 

// exports.createUser=catchAsync(async(req,res,next)=>{
//     console.log(req.body)
//     res.send("this is the route to create the user mannually by the admin")
// })
exports.createDep=factoryFn.createOne(Dep)
exports.deleteDep=factoryFn.deleteOne(Dep)
exports.updateDep=factoryFn.updateOne(Dep)
exports.getDep=factoryFn.getOne(Dep)
exports.getAll=factoryFn.getAll(Dep)
// exports.getByName=catchAsync(async(req,res,next)=>{
//     const {name}=req.body;
//     const course= await Course.findOne({name})

//     console.log(name,course);
//     if(!course){
//         return new AppError("there is no course with this name");
//     }

//     res.status(200).json({
//         status:"success",
//         course
//     })
// })

