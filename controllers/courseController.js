const Course = require("../models/courseModel")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const factoryFn=require('./factoryController')
 

// exports.createUser=catchAsync(async(req,res,next)=>{
//     console.log(req.body)
//     res.send("this is the route to create the user mannually by the admin")
// })
exports.createCourse=factoryFn.createOne(Course)
exports.deleteCourse=factoryFn.deleteOne(Course)
exports.updateCourse=factoryFn.updateOne(Course)
exports.getCourse=factoryFn.getOne(Course)
exports.getAll=factoryFn.getAll(Course)
exports.getByName=catchAsync(async(req,res,next)=>{
    const {uid}=req.body;
    const course= await Course.findOne({uid})

    console.log(uid,course);
    if(!course){
        return new AppError("there is no course with this uid");
    }

    res.status(200).json({
        status:"success",
        course
    })
})