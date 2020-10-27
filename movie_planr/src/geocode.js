const axios = require('axios');
const fs = require('fs');
const { uuid } = require('uuidv4');

const { Client } = require("@googlemaps/google-maps-services-js");

const apiKey = process.env.REACT_APP_GOOGLE_API_KEY;
const client = new Client({});

const hashCode = (str) => {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}

const getLatLong = (place) => {
    return client
        .geocode({
            params: {
                address: `${place}, San Francisco, California`,
                key: apiKey
            },
            timeout: 5000 // milliseconds
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
                'id': hashCode(movie.locations)
            }
            return newMovie;
        }));

        const obj = {};

        for (let elem of moviesWithLatLng) {
            const id = elem.id;

            if (id in obj) {
                obj[id].push(elem);
            } else {
                obj[id] = [elem];
            }
        }

        const locations = Object.entries(obj).map(([key, val]) => {
            const firstVal = val[0];
            const movies = val.map(_v => {
                const { id, locations, lat, lng, ...movie } = _v;
                return movie;
            })

            const obj = { id: firstVal.id, locations: firstVal.locations, lat: firstVal.lat, lng: firstVal.lng, 'movies': movies };
            return obj;
        })

        const strMovies = JSON.stringify(locations);
        writeToFile("./src/data/movieData.json", strMovies);
    } catch (error) {
        console.error(error);
    }
}

getMovies();