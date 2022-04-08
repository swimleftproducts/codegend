import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import PwResetCard from './components/PwResetCard'
import {DisplayProvider} from './components/DisplayContext';
import {LocationProvider} from './components/LocationContext'
import {AuthProvider} from './components/AuthContext'
import {UserStatsProvider} from './components/UserStatsContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
     <DisplayProvider>
       <LocationProvider>
         <AuthProvider>
          <UserStatsProvider>
            <Router>
              <Routes>
                <Route path="/resetpw/:token" element={<PwResetCard/>}/>  
                <Route path="/*" element={<App/>}/>  
             </Routes>
            </Router>
            
          </UserStatsProvider>        
         </AuthProvider>
       </LocationProvider>  
     </DisplayProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

