const express=require('express')

const Router=express.Router()

Router.route('/')
.get((req,res,next)=>{
    res.send('Hello, userRoutes');
})
.post((req,res,next)=>{
    res.send("this is the route to create the user mannually by the admin")
})



module.exports=Router