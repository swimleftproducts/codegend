import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {DisplayProvider} from './components/DisplayContext';
import {LocationProvider} from './components/LocationContext'

ReactDOM.render(
  <React.StrictMode>
     <DisplayProvider>
       <LocationProvider>
           <App />
       </LocationProvider>  
     </DisplayProvider>
    
  </React.StrictMode>,
  document.getElementById('root')
);

