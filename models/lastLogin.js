const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const loginInfoSchema = new Schema({
  
  lastLogin: {
     type: Date, default: Date.now

    },
    email: {
        type: String
   
       }

});



module.exports = mongoose.model('Logininfo', loginInfoSchema)