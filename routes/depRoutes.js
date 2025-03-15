const express=require('express')

const authencicationController=require("../controllers/authenticationController")
const depController=require("../controllers/depController")
const Router=express.Router()



Router.route('/')
.get(depController.getAll)
.post(depController.createDep)

Router.route('/:id')
.get(depController.getDep)
// .post(userController.addContact)
.patch(depController.updateDep)
.delete(depController.deleteDep)
module.exports=Router
