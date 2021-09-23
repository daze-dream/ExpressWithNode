const express = require('express')
//------------------------------------------------------------------------

const app = express()
app.get('', (req, res) => {
    res.send('<h1>Joefie, stranger</h1>')
})

app.get('/about', (req, res) => {
    res.send('You c\'n learn all \'bout our town\'s history here, stranger.')
})

app.get('/help', (req, res) => {
    //res.send('Even though yer a little strange, we help anyone we can, stranger.')
    res.send( {
        greeting: 'Even though yer a little strange, we help anyone we can, stranger.',
        gifts: [{
            item: 'Sturdy Flask',
            description: 'A flask that seems rough hewn and dusty, but just holding it tells you that it will be a steadfast companion.'

        }, {
            item: 'Gunpowder',
            description: 'Black powder with many versatile uses, beyond being a catalyst for harm.'
        }]
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