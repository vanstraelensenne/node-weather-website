const request = require('postman-request')

const geocode = (adress, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) +'.json?access_token=pk.eyJ1IjoidmFuc3RyYWVsZW5zZW5uZSIsImEiOiJja3gxeWk0Ym0waGhtMnBwaHk4NW9jazR3In0.VJuQZw_GLam82LYWrGB1Mg&limit=1'
    request({url, json :true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to location services', undefined)
        }
        else if (body.features.length === 0) {
            callback('Could not find location', undefined)
        }
        else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                placeName: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode