import React, { useContext } from 'react';
import { UserStatsContext } from '../UserStatsContext';

function QuickInfo() {
  const { info } = useContext(UserStatsContext);

  const renderInfo = () => {
    if (info.userStats) {
      return (
        <div className="quick-info-value">
          <h4 className=''>{info.userStats.cumulativeData.data[5]}</h4>
          <h4>/</h4>
          <h4>{info.userStats.numLocations}</h4>
          <p className='m-0'>locations visited</p>
          <h5 className='m-0'>You are in {info.userStats.userRanking} place.</h5>
        </div>
  
      );
    } else {
      return 'Loading';
    }
  };

  return (
    <div className="quickInfo">
      <div className="dashboard-label-container">
        <i class="bi bi-award-fill"></i>
        <h5>User Status</h5>
      </div>
      {renderInfo()}
     
    </div>
  );
}

export default QuickInfo;
