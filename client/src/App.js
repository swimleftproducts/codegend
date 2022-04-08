import React, { useState, useContext, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import LoginCard from './components/LoginCard';
import RegisterCard from './components/RegisterCard';
import HighScoreCard from './components/HighScoreCard';
import Map from './components/Map';
import Dashboard from './components/Dashboard';
import ResetCard from './components/ResetCard'
import { DisplayContext } from './components/DisplayContext';
import { AuthContext } from './components/AuthContext';
import { LocationContext } from './components/LocationContext';


function App() {
  const {
    setShowRegister,
    showRegister,
    showLogin,
    setShowLogin,
    setShowHighScore,
    showHighScore,
    setShowDashboard,
    showDashboard,
    setShowReset,
    showReset
  } = useContext(DisplayContext);

  const {setSelectedLocation}= useContext(LocationContext)
  const { auth, setAuth, getLoginStatus } = useContext(AuthContext);

  //check login status
  useEffect(() => {
    getLoginStatus();
  }, []);

  const toggleLogin = (e) => {
    setShowRegister(false);
    setShowLogin(!showLogin);
     setShowReset(false);
  };
  const toggleRegister = (e) => {
    setShowLogin(false);
    setShowRegister(!showRegister);
    setShowReset(false);
  };

  const toggleDashboard = (e) => {
    setSelectedLocation(null);
    setShowHighScore(false);
    setShowDashboard((prevState) => {
      return !prevState;
    });
  };
  const logout = async (e) => {
    let response = await axios('/api/auth/logout');
    if (!response.data.authenticated) {
      setAuth({});
      setShowDashboard(false);
      setShowHighScore(false);
    }
  };

  const renderName = () => {
    let name;
    
    if(auth.name.length>6){
      name =auth.name.slice(0,6)+"..."
    }else{
      name = auth.name;
    }

    return name
  }

  return (
    <div className="App">
    
      {showRegister||showReset || showLogin ? (
        <div
          className="modal-active "
          onClick={() => {
            setShowRegister(false);
            setShowLogin(false);
            setShowReset(false);
          }}
        >
         
        </div>
      ) : null}

      {auth.authenticated ? (
        <button
          className="btn login-btn-secondary register-btn "
          onClick={toggleDashboard}
        >
          {renderName()}
        </button>
      ) : null}

      <button className="btn login-btn-primary login-btn" onClick={toggleLogin}>
        Login
      </button>

      {auth.authenticated ? (
        <button className="btn login-btn-primary login-btn" onClick={logout}>
          Logout
        </button>
      ) : null}

      {!auth.authenticated ? (
        <button
          className="btn login-btn-secondary register-btn"
          onClick={toggleRegister}
        >
          Register
        </button>
      ) : null}

      {showDashboard ? <Dashboard /> : null}
      {showLogin ? <LoginCard setAuth={setAuth} /> : null}
      {showRegister ? <RegisterCard setAuth={setAuth} /> : null}
      {showReset?<ResetCard/>:null}
      {showHighScore ? (
        <HighScoreCard />
      ) : (
        <i
          className="highscore-icon bi bi-bar-chart-fill"
          onClick={() => {
            setSelectedLocation(null);
            setShowDashboard(false)
            setShowHighScore(true);
          }}
        ></i>
      )}
      <Map auth={auth} />
     
    </div>
  );
}

export default App;
