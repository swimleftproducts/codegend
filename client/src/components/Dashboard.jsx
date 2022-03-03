import React, {useContext} from 'react'
import { DisplayContext } from './DisplayContext'
import { LocationContext } from './LocationContext'
import Charts from './dashboard/Chart'




function Dashboard() {
 
  const{setShowDashboard}=useContext(DisplayContext)

  return (
    <div className='dashboard'>
      <div className='dashboard-small'> Quick Info</div>
      <div  className='dashboard-small'> Leaderboard</div>
      <div className='dashboard-large'><Charts/></div>
      <div className='dashboard-med'>recent visits</div>
      <div className='dashboard-med'>Other recent visits</div>
      <div className='close-icon mt-2' >
        <div className='' onClick={()=>{
         
          setShowDashboard(false)}}>
           <i className="bi bi-caret-up-fill "></i>
          <p>close</p>
        </div>
       
      </div>
    </div>
  )
}

export default Dashboard