import React,{useState,useEffect} from 'react'
import axios from 'axios'
import VisitButtons from './VisitButtons';
import RecentVisitors from './RecentVisitors';

function LocationDetail(props) {
  const {setSelectedLocation, selectedLocation, getLocationData, auth}=props
  
  const [hasVisited,setHasVisited]=useState(false);
  const [showRecentVisitors,setShowRecentVisitors]=useState(true);

  useEffect(() => {
    selectedLocation.visitedBy.forEach(visitor=>{
      if(visitor.userId===auth.id){
        setHasVisited(true)
      }else{
        setHasVisited(false)
      }
    })
    if(selectedLocation.visitedBy.length===0){
      setHasVisited(false)
    }
  },[auth.id,selectedLocation])


  return (
    <div className='location-detail'>
      {/* This is the label */}
      <div className="label-box">
        <div className="title title-main">Title:</div>
        <div className="title">{selectedLocation.title}</div>   
      </div>
      
      {/* This is the button */}


     

      {auth.authenticated?<VisitButtons selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} getLocationData={getLocationData}/>:null}
      {showRecentVisitors?<RecentVisitors details={selectedLocation}/>:null}

      {/* This is the recent visitors */}
      <div className='close-icon' >
        <div className='' onClick={()=>{setSelectedLocation(null)}}>
           <i className="bi bi-caret-up-fill "></i>
          <p>close</p>
        </div>
       
      </div>
      
      
    </div>
  )
}

export default LocationDetail
