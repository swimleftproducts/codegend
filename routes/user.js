 const userController = require('../controllers/userController')

module.exports =(app)=>{
  app.get('/api/user/:id',userController.getUsers ) 
  app.post('/api/user',userController.createUser ) 
  
}