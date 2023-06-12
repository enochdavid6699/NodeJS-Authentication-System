//Require Mongoose
const mongoose = require('mongoose');

//Defining the Schema
const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const User = mongoose.model('User' , userSchema);

//Exporting the User
module.exports = User;