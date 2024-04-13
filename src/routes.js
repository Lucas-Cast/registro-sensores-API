const express = require('express');
const route = express.Router();
const measureControllers = require('./controllers/measureControllers'); 

route.post('/addMeasurement', measureControllers.addMeasurement)

route.get('/findByPeriod/:hour', measureControllers.findByPeriod)





module.exports = route