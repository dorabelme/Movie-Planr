import React, { Component } from 'react';
import { AutoComplete, Button } from 'antd';
import data from '../data/movieData.json';
import '../scss/searchForm.scss';

class SearchForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        const f = data.find(d => d.locations === e);
        this.props.addLocation({ 'moviePlace': f.locations, id: f.id });
    };

    render() {
        const locations = new Set(data.map(d => d.locations).filter(d => !this.props.places.includes(d)));

        const dataJSON = [...locations].map(d => {
            return { 'value': d }
        });

        return (
            <div>
                <AutoComplete
                    style={{
                        width: 200,
                    }}
                    options={dataJSON}
                    placeholder='Search for a place'
                    filterOption={(inputValue, option) =>
                        option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                    }
                    onSelect={this.handleSubmit}
                />
                <Button type='primary'>Search</Button>
            </div>
        )
    }
}

export default SearchForm;