import React from 'react'

function HighScoreCard(props) {
  const {setShowHighScore}=props

  const hide = () => {
    setShowHighScore(false)
  }

  return (
  <div onClick={hide} className="highscore-card card border-success mb-3">
    <div className="card-header bg-transparent border-success">Header</div>
    <div className="card-body text-success">
      <h5 className="card-title">Success card title</h5>
      <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    </div>
    <div className="card-footer bg-transparent border-success">Footer</div>
  </div>
  )
}

export default HighScoreCard