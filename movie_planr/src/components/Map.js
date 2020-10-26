/*global google*/
import React, { Component } from 'react';
import { withGoogleMap, GoogleMap, DirectionsRenderer, Marker } from 'react-google-maps';
import data from '../data/movieData.json';

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            directions: null,
            markers: data
        }
    };

    componentDidMount() {
        const directionsService = new google.maps.DirectionsService();

        const origin = { lat: 37.7899845, lng: -122.3998704 };
        const destination = { lat: 37.7644489, lng: -122.4381707 };

        directionsService.route(
            {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING,
                // waypoints: [
                //     {
                //         location: new google.maps.LatLng(6.4698, 3.5852)
                //     },
                //     {
                //         location: new google.maps.LatLng(6.6018, 3.3515)
                //     },
                // ]
            },
            (result, status) => {
                if (status === google.maps.DirectionsStatus.OK) {
                    console.log(result)
                    this.setState({
                        directions: result
                    });
                } else {
                    console.error(`error fetching directions ${result}`);
                }
            }
        );
    }

    render() {
        const MovieLocationsMap = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{
                    lat: 37.773972,
                    lng: -122.431297
                }}
                defaultZoom={10}
            >
                {this.state.markers.map((data) => {
                    return (<Marker
                        key={data.id}
                        position={{ lat: data.lat, lng: data.lng }}
                        title={data.locations}
                        name={data.locations}
                    >
                    </Marker>
                    )
                })}
                <DirectionsRenderer
                    directions={this.state.directions}
                />
            </GoogleMap>
        ));

        return (
            <div>
                <MovieLocationsMap
                    containerElement={<div style={{ height: `700px`, width: `700px`, margin: `0px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
}

export default Map;