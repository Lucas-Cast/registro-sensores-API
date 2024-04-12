const express = require('express');
const app = express.Router();
const measureRepository = require('../repositories/measureRepository')

app.post('/addMeasurement', (req, res) => {
    const timestamp = new Date().getTime()
    const {equipmentId, value} = req.body

    if (!equipmentId) return res.status(422).json({msg:"An equipmentId is required"})
    if (!value) return res.status(422).json({msg:"A value is required"})


    measureRepository.addMeasurement({equipmentId, timestamp, value})
    .then(() => res.status(201).json({msg:"Measurement successfuly added"}))
    .catch(err => res.status(422).json({msg:"An error ocurred"}))
})

module.exports = app