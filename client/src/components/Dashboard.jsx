import React, {useContext, useEffect} from 'react'
import { DisplayContext } from './DisplayContext'
import { LocationContext } from './LocationContext'
import Charts from './dashboard/Chart'
import Title from './dashboard/Title'
import MyRecentVisits from './dashboard/MyRecentVisits'
import { UserStatsContext } from './UserStatsContext'



function Dashboard() {
 
  const{setShowDashboard}=useContext(DisplayContext)

  const{getUserStats}=useContext(UserStatsContext)

  useEffect(() => { 
    getUserStats()
   },[])

  return (
    <div className='dashboard'>
      <div className='dashboard-title '><Title/></div>
      <div className='dashboard-small dashboard-small-left'> Quick Info</div>
      <div  className='dashboard-small dashboard-small-right'> Leaderboard</div>
      <div className='dashboard-large'><Charts/></div>
      <div className='dashboard-med dashboard-med-left'><MyRecentVisits/></div>
      <div className='dashboard-med dashboard-med-right'>Other recent visits</div>
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