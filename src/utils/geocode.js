const { log } = require('console')
const request = require('postman-request')


// Goal is to take an address, call MapBox Geocoding API with address and handle error, no results and success
const geocode = (address, callback) => {
    // declare mapbox HTTP/API and fetch address of user input
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' +
        encodeURIComponent(address) +
        '&access_token=pk.eyJ1Ijoia2FpYWJyeWFudCIsImEiOiJjbWVzdzhpeTgwN216MmxvbHU3cWgwcjkzIn0.Z2pxGafOS7-ESe0-ensCQg'

    // callback from the postman-requtst function being called with the object to parse JSON
    // will then run once the HTTP request finishes
    // **Deconstructing, instead of using requests three arguments. we are using {body} that will take the 
    //body objects from json
    request({ url, json: true }, (error, { body }) => {
        if (error) { // error handling
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else { // accessing the perfered data (long, lat, and location) from JSON
            callback(undefined, {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.name_preferred

            })
        }
    })
}

// ----- Checking console.log to confirm it work ----------
// geocode('New York', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

module.exports = geocode


