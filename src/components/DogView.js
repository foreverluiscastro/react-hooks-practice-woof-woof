import React from 'react'

function DogView({ dog , onBehaviorChange }) {

    const handleClick = () => {
        onBehaviorChange(dog)
    }


  return (
    <div id="dog-info">
        <img src={dog.image}/>
        <h2>{dog.name}</h2>
        <button onClick={handleClick}>{ dog.isGoodDog ? "Good Dog!" : "Bad Dog!" }</button>
    </div>
  )
}

export default DogView