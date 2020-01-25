const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//define path for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebar  engine for views and location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directories to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index',{
        title: 'Welcome to my first node app',
        name: 'Mishra'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'We provide the exact wether condition related to your current location'
    })
})


 app.get('/help',(req, res) =>{
     res.render('help',{
        title:'Ask whatever you want related to our services'
     })
    
 })

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
         error: 'Yon need to provide an address for forecasting'
        })
    }
  geocode(req.query.address,(error,{latitude, longitude, location} = {}) =>{
      if(error){
          return res.send({error})
      }
      forecast(latitude, longitude, (error, forecastData) =>{
          if(error){
              return res.send({error})
          }

          res.send({
              forecast: forecastData,
              location,
              address: req.query.address
          })
      })
  })

})
app.get('/product',(req, res)=>{
    if(!req.query.search){
       return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})


app.get('/help/*',(req, res)=>{
    res.render('404',{
        title: 'Help article not found'

    })
})

app.get('*',(req,res) =>{

    res.render('404',{
        title: 'Page not found'
    })
})


app.listen(3000, ()=>{
    console.log('server is up on port 3000.')
})