import React from 'react'

function RecentVisitors(props) {
  const {details}=props
  console.log(details);

  const renderVisits = ()=>{
   
    const list = [];
    console.log(details.visitedBy[0]);
    if (!details.visitedBy[0]) return list
    else{

      for (let i = 0; i < 5; i++) {
        if(details.visitedBy[i]){
            let visitDate = new Date(details.visitedBy[i].date)
            list.push(
              <div key={i} className='recent-visits-entry'>
              <h6>{details.visitedBy[i].name}</h6>
              <h6>{`${visitDate.getUTCMonth()+1}/${visitDate.getUTCDate()}`}</h6>
            </div>
            )    
        }    
      }
      return list;
    }
    
    // return details.visitedBy.map((visitor,index)=>{
    //   const {name,date}=visitor
    //   const visitDate = new Date(date)
      
    //   return <div key={index} className='recent-visits-entry'>
    //   <h6>{name}</h6>
    //   <h6>{`${visitDate.getUTCMonth()+1}/${visitDate.getUTCDate()}`}</h6>
    // </div>
   
    // })
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
