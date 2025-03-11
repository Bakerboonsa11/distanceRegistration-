const express=require('express')

const Router=express.Router()

Router.route('/')
.get((req,res,next)=>{
    res.send('Hello, userRoutes');
})



module.exports=Router