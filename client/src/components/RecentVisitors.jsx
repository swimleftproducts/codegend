import React,{useContext} from 'react'
import { LocationContext } from "./LocationContext";

function RecentVisitors() {

  const {selectedLocation} = useContext(LocationContext)


  const renderVisits = ()=>{
    
    
    const list = [];
   
    if (!selectedLocation.visitedBy[0]) return list
    else{

      for (let i = 0; i < 5; i++) {
        if(selectedLocation.visitedBy[i]){
            let visitDate = new Date(selectedLocation.visitedBy[i].date)
            list.push(
              <div key={i} className='recent-visits-entry'>
              <h6>{selectedLocation.visitedBy[i].name}</h6>
              <h6>{`${visitDate.getUTCMonth()+1}/${visitDate.getUTCDate()}`}</h6>
            </div>
            )    
        }    
      }
      return list;
    }
    
  
  }

  return (
    <div className="recent-visits">
      <div className="recent-visits-title">
          <h5>Last 5 Visitors:</h5>
      </div>
      <div className="recent-visits-list">
       {renderVisits()}
      </div>
    </div>
  )
}

export default RecentVisitors
