import React, { useContext } from 'react';
import { UserStatsContext } from '../UserStatsContext';

function QuickInfo () {
  const { info } = useContext(UserStatsContext);

  const renderInfo = () => {
    if (info.userStats) {
      return (
        // <div className='dashboard-label'>

        <div className='quick-info-value'>
          <h4>{ info.userStats.cumulativeData.data[5] }</h4>
          <h4>/</h4>
          <h4>{ info.userStats.numLocations }</h4>
        </div>
        // </div>

      );
    } else {
      return ("Loading");
    }
  };

  return (
    <div className='quickInfo'>
      <div className='dashboard-label-container'>
        <i class="bi bi-award-fill"></i>
        <h5>Total Visits</h5>
      </div>
      { renderInfo()}
    </div>
  );
}

export default QuickInfo;
