const path = require('path')
const express = require ('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Senne Vanstraelen'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Senne Vanstraelen'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some helptext',
        name: 'Senne Vanstraelen'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.adress){
        return res.send({
            error: 'Adress must be provided.'
        })
    }
    geocode(req.query.adress, (error, { latitude, longitude, placeName } = {}) => {
        if(error){
            res.send({
                error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error) {
                return console.log(error)
            }
            res.send({
                adress: req.query.adress,
                location: placeName,
                forecast: forecastdata
            })
        })
    })
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a searchterm'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help 404',
        name: 'Senne Vanstraelen',
        error_msg: 'Help article not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Senne Vanstraelen',
        error_msg: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})
