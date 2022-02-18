const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
   name:{
     type:String 
   },
   email:{
      type: String
   },
   hash:{
    type: String
  },
  salt:{
    type:String
  },
})

module.exports = userSchema