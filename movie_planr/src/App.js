import React, { useState } from 'react';
import Map from './components/Map';
import Navbar from './components/Navbar';
import Planner from './components/Planner';
import './scss/app.scss';
import data from './data/movieData.json';

function App() {
  const [markers, setMarkers] = useState(data);
  const [places, setPlaces] = useState([]); //same schema as movieData (minus movie details)

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

  const addtoPlaces = (newPlace) => {
    setPlaces([...places, newPlace]);
  }

  const removePlace = (id) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  return (
    <div className='AppContainer'>
      <Navbar />
      <div className='MainContainer'>
        <Planner
          addtoPlaces={addtoPlaces}
          removePlace={removePlace}
          places={places} />
        <Map
          markers={markers}
          places={places}
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
          containerElement={<div style={{ height: `700px`, width: `700px`, margin: `0px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default App;