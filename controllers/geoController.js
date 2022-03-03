const {locations} = require('../locationdata')
const {Location,User} = require('../models')

module.exports={
  async markers(req,res,next){
    //get all locations
    Location.find({}).lean()
    .then((data) => { 
     
      // const returnData = data.map((location) => { 
      //   location.visitedBy = location.visitedBy.map((visitor) => { 
      //         return {name: visitor.name, userId: visitor._id, date:visitor.date}
      //   })
      //   return location
      // })

      res.send(data)
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
      res.send({saved:false,message:"already visited"})
      return
    }
    //add user to the visited site
    let location= await Location.findById(req.body.id)
    //original code
  
    await location.visitedBy.unshift({date: new Date(),userId:req.user.id,name:req.user.name})
    
    await user.locationsVisited.push(req.body.id)
    const results = await user.save()

    const returnLocation = await location.save()
    
    


    //original code
    Location.findById(req.body.id).lean()
    .then((data) => { 
      res.send(data)
     })    
    
  },
  async addPastLocation(req,res,next){
    let user = await User.findById(req.user._id).exec()
    //check if visited before
    let visited=false
 
    user.locationsVisited.map((location)=>{
      if(location.toString()===req.body.id){
        visited=true
      }
    })
    let location= await Location.findById(req.body.id)

    if(visited){
      //no need to modify the user record to add visit 
      // but we want to update the user record in the location visitedBy array
      const revisedVisitedBy = location.visitedBy.map((visitor) => { 
        
        if(visitor.userId.toString()===req.user.id){
          const newData = {date: new Date(req.body.date),userId:req.user.id,name:req.user.name}
          console.log("updateroute",newData)
          return newData;
        }
        else{
          return visitor
        }
      })
      
      location.visitedBy = revisedVisitedBy

      await location.save();

      Location.findById(req.body.id).lean()
      .then((data) => { 
        console.log(data)
        res.send(data)
      })  
   
    }else{

      await location.visitedBy.unshift({date: new Date(req.body.date),userId:req.user.id,name:req.user.name})
        
      await user.locationsVisited.push(req.body.id)
      const results = await user.save()
    
      const returnLocation = await location.save()

      Location.findById(req.body.id).lean()
      .then((data) => {
        console.log(data) 
        res.send(data)
      })  
     
    }
  
    
  }
}