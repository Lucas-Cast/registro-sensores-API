const express = require('express')
const route = express.Router()
const fileUpload = require('express-fileupload')
const measureControllers = require('./controllers/measureControllers')
const path = require('path')

route.use(fileUpload())
route.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'src')))

route.get('/', (req, res) => res.render(path.join(__dirname, '..', '..', 'frontend', 'src', 'index.html')))

route.post('/addMeasurement', measureControllers.addMeasurement)

route.get('/findByPeriod/:hour', measureControllers.findByPeriod)

route.post('/addMeasurementByCSV', measureControllers.addMeasurementByCSV)



module.exports = route