const mongoose = require('mongoose')

const Measure = mongoose.model('Measure', {
    equipmentId: String,
    timestamp: Date,
    value: Number  
})

module.exports = Measure