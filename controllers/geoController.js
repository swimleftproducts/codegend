const {locations} = require('../locationdata')
const {Location,User} = require('../models')

module.exports={
  async markers(req,res,next){
    //get all locations
    Location.find({})
    .then((data) => { 
      res.send(data)
     })    
  },
  async addLocation(req,res,next){
    let user = await User.findById(req.user._id).exec()
    console.log(user.locationsVisited[0].toString())
    console.log(req.body.id)
    //check if visited before
    let visited=false
    user.locationsVisited.map(()=>{
      
    })
    await user.locationsVisited.push(req.body.id)
    const results = await user.save()
   
    res.send('')
  }
}