const mongoose = require('mongoose')
const Measure = require('../models/measure.js')

const addMeasurement = async ({equipmentId, timestamp, value}) => {
    const measure = new Measure({equipmentId, timestamp, value})
    try{
        await measure.save()
        
    }catch(err) {
        throw err
    }
    
}

module.exports = {addMeasurement}