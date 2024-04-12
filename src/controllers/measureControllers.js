const express = require('express');
const app = express.Router();
const measureRepository = require('../repositories/measureRepository')

app.post('/addMeasure', (req, res) => {
    const {equipmentId, timestamp, value} = req.body

    if (!equipmentId) return res.status(422).json({msg:"An equipmentId is required"})
    if (!timestamp) return res.status(422).json({msg:"A timestamp is required"})
    if (!value) return res.status(422).json({msg:"A value is required"})


    measureRepository.addMeasurement({equipmentId, timestamp, value})
    .then(() => res.status(201).json({msg:"Measure successfuly added"}))
    .catch(err => res.status(500).json({msg:"An error ocurred"}))
})

module.exports = app