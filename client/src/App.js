import React, {useState, useMemo, useEffect} from 'react';
import './App.css';
import axios from 'axios';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

import LoginCard from './components/LoginCard';
import RegisterCard from './components/RegisterCard'
import Button from './components/Button';

function App() {
  const[showLogin,setShowLogin]= useState(false)
  const[showRegister,setShowRegister]= useState(false)
  const[locations,setLocations]=useState([])
  const[selectedLocation,setSelectedLocation]=useState(null)

  async function getLocationData(){
    let response = await axios('/api/geo/markers')
    let markers = await response.data
    setLocations(markers)
  }

  useEffect(() => {  
   getLocationData();
  },[])

  const {isLoaded,loadError}= useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const mapContainerStyle={
    width:"100vw",
    height:"100vh"
  }
  const center ={
    lat:38.7422,
    lng:-108.0690
  }

  const options ={
   streetViewControl: false,
   fullscreenControl: false,
   disableAutoPan: true
  }


  if(loadError){
    return("Error loading map")
  }
  if(!isLoaded) return "Loading Maps"

  const toggleLogin =(e) => {
    setShowRegister(false)
    setShowLogin(!showLogin)
  }
  const toggleRegister =(e) => {
    setShowLogin(false)
    setShowRegister(!showRegister)
   
  }

  return (
    <div className="App">
      <button className="btn btn-primary login-btn" onClick={toggleLogin}>Login</button>
      <button className="btn btn-secondary register-btn" onClick={toggleRegister}>Register</button>
      {showLogin?<LoginCard/>:null}
      {showRegister?<RegisterCard/>:null}
       <GoogleMap 
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
          options={options}
        >
          {locations.map((location) => {
              return <Marker key={location.id} position={{
                lat:location.lat, 
                lng:location.lng
              }} 
              onClick={() => { setSelectedLocation(location)}}/>
            }
          )}
          {selectedLocation ?(<InfoWindow
            options={{disableAutoPan: true}}
             position={{
              lat:selectedLocation.lat, 
              lng:selectedLocation.lng
             }}
             onCloseClick={() => {setSelectedLocation(null) }}
            >
              <div><h4>{selectedLocation.name}</h4></div>
            </InfoWindow>):null}
        
       </GoogleMap>
    </div>
  );
}

export default App ;
