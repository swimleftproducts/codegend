import axios from 'axios'
import React, {useState} from 'react'

export default function RegisterCard() {
  const [password,setPassword]=useState('')
  const [email,setEmail]=useState('')
  const [name, setName]=useState('')

  const onSubmit = async (event) => {
    let formData = { password,email}
    console.log(password,email);
    const response = await axios.post('/api/auth/register',formData, { withCredentials: true })
  }

  return (
    <div className=" register card shadow-2-strong">
          <div className="card-body p-4 text-center">
            <h4 className="mb-2">Register</h4>

            <div className="form-outline mb-2">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg"
              onChange={(e) => {
                setName(e.target.value)    
              }} />
              <label className="form-label" htmlFor="typeEmailX-2">Name</label>
            </div>

            <div className="form-outline mb-2">
              <input type="email" id="typeEmailX-2" className="form-control form-control-lg"
              onChange={(e) => {
                setEmail(e.target.value)    
              }} />
              <label className="form-label" htmlFor="typeEmailX-2">Email or username</label>
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
            }}>Sign Up</button>
          </div>
        </div>
  )
}
