/*global google*/

const getDirectionsResult = (directionsService, places, callbackFn) => {
    const startingPlace = places[0];
    const endingPlace = places[places.length - 1];

    const origin = { lat: startingPlace.lat, lng: startingPlace.lng };
    const destination = { lat: endingPlace.lat, lng: endingPlace.lng };

    const waypoints = places.slice(1, -1).map(p => {
        return { 'location': new google.maps.LatLng(p.lat, p.lng) }
    })

    directionsService.route(
        {
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode.DRIVING,
            waypoints
        },
        (result, status) => {
            if (status === google.maps.DirectionsStatus.OK) {
                callbackFn(result);
            } else {
                console.error(`error fetching directions ${result}`);
            }
        }
    );
}

const retNum = (str) => {
    var num = parseFloat(str);
    return num;
}

const writeToFile = (path, data) => {
    const fs = require('fs');
    const o = fs.writeFile(path, data, function (err) {
        if (err) {
            console.error(err);
        }
    });

    return o;
}

const hashCode = (str) => {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0)) | 0, 0);
}

const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]]);

module.exports = { getDirectionsResult, retNum, writeToFile, zip, hashCode };