const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  title:{
    type:String 
  },
  lat:{
    type: Number
  },
  lng:{
    type: Number
  },
  // visitedBy:[
  //   {
  //     type: mongoose.ObjectId,
  //     ref: 'User'
  //   }
  // ]
  visitedBy:[
     {
      userId: {
        type: mongoose.ObjectId,
      },
      name:{
        type: String
      },
      date: {
        type: Date
      }
    }
    ]
})

module.exports = locationSchema