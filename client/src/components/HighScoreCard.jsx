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


  const renderLeaderboard = () => {
  if(highScores){
    const results = highScores.map(
        (score, index)=>{
          return(
          <div key={index} className='leaderboard-item'>
            <h6>{index+1}</h6>
            <h6>{score.name}</h6>
            <h6>{score.score}</h6>
          </div> 
          )
        }
    )
    return results
  }else{
    return []
  }
  }

  return (
  <div onClick={hide} className="highscore-card card border-success ">
    <div className='highscore-title'>
     <i className=" bi bi-bar-chart-fill" onClick={()=>{setShowHighScore(true)}}></i>
     <h5>Leaderboard</h5>
    </div>
    <div className='leaderboard'>
     {renderLeaderboard()}
      
    </div>
 
  </div>
  )
}

export default HighScoreCard

{/* <table className="table">
<thead>
  <tr>
    <th scope="col"># visited</th>
    <th scope="col">Name</th>
  </tr>
</thead>
<tbody>
    {highScores?listHighScores():null}    
</tbody>
</table> */}