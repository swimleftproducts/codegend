import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
  InfoBox
} from '@react-google-maps/api'
import LocationDetail from './LocationDetail';


function Map(props) {

  const {auth}=props

  const[mapCenter,setMapCenter]=useState({
    lat:38.7422,
    lng:-108.0690
  })
  const[locations,setLocations]=useState([])
  const[selectedLocation,setSelectedLocation]=useState(null)

  useEffect(() => {  
   getLocationData();
  },[])

  async function getLocationData(){
    let response = await axios('/api/geo/markers')
    let markers = await response.data
    setLocations(markers)
  }

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
      options={{pixelOffset: new window.google.maps.Size(0,-40),noRedraw: true}}
       position={{
        
        lat:selectedLocation.lat, 
        lng:selectedLocation.lng
       }}
       
       onCloseClick={() => {setSelectedLocation(null) }}
      >
       <LocationDetail auth={auth} getLocationData={getLocationData} setSelectedLocation={setSelectedLocation} selectedLocation={selectedLocation}/>
      </InfoWindow>):null}
      
    </GoogleMap>
  )
}

export default Map