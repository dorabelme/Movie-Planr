import React from 'react';
import '../scss/moviePlace.scss';

const MoviePlace = ({ moviePlace, removePlace, id }) => {

    const handleRemove = () => {
        removePlace(id);
    };


    return (

        <div className='PlaceContainer'>
            <li className='Place'>
                {moviePlace}
            </li>
            <div className='Place-buttons'>
                <button onClick={handleRemove}>
                    <i className='fas fa-trash' />
                </button>
            </div>
        </div>
    );
};

export default MoviePlace;