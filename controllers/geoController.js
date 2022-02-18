const {locations} = require('../locationdata')

module.exports={
  markers(req,res,next){
    
    res.send(locations)
  },
}