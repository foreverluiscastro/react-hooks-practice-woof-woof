import React, { useEffect , useState } from "react";
import DogSpan from "./DogSpan";
import DogView from "./DogView";

function App() {
  const [dogs, setDogs] = useState([])
  const [dogView, setDogView] = useState(null)
  const [goodDogFilter, setGoodDogFilter] = useState(false)

  const API = 'http://localhost:3001/pups'

  useEffect(() => {
    fetch(API)
    .then((r) => r.json())
    .then((dogs) => setDogs(dogs))
  }, [])

  const handleSpanClick = (dog) => {
    setDogView(dog)
  }

  const handleFilterClick = () => {
    setGoodDogFilter(!goodDogFilter)
  }

  const handleBehaviorChange = (dog) => {
    console.log(dog)
    dog.isGoodDog = !dog.isGoodDog
    // debugger
    const configObj = {
      method: 'PATCH',
      headers: {
        'Content-Type':'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(dog)
    }
    fetch(API + `/${dog.id}`, configObj)
    .then((r) => r.json())
    .then((patchedDog) => {
      const updatedList = dogs.filter((dog) => dog.id != patchedDog.id)
      updatedList.push(patchedDog)
      const santizedArray = updatedList.sort((prevObj, currentObj) => {
        return prevObj.id - currentObj.id
      })
      setDogs(santizedArray)
    })
  }
  
  const filteredDogs = dogs.filter((dog) => {
    if (goodDogFilter === false) return true
    return dog.isGoodDog === true
  })
    
  const renderSpans = filteredDogs.map((dog) => <DogSpan key={dog.id} dog={dog} onSpanClick={handleSpanClick}/>)

  return (
    <div className="App">
      <div id="filter-div">
        <button id="good-dog-filter" onClick={handleFilterClick}>Filter good dogs: {goodDogFilter === false ? 'OFF' : 'YES'}</button>
      </div>
      <div id="dog-bar">
      {renderSpans}
      </div>
      <div id="dog-summary-container">
        <h1>DOGGO:</h1>
        <div id="dog-info">
          { !dogView ? "" : <DogView dog={dogView} onBehaviorChange={handleBehaviorChange}/> }
        </div>
      </div>
    </div>
  );
}

export default App;
