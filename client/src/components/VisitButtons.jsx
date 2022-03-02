import React from 'react'
import axios from 'axios'
function VisitButtons(props) {


  const {selectedLocation, getLocationData,setSelectedLocation}=props
  
  const checkOff=async ()=>{
    const locData = {id:selectedLocation._id}
    await axios.post('/api/geo/addlocation',locData, { withCredentials: true })
    .then((response) => { 
      getLocationData()
      setSelectedLocation(response.data)
    }) 
  }

  return (
    <div className="visit-btn-box">
       
    <button className="visit-btn-today" onClick={checkOff}>Visited today</button>
    <button className="visit-btn-past">Visited in past</button>
  
    </div>
  )
}

export default VisitButtons