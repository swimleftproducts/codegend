import React, {useState,createContext, Children} from 'react'

export const DisplayContext = createContext();


export const DisplayProvider = (props) => { 
  const[showLogin,setShowLogin]= useState(false)
  const[showRegister,setShowRegister]= useState(false)
  const[showHighScore,setShowHighScore]= useState(false)
  const[showDatePicker,setShowDatePicker]=useState(false)
  const [showRecentVisitors,setShowRecentVisitors]=useState(true);


  return(
    <DisplayContext.Provider value={{showRecentVisitors,setShowRecentVisitors,showDatePicker,setShowDatePicker, showRegister,setShowRegister, showLogin, setShowLogin, setShowHighScore, showHighScore}}>
      {props.children}
    </DisplayContext.Provider>
  ) 
}