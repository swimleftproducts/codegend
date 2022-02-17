 const companyController = require('../controllers/companyController')

module.exports =(app)=>{
  app.get('/api/company/:id',companyController.getCompany ) 
  app.post('/api/company',companyController.createCompany ) 
  
}