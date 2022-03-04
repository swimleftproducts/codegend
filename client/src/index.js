import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DisplayProvider} from './components/DisplayContext';
import {LocationProvider} from './components/LocationContext'
import {AuthProvider} from './components/AuthContext'
import {UserStatsProvider} from './components/UserStatsContext'

ReactDOM.render(
  <React.StrictMode>
     <DisplayProvider>
       <LocationProvider>
         <AuthProvider>
          <UserStatsProvider>
            <App />
          </UserStatsProvider>        
         </AuthProvider>
       </LocationProvider>  
     </DisplayProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

