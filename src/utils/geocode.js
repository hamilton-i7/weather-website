"use strict";

const request = require("postman-request");

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        address
    )}.json?access_token=pk.eyJ1IjoiaGFtaWx0b24taTciLCJhIjoiY2toOGlpeHQwMGo2cDJybzRwNWllYm51aiJ9.G_FLs_eYPH0WvIyxyyk5Sw&limit=1`;

    request({ url, json: true }, (error, { body } = {}) => {
        const { features } = body;

        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            const { place_name } = features[0];
            const [longitude, latitude] = features[0].center;
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: place_name,
            });
        }
    });
};

module.exports = geocode;
