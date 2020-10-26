import React from 'react';
import Map from './components/Map';
import Navbar from './components/Navbar';
import { withScriptjs } from "react-google-maps";
import './App.css';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

function App(props) {
  const MapLoader = withScriptjs(Map);

  return (
    <div className="app">
      <Navbar />
      <MapLoader
        googleMapURL={googleMapURL}
        loadingElement={<div style={{ height: `100%` }} />}
      />
    </div>
  );
}

export default App;