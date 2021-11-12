const express = require('express');
const app = express();
const ejs =require('ejs');
require('./model/conn');
const router = require('./routes/eventroutes');
const path = require('path')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT;



app.use(express.json()); // for parsing incoming json data
app.use(express.urlencoded({extended:false})); // for parsing incoming data from form or from html or in from format data
app.use(express.static(path.join(__dirname,'/public')))
app.use(cookieParser())


app.set('views',path.join(__dirname,'views'))
app.set('view engine',"ejs");


app.use('/event',router)

app.get('/',(req,res)=>{
    res.render('index')
})

app.listen(port,()=>{
    console.log(`server started at port ${port}`)
});