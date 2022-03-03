import React,{useState,useEffect, useContext} from 'react'
import axios from 'axios'
import VisitButtons from './VisitButtons';
import DatePicker from './DatePicker'
import RecentVisitors from './RecentVisitors';
import {LocationContext} from './LocationContext'
import { DisplayContext } from './DisplayContext';

function LocationDetail(props) {

  const {selectedLocation, setSelectedLocation, setInfoBoxOffset} = useContext(LocationContext)

  const{showDatePicker,showRecentVisitors} = useContext(DisplayContext)

  const {auth}=props
  
  const [hasVisited,setHasVisited]=useState(false);
  
 
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
    <div className={` location-detail`}>
      {/* This is the label */}
      <div className="label-box">
        <div className="title title-main">Title:</div>
        <div className="title">{selectedLocation.title}</div>   
      </div> 

      {auth.authenticated?<VisitButtons/>:null}
      {showRecentVisitors?<RecentVisitors/>:null}
      {showDatePicker?<DatePicker/>:null}

     
      <div className='close-icon' >
        <div className='' onClick={()=>{
          setInfoBoxOffset(-40) 
          setSelectedLocation(null)}}>
           <i className="bi bi-caret-up-fill "></i>
          <p>close</p>
        </div>
       
      </div>
      
      
    </div>
  )
}

export default LocationDetail
