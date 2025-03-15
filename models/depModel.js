const mongoose=require('mongoose')
const Course=require('../models/courseModel')

const departementSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: [true, 'A user must have a firstName'],
      trim: true,
    },
 
   college:{
     name:{
        type:String,
       required:[true,"name is required"]
     },
     collegeId:{
        type:String,
        required:[true,"collageId IS REQUIRED"]
     }
   },
   courses:[
    {
    type:mongoose.Schema.ObjectId,
    ref:"Course",
    required:[true,'reference to course is required']
    },
   
   ]
,
  year:{
     type:Number,
     required:[true,"each departement must have a year "]

    }

 


  },
  { timestamps: true } // Automatically adds `createdAt` & `updatedAt`
);
const Dep=mongoose.model("Dep",departementSchema)

module.exports=Dep