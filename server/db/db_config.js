const fs = require('fs')
const path = __dirname + '/passwd.json'
const result = JSON.parse(fs.readFileSync(path))
let mongodb_path = ''
// read passwd file 
if (result) {
    mongodb_path = result.mongodb_path
} else {
    console.log('cant read db passwd file.')
    return
}
//
const mongoose = require('mongoose')

mongoose.connect(mongodb_path, {
    useNewUrlParser: true
}, function (err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err)
    } else {
        console.log('Connected to Server successfully!')
    }
})

const db = mongoose.connection
const Schema = new mongoose.Schema({})
const Mongo = mongoose.model('Mongo', Schema, 'account')

module.exports = {
    Mongo,
    db
}