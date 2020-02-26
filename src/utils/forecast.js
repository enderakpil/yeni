const request = require("request");

const weatherUrl =
    "https://api.darksky.net/forecast/b566e43f23ade62c94b33688a37d1e95/";

const forecast = (latitude, longitude, callback) => {
    const url = weatherUrl + latitude + "," + longitude;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            // console.log(body.daily.data[0]);
            callback(
                undefined,
                body.daily.data[0].summary +
                    " It is currently " +
                    body.currently.temperature +
                    " degress out. There is a " +
                    body.currently.precipProbability +
                    "% chance of rain." +
                    "The high today is: " +
                    body.daily.data[0].temperatureHigh +
                    " and the low today is: " +
                    body.daily.data[0].temperatureLow
            );
        }
    });
};

module.exports = forecast;
