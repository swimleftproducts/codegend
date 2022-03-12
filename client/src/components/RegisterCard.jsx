import axios from 'axios'
import React, {useEffect, useState, useContext} from 'react'
import { DisplayContext } from './DisplayContext'

export default function RegisterCard(props) {
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const [name, setName]=useState('')
  const [message, setMessage]=useState('')
  const [nameMessage, setNameMessage]=useState('')
  const [emailMessage, setEmailMessage]=useState('')
  const [passwordMessage, setPasswordMessage]=useState('')

  const {setShowRegister} = useContext(DisplayContext )

  const{setAuth}=props

  const onSubmit = async (event) => {
    let formData = { password,email,name}
    if(emailMessage==="" && nameMessage==="" && passwordMessage===""){

      axios.post('/api/auth/register',formData, { withCredentials: true })
      .then((response)=>{
        setAuth(response.data)
        setMessage("Successful login");
        setTimeout(() => { 
          setShowRegister(false)
        },500)
      })
      .catch((err) => { 
        setMessage("Registration Error")
       })

    }else{
      setMessage("Please complete all fields")
    }
   
  }
  const validateName =()=>{
    if(name.length<=2){
      setNameMessage("at least 2 letters")
    }
    if(name.length===0){
      setNameMessage("")
    }
    if(name.length>2){
      setNameMessage("")
    }
  }

  const validatePassword =()=>{
    if(password.length<=5){
      setPasswordMessage("at least 6 characters")
    }
    if(password.length===0){
      setPasswordMessage("")
    }
    if(password.length>5){
      setPasswordMessage("")
    }
  }
  const validateEmail =()=>{
    var re = /\S+@\S+\.\S+/;
    if(!re.test(email)){
      setEmailMessage("please add a valid email")
    }else{
      setEmailMessage('')
    }
  }
  useEffect(() => {
    validateName(); 
    validatePassword();
    validateEmail()
  },[name,password,email]
  )

  return (
    <div className=" register card shadow-2-strong">
     
          <div className="card-body p-4 text-center">
          <div className="register-heading "> 
            <h4 className="mb-1 ">Register</h4>
          </div>
            
           
            <div className="form-outline mb-2">
            <label className="form-label p-0 m-0 " htmlFor="email">First Name</label>
              <input type="email" id="name" className="form-control form-control-lg"
              onChange={(e) => {
                setName(e.target.value) 
                 
              }} />
              {nameMessage?<p className="error-text">{nameMessage}</p>:<p className="error-text"></p>}
              
            </div>

            <div className="form-outline mb-2">
                <label className="form-label p-0 m-0" htmlFor="typeEmailX-2">Email</label>
                <input type="email" id="email" className="form-control form-control-lg"
              onChange={(e) => {
                setEmail(e.target.value)    
              }} />
              {emailMessage?<p className="error-text">{emailMessage}</p>:<p className="error-text"></p>}
            
            </div>

            <div className="form-outline mb-2">
            <label className="form-label p-0 m-0" htmlFor="typePasswordX-2">Password</label>
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg"
              onChange={(e) => {
                setPassword(e.target.value)    
              }} />
              {passwordMessage?<p className="error-text">{passwordMessage}</p>:<p className="error-text"></p>}
              
            </div>

            <button className=" mt-1 btn register-form-btn btn-med btn-block" type="submit"
             onClick={(e) => {
              e.preventDefault()
              onSubmit();
            }}>Sign Up</button>
              {message?<p className="error-text-main">{message}</p>:null}
          </div>
        </div>
  )
}
