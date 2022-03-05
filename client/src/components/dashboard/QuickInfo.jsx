import React, { useContext } from 'react'
import { UserStatsContext } from '../UserStatsContext'

function QuickInfo() {
  const { info } = useContext(UserStatsContext)

  const renderInfo = () => {
    if (info.userStats) {
      return (
        <div className='container-fluid'>
          <div className='quick-info-label'>
            <span class="bi-award-fill"></span>
            <h6>Total Visits</h6>
          </div>

          <p>{info.userStats.cumulativeData.data[5]} / {info.userStats.numLocations}</p>
        </div>

      )
    } else {
      return ("Loading")
    }
  }

  return (
    <div className='quickInfo'>
      {renderInfo()}
    </div>
  )
}

export default QuickInfo