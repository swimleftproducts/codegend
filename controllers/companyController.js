module.exports={
  test(req,res,next){
    res.send('hi there')
    console.log('example route')
  },
  getCompany(req,res,next){
     res.send('getCompany')
  },
  createCompany(req,res,next){
     res.send('createCompany')
  },
}