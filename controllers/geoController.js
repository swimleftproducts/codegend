const {locations} = require('../locationdata')
const {Location,User} = require('../models')

module.exports={
  async markers(req,res,next){
    //get all locations
    Location.find({}).populate('visitedBy').lean()
    .then((data) => { 
     
      const returnData = data.map((location) => { 
        location.visitedBy = location.visitedBy.map((visitor) => { 
              return {name: visitor.name, id: visitor._id}
        })
        return location
      })

      res.send(returnData)
     })    
  },
  async addLocation(req,res,next){
    let user = await User.findById(req.user._id).exec()
    //check if visited before

    let visited=false

    user.locationsVisited.map((location)=>{
      if(location.toString()===req.body.id){
        visited=true
      }
    })
    if(visited){
      //let complete= await User.findById(req.user._id).populate('locationsVisited')
      //res.send(complete)
      res.send({saved:false,message:"already visited"})
      return
    }
    //add user to the visited site
    let location= await Location.findById(req.body.id)
    await location.visitedBy.push(req.user.id)
    
    await user.locationsVisited.push(req.body.id)
    const results = await user.save()

    const returnLocation = await location.save()
    //update return location with visted by 

    Location.findById(req.body.id).populate('visitedBy').lean()
    .then((data) => { 
      
      const returnData = data
      returnData.visitedBy =data.visitedBy.map((visitor) => { 
        return {name: visitor.name, id: visitor._id}

       })
      res.send(returnData)
     })    
    
  }
}