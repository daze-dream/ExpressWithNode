const request = require('postman-request')
//-----------------------------------------

/** to get the forecast of the coordinates from weatherstack */
const forecast = (latitude, longitude, unit, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=550c10e5b9ec12196928a39bfe7f1f97&query='
    + latitude + ','
    + longitude
    +'&units='
    + unit.toLowerCase()

    request({url, json: true},(error, {body}) => {
        if(error)
            callback('Unable to connect to weather API. Check your internet connection or your URL.', undefined)
        else if(body.success===false) {
            const badResponse = 'Bad response from server: \n Error Code: ' + response.body.error.code + ' \n Reason: ' + response.body.error.info
            callback(badResponse, undefined)
        }
        else
        {
            callback(undefined, {
                unit: body.request.unit,
                weatherDesc: body.current.weather_descriptions[0],
                locationName: body.location.name,
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike,
            })

        }
    } )

}


module.exports = {
    forecast:forecast
}