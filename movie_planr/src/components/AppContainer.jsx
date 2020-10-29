import React, { useState, useEffect } from 'react';
import Map from './Map';
import Navbar from './Navbar';
import Planner from './Planner';
import data from '../data/movieData.json';
import '../scss/app.scss';

const AppContainer = (props) => {
  const [markers, setMarkers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [mapHeight, setMapHeight] = useState(750);
  const [mapWidth, setMapWidth] = useState(750);

  const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
  const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

  useEffect(() => {
    if (localStorage.getItem('placesData')) {
      setPlaces(JSON.parse(localStorage.getItem('placesData')));
    }
    const output = data.map(d => { return { ...d, 'isOpen': false } });
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
    const newState = [...places, newPlace]
    setPlaces(newState);
  }

  const removePlace = (id) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('placesData', JSON.stringify(places))
  }, [places])


  // const plannerWidth = 400;
  useEffect(() => {
    setMapHeight(750);
    setMapWidth(750);
  }, []);

  // const getContainer = () => {
  //   return containerRef;
  // }

  // var containerRef = null;
  // const setContainerRef = (r) => {
  //   containerRef = r;
  // };

  // var plannerRef = null;
  // const setPlannerRef = (r) => {
  //   plannerRef = r;
  // };

  // const mql1 = window.matchMedia('(max-width: 800px)');
  // const mql2 = window.matchMedia('(max-width: 500px)');

  // const setMapHeightAndWidth = (r, offset) => {
  //   if (r != null) {
  //     const computed = retNum(window.getComputedStyle(r).getPropertyValue("width"));

  //     console.log(computed, offset);

  //     setMapHeight(computed - offset);
  //     setMapWidth(computed - offset);
  //   }
  // }



  // useEffect(() => {
  //    const fn1 = () => {
  //         mql1.addEventListener("change", () => {
  
  //       if (containerRef != null && plannerRef != null) {
  //         const offset = retNum(window.getComputedStyle(plannerRef).getPropertyValue("width"));

  //         setMapHeightAndWidth(containerRef, offset);
  //       }
  //     })

  //     mql2.addEventListener("change", () => {
  //       setMapHeightAndWidth(containerRef, 0);
  //     })
  //   }

  //   fn1();
  // }, [containerRef])

  // useEffect(() => {
  //   if (containerRef != null && plannerRef != null) {
  //     const offset = retNum(window.getComputedStyle(plannerRef).getPropertyValue("width"));

  //     if (mql2.matches) {
  //       setMapHeightAndWidth(containerRef, 0);
  //     } else {
  //       setMapHeightAndWidth(containerRef, offset);
  //     }
  //   }
  // }, [containerRef, plannerRef, mql2.matches, setMapHeightAndWidth])

  return (
    <div className='AppContainer'
        // ref={setContainerRef}
      >
        <Navbar {...props} />
      <div className='MainContainer'>
          <Planner
            // setPlannerRef={setPlannerRef}
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

export default AppContainer;