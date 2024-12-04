const express = require('express')
const app = express()

const axios = require('axios')

const dotenv = require('dotenv')
dotenv.config()



const PORT =3000

app.use(express.urlencoded({ extended: true }))

// Root
app.get('/', (req, res) => {
  res.render('index.ejs')
})

// Post
app.post('/weather', async (req, res) => {
  const { zipCode } = req.body //from form
  const apiKey = process.env.API_KEY //from env

  try {
    //url
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${zipCode}&APPID=${apiKey}`)
    
    res.redirect(`/weather/show?name=${response.data.name}&temp=${response.data.main.temp}&description=${response.data.weather[0].description}`)
  } catch (error) {
    console.error(error)
    
  }
})

// Route to display the weather data
app.get('/weather/show', (req, res) => {
  res.render('weather/show.ejs', { name:req.query.name, temp:req.query.temp, description:req.query.description })
})

// Start the server

app.listen(PORT, () => {
  console.log('Server running on http://localhost:3000')
})
