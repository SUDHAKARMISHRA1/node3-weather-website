const request = require('request')

const forecast =(latitude, longitude, callback)=>{
      url ='https://api.darksky.net/forecast/b1c260dc9776ef41990703840101cd15/'+ latitude +','+ longitude +'?unit=si'
      request({url, json: true}, (error,{body})=>{
          if(error){
              callback('Check the connection and try again',undefined)
          }else if(body.error){
             callback('Provide the correct latitude and longitude value',undefined)
          }else{
              callback(undefined, body.daily.data[0].summary +
                 'It is currently ' +body.currently.temperature + ' degree out there is a ' + body.currently.precipProbability +'% Chance of rain'
              )
          }
      }
      )}

module.exports= forecast
