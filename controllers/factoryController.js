const catchAsync=require('../utils/catchAsync');
const appError=require('../utils/appError');
const appFeatures= require("../utils/appFeuture")
const User=require("../models/userModel")
const createToken=require('../utils/token')
console.log("catchasync is", catchAsync())

exports.createOne=(Model)=>catchAsync(
 
 async (req, res, next) => {

    console.log(req.body);
    const createdInstance = await Model.create(req.body);
  if(createdInstance && Model===User){
     createToken(createdInstance,res);
  }
   
  else{
         res.status(200).json({
       status:"success",
       data:createdInstance,
      
     })
     }
  
    
}

) 


exports.deleteOne=(Model)=>catchAsync(async(req,res,next)=>{
    console.log('entered delete part')
    let id=req.params.id
  //  console.log(req.files)
  if(req.params.toUser){
    id=req.params.toUser
  }
     const deletedInstance= await Model.findByIdAndDelete(id);
     console.log(deletedInstance)
     if(!deletedInstance) {
      const error =new appError("there is no user with this id to delete",404)
      console.log("have to enter")
      console.log(error)
         next(error)
      
     }
     else{
         res.status(200).json({
       status:"success",
       data:null,
       userdeletedis:deletedInstance.name
     })
     }
     
})


exports.updateOne=(Model)=>catchAsync((async(req,res,next)=>{
  console.log("entered update page")
  console.log(req.params,req.params.toUser)
 let id=req.params.id
  //  console.log(req.files)
  if(req.params.toUser){
    id=req.params.toUser
  }
  //  req.body.images=req.files
  //  console.log(req.body)
   const updatedInstance=await Model.findByIdAndUpdate(id,req.body,{new:true,runValidators:true})
 
     if(!updatedInstance){
      return next(new appError("there is no data with this info to update",404))
     }

     res.status(200).json({
      status:"success",
      updatedTo:updatedInstance
     })
}))

exports.getOne = (Model) =>
  catchAsync(async (req, res, next) => {
    let id = req.params.id;
    console.log(req.params)
    // If an alternate ID is specified, use it
    if (req.params.toUser) {
      id = req.params.toUser;
    }
    console.log(id)
    // Find the document by ID and populate if needed
    let query = Model.find({_id:id});
    // if (populateOptions) {
    //   console.log('populate option',populateOptions)
    //   query = query.populate(populateOptions);
    // }

    const fetchedInstance = await query;

    if (!fetchedInstance) {
      return next(new appError("No data found with this ID", 404));
    }

    res.status(200).json({
      status: "success",
      data: fetchedInstance,
    });
  });

exports.getAll=(Model)=>catchAsync(async(req,res,next)=>{
  
        //  console.log('entered getalll')
         const feature=new appFeatures(Model.find(),req.query)
         .filter()
         .sort()
         .fields()
         .pagination();
         const instanceFiltered=await feature.databaseQuery
     
         if(!instanceFiltered){
            return next(new appError("there is no any data",404))
         }

        res.status(200).json({
            status:"success",
            length:instanceFiltered.length,
            instanceFiltered
        })
})
