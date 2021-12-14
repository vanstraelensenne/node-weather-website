const request = require('postman-request')

const forecast = (latitude, longitude, callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=dd6570d96c12a0c91337f447391431e8&query='+ latitude +','+ longitude
    request({url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather service', undefined)
        }
        else if(body.error) {
            callback(body.error.info, undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out. The humidity is ' + body.current.humidity + '%.')
        }
    })
}

module.exports = forecast