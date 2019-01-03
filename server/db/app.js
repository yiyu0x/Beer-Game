const { Mongo, db } = require('./db_config')
const express = require('express')
var fs = require('fs')
var https = require('https')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

https.createServer({
  key: fs.readFileSync(__dirname + '/server.key'),
  cert: fs.readFileSync(__dirname + '/server.cert')
}, app)

//CORS fixed
app.all('*', function (req, res, next) {
    // console.log('debug: ', req.method)
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-type')
    res.header(
        'Access-Control-Allow-Methods',
        'PUT,POST,GET,DELETE,OPTIONS,PATCH'
    )
    res.header('Access-Control-Max-Age', 1728000)
    next()
})

app.post('/login', (req, res) => {
    var UserName = req.body.username
    var UserPasswd = req.body.password
    console.log(UserName, UserPasswd)
    console.log(req.body)
    var rowData = { 'username': UserName, 'passwd': UserPasswd}
    Mongo.find(rowData, function(err, obj) {
        if (err) {
            console.log('Error:' + err)
        } else {
            if (obj.length == 0) {
                console.log('login failed')
                res.send({ status: '0'})
            } else {
                console.log('login succes')
                res.send({ status: '1', user: UserName})
            }
        }
    })
})

app.post('/register', (req, res) => {
    var UserName = req.body.username
    var UserPasswd = req.body.password
    console.log(UserName, UserPasswd)
    var user = { 'username': UserName }
    var rowData = { 'username': UserName, 'passwd': UserPasswd}
    Mongo.find(user, function(err, obj) {
        if (err) {
            console.log('Error:' + err)
        } else {
            if (obj.length == 0) {
                db.collection('account').insertOne(rowData)
                console.log('registed succes')
                res.send({ status: '1'})
            } else {
                console.log('existed')
                res.send({ status: '0'})
            }
        }
    })
})

app.listen(3000)