import React, { useEffect,useContext} from 'react'
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from '@react-google-maps/api'
import LocationDetail from './LocationDetail';
import { LocationContext } from './LocationContext';
import {DisplayContext} from './DisplayContext'
import axios from 'axios';


function Map(props) {
  const { selectedLocation, setSelectedLocation, mapCenter,  locations, setLocations, infoBoxOffset,setInfoBoxOffset} = useContext(LocationContext)
  const{setShowDatePicker,setShowRecentVisitors} = useContext(DisplayContext)


  const {auth}=props

  useEffect(() => {  
  //from LocationContext
   getLocationData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
        onClick={() => {setSelectedLocation(location)}}/>
      }
    )}
    {selectedLocation ?(<InfoWindow 
      options={{pixelOffset: new window.google.maps.Size(0,infoBoxOffset),noRedraw: true}}
       position={{
        
        lat:selectedLocation.lat, 
        lng:selectedLocation.lng
       }}
       
       onCloseClick={() => {
         
         setSelectedLocation(null)
         setShowDatePicker(false)
         setShowRecentVisitors(true)
         setInfoBoxOffset(-40)
      }}
      >
       <LocationDetail auth={auth}/>
      </InfoWindow>):null}
      
    </GoogleMap>
  )
}

export default Map