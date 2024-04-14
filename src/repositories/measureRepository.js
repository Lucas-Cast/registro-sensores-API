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

const getMeasurementsByTime = async (hour) => {
    try{
        const hourToMilissec = hour * 60 * 60 * 1000 
        const today = new Date().getTime()
        const limitDate = today - hourToMilissec

        const measures = await Measure.find({ timestamp: { $gte: limitDate } }).select('value')
        if (measures.length != 0) return measures
        throw "There are no collections"
        
    }catch(err) {
        throw err
    }
    
}
module.exports = {addMeasurement, getMeasurementsByTime, addManyMeasurements}