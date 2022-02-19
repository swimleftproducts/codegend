import React, {useState,useEffect} from 'react'
import axios from 'axios'

function HighScoreCard(props) {
  const {setShowHighScore}=props
  const [highScores,setHighScores]= useState()

  const hide = () => {
    setShowHighScore(false)
  }
  useEffect(() => {  
    getHighScores();
  },[])
 
   async function getHighScores(){
     let response = await axios('/api/highscore/')
     let highScores = await response.data
     setHighScores(highScores)
   }


  const listHighScores =()=>{
   
    const results= highScores.map((score) => { 
      return(
      <tr>
        <th scope="row">{score.score}</th>
        <td>{score.name}</td>
      </tr>)
    })
    return results;
  }

  return (
  <div onClick={hide} className="highscore-card card border-success mb-3">
   <table class="table">
  <thead>
    <tr>
      <th scope="col"># visited</th>
      <th scope="col">Name</th>
    </tr>
  </thead>
  <tbody>
      {highScores?listHighScores():null}    
  </tbody>
</table>
  </div>
  )
}

export default HighScoreCard