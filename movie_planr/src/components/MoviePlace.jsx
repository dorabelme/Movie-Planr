import React from 'react';
import { Timeline } from 'antd';

const MoviePlace = ({ moviePlace, removePlace, id, movies, leg }) => {

    /* Remove handler */
    const handleRemove = () => {
        removePlace(id);
    };

    return (
        <Timeline className='LocationWrapper' >
            <Timeline.Item>
                <div>
                    <h3>{moviePlace}</h3>
                    {movies.map(movie => <p>{`Movie filmed: ${movie.title} (${movie.release_year})`}</p>)}
                </div>
            </Timeline.Item>
            <div className='Place-buttons'>
                <button onClick={handleRemove}>
                    <i className='fas fa-trash' />
                </button>

                {leg !== null && leg !== undefined && <p>{leg.distance.text}</p>}
                {leg !== null && leg !== undefined && <p>{leg.duration.text}</p>}
            </div>
        </Timeline>
    );
};

export default MoviePlace;