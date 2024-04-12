const mongoose = require('mongoose')
require("dotenv").config()

//credentials
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

const connect = async () => {
    mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.mqqrrob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
}

module.exports = {connect}

