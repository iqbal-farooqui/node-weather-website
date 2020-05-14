const postmanRequest = require('postman-request')
const geocode = require('./geocode.js')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=8476942471fc098824338793b1e175da&query=' + latitude + "," + longitude
    postmanRequest({ url: url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            const { weather_descriptions:desc, temperature, feelslike, precip, humidity } = body.current
            callback(undefined, desc[0] + '. It is currently ' + temperature + ' degrees out. It feels like '+ feelslike + ' degrees out.' + ' The humidity is ' + humidity + '%. ' + precip*100 + ' millimetres of precipitation is expected.')
        }
    })
}

module.exports = forecast