const express = require('express')
const path = require('path')
const hbs = require('hbs')
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
    res.send('How\'s the skies lookin\', stranger?')
})

app.get('/town_square', (req, res) => {
    res.send('Don\' look like you from \'round these parts. \n Your parts don\' look like they from \'round these parts.')
})

app.listen(3000, () => {
    console.log('Server has started')
})