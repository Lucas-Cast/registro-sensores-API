const measureRepository = require('../repositories/measureRepository')

const addMeasurement = (req, res) => {

    try{
        const timestamp = new Date().getTime()
        const {equipmentId, value} = req.body
    
        if (!equipmentId) throw "An equipmentId is required"
        if (!value) throw "A value is required"
    
    
        measureRepository.addMeasurement({equipmentId, timestamp, value})
        .then(() => res.status(201).json({msg:"Measurement successfuly added"}))
        .catch(err => res.status(422).json({msg:"An error ocurred",
        Error: err}))
    } catch(err) {
        res.status(400).json({msg:"An error ocurred",
        Error: err})
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
        res.status(400).json({msg:"An error ocurred",
        Error: err})
    }
    
}

const addMeasurementByCSV = (req, res) => {
    try {

        if (!req.files) throw 'You must send a file';

        const csvFile = req.files.csvFile
        if (csvFile.mimetype !== 'text/csv') throw 'Your file must be a .csv'

        const csvFileContent = csvFile.data.toString('utf-8')
        if (csvFileContent === "") throw 'Your file is empty'
        
        //Formating content from .csv
        let formatedContent = csvFileContent.split()

        while (formatedContent[0].indexOf('\n')>-1) formatedContent[0] = formatedContent[0].replace('\n', '')
        while (formatedContent[0].indexOf('\r')>-1 && formatedContent[0].indexOf('\r')<formatedContent[0].length-1) formatedContent[0] = formatedContent[0].replace('\r', ',')
        while (formatedContent[0].indexOf(' ')>-1) formatedContent[0] = formatedContent[0].replace(' ', '')
        formatedContent = formatedContent[0].replace(`\r`,``)
        formatedContent = formatedContent.split(',')

        //Setting an array of measurements
        let measurements = []
        let index = 3
        while (index < formatedContent.length) {
            measurements.push({
                equipmentId :formatedContent[index],
                timestamp: formatedContent[index+1],
                value: formatedContent[index+2],
            })
            index +=3
        }

        measureRepository.addManyMeasurements(measurements)
        .then(() => res.status(201).json({msg:"Measurement successfuly added"}))
        .catch(err => res.status(422).json({msg:"An error ocurred",
        Error: err}))
        
    } catch (err) {
        res.status(400).send(`Error: ${err}`);
    }
}


module.exports = {addMeasurement, findByPeriod, addMeasurementByCSV}