const express = require('express')
const path = require('path')
//------------------------------------------------------------------------
const publicDirectoryPath = path.join(__dirname, '../public')


const app = express()
app.use(express.static(publicDirectoryPath));



app.get('/weather', (req, res) => {
    res.send('How\'s the skies lookin\', stranger?')
})

app.get('/town_square', (req, res) => {
    res.send('Don\' look like you from \'round these parts. \n Your parts don\' look like they from \'round these parts.')
})

app.listen(3000, () => {
    console.log('Server has started')
})