//Require Mongoose
const mongoose = require("mongoose");

//Connect Mongoose
mongoose.connect('mongodb://127.0.0.1:27017/NodeJS_Authentication');

//Store the connection in a variable
const db = mongoose.connection;

//On error
db.on('error' , console.error.bind( console , 'Error in connecting to the Data Base'));

//On Success
db.once('open' , function(){
    console.log('Successfully connected to DataBase');
})

module.exports=db;