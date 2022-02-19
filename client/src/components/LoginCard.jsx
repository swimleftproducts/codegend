import axios from 'axios'
import React, {useState} from 'react'

export default function LoginCard(props) {
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const [message,setMessage]=useState()

 const{setAuth,setShowLogin}=props

  const onSubmit = async (event) => {
    let formData = { password,email}
    axios.post('/api/auth/login',formData, { withCredentials: true })
    .then((response) => { 
      setAuth(response.data)
      setMessage("Successful login");
      setTimeout(() => { 
        setShowLogin(false)
      },500)
     })
    .catch((err)=>{
      setMessage(err.response.data.message);
      return
    })
   
   
    
   
  }

  return (
    <div className=" login card shadow-2-strong">
          <div className="card-body p-4 text-center">
            <h4 className="mb-2">Sign in</h4>
            <div className="form-outline mb-2">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg"
              onChange={(e) => {
                setEmail(e.target.value)    
              }} />
              <label className="form-label" htmlFor="typeEmailX-2">Email</label>
            </div>

            <div className="form-outline mb-3">
              <input type="password" id="typePasswordX-2" className="form-control form-control-lg"
              onChange={(e) => {
                setPassword(e.target.value)    
              }} />
              <label className="form-label" htmlFor="typePasswordX-2">Password</label>
            </div>

            <button className="btn btn-primary btn-med btn-block" type="submit"
             onClick={(e) => {
              e.preventDefault()
              onSubmit();
            }}>Login</button>
            {message?<p>{message}</p>:null}
          </div>
        </div>
  )
}
