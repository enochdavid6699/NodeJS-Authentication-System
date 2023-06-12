//Require Express
const express = require('express');
//Require Router
const router = express.Router();
//Require Home Controller
const homeController = require('../controller/home_controller');
//To load Home Page
router.get('/' , homeController.home);
//Routing to Users
router.use('/users' , require('./users'));
//Export router
module.exports=router;
