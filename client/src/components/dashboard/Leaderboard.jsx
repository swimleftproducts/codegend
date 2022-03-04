import React,{useContext} from 'react'
import {UserStatsContext} from '../UserStatsContext'


function Leaderboard() {
  const{info}=useContext(UserStatsContext)

  
 
  const renderLeaderboard = () => {
    if(info.leaderboard){
     return  info.leaderboard.map((leader,index) => { 
        let ranks = ["1st", "2nd","3rd"]
        return(
        <div key={index} className=''>
            <p >{ranks[index]} {leader.name}</p>   
        </div>
        )                  
      })
    }else{
      return "Loading"
    }
  }


  return (
    <div className="leaderboard">
     {renderLeaderboard()}
    </div>
  )
}

export default Leaderboard