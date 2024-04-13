const express = require('express');
//const app = express.Router();
const measureRepository = require('../repositories/measureRepository')

const addMeasurement = (req, res) => {

    try{
        const timestamp = new Date().getTime()
        const {equipmentId, value} = req.body
    
        if (!equipmentId) return res.status(422).json({msg:"An equipmentId is required"})
        if (!value) return res.status(422).json({msg:"A value is required"})
    
    
        measureRepository.addMeasurement({equipmentId, timestamp, value})
        .then(() => res.status(201).json({msg:"Measurement successfuly added"}))
        .catch(err => res.status(422).json({msg:"An error ocurred",
        Error: err}))
    } catch(err) {
        console.log(err)
    }
}

const findByPeriod = (req, res) => {

    try{
        const hour = req.params.hour
    
        measureRepository.getMeasurementsByTime(hour)
        .then((measure) =>  res.status(200).json({measure}))
        .catch(err => res.status(404).json({msg:"An error ocurred",
        Error: err}))
    } catch(err) {
        console.log(err)
    }

}

module.exports = {addMeasurement, findByPeriod}