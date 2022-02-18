const cors=require('cors')  
const express=require('express')  

module.exports =(app)=>{
  app.use(cors({
    origin: [`http://localhost:3000`],
    credentials: true
}))
  app.use(express.json()) 
  app.use(express.urlencoded({extended:false})); 
}