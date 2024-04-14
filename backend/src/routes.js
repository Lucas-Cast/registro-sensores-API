const express = require('express')
const route = express.Router()
const fileUpload = require('express-fileupload')
const measureControllers = require('./controllers/measureControllers')

route.use(fileUpload())

route.post('/addMeasurement', measureControllers.addMeasurement)

route.get('/findByPeriod/:hour', measureControllers.findByPeriod)

route.post('/addMeasurementByCSV', measureControllers.addMeasurementByCSV)



module.exports = route