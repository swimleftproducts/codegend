import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import { DisplayContext } from './DisplayContext'
import { useNavigate, useParams } from "react-router-dom";

export default function ResetCard(props) {

  const navigate = useNavigate()
  const [pw1,setPw1]=useState('')
  const [pw2,setPw2]=useState('')
  const [message,setMessage]=useState()
  
  let {token}= useParams();
  
  useEffect(() => { 
     if(pw2!==pw1 && pw2!==''){
       setMessage("Passwords do not match")
     }else if( pw1==="") {
       setMessage("")
     }else if (pw1===pw2){
       setMessage("Passwords match")
     }
   },[pw1,pw2])

  const checkMatch= () => { 
      return pw1===pw2?true:false;
  }    
   

  const onSubmit = async (event) => {

    let formData = { token, password:pw1}

    if(checkMatch()){
 
    axios.post('/api/auth/resetfinish',formData, { withCredentials: true })
    .then((response) => { 
      console.log(response)
      setMessage("PW reset, please log in");
      setTimeout(() => { 
        navigate('/')
      },1000)
     })
    .catch((err)=>{
      setMessage(err.response.data.message);
      return
    })
    }
  }

  return (
    <div className="reset">
    <div className=" login card shadow-2-strong">
          <div className="card-body p-4 text-center">
            <div className='register-heading'>
              <h4 className="mb-1">Enter new password</h4>
              
            </div>
          
            <div className="form-outline mb-2">
              <label className="form-label p-0 m-0" htmlFor="pw1">Password</label>
              <input type="password" id="pw1" className="form-control form-control-lg"
              onChange={(e) => {
                setPw1(e.target.value)
              }} />
            </div>
            <div className="form-outline mb-2">
              <label className="form-label p-0 m-0" htmlFor="pw2">Confirm Password</label>
              <input type="password" id="pw2" className="form-control form-control-lg"
              onChange={(e) => {
                setPw2(e.target.value)
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
