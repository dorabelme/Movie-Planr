import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Navbar from './components/Navbar';
import Planner from './components/Planner';
import './scss/app.scss';
import data from './data/movieData.json';

function App() {
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]); //same schema as movieData (minus movie details)

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

  useEffect(() => {
    const output = data.map(d => { return { ...d, 'isOpen': false } });
    // console.log(output);
    setMarkers(output);
  }, []);

  const toggleMarker = (id) => {
    const elem = markers.find(el => el.id === id);
    const updatedElem = { ...elem }
    updatedElem.isOpen = !elem.isOpen;
    const restOfElems = markers.filter(el => el.id !== id);
    const output = [...restOfElems, updatedElem];
    setMarkers(output);
  }

  const addtoPlaces = (newPlace) => {
    setPlaces([...places, newPlace]);
  }

  const removePlace = (id) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  const [mapHeight, setMapHeight] = useState(0);
  const [mapWidth, setMapWidth] = useState(0);

  // const plannerWidth = 400;

  const retNum = (str) => {
    var num = parseFloat(str);
    // var num = str.replace(/[^0-9]/g, '');
    return num;
  }

  var containerRef = null;

  const getContainer = () => {
    return containerRef;
  }

  const setContainerRef = (r) => {
    containerRef = r;
  };

  var plannerRef = null;
  const setPlannerRef = (r) => {
    plannerRef = r;
  };

  const mql1 = window.matchMedia('(max-width: 800px)');
  const mql2 = window.matchMedia('(max-width: 500px)');

  const setMapHeightAndWidth = (r, offset) => {
    if (r != null) {
      const computed = retNum(window.getComputedStyle(r).getPropertyValue("width"));

      console.log(computed, offset);

      setMapHeight(computed - offset);
      setMapWidth(computed - offset);
    }
  }

  useEffect(() => {
    mql1.addEventListener("change", () => {
      console.log(window, containerRef, plannerRef);

      if (containerRef != null && plannerRef != null) {
        const offset = retNum(window.getComputedStyle(plannerRef).getPropertyValue("width"));

        setMapHeightAndWidth(containerRef, offset);
      }
    })

    mql2.addEventListener("change", () => {
      setMapHeightAndWidth(containerRef, 0);
    })
  }, [])

  useEffect(() => {
    console.log(containerRef, plannerRef);

    if (containerRef != null && plannerRef != null) {
      const offset = retNum(window.getComputedStyle(plannerRef).getPropertyValue("width"));

      if (mql2.matches) {
        setMapHeightAndWidth(containerRef, 0);
      } else {
        setMapHeightAndWidth(containerRef, offset);
      }
    }
  }, [containerRef, plannerRef])

  return (
    <div className='AppContainer'
      ref={setContainerRef}
    >
      <Navbar />
      <div className='MainContainer'>
        <Planner
          setPlannerRef={setPlannerRef}
          addtoPlaces={addtoPlaces}
          removePlace={removePlace}
          places={places} />
        <div>
          <Map
            markers={markers}
            toggleMarker={toggleMarker}
            places={places}
            googleMapURL={googleMapURL}
            loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
            containerElement={<div className='GoogleMapWrapper' style={{ height: `${mapHeight}px`, width: `${mapWidth}px` }} />}
            mapElement={<div style={{ height: `100%` }} />}
          />
        </div>
      </div>
    </div>
  );
}

export default App;