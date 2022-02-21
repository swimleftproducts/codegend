const {locations} = require('../locationdata')
const {Location,User} = require('../models')

module.exports={
  async markers(req,res,next){
    //get all locations
    Location.find({}).lean()
    .then((data) => { 
     
      const returnData = data.map((location) => { 
        location.visitedBy = location.visitedBy.map((visitor) => { 
              return {name: visitor.name, userId: visitor._id, date:visitor.date}
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
      if(location.id.toString()===req.body.id){
        visited=true
      }
    })
    if(visited){
      
      res.send({saved:false,message:"already visited"})
      return
    }
    //add user to the visited site
    let location= await Location.findById(req.body.id)
    //original code
    console.log(req.user.name)
    await location.visitedBy.unshift({date: new Date(),userId:req.user.id,name:req.user.name})
    
    await user.locationsVisited.push(req.body.id)
    const results = await user.save()

    const returnLocation = await location.save()
    
    //update return location with visted by 

   

    //original code
    Location.findById(req.body.id).lean()
    .then((data) => { 
      res.send(data)
     })    
    
  }
}