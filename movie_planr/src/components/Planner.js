import React, { Component } from 'react';
import SearchForm from './SearchForm';
import MoviePlace from './MoviePlace';
import '../scss/planner.scss';

const Planner = ({ places, addtoPlaces, removePlace }) => {
    const moviePlaces = places.map(place => <MoviePlace
        key={place.id}
        id={place.id}
        moviePlace={place.locations}
        removePlace={removePlace}
    />);

    return (
        < div className="PlaceList" >
            < SearchForm addLocation={addtoPlaces} places={places} />
            <ul>{moviePlaces}</ul>
        </div>
    )
}

export default Planner;