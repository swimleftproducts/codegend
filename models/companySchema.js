const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const companySchema = new Schema({
   name:{
     type:string 
   },
   founded:{
     type:number 
   },
})

module.exports = companySchema