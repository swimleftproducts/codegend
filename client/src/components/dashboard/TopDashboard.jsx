import React from 'react'
import QuickInfo from './QuickInfo'
import Leaderboard from './Leaderboard'

function TopDashboard() {
  return (
    <div >
        <div className='dashboard-small dashboard-small-left'> <QuickInfo/></div>
        <div  className='dashboard-small dashboard-small-right'> <Leaderboard/></div>
    </div>
  )
}

export default TopDashboard