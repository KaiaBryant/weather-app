const { log } = require('console')
const request = require('postman-request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' +
        encodeURIComponent(address) +
        '&access_token=pk.eyJ1Ijoia2FpYWJyeWFudCIsImEiOiJjbWVzdzhpeTgwN216MmxvbHU3cWgwcjkzIn0.Z2pxGafOS7-ESe0-ensCQg'

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].properties.coordinates.latitude,
                longitude: body.features[0].properties.coordinates.longitude,
                location: body.features[0].properties.name_preferred

            })
        }
    })
}

// geocode('New York', (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
// })

module.exports = geocode


