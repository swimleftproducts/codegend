import React,{useState} from 'react'
import axios from 'axios'

function LocationDetail(props) {
  const {selectedLocation, auth}=props
  


  const checkOff=()=>{
    //
    const locData = {id:selectedLocation._id}
    axios.post('/api/geo/addlocation',locData, { withCredentials: true })
    

  }
  const visitedBy = selectedLocation.visitedBy.map((person,index)=>{
    return  <li key={index} className="list-group-item">{person}</li>
  })

  return (
    <div className='location-detail'><p>Title: {selectedLocation.title}</p>
    {auth.authenticated?<button onClick={checkOff} className='btn btn-primary btn-sm mb-2'>Check off</button>:null}
    <p>Most recent visits:</p>
    <ul className="list-group">
      {visitedBy}
    </ul>
    </div>
  )
}

export default LocationDetail