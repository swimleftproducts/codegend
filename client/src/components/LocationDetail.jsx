import React,{useState,useEffect} from 'react'
import axios from 'axios'

function LocationDetail(props) {
  const {setSelectedLocation, selectedLocation, getLocationData, auth}=props
  
  const [hasVisited,setHasVisited]=useState(false);

  useEffect(() => {
    selectedLocation.visitedBy.forEach(visitor=>{
      if(visitor.id===auth.id){
        setHasVisited(true)
      }else{
        setHasVisited(false)
      }
      
    })
  
  },[auth.id,selectedLocation])


  const checkOff=async ()=>{
    const locData = {id:selectedLocation._id}
    await axios.post('/api/geo/addlocation',locData, { withCredentials: true })
    .then((response) => { 
      getLocationData()
      console.log(response.data)
      setSelectedLocation(response.data)
    })


 
  }
  const visitedBy = selectedLocation.visitedBy.map((person,index)=>{
    return  <li key={index} className="list-group-item">{person.name}</li>
  })

  return (
    <div className='location-detail'><p>Title: {selectedLocation.title}</p>
    {auth.authenticated?<button onClick={checkOff} 
    disabled={hasVisited}
    className={` btn btn-primary btn-sm mb-2`}>{hasVisited?"Visited":"Check off"}</button>:null}
    <p>Most recent visits:</p>
    <ul className="list-group">
      {visitedBy}
    </ul>
    </div>
  )
}

export default LocationDetail