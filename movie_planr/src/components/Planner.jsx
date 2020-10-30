import React from 'react';
import SearchForm from './SearchForm';
import MoviePlace from './MoviePlace';
import { zip } from '../utils';

const Planner = ({ places, legs, addtoPlaces, removePlace, setPlannerRef }) => {
    
    const placesWithLegs = zip(places, [null, ...legs]);
    const moviePlaces = placesWithLegs.map(([place, leg]) => <MoviePlace
        key={place.id}
        id={place.id}
        moviePlace={place.locations}
        movies={place.movies}
        removePlace={removePlace}
        leg={leg}
    />);

    return (
        < div className='PlaceList' ref={setPlannerRef} >
            < SearchForm addLocation={addtoPlaces} places={places} />
            <ul>{moviePlaces}</ul>
        </div>
    )
}

export default Planner;