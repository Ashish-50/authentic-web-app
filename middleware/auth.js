const jwt = require('jsonwebtoken');


const requireAuth = (req,res,next)=>{

    const token = req.cookies.jwt
    //check jwt exist or not
    if(token){
        jwt.verify(token,'ashishjsonwebtoken',(err,decodedToken)=>{
            if(err){
                res.redirect('/event/log-in')
            }
            else{
                next()
            }
        })

    }
    else{
        res.redirect('/event/log-in')
    }
} 

module.exports = {requireAuth}