import React, {useState,createContext } from 'react'
import axios from 'axios';
export const UserStatsContext = createContext();


export const UserStatsProvider = (props) => { 
  const [info,setInfo]=useState({})

  async function getUserStats(){
    let response = await axios('/api/analytics/userStats/0/6')
    let userStats= await response.data
    setInfo(userStats)
  }
  
  return(
    <UserStatsContext.Provider value={{info,getUserStats}}>
      {props.children}
    </UserStatsContext.Provider>
  ) 
}