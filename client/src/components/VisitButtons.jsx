import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import { DisplayContext } from './DisplayContext'
import { LocationContext } from './LocationContext'

function VisitButtons(props) {
  const{setShowRecentVisitors,showDatePicker,setShowDatePicker}=useContext(DisplayContext)
  const{setInfoBoxOffset, getLocationData, selectedLocation, setSelectedLocation}=useContext(LocationContext)

  const [hasVisited,setHasVisited]= useState(false)
  const {auth}=props
 
  useEffect(() => { 
    if(selectedLocation.visitedBy.length===0){  
      setHasVisited(false)
    }else {
      selectedLocation.visitedBy.forEach(visitor=>{
        if(visitor.userId===auth.id){
          setHasVisited(true)
        }
      })
    }
    
  },[auth.id,selectedLocation])

  const checkOff=async ()=>{
    const locData = {id:selectedLocation._id}
    
    await axios.post('/api/geo/addlocation',locData, { withCredentials: true })
    .then((response) => { 
      if(response.data.saved===false){
        setShowDatePicker(false);
        setShowRecentVisitors(true)
        return
      }else{
        getLocationData()
        setSelectedLocation(response.data)
        setShowDatePicker(false);
        setShowRecentVisitors(true)
      }
      
    }) 
  }

  const removeVisit=async ()=>{
    const locData = {id:selectedLocation._id}
    await axios.post('/api/geo/unvisitpastlocation',locData, { withCredentials: true })
    .then((response) => { 
      if(response.data.saved===false){
         setShowDatePicker(false);
         setShowRecentVisitors(true)
         return
      }else{
         getLocationData()
         setSelectedLocation(response.data)
         setShowDatePicker(false);
         setShowRecentVisitors(true)
      }
    }) 

  }
  const pickDate =() => {
    if(!showDatePicker){
      setInfoBoxOffset(150)
    }else{
      setInfoBoxOffset(-30)
    }
    setShowDatePicker((prevState)=>{return !prevState});
    setShowRecentVisitors((prevState)=>{return !prevState})
  }

  return (
    <div className="visit-btn-box">
       
    <button className={`${hasVisited?"btn-today-unvisit":null} visit-btn-today`}  onClick={()=>{hasVisited?removeVisit():checkOff()}} >{hasVisited?"Un-visit":"Visited today?"}</button>
    <button className="visit-btn-past" onClick={pickDate}>{hasVisited?"Change date":"Visited in past"}</button>
  
    </div>
  )
}

export default VisitButtons