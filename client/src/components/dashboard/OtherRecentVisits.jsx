import React,{useContext} from 'react'
import {UserStatsContext} from '../UserStatsContext'


function OtherRecentVisits() {
  const{info}=useContext(UserStatsContext)

  const makeDate = (dateString)=>{
    let date= new Date(dateString)
    const month = date.getMonth()
    const year = date.getFullYear()
    const day = date.getDate()
    return `${month+1}/${day}/${year}`
  }
   
  const renderVisits = () => {
    if(info.othersVisits){
      return  info.othersVisits.map((visit,index) => { 
         return(
         <div key={index} className='my-recent-visits-entry'>
             <p >{visit.title}</p>
             <p>{makeDate(visit.date)}</p>
             <p>{visit.name}</p>
         </div>
         )
                   
       })
 
 
     }else{
       return "Loading"
     }
  }


  return (
    <div className="my-recent-visits">
      <div className=" my-recent-visits-title">
          <h6>Other Recent Visits:</h6>
         
      </div>
      <div className="my-recent-visits-list">
       {renderVisits()}
      </div>
    </div>
  )
}

export default OtherRecentVisits