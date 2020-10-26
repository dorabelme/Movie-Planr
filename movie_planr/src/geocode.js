const axios = require('axios');
const fs = require('fs');
const { uuid } = require('uuidv4');

const { Client } = require("@googlemaps/google-maps-services-js");

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const client = new Client({});

const getLatLong = (place) => {
    return client
        .geocode({
            params: {
                address: `${place}, San Francisco, California`,
                key: apiKey
            },
            timeout: 1000 // milliseconds
        })
        .then(r => {
            const lat = r.data.results[0].geometry.location.lat;
            const lng = r.data.results[0].geometry.location.lng;
            const output = { lat, lng };

            return output;
        })
}

const writeToFile = (path, data) => {
    fs.writeFile(path, data, function (err) {
        if (err) {
            console.error(err);
        }
    });
}

const getMovies = async () => {
    try {
        const response = await axios.get('https://data.sfgov.org/resource/yitu-d5am.json');
        const movies = response.data.slice(0, 10);

        const moviesWithLatLng = await Promise.all(movies.filter(movie => movie.locations !== undefined).map(async (movie) => {
            const o = await getLatLong(movie.locations);
            const newMovie = {
                ...movie,
                'lat': o.lat,
                'lng': o.lng,
                'id': uuid()
            }
            return newMovie;
        }));

        const strMovies = JSON.stringify(moviesWithLatLng);
        writeToFile("./src/data/movieData.json", strMovies);
    } catch (error) {
        console.error(error);
    }
}

getMovies();