//general imports
require('dotenv').config()


const path = require('path')
const {apiErrorHandler} = require('./errorHandling/errorHandler')

//basic express setup
const express = require('express')
const app = express()
const port = process.env.PORT || 4000

//database connection
require('./models')

//middleware

const generalMiddleware = require('./middleware/generalMiddleware')
generalMiddleware(app)
const authMiddleware = require('./middleware/authMiddleware')
authMiddleware(app)

// routes
const Routes = require('./routes/index.js')
Routes(app)



if(process.env.NODE_ENV === 'production'){
  app.use(express.static('client/build'))
  app.get('/*',(req,res) => {
  res.sendFile(path.resolve(__dirname,"client","build","index.html"))        
})
}

app.use(apiErrorHandler)

app.listen(port,() => {
  console.log('listening on PORT ',port )
})