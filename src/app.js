// Require allows access to use stored data in files or package
const path = require('path') //nodes built-in module
const express = require('express') //package 
const hbs = require('hbs') // handelbars to simplify HTML
const geocode = require('./utils/geocode') //location API file 
const forecast = require('./utils/forecast') // weather API file

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public') // statuc files
const viewsPath = path.join(__dirname, '../templates/views') // HBS template files
const partialsPath = path.join(__dirname, '../templates/partials') // HBS template files

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to server
app.use(express.static(publicDirectoryPath))

// --------ROUTES------

// Homepage
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Kaia Bryant'
    })
})

// About page
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Kaia Bryant'
    })
})

// Help page
app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Kaia Bryant'
    })
})

//Weather API
// get weather file that can take requests and response
app.get('/weather', (req, res) => {
    if (!req.query.address) { // if user does not type in valid request, send error response
        return res.send({
            error: 'You must provide an address!'
        })
    }
    // otherwise, call geocode to get latitude, longitude and location from geocode file
    // in geocode, const geocode (address, callback)
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        // calling forecast to get weather from forecast file that is (latitude, longitude, callback)
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            // object of data to pull from forecast
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


// ----- ENDPOINT ----------
app.get('/products', (req, res) => {
    if (!req.query.search) {
        res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

// app.get('/help/*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Kaia Bryant',
//         errorMessage: 'Help article not found.'
//     })
// })

// app.get('*', (req, res) => {
//     res.render('404', {
//         title: '404',
//         name: 'Kaia Bryant',
//         errorMessage: 'Page not found.'
//     })
// })


// server set up
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})