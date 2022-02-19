import React, {useState, useMemo, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import LoginCard from './components/LoginCard';
import RegisterCard from './components/RegisterCard'
import HighScoreCard from './components/HighScoreCard';
import Map from './components/Map';

function App() {
  const[showLogin,setShowLogin]= useState(false)
  const[showRegister,setShowRegister]= useState(false)
  const[showHighScore,setShowHighScore]= useState(false)
  const[auth,setAuth]=useState({authenticated:false,name:null})
  

  //check login status
  useEffect(() => { 
    getLoginStatus()
  },[])

  async function getLoginStatus(){
    let response = await axios('/api/auth/isAuthenticated')
    
    if(response.data.authenticated){
      setAuth(response.data)
    }
  }

  const toggleLogin =(e) => {
    setShowRegister(false)
    setShowLogin(!showLogin)
  }
  const toggleRegister =(e) => {
    setShowLogin(false)
    setShowRegister(!showRegister)
  }
  const logout = async (e) => {
    let response = await axios('/api/auth/logout')
    if(!response.data.authenticated){
      setAuth({})
    }
  }


  return (
    <div className="App">
      {auth.authenticated?<button className="btn btn-success register-btn " disabled >{auth.name}</button>:null}
      <button className="btn btn-primary login-btn" onClick={toggleLogin}>Login</button>
      {auth.authenticated?<button className="btn btn-primary login-btn" onClick={logout}>Logout</button>:null} 
      {!auth.authenticated?<button className="btn btn-secondary register-btn" onClick={toggleRegister}>Register</button>:null}
      {showLogin?<LoginCard setAuth={setAuth} setShowLogin={setShowLogin}/>:null}
      {showRegister?<RegisterCard setAuth={setAuth} setShowRegister={setShowRegister}/>:null}
      {showHighScore?<HighScoreCard setShowHighScore={setShowHighScore} />:<i className="highscore-icon bi bi-card-checklist" onClick={()=>{setShowHighScore(true)}}></i>}
      <Map auth={auth}/>
      
    </div>
  );
}

export default App ;
