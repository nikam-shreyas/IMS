
const db = require('../models');

exports.addNewInternship = async (req,res,next)=>{
    const { id } = req.decoded;
    const {docs,completionStatus,holder} = req.body;
    try {
      const user = await db.User.findById(id);
      const internship = await db.Internship.create({
        docs,
        user,
        completionStatus,
        holder    
    });
      user.internships.push(internship._id);
      await user.save();
  
      return res.status(201).json({ ...internship._doc, user: user._id });
    } catch (err) {
        next({
            status: 400,
            message: err.message
        });
    }
}

exports.showInternships = async (req,res,next)=>{
    try {
        const internships = await db.Internship.find().populate('user',['username','id']);
        res.status(200).json(internships);
    } catch (err) {
        err.status(400);
        next(err);
    }
}

exports.usersInternships = async (req, res, next) => {
    try {
      const { id } = req.decoded;
      const user = await db.User.findById(id).populate('internships');
        
      res.status(200).json(user.internships);
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  };
  

  exports.getInternship = async (req,res,next)=>{
    try {
        const {id} = req.params;

        const internship = await db.Internship.findById(id).populate('user',['username','id']);
        if(!internship){
            throw new Error('No internship found');
        }

        res.status(200).json(poll);

    } catch (err) {
        next({
            status: 400,
            message: err.message
        })
    }
}


exports.deleteInternship = async (req, res, next) => {
    const { id: internshipId } = req.params;
    const { id: userId } = req.decoded;
    try {
      let user = await db.User.findById(userId)
      if(user.internships) { // not sure if necessary either...
        user.internships = user.internships.filter(userInternship => {
          return userInternship._id.toString() !== internshipId.toString() // not sure if necessary to use toString()
        })
      }
      
      const internship = await db.Internship.findById(pollId);
      if (!internship) throw new Error('No internship found');
      if (internship.user.toString() !== userId) {
        throw new Error('Unauthorized access');
      }
      await user.save()
      await internship.remove();
      return res.status(202).json({ internship, deleted: true });
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  };

