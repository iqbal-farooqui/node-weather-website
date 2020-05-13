const postmanRequest = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiaXFiYWxhZiIsImEiOiJja2Eyd3NpbjMwYndrM2xueDh5ZzAxaWt4In0.--kLa2DZ0Ub6YM9bxOww5A'
    postmanRequest({ url: url, json: true }, (error, { body }) => {
        const apiError = body.features.length
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (apiError === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const { center, place_name:location } = body.features[0] 
            callback(undefined, {
                latitude: center[1],
                longitude: center[0],
                location: location
            })
        }
    })
}

module.exports = geocode