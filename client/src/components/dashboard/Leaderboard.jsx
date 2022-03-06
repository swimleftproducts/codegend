import React, { useContext } from 'react';
import { UserStatsContext } from '../UserStatsContext';


function Leaderboard () {
  const { info } = useContext(UserStatsContext);



  const renderLeaderboard = () => {
    if (info.leaderboard) {
      return info.leaderboard.map((leader, index) => {
        let ranks = ["1st", "2nd", "3rd"];
        return (
          <div className='leaderboard-container'>
            <div key={ index } className='leaderboard-value'>
              <p >{ ranks[index] } </p>
              <p>{ leader.name }</p>
            </div>
          </div>
        );
      });
    } else {
      return "Loading";
    }
  };


  return (
    <div className="leaderboard">
      <div className='dashboard-label-container'>
        <i class="bi bi-bar-chart-fill"></i>
        <h5>Leader Board</h5>
      </div>
      { renderLeaderboard() }
    </div>
  );
}

export default Leaderboard;