const express=require('express')
const userController=require('../controllers/userController')
const Router=express.Router()

Router.route('/')
.get(userController.getAll)
.post(userController.createUser)

Router.route('/:id')
.get(userController.getUser)
// .post(userController.addContact)
.patch(userController.updateUser)
.delete(userController.deleteUser)
module.exports=Router
