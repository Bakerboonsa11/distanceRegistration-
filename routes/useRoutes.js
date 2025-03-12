const express=require('express')
const userController=require('../controllers/userController')
const Router=express.Router()

Router.route('/')
.get((req,res,next)=>{
    res.send('Hello, userRoutes');
})
.post(userController.createUser)



module.exports=Router