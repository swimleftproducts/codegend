const mongoose = require('mongoose')
const userSchema = require('./userSchema')
const companySchema = require('./companySchema')


// get db string
const {getDbConnectionString} = require('../config/dbConfig');

mongoose.connect(getDbConnectionString(),
{ useNewUrlParser: true,
useUnifiedTopology: true}
,(err) => {
    if(err){console.log(err)}
    else{
        console.log('connected to DB')
    }
})

const User = mongoose.model('User',userSchema)
const Company = mongoose.model('Company',companySchema)


module.exports={
User,
Company,
}