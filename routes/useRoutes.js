const express=require('express')
const userController=require('../controllers/userController')
const authencicationController=require("../controllers/authenticationController")
const Router=express.Router()

// AUTHENTICATION

Router.route('/signIn')
.post(authencicationController.signIn)
// Router.route('/:id/me')
// .post(userController.updateMe)

Router.route('/')
.get(userController.getAll)
.post(userController.createUser)

Router.route('/:id')
.get(userController.getUser)
// .post(userController.addContact)
.patch(userController.updateUser)
.delete(userController.deleteUser)
module.exports=Router
