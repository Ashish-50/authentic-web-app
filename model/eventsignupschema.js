const mongoose = require('mongoose');
const {isEmail} = require('validator')

const signupSchema = mongoose.Schema({
    firstname:{
        type:String,
        required:[true,'First name is required']
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        required:[true,"please enter email"],
        unique:true,
        validate:[isEmail,"Please enter valid email"]
    },
    password:{
        type:String,
        required:[true,'Please choose password'],
        minlength:[6,'password atleast have 6 character']
    }
})
const EventSignUp = mongoose.model('EventSignUp',signupSchema)
module.exports = EventSignUp