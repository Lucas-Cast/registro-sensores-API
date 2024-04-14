const mongoose = require('mongoose')
const Measure = require('../models/measure.js')

const addMeasurement = async ({equipmentId, timestamp, value}) => {
    try{
        const measure = new Measure({equipmentId, timestamp, value})
        await measure.save()

    }catch(err) {
        throw err
    }
    
}

const addManyMeasurements = async (Measurements) => {
    try{
        await Measure.insertMany(Measurements)

    }catch(err) {
        throw err
    }
    
}

const getMeasurementsByTime = async (limitDate) => {
    try{

        const measures = await Measure.find({ timestamp: { $gte: limitDate } })
        if (measures.length != 0) return measures
        throw "No measurements registered after the time specified"
        
    }catch(err) {
        throw err
    }
    
}
module.exports = {addMeasurement, getMeasurementsByTime, addManyMeasurements}