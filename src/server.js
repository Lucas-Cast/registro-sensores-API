const port = 3004

const express = require('express')
const app = express()

const db = require('./db.js')

db.connect()
    .then(() => app.listen(port))
    .catch(err =>console.log(err))
    

 


