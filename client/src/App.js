import React, {useState, useContext, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import LoginCard from './components/LoginCard';
import RegisterCard from './components/RegisterCard'
import HighScoreCard from './components/HighScoreCard';
import Map from './components/Map';
import Dashboard from './components/Dashboard';
import {DisplayContext} from './components/DisplayContext'
import { AuthContext } from './components/AuthContext';

function App() {

  const {setShowRegister,showRegister, showLogin,setShowLogin,setShowHighScore, showHighScore, setShowDashboard, showDashboard} = useContext(DisplayContext )

  const {auth,setAuth,getLoginStatus}=useContext(AuthContext)
  
  //check login status
  useEffect(() => { 
    getLoginStatus()
  },[])

  const toggleLogin =(e) => {
    setShowRegister(false)
    setShowLogin(!showLogin)
  }
  const toggleRegister =(e) => {
    setShowLogin(false)
    setShowRegister(!showRegister)
  }

  const toggleDashboard=(e) => { 
    setShowDashboard((prevState)=>{return !prevState})
   }
  const logout = async (e) => {
    let response = await axios('/api/auth/logout')
    if(!response.data.authenticated){
      setAuth({})
      setShowDashboard(false)
      setShowHighScore(false)
    }
  }


  return (
   
      <div className="App">
        {showRegister || showLogin?<div className="modal-active " onClick={()=>{setShowRegister(false); setShowLogin(false)}}>modal</div>:null}

        {auth.authenticated?<button className="btn login-btn-secondary register-btn " onClick={toggleDashboard} >{auth.name}</button>:null}

        <button className="btn login-btn-primary login-btn" onClick={toggleLogin}>Login</button>

        {auth.authenticated?<button className="btn login-btn-primary login-btn" onClick={logout}>Logout</button>:null} 

        {!auth.authenticated?<button className="btn login-btn-secondary register-btn" onClick={toggleRegister}>Register</button>:null}

        {showDashboard?<Dashboard/>:null}
        {showLogin?<LoginCard setAuth={setAuth} />:null}
        {showRegister?<RegisterCard setAuth={setAuth}/>:null}
        {showHighScore?<HighScoreCard />:<i className="highscore-icon bi bi-bar-chart-fill" onClick={()=>{setShowHighScore(true)}}></i>}
        <Map auth={auth}/>
        
      </div>
  
  );
}

export default App ;
