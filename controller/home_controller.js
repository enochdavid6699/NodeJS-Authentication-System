//Require User
const User = require('../models/user');

//Loading the Home Page
module.exports.home = async function( req , res ){

    try {

        return res.render('home', {
          title: "Home"
        });
        
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }

}