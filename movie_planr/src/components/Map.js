/*global google*/
import React, { useState, useEffect } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker, InfoWindow } from 'react-google-maps';
// import data from '../data/movieData.json';
import { withScriptjs } from 'react-google-maps';

const DEFAULTZOOM = 13;
const ZOOMEDIN = 15;
const DEFAULTCENTER = {
    lat: 37.773972,
    lng: -122.431297
}

function Map(props) {
    const [directions, setDirections] = useState(null);
    const [zoom, setZoom] = useState(DEFAULTZOOM);

    var mapRef = null;

    const setRef = (ref) => {
        mapRef = ref;
        // console.log(mapRef);
    }

    useEffect(() => {
        if (props.places.length === 1) {
            const place = props.places[0];
            setDirections({ routes: [] });
            mapRef.panTo({ 'lat': place.lat, 'lng': place.lng });
            setZoom(ZOOMEDIN);
        } else if (props.places.length >= 2) {
            const directionsService = new google.maps.DirectionsService();

            const startingPlace = props.places[0];
            const endingPlace = props.places[props.places.length - 1];

            const origin = { lat: startingPlace.lat, lng: startingPlace.lng };
            const destination = { lat: endingPlace.lat, lng: endingPlace.lng };

            const waypoints = props.places.slice(1, -1).map(p => {
                return { 'location': new google.maps.LatLng(p.lat, p.lng) }
            })

            directionsService.route(
                {
                    origin: origin,
                    destination: destination,
                    travelMode: google.maps.TravelMode.DRIVING,
                    waypoints
                },
                (result, status) => {
                    if (status === google.maps.DirectionsStatus.OK) {
                        console.log(result);
                        setDirections(result);
                    } else {
                        console.error(`error fetching directions ${result}`);
                    }
                }
            );
        } else {
            setDirections({ routes: [] });
            mapRef.panTo(DEFAULTCENTER);
            setZoom(DEFAULTZOOM);
        }
    }, [props.places, mapRef]);

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
                            options={{ maxWidth: 300 }} style={{ backgroundColor: 'red' }} >
                            <div>
                                <h1>{data.locations}</h1>
                            </div>
                        </InfoWindow>}
                    </Marker>
                    )
                })}

                {directions && <DirectionsRenderer directions={directions} />}
            </GoogleMap>
        </div>
    );
}


export default withScriptjs(withGoogleMap(Map));