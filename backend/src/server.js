const port = 3004

const express = require('express')
const serverApp = express()
const routes = require('./routes')
const path = require('path')


serverApp.use(express.json())
serverApp.use(routes);
serverApp.use(express.static(path.join(__dirname, '..', '..', 'frontend', 'src')))

serverApp.get('/', (req, res) => {
    
    res.render(path.join(__dirname, '..', '..', 'frontend', 'src', 'index.html'))
})
const db = require('./db.js')

db.connect()
    .then(() => serverApp.listen(port))
    .catch(err =>console.log(err))


