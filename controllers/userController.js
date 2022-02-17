module.exports={
  test(req,res,next){
    res.send('hi there')
    console.log('example route')
  },
  getUsers(req,res,next){
     res.send('getUsers')
  },
  createUser(req,res,next){
     res.send('createUser')
  },
}