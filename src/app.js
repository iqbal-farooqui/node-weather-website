const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup Handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Iqbal Farooqui'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Iqbal Farooqui'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This website allows you to look up the current weather for any location.',
        instructions: 'To use this site, simply enter your desired location/address in the input box on the Weather page (shown in the Navigation bar on top) and click Search.',
        title: 'Help',
        name: 'Iqbal Farooqui'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    } else {
        geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
            if (error) {
                return res.send({ error })
            } else {
                forecast(latitude, longitude, (error, forecastData) => {
                    if (error) {
                        return res.send({ error })
                    } else {
                        return res.send({
                            forecast: forecastData,
                            location,
                            address: req.query.address
                        })
                    }
                })
            }
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Help article not found',
        name: 'Iqbal Farooqui'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errMsg: 'Page not found',
        name: 'Iqbal Farooqui'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})