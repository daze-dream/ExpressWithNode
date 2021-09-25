const request = require('postman-request')

/** to fetch the coordinates of the closest matching location passed in to geocoding API */
const geocode = (address, callback) => {
    const url2 = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiYnVnYWJvbzEyMzEyNDUiLCJhIjoiY2t0dnI3M25xMmNvbDJvcm9tYmVxZWg4ZSJ9.xgvzlVKEl2zqq1hD-eBn-Q&limit=1'
    console.log(url2)
    request({url: url2, json:true}, (error, {body}) => {
        if(error)
        {
            //console.log('Unable to connect to geo-location API. Check your internet connection or your URL.')
            callback('Unable to connect to geo-location API. Check your internet connection or URL', undefined)
        }
        else if(body.features.length === 0)
        {
            callback('Unable to determine a matching location. Check your query parameters and try again.', undefined)
        }
        else
        {
            //console.log(response.body.features[0].center)
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = {
    geocode: geocode,
}