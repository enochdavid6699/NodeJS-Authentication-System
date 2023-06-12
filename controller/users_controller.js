//Require User
const User = require('../models/user');
//Require bcrypt
const bcrypt = require('bcrypt');


//Profile Page
module.exports.profile = async function (req, res) {

    try {
        ///Finding the User
        let user = await User.findById(req.params.id);

        return res.render('user_profile', {
            title: "Home",
            profile_user: user
        });

    } catch (error) {
        console.log(error);
    }

}

//Profile Update
module.exports.update = async function (req, res) {

    //This will update the users information
    let user = await User.findById(req.params.id);

    //Only thw same user can update the Password
    if (user && req.user.id == req.params.id) {

        //Checking if Old Password is Correct
        if (await bcrypt.compare(req.body.old_password, user.password)) {

            //Password and Confirm Password should be same
            if (req.body.password != req.body.confirm_password) {
                req.flash('error', 'Confirm Password does not match');
                return res.redirect('back');
            }

            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            //Updating the password
            user.password = hashedPassword;

            //Saving the changes
            await user.save();

            //Giving flash message
            req.flash('success', 'Password Reset Successfully');

            return res.redirect('/');

        }
        req.flash('error', 'Incorrect Old Password');
            return res.redirect('back');

    }

    return res.status(401).send("Unauthorized");
}

//Render the Sign-Up page
module.exports.signUp = function (req, res) {

    //If already Logged in then taking to profile
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    //If not then taking to sign up page
    return res.render('user_sign_up', {
        title: "Sign Up"
    });
}

//Render the Sign-In Page
module.exports.signIn = function (req, res) {

    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_in', {
        title: "Sign In"
    });
}

//Get Sign Up Data
module.exports.create = async function (req, res) {

    //Password and Confirm Password should be same
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Confirm Password does not match');
        return res.redirect('back');
    }

    try {

        //Checking if the user already exists
        const user = await User.findOne({ email: req.body.email });

        if (!user) {

            // Hash the password using bcrypt
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            //Updating the password
            req.body.password = hashedPassword;

            //Creating the user
            User.create(req.body);

            //Giving flash message
            req.flash('success', 'Sign-Up Successfull');

            return res.redirect('/users/sign-in');

        } else {

            return res.redirect('back');
        }

    } catch (error) {

        //Giving flash message
        req.flash('error', 'Error in Signing-Up');

        console.log(error);
    }

}

//Sign In and create a session for User
module.exports.createSession = function (req, res) {

    //Everything here is done by passport
    req.flash('success', 'Logged In Successfully');

    return res.redirect('/');
}


//Sign Out Function
module.exports.signOut = function (req, res) {
    req.logout(function (err) {
        if (err) {
            console.log(err);
            return res.redirect('/');

        }

        req.flash('success', 'You have logged out');

        // Redirect the user to the login page after logout
        return res.redirect('/');
    });
}
