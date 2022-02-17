import React from 'react';

import './App.css';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'

function App() {
  const {isLoaded,loadError}= useLoadScript({
    googleMapsApiKey: "AIzaSyAl-05QHjB4SkZgReeANCxOqKbgDwoad78"
  })

  const mapContainerStyle={
    width:"100vw",
    height:"100vh"
  }
  const center ={
    lat:38.7422,
    lng:-108.0690
  }

  if(loadError){
    return("Error loading map")
  }
  if(!isLoaded) return "Loading Maps"



  return (
    <div className="App">
       <GoogleMap 
          mapContainerStyle={mapContainerStyle}
          zoom={10}
          center={center}
        >

       </GoogleMap>
    </div>
  );
}

export default App;
