import React, {useState, useEffect,useContext} from 'react'
import axios from 'axios';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  InfoBox
} from '@react-google-maps/api'
import LocationDetail from './LocationDetail';
import { LocationContext } from './LocationContext';


function Map(props) {
  const {getLocationData, selectedLocation, setSelectedLocation, mapCenter,  setLocations,locations, infoBoxOffset,setInfoBoxOffset} = useContext(LocationContext)

  const {auth}=props

  useEffect(() => {  
  //from LocationContext
   getLocationData();
  },[])

   const {isLoaded,loadError}= useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  const mapContainerStyle={
    width:"100vw",
    height:"100vh"
  }

  const options ={
   streetViewControl: false,
   fullscreenControl: false,
   disableAutoPan: true,
   clickableIcons: false
  }


  if(loadError){
    return("Error loading map")
  }
  if(!isLoaded) return "Loading Maps"
  return (
    <GoogleMap 
    mapContainerStyle={mapContainerStyle}
    zoom={10}
    center={mapCenter}
    options={options}
  >
    {locations.map((location) => {
      
        return <Marker key={location._id} position={{
          lat:location.lat, 
          lng:location.lng
        }} 
        onClick={() => { setSelectedLocation(location)}}/>
      }
    )}
    {selectedLocation ?(<InfoWindow 
      options={{pixelOffset: new window.google.maps.Size(0,infoBoxOffset),noRedraw: true}}
       position={{
        
        lat:selectedLocation.lat, 
        lng:selectedLocation.lng
       }}
       
       onCloseClick={() => {setSelectedLocation(null) }}
      >
       <LocationDetail auth={auth} getLocationData={getLocationData} setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation}
       setInfoBoxOffset={setInfoBoxOffset}
       />
      </InfoWindow>):null}
      
    </GoogleMap>
  )
}

export default Map