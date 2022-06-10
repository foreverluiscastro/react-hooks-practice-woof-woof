import React from 'react'

function DogSpan({ dog , onSpanClick }) {
    
    const handleClick = () => {
        onSpanClick(dog)
    }

  return (
    <span onClick={handleClick}>{dog.name}</span>
  )
}

export default DogSpan