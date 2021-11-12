const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config();


const connection = mongoose.connect(process.env.mongodb_url,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{``
    console.log('database connected')
}).catch((err)=>{
    console.log(err)
});

module.exports = connection;

