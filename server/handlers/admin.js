const db = require('../models');

const jwt = require('jsonwebtoken');





exports.register_faculty = async (req,res,next)=>{
    try{
        
        const Fac = await db.Faculty.create(req.body);
        const {id, username} = Fac;
        const token = jwt.sign({id,username},process.env.SECRET);
        res.status(201).json({id,username, token});
    }
    catch(err){
        if(err.code === 11000){
            err.message = 'Sorry username is already taken.';
        }
        next(err);
    }
}



exports.login_faculty = async (req,res,next)=>{
    try{
        const Fac= await db.Faculty.findOne({username: req.body.username});
        const {id, username} = Fac;
        const valid = await Fac.comparePassword(req.body.password);
        if(valid){
            const token = jwt.sign({id,username},process.env.SECRET);
            res.json({id,username,token});
        }
        else{
            throw new Error();
        }
    }
    catch(err){ 
        err.message = "Invalid username/password";
        next(err);
    }
}





exports.login_admin = async (req,res,next)=>{
    try{
        const Fac= await db.Faculty.findOne({username: req.body.username});
        const {id, username,designation} = Fac;
        if(designation!=="Admin"){
            throw new Error();
        }
        const valid = await Fac.comparePassword(req.body.password);
        if(valid){
            const token = jwt.sign({id,username},process.env.SECRET);
            res.json({id,username,token});
        }
        else{
            throw new Error();
        }
    }
    catch(err){ 
        err.message = "Invalid username/password";
        next(err);
    }
}


