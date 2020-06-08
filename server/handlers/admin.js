const db = require("../models");

const jwt = require("jsonwebtoken");

exports.register_faculty = async (req, res, next) => {
  try {
    const Fac = await db.Faculty.create(req.body);
    const { id, username } = Fac;
    const token = jwt.sign({ id, username }, process.env.SECRET);
    res.status(201).json({ id, username, token });
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry username is already taken.";
    }
    next(err);
  }
};

exports.login_faculty = async (req, res, next) => {
  try {
    const Fac = await db.Faculty.findOne({ username: req.body.username });
    const { id, username } = Fac;
    const valid = await Fac.comparePassword(req.body.password);
    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      res.json({ id, username, token });
    } else {
      throw new Error();
    }
  } catch (err) {
    err.message = "Invalid username/password";
    next(err);
  }
};

exports.login_admin = async (req, res, next) => {
  try {
    const Fac = await db.Faculty.findOne({ username: req.body.username });
    const { id, username, designation } = Fac;
    if (designation !== "Admin") {
      throw new Error();
    }
    const valid = await Fac.comparePassword(req.body.password);
    if (valid) {
      const token = jwt.sign({ id, username }, process.env.SECRET);
      res.json({ id, username, token });
    } else {
      throw new Error();
    }
  } catch (err) {
    err.message = "Invalid username/password";
    next(err);
  }
};
exports.addFaculty=async(req,res,next)=>{
  try {
    const Fac = await db.Faculty.create(req.body);
    return res.status(200).json(Fac);
  } catch (err) {
    if (err.code === 11000) {
      err.message = "Sorry username is already taken.";
    }
    next(err);
  }
}

exports.findFaculty=async(req,res,next)=>{
try {
  const {user}=req.params;
  const faculty=await db.Faculty.findOne({username:user});
  if(!faculty){
    throw new Error("Faculty not found")
  }
  return res.status(200).json(faculty);
} catch (error) {
  next({
    status:400,
    message:error.message
  }); 
}
}

exports.findAll=async(req,res,next)=>{
  try {
    const faculties = await db.Faculty.find().populate("faculties");
    res.status(200).json(faculties);
  } catch (err) {
    err.status(400);
    next(err);
  }
}

exports.deleteFaculty=async (req,res,next)=>{
  try {
    const {user}=req.params;
    const faculty=await db.Faculty.findOne({username:user});
    if (!faculty) throw new Error("faculty not found");
    await faculty.remove();
    return res.status(200).json("faculty deleted");
  } catch (error) {
    next({
      status:400,
      message:error.message
    }); 
  }
}

exports.showProfile=async(req,res,next)=>{
  try {
    const { id } = req.params;
    const Profile = await db.Faculty.findOne({_id:id,designation:'Admin'});
    if(Profile){
      return res.json(Profile)
    }else{
      throw new Error("Not an admin");    
    }
  } catch (error) {
    next({
      status:400,
      message:error.message
    });
  }
}

