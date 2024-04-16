const port = 3004

const express = require('express')
const serverApp = express()
const routes = require('./routes')

serverApp.use(express.json())
serverApp.use(routes);

const db = require('./db.js')

db.connect()
    .then(() => serverApp.listen(port))
    .catch(err =>console.log(err))


