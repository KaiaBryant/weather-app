const request = require('postman-request')

// forecast takes in lat, long, and a callback
// When user inputs location in geocode, geocode will take lat and long and feed it into the API/HTTP
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=567d925caad03c7e87ea5149a646990f&query=' +
        latitude + ',' + longitude + '&units=f' // farinheit

    //callback from the postman-requtst function being called with the object to parse JSON
    // will then run once the HTTP request finishes
    // **Deconstructing, instead of using requests three arguments. we are using {body} that will take the 
    //body objects from json 
    request({ url, json: true }, (error, { body }) => { //parsed data from weather stack JSON
        if (error) { // error hanlding below if no service OR location is found in database
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {

            callback(undefined, // if no error, output below
                "Forecast: " + body.current.weather_descriptions[0] +
                ". It is currently " + body.current.temperature +
                " degrees. It feels like " + body.current.feelslike + " degrees out. The chance of rain is " + body.current.precip + "%, with the humidity of " + body.current.humidity + " and wind speed of " + body.current.wind_speed + "mph."
            )
        }
    })
}

// allows this file to be accessible to outside files
module.exports = forecast
