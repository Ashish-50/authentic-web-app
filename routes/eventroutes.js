const express = require('express');
const router = express.Router();
const EventSignUp = require('../model/eventsignupschema');
const brcypt = require('bcrypt');
const { Mongoose } = require('mongoose');
const connection = require('../model/conn')
const EventForm = require('../model/eventschema')
const jwt = require('jsonwebtoken')
const {requireAuth} = require('../middleware/auth')

const maxAge = 3*24*60*60; //3 days

const createtoken = (id)=>{
    return jwt.sign({id},'ashishjsonwebtoken',{
        expiresIn:maxAge
    });
}

router.get('/log-in',(req,res)=>{
    res.render('login')
});

router.post('/log-in',async(req,res)=>{
    try {
        const email = req.body.email
        const password = req.body.password
        const finduser =await EventSignUp.findOne({email:email})
        const isMatch = await brcypt.compare(password,finduser.password)
        if(isMatch){
            const token = createtoken(finduser._id);
            res.cookie('jwt',token,{httpOnly:true,maxAge:maxAge*1000})
            res.status(200).redirect('/event/home')
        }
        else{
            res.status(400).json({
                message:"User not Found"
            });
        }
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})


router.get('/sign-up',(req,res)=>{
    res.render('signup')
});

router.post('/sign-up',async(req,res)=>{
    try {
        const password = req.body.password
        const hashedpassword =await brcypt.hash(password,10);
        const newuser = await EventSignUp({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            password:hashedpassword
        });
        newuser.save().then((result,err)=>{
            if(!err){
                res.status(201).redirect('/event/log-in')
            }
            else{
                console.log(err,{message:"something went wrong"})
            }
        }).catch(err=>{
            console.log(err)
            res.status(500).send(err)
        })
    } catch (error) {
        res.status(400).send(error)
    }
});

router.get('/home',requireAuth,async(req,res)=>{
    const getall = await EventForm.find();
    res.render('Home',{alluser:getall});
});


router.get('/eventform',requireAuth,(req,res)=>{
    res.render('eventform')
});

router.post('/eventform',(req,res)=>{
    try {
        const form = new EventForm({
            eventname:req.body.eventname,
            organization:req.body.organization,
            description:req.body.description,
            category:req.body.category,
            pricerange:req.body.pricerange,
            startdate:req.body.startdate,
            enddate:req.body.enddate,
            starttime:req.body.starttime,
            endtime:req.body.endtime,
            address:req.body.address,
            subburb:req.body.subburb,
            postcode:req.body.postcode,
            contactname:req.body.contactname,
            email:req.body.email,
            contactnumber:req.body.contactnumber

        });
        form.save().then((result,err)=>{
            if(!err){
                res.status(201).redirect('/event/home')
            }
            else{
                console.log(err,{message:"something went wrong"})
            }
        }).catch(err=>{
            console.log(err);
            res.status(500).send(err)
        })
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

});
router.get('/delete/:_id',(req,res)=>{
    EventForm.findByIdAndDelete(req.params._id,(err,doc)=>{
        if(!err){
            res.redirect('/event/home');
        }
        else{
            console.log("Error in deletion" + err)
        }
    })
})

router.get('/logout',(req,res)=>{
    res.cookie('jwt',"",{maxAge:1});
    res.redirect('/event/log-in');
});


module.exports =router