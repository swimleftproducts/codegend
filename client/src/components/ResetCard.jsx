import axios from 'axios'
import React, {useState, useContext} from 'react'
import { DisplayContext } from './DisplayContext'
import { useNavigate} from "react-router-dom";

export default function ResetCard(props) {

  const navigate = useNavigate()
  const [email,setEmail]=useState('')
  const [message,setMessage]=useState()

  
  const {setShowReset} = useContext(DisplayContext )

  const onSubmit = async (event) => {
    let formData = { email}
    axios.post('/api/auth/resetpw',formData, { withCredentials: true })
    .then((response) => { 
      setMessage("Email instructions sent");
      setTimeout(() => { 
        setShowReset(false)
        navigate('/')
      },1000)
     })
    .catch((err)=>{
      setMessage(err.response.data.message);

      return
    })
   
   
    
   
  }

  return (
    <div className="reset">
    <div className=" login card shadow-2-strong">
          <div className="card-body p-4 text-center">
            <div className='register-heading'>
              <h4 className="mb-1">Reset Password</h4>
            </div>
          
            <div className="form-outline mb-2">
              <label className="form-label p-0 m-0" htmlFor="email">Email</label>
              <input type="email" id="email" className="form-control form-control-lg"
              onChange={(e) => {
                setEmail(e.target.value)    
              }} />
              
            </div>

           
            
            <button className="mt-0 btn register-form-btn btn-med btn-block" type="submit"
             onClick={(e) => {
              e.preventDefault()
              onSubmit();
            }}>Reset</button>
             
            {message?<p>{message} </p>:null}
          </div>
        </div>
      </div>
  )
}
