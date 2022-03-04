import React, {useState,createContext } from 'react'
import axios from 'axios';
export const UserStatsContext = createContext();


export const UserStatsProvider = (props) => { 
  const [info,setInfo]=useState({})

  async function getUserStats(){
    let response = await axios('/api/analytics/userStats/0/6')
    let userStats= await response.data
    let response2 = await axios('/api/analytics/recentVisits')
    let othersVisits= await response2.data
    let response3 = await axios('/api/analytics/highscore/3')
    let leaderboard= await response3.data
   
    setInfo({userStats,othersVisits,leaderboard})
  }

  
  return(
    <UserStatsContext.Provider value={{info,getUserStats}}>
      {props.children}
    </UserStatsContext.Provider>
  ) 
}