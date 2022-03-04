import React, {useContext} from 'react'
import { UserStatsContext } from '../UserStatsContext'

function QuickInfo() {
  const {info}= useContext(UserStatsContext)

  const renderInfo =()=>{
    if(info.userStats){
      return(
        <p> Total Visits {info.userStats.cumulativeData.data[5]} / {info.userStats.numLocations}</p>
      )
    }else{
      return("Loading")
    }
  }

  return (
    <div>
      {renderInfo()}
    </div>
  )
}

export default QuickInfo