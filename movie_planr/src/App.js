import React from 'react';
import Map from './components/Map';
import Navbar from './components/Navbar';
import RouterComponent from './components/RouterComponent';
import { withScriptjs } from 'react-google-maps';
import './scss/app.scss';

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${apiKey}`;

function App(props) {
  const MapLoader = withScriptjs(Map);

  return (
    <div className='AppContainer'>
      <Navbar />
      <div className='MainContainer'>
        <RouterComponent />
        <MapLoader
          googleMapURL={googleMapURL}
          loadingElement={<div style={{ height: `100%`, width: `100%` }} />}
        />
      </div>
    </div>
  );
}

export default App;