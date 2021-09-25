const express = require('express')
const path = require('path')
const hbs = require('hbs')
const { response } = require('express')
const { uptime } = require('process')
const forecast = require('./utils/forecast.js')
const geocode = require('./utils/geocode.js')
//------------------------------------------------------------------------
const app = express()
//------------------------------------------------------------------------
// express paths
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views' )
const partialsPath = path.join(__dirname, '../templates/partials')
//------------------------------------------------------------------------
//handlebars setup
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)
//------------------------------------------------------------------------
//static directory
app.use(express.static(publicDirectoryPath));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Joefie, Stranger',
        body: 'Anythin\' you need\'d be round these parts, stranger.'
    }) 
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Memorial of the Deadeye, Center of Town',
        body: 'You c\'n learn all \'bout our town\'s history here, stranger.'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Goodman\'s General Store', 
        img: "img/joefie.jpg"
    })
})

app.get('/weather', (req, res) => {
    console.log(req.query)
    if(!req.query.address) {
        return res.send({
            error: 'I need a location to scout for, stranger.'
        })
    }
    finalForecast = 'So, ';
    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error)
        {
            return res.send({
                errorCode: error
            })
        }
        finalForecast = ""
        console.log(latitude, longitude, location)
        forecast.forecast( latitude, longitude, 'f', (error, {weatherDesc: weather, temperature, unit, feelsLike} = {}) => {
            if(error)
            {
                return res.send(error)
            }
             finalForecast = 'In ' 
                    + location
                    + ', it is ' 
                    + weather
                    + ', with a temperature of '
                    + temperature
                    + unit
                    + ' (feels like '
                    + feelsLike
                    +'). '
                    res.send({
                        forecast: finalForecast,
                        location: 'Tchwatta Sand Dunes',
                        address: req.query.address,
                    })
        })

    })

})

app.get('/town_square', (req, res) => {
    res.send('Don\' look like you from \'round these parts. \n Your parts don\' look like they from \'round these parts.')
})

app.get('/inventory', (req, res) => {
    //query is how we process incoming requests from the user
    if(!req.query.type)
    {
        return res.send({
            error: 'Must provide type of itme to search for'
        })
    }
    console.log(req.query)
    res.send({
        items: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', {
        title:'404: Help page not found',
        body: 'Came to the wrong place if you needed help, stranger. The dunes got nothin\' for nobody. '
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404: Page doesn\'t exist',
        body: 'Yer in the sand dunes, stranger.'
    })
})

app.listen(3000, () => {
    console.log('Server has started')
})