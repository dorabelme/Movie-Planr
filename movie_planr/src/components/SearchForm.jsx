import React, { useState } from 'react';
import { AutoComplete, Button } from 'antd';
import data from '../data/movieData.json';

/* Set initial state for component */
const initialState = { place: '', searchInput: '' }

const SearchForm = ({ places, addLocation }) => {
    const [state, setState] = useState(initialState)

    const handleSubmit = (e) => {
        const f = data.find(d => d.locations === e);
        addLocation(f);
        setState({ searchInput: '' })
    };
    const locations = new Set(data.map(d => d.locations).filter(d => !places.map(d => d.locations).includes(d)));
    const dataJSON = [...locations].map(d => {
        return { 'value': d }
    });

    return (
        <div>
            <AutoComplete
                className='searchForm'
                style={{
                    width: 200,
                }}
                options={dataJSON}
                placeholder='Search for a place'
                filterOption={(inputValue, option) =>
                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
                onChange={e => setState({ searchInput: e })}
                onSelect={handleSubmit}
                value={state.searchInput}
            />
            <Button className='searchButton' type='primary'>Search</Button>
        </div>
    )
}

export default SearchForm;