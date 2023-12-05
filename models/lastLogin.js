const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {roles} =  require('./constants'); 

const loginInfoSchema = new Schema({
  
  lastLogin: {
     type: Date, default: Date.now

    },
    email: {
        type: String,
       
   
      }, 

      role : {
        type : String,
        enum : [roles.admin, roles.moderator, roles.client],
        default : roles.client,
    },
    googleID : {
      type : String
  }, 

  googleUsername : {
      type : String
  }
      

   
});



module.exports = mongoose.model('Logininfo', loginInfoSchema)