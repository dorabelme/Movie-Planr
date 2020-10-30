import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from 'react-google-maps';
import { withScriptjs } from 'react-google-maps';
import { getDirectionsResult } from '../utils';

const DEFAULTZOOM = 13;
const ZOOMEDIN = 15;
const DEFAULTCENTER = {
    lat: 37.773972,
    lng: -122.431297
}

function Map(props) {
    /* Conditionally render markers */
    const getDataForMarkers = (places, markers) => {
        if (places.length === 0) {
            return markers
        } else if (places.length === 1) {
            return markers.filter(d => d.id === places[0].id)
        } else {
            return []
        }
    }
    /* Map states */
    const [zoom, setZoom] = useState(DEFAULTZOOM);
    const [directions, setDirections] = useState(null);
    const [dataForMarkers, setDataForMarkers] = useState(getDataForMarkers(props.places, props.markers));

    /* Get reference to map */
    var mapRef = null;
    const setRef = (ref) => {
        mapRef = ref;
    }

    var rendererRef = null;
    const setRendererRef = (ref) => {
        rendererRef = ref;
    }

    /* Manual controls for map (zooming in, removing routes) */
    useEffect(() => {
        if (props.places.length === 1) {
            const place = props.places[0];
            setDirections({ routes: [] });
            mapRef.panTo({ 'lat': place.lat, 'lng': place.lng });
            setZoom(ZOOMEDIN);
        } else if (props.places.length >= 2) {
            getDirectionsResult(props.places, setDirections);
        } else {
            localStorage.removeItem('placesData');
            setDirections({ routes: [] });
            mapRef.panTo(DEFAULTCENTER);
            setZoom(DEFAULTZOOM);
        }
    }, [props.places, mapRef]);


    /* Rendering markers */
    useEffect(() => {
        const newData = getDataForMarkers(props.places, props.markers);
        setDataForMarkers(newData);
    }, [props.places, props.markers])

    useEffect(() => {
        if (directions != null && directions.routes.length >= 1) {
            const legs = directions.routes[0].legs;
            props.updateLegs(legs);          
        }        
    }, [directions])

    return (
        <div>
            <GoogleMap
                ref={setRef}
                defaultCenter={DEFAULTCENTER}
                defaultZoom={DEFAULTZOOM}
                zoom={zoom}
            >
                {dataForMarkers.map((data) => {
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