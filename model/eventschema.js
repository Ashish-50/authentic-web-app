const mongoose = require('mongoose');
const {isEmail} = require('validator')

const eventformschema   = mongoose.Schema({
    eventname:{type:String,required:[true,'This field is required']},
    organization:{type:String,required:[true,'This field is required']},
    description:{type:String,required:[true,'This field is required']},
    category:{type:String,required:[true,'This field is required']},
    pricerange:{type:String,required:[true,'This field is required']},
    startdate:{type:String,required:[true,'This field is required']},
    enddate:{type:String,required:[true,'This field is required']},
    starttime:{type:String,required:[true,'This field is required']},
    endtime:{type:String,required:[true,'This field is required']},
    address:{type:String,required:[true,'This field is required']},
    subburb:{type:String,required:[true,'This field is required']},
    contactname:{type:String,required:[true,'This field is required']},
    email:{type:String,required:[true,'This field is required'],validate:[isEmail,['please enter valid email']]},
    contactnumber:{type:Number,required:[true,'This field is required'],maxlength:[10]},
});

const EventForm = mongoose.model('EventForm',eventformschema);

module.exports = EventForm