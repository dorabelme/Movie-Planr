import React from 'react';
import SearchForm from './SearchForm';
import MoviePlace from './MoviePlace';

const Planner = ({ places, addtoPlaces, removePlace, setPlannerRef }) => {
    const moviePlaces = places.map(place => <MoviePlace
        key={place.id}
        id={place.id}
        moviePlace={place.locations}
        movies={place.movies}
        removePlace={removePlace}
    />);

    return (
        < div className="PlaceList" ref={setPlannerRef} >
            < SearchForm addLocation={addtoPlaces} places={places} />
            <ul>{moviePlaces}</ul>
        </div>
    )
}

export default Planner;