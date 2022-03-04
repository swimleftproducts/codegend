import React,{useContext} from 'react'
import {UserStatsContext} from '../UserStatsContext'


function MyRecentVisits() {
  const{info}=useContext(UserStatsContext)

  const makeDate = (dateString)=>{
    let date= new Date(dateString)
    const month = date.getMonth()
    const year = date.getFullYear()
    const day = date.getDate()
    return `${month}/${day}/${year}`
  }
 
  const renderVisits = () => {
    if(info.recentVisits){
     return  info.recentVisits.map((visit,index) => { 
        return(
        <div key={index} className='my-recent-visits-entry'>
            <p >{visit.title}</p>
            <p>{makeDate(visit.date)}</p>
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
          <h6>Your Visits:</h6>
         
      </div>
      <div className="my-recent-visits-list">
       {renderVisits()}
      </div>
    </div>
  )
}

export default MyRecentVisits