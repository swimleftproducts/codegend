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
  visitedBy: [mongoose.ObjectId]
})

module.exports = locationSchema