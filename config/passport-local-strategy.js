const { request } = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');


const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');

//Authentication Using Passport (New Way)
passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true
      },
      async function (req, email, password, done) {
        // Find the user in the database based on the email
        let user = await User.findOne({ email });
  
        if (!user || !(await bcrypt.compare(password, user.password))) {
          console.log('Invalid Username or Password');
  
          req.flash('error', 'Invalid Username/Password');
  
          return done(null, false);
        }
  
        return done(null, user);
      }
    )
  );
  

//Serializing the user to decide which key to be kept in the cookies
passport.serializeUser(function(user , done){
    done(null , user.id);
});

//De-serializing th user from key in the cookies (New Way)
passport.deserializeUser(async function(id , done){
    let user = await User.findById(id);     
    done(null , user);
});

//Check if the user is Authenticated
passport.checkAuthentication = function(req , res , next){

    //If user is signed in then pass on the request to the next function(controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //If user is not signed in 
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req , res , next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }
    next();
}

module.exports = passport;
