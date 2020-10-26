import React, { Component } from 'react';
import SearchForm from './SearchForm';
import MoviePlace from './MoviePlace';
import '../scss/routerComponent.scss';

class RouterComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { places: [] };
        this.create = this.create.bind(this);
        this.remove = this.remove.bind(this);
    };

    create(newLocation) {
        this.setState({ places: [...this.state.places, newLocation] });
    };

    remove(id) {
        this.setState({
            places: this.state.places.filter(place => place.id !== id)
        });
    };


    render() {
        const moviePlaces = this.state.places.map(place => <MoviePlace
            key={place.id}
            id={place.id}
            moviePlace={place.moviePlace}
            removeTodo={this.remove}
        />);

        return (
            < div className="PlaceList" >
                < SearchForm addLocation={this.create} places={this.state.places.map(p => p.moviePlace)} />
                <ul>{moviePlaces}</ul>
            </div>
        )
    }
}

export default RouterComponent;