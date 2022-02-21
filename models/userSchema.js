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
  locationsVisited:[
      {
      type: mongoose.ObjectId,
      ref: 'Location'
      }
    
  ]
})

module.exports = userSchema