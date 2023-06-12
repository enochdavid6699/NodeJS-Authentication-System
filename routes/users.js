//Require Express
const express = require('express');
//Require Router
const router = express.Router();
//Require User Controller
const usersController = require('../controller/users_controller');
//Require Passport
const passport = require('passport');

//Going to the Reset Passwaord Page
router.get('/profile/:id' , passport.checkAuthentication , usersController.profile);
//Updating the Password
router.post('/update/:id' , passport.checkAuthentication , usersController.update);
//Sign Up Page
router.get('/sign-up' , usersController.signUp); 
//Sign In Page
router.get('/sign-in' , usersController.signIn);
//Creating New User
router.post('/create' , usersController.create);

//Use Passport as Middleware to Authenticate
router.post('/create-session', passport.authenticate(
    'local' , 
    {failureRedirect: '/users/sign-in'},
) , usersController.createSession);

//Sign Out
router.get('/sign-out' , usersController.signOut);

//Exporting Router
module.exports=router; 