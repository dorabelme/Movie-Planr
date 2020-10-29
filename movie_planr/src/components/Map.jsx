import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from 'react-google-maps';
// import data from '../data/movieData.json';
import { withScriptjs } from 'react-google-maps';
import { getDirectionsResult } from '../utils';
// import { MAP } from 'react-google-maps/lib/constants';

const DEFAULTZOOM = 13;
const ZOOMEDIN = 15;
const DEFAULTCENTER = {
    lat: 37.773972,
    lng: -122.431297
}

function Map(props) {
    const [directions, setDirections] = useState(null);
    const [zoom, setZoom] = useState(DEFAULTZOOM);

    // const directionsDisplay = new google.maps.DirectionsRenderer();

    var mapRef = null;

    const setRef = (ref) => {
        mapRef = ref;

        // if (mapRef != null) {
        //     console.log(mapRef.context[MAP]);
        //     directionsDisplay.setMap(mapRef.context[MAP]);
        // }        
    }

    var rendereRef = null;

    const setRendererRef = (ref) => {
        rendereRef = ref;
        console.log(rendereRef);
    }

    useEffect(() => {
        if (props.places.length === 1) {
            const place = props.places[0];
            setDirections({ routes: [] });
            // directionsDisplay.setPanel(null);
            // directionsDisplay.setMap(null);
            mapRef.panTo({ 'lat': place.lat, 'lng': place.lng });
            setZoom(ZOOMEDIN);

            console.log("one place left; should clean up routes");
            // console.log(directions);
        } else if (props.places.length >= 2) {
            getDirectionsResult(props.places, setDirections);

            console.log(">=2 places left");
            // console.log(directions);            
        } else {
            localStorage.removeItem('placesData');
            setDirections({ routes: [] });
            mapRef.panTo(DEFAULTCENTER);
            setZoom(DEFAULTZOOM);
            // directionsDisplay.setPanel(null);
            // directionsDisplay.setMap(null);

            console.log("zero place left; should clean up routes");
            // console.log(directions);
        }
    }, [props.places, mapRef]);

    // useEffect(() => {
    //     if (directions != null) {
    //         directionsDisplay.setDirections(directions);
    //     }
    // }, [directions])

    return (
        <div>
            <GoogleMap
                ref={setRef}

                defaultCenter={DEFAULTCENTER}
                defaultZoom={DEFAULTZOOM}

                zoom={zoom}
            >
                {props.markers.map((data) => {
                    return (<Marker
                        key={data.id}
                        position={
                            { lat: data.lat, lng: data.lng }
                        }
                        title={data.locations}
                        name={data.locations}
                        onClick={() => props.toggleMarker(data.id)}
                    >
                        {data.isOpen && <InfoWindow
                            key={data.id + 1000}
                            onCloseClick={() => props.toggleMarker(data.id)}
                            options={{ maxWidth: 300 }} >
                            <div>
                                <h1>{data.locations}</h1>
                            </div>
                        </InfoWindow>}
                    </Marker>
                    )
                })}

                {directions && directions.routes.length > 0 && <DirectionsRenderer ref={setRendererRef} directions={directions} />}
            </GoogleMap>
        </div>
    );
}


export default withScriptjs(withGoogleMap(Map));