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

const getMeasurementsByTime = async (hour) => {
    try{
        let limitDate = hour * 60 * 60 * 1000 
        const today = new Date().getTime()
        const yesterday = today - limitDate

        const measures = await Measure.find({ timestamp: { $gte: yesterday } })//.select('value')
        if (measures.length != 0) return measures
        throw "There are no collections"
        
    }catch(err) {
        throw err
    }
    
}
module.exports = {addMeasurement, getMeasurementsByTime}