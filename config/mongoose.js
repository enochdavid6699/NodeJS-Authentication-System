const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/NodeJS_Authentication');

const db = mongoose.connection;

db.on('error' , console.error.bind( console , 'Error in connecting to the Data Base'));

db.once('open' , function(){
    console.log('Successfully connected to DataBase');
})

module.exports=db;