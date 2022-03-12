import React, {useState,createContext } from 'react'
import axios from 'axios';
export const LocationContext = createContext();


export const LocationProvider = (props) => { 
  const[mapCenter,setMapCenter]=useState({
    lat:38.7422,
    lng:-108.0690
  })
  const[locations,setLocations]=useState([])
  const[selectedLocation,setSelectedLocation]=useState(null)
  const[infoBoxOffset,setInfoBoxOffset]=useState(-30);

  async function getLocationData(){
    let response = await axios('/api/geo/markers')
    let markers = await response.data
    setLocations(markers)
  }


  return(
    <LocationContext.Provider value={{getLocationData,infoBoxOffset,setInfoBoxOffset, locations,setLocations, mapCenter,setMapCenter,selectedLocation,setSelectedLocation}}>
      {props.children}
    </LocationContext.Provider>
  ) 
}