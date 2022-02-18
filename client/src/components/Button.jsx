import React from 'react'

function Button(props) {
  const {extraClasses, onClick} = props
  return (
    <div type="button" className={`${extraClasses} btn `}
      onClick={(e)=>{onClick()}}
    >{props.text}</div>
  )
}

export default Button