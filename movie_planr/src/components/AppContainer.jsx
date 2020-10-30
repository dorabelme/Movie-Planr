import React, { useState, useEffect } from 'react';
import Map from './Map';
import Navbar from './Navbar';
import Planner from './Planner';
import data from '../data/movieData.json';
import { retNum } from '../utils';
import '../scss/app.scss';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

const DEFAULT_HEIGHT = 750;
const DEFAULT_WIDTH = DEFAULT_HEIGHT;

const AppContainer = (props) => {

  /* States for component */
  const [markers, setMarkers] = useState([]);
  const [legs, setLegs] = useState([]);
  const [places, setPlaces] = useState([]);
  const [mapHeight, setMapHeight] = useState(DEFAULT_HEIGHT);
  const [mapWidth, setMapWidth] = useState(DEFAULT_WIDTH);

  /* Get reference for map and planner container */
  var containerRef = null;
  const setContainerRef = (r) => {
    containerRef = r;
  };

  var plannerRef = null;
  const setPlannerRef = (r) => {
    plannerRef = r;
  };

  /* Set state for markers and places on initial load */
  useEffect(() => {
    if (localStorage.getItem('placesData')) {
      setPlaces(JSON.parse(localStorage.getItem('placesData')));
    }
    const output = data.map(d => { return { ...d, 'isOpen': false } });
    setMarkers(output);
  }, []);

   /* Update localStorage on state changes in places*/
  useEffect(() => {
    localStorage.setItem('placesData', JSON.stringify(places))
  }, [places])


  /* Toggles the markers open state */
  const toggleMarker = (id) => {
    const elem = markers.find(el => el.id === id);
    const updatedElem = { ...elem }
    updatedElem.isOpen = !elem.isOpen;
    const restOfElems = markers.filter(el => el.id !== id);
    const output = [...restOfElems, updatedElem];
    setMarkers(output);
  }

   /* Update places state with new location*/
  const addtoPlaces = (newPlace) => {
    const newState = [...places, newPlace]
    setPlaces(newState);
  }

  /* Remove location from places state*/
  const removePlace = (id) => {
    setPlaces(places.filter(place => place.id !== id));
  };

  /* Update legs state for planner */
  const updateLegs = (legs) => {
    setLegs(legs);
  }

  /* Set map height and width - media queries*/
  useEffect(() => {
    const tabletSelector = window.matchMedia('(max-width: 800px)');
    const iphoneSelector = window.matchMedia('(max-width: 500px)');
    
    if (containerRef != null && plannerRef != null) {
      const containerWidth = retNum(window.getComputedStyle(containerRef).getPropertyValue("width"));
      const plannerWidth = retNum(window.getComputedStyle(plannerRef).getPropertyValue("width"));
      const plannerHeight = retNum(window.getComputedStyle(plannerRef).getPropertyValue("height"));

      var height = 0;
      var width = 0;

      if (iphoneSelector.matches) {
        width = containerWidth;
        height = width;        
      } else if (tabletSelector.matches) { 
        height = plannerHeight;
        width = containerWidth - plannerWidth;
      } else {
        width = containerWidth - plannerWidth;
        height = width;
      }

      setMapHeight(height);
      setMapWidth(width);
    }
  }, [containerRef, plannerRef])

  return (
    <div className='AppContainer'
        ref={setContainerRef}
      >
        <Navbar {...props} />
      <div className='MainContainer'>
        <Planner
            legs={legs}
            setPlannerRef={setPlannerRef}
            addtoPlaces={addtoPlaces}
            removePlace={removePlace}
            places={places} />
          <div>
          <Map
              updateLegs={updateLegs}
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