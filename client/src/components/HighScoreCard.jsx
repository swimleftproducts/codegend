import React, { useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { DisplayContext } from './DisplayContext';

function HighScoreCard(props) {
  const { setShowHighScore } = useContext(DisplayContext);
  const [highScores, setHighScores] = useState();

  const hide = () => {
    setShowHighScore(false);
  };
  useEffect(() => {
    getHighScores();
  }, []);

  async function getHighScores() {
    let response = await axios('/api/analytics/highscore/5');
    let highScores = await response.data;

    setHighScores(highScores);
  }

  const renderLeaderboard = () => {
    if (highScores) {
      const results = highScores.map((score, index) => {
        return (
          <div key={index} className="leaderboard-main-item">
            <h6>{index + 1}</h6>
            <h6>{score.name}</h6>
            <h6>{score.score}</h6>
          </div>
        );
      });
      return results;
    } else {
      return [];
    }
  };

  return (
    <div onClick={hide} className="highscore-card card  ">
      <div className="highscore-title">
        <i
          className="bi bi-bar-chart-fill"
          onClick={() => {
            setShowHighScore(true);
          }}
        ></i>
        <h5>Leaderboard</h5>
      </div>
      <div className="highscore-label">
        <h6>Rank</h6>
        <h6>Name</h6>
        <h6>Visits</h6>
      </div>
      <div className="leaderboard-main">{renderLeaderboard()}

      </div>
    </div>
  );
}

export default HighScoreCard;
