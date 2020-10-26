import React, { Component } from 'react';
import '../scss/moviePlace.scss';

class MoviePlace extends Component {
    constructor(props) {
        super(props);
        this.state = { moviePlace: this.props.moviePlace };
        this.handleRemove = this.handleRemove.bind(this);
    };

    handleRemove() {
        this.props.removeTodo(this.props.id);
    };

    render() {
        const result = (
            <li className='Place'>
                {this.props.moviePlace}
            </li>
        );

        return (
            <div className='PlaceContainer'>
                {result}
                <div className='Place-buttons'>
                    <button onClick={this.handleRemove}>
                        <i class='fas fa-trash' />
                    </button>
                </div>
            </div>
        );
    }
};

export default MoviePlace;