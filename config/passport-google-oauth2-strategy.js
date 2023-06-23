//Require passport and Strategy
const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');

//Function that will lead to google authentication
passport.use(new googleStrategy({
        clientID: "148793845213-t8vejuv6btlpbpjnvus5arbjdg26fut1.apps.googleusercontent.com",
        clientSecret: "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",
        callbackURL: "http://localhost:8000/users/auth/google/callback"
    },

    async function(accessToken , refreshToken , profile , done){
        let user = await User.findOne({email: profile.emails[0].value}).exec();

        //If user presnet then sending it 
        if(user){
            return done(null , user);
        
        //if not present then creating it
        }else{
            let user = await User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
            })

            //Sending created User
            if(user){
                return done(null , user);
            }
        }

    }

));

module.exports = passport;