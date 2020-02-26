const request = require("request");

const mapboxtoken =
    "pk.eyJ1IjoiZW5kZXJhIiwiYSI6ImNrNXd4aGppdzBxZGYzb2xienV5czYwenQifQ.VpgzDnZ82bDQxu2m7Judzg";
const geocode = (address, callback) => {
    let url =
        "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=" +
        mapboxtoken +
        "&limit=1";

    request({ url, json: true }, (error, { body }) => {
        console.log(body);
        if (error) {
            callback("Unable to connect to location services!", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. Try another search.", undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;
