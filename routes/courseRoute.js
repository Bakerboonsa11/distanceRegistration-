const express=require('express')
const userController=require('../controllers/userController')
const authencicationController=require("../controllers/authenticationController")
const courseController=require("../controllers/courseController")
const Router=express.Router()

// AUTHENTICATION


Router.route('/getByName')
.post(courseController.getByName);
Router.route('/')
.get(courseController.getAll)
.post(courseController.createCourse)

Router.route('/:id')
.get(courseController.getCourse)
// .post(userController.addContact)
.patch(courseController.updateCourse)
.delete(courseController.deleteCourse)
module.exports=Router
