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
    const [showMarkers, setShowMarkers] = useState(false);

    var mapRef = null;

    const setRef = (ref) => {
        mapRef = ref;
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
            mapRef.panTo({ 'lat': place.lat, 'lng': place.lng });
            setZoom(ZOOMEDIN);

            console.log("one place left; should clean up routes");
        } else if (props.places.length >= 2) {
            getDirectionsResult(props.places, setDirections);

            console.log(">=2 places left");
        } else {
            localStorage.removeItem('placesData');
            setDirections({ routes: [] });
            mapRef.panTo(DEFAULTCENTER);
            setZoom(DEFAULTZOOM);
        }
    }, [props.places, mapRef]);

    useEffect(() => {        
        const newState = props.places.length === 0;
        console.log(newState);
        setShowMarkers(newState);
    }, [props.places])

    return (
        <div>
            <GoogleMap
                ref={setRef}

                defaultCenter={DEFAULTCENTER}
                defaultZoom={DEFAULTZOOM}

                zoom={zoom}
            >
                {showMarkers && props.markers.map((data) => {
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