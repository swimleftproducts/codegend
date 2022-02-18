
//add routes
const authController = require('../controllers/authController.js')
const geoController = require('../controllers/geoController.js')
const setupController = require('../controllers/setupController.js')

const ApiError = require('../errorHandling/errorHandler')

module.exports= (app) => {
    //setup route
    app.get('/api/setup/clearUsers',setupController.clear)  

    //auth routes
    app.get('/api/auth/test',authController.test)
    app.post('/api/auth/register',authController.register)
    app.post('/api/auth/login',authController.login)
    app.get('/api/auth/logout',authController.logout)
    app.get('/api/auth/isauthenticated',authController.isAuthenticated)

    //Geo related routes
    app.get('/api/geo/markers',geoController.markers)

    function checkAuthenticated(req,res,next){
    
        if(req.isAuthenticated()){
           return next()
        }
        next(ApiError.noPermission('your session expired, please login', "Error occurred in authentication middleware",2000))
        
    }
}