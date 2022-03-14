import React, { useState, useContext } from "react";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import axios from "axios";
import { DisplayContext } from "./DisplayContext";
import { LocationContext } from "./LocationContext";

export default function ReactDayPicker(props) {
  const{setShowDatePicker,setShowRecentVisitors}=useContext(DisplayContext)

  const {selectedLocation,getLocationData, setSelectedLocation, setInfoBoxOffset} = useContext(LocationContext)
 
  const [selectedDay,setSelectedDay]= useState(new Date())

  const handleDayClick = (day,{selected}) => {
    const date = new Date(day)

    setSelectedDay(date)
  }

const addLocation =  async (e) => {
  e.preventDefault();
  const locData = {id:selectedLocation._id,date:selectedDay}
 
  await axios.post('/api/geo/addpastlocation',locData, { withCredentials: true })
  .then((response) => { 
    getLocationData()
    setSelectedLocation(response.data)
    setShowDatePicker(false);
    setShowRecentVisitors(true)
    setInfoBoxOffset(-30)
  }) 
}

  return(
    <div className="date-picker">
      <DayPicker 
    selectedDays={selectedDay}
    onDayClick={handleDayClick}/>
    <p> You visited on: {`${selectedDay.getUTCMonth()+1}/${selectedDay.getUTCDate()}`}</p>
    <button className="btn-add-past-visit" onClick={addLocation}>Confirm Visit</button>
    </div>  
  ) 
}