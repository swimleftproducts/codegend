const {User} = require('../models')
const {locations} = require('../locationdata')
const {Location}= require('../models')


module.exports={
  clear(req,res,next){
    User.deleteMany({})
    .then(() => { 
      res.send('all users deleted')
     })
   
  },
  loadLocations(req,res,next){
    // save all locations into db
    locations.map(async (geoCache) => { 
      const newLocation =new Location(
       { 
        title: geoCache.title,
        lat:geoCache.lat,
        lng:geoCache.lng}
      )
      await newLocation.save()
    })
    res.send("added all locations")
  },
  clearLocations(req,res,next){
    Location.deleteMany({})
    .then(() => {
      res.send("deleted all locations")
    })
  }
}