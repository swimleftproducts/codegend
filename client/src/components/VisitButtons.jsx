import React, {useContext} from 'react'
import axios from 'axios'
import { DisplayContext } from './DisplayContext'
import { LocationContext } from './LocationContext'

function VisitButtons(props) {
  const{setShowRecentVisitors,showDatePicker,setShowDatePicker}=useContext(DisplayContext)
  const{setInfoBoxOffset, getLocationData, selectedLocation, setSelectedLocation}=useContext(LocationContext)
 

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
  const pickDate =() => {
    //try and target triangle
   
    if(!showDatePicker){
      setInfoBoxOffset(150)
    }else{
      setInfoBoxOffset(-40)
    }
    setShowDatePicker((prevState)=>{return !prevState});
    setShowRecentVisitors((prevState)=>{return !prevState})
  }

  return (
    <div className="visit-btn-box">
       
    <button className="visit-btn-today" onClick={checkOff}>Visited today</button>
    <button className="visit-btn-past" onClick={pickDate}>Visited in past</button>
  
    </div>
  )
}

export default VisitButtons