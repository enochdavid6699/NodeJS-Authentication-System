const User = require('../models/user');

module.exports.home = async function( req , res ){

    try {

        let users = await User.find({});

        return res.render('home', {
          title: "Home"
        });
        
    } catch (err) {
        console.log(err);
        return res.redirect('back');
    }

}