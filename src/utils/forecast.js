const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=05fc83a087380702c6e7f73867c76d60&query=${latitude},${longitude}`;

    request({ url, json: true }, (error, { body } = {}) => {
        const { error: responseError, current } = body;

        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (responseError) {
            callback("Unable to find location!", undefined);
        } else {
            const { weather_descriptions, temperature, feelslike } = current;
            callback(
                undefined,
                `${weather_descriptions[0]}. It is currently ${temperature} degress. It feels like ${feelslike} degress out.`
            );
        }
    });
};

module.exports = forecast;
