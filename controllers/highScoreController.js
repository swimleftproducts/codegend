const {locations} = require('../locationdata')
const {Location,User} = require('../models')

module.exports={
  async getHighScores(req,res,next){
    let score = []
    const users = await User.find({}).lean()
    
    users.forEach((user) => {
      score.push({score: user.locationsVisited.length, id:user._id, name:user.name})
    })

    //sort scores by highscore
  score.sort((a,b)=>{
    return (b.score-a.score)
  })
   console.log(score)
    res.send(score)
  },
  
}