const mongoose = require('mongoose')

const Measure = mongoose.model('Measure', {
    equipmentId: String,
    timestamp: Number,
    value: Number  
})

module.exports = Measure