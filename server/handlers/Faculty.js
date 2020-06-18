const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.showFacultyProfile = async (req, res, next) => {
    try {
      const { id } = req.decoded;
      console.log("here is the id "+id)
      const Profile = await db.Faculty.findOne({ _id: id});
     // console.log("This is profile "+Profile);
      if (Profile) {
        return res.json(Profile);
      } else {
        throw new Error("Not an admin");
      }
    } catch (error) {
      next({
        status: 400,
        message: error.message,
      });
    }
  
  }


// module.exports={
//   showFacultyProfile:function(req,res){
//     try {
//             const { id } = req.decoded;
//            // console.log("here is the id "+id)
//             const Profile = db.Faculty.findOne({ _id: id});
//            // console.log("This is profile "+Profile);
//             if (Profile) {
//               return res.json(Profile);
//             } else {
//               throw new Error("Not an admin");
//             }
//           } catch (error) {
//             next({
//               status: 400,
//               message: error.message,
//             });
//           }
//   }
// }