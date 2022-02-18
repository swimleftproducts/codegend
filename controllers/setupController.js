const {User} = require('../models')


module.exports={
  clear(req,res,next){
    User.deleteMany({})
    .then(() => { 
      res.send('all users deleted')
     })
   
  },
}