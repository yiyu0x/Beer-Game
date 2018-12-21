const { Mongo, db } = require('./db_config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
    var UserName = req.body.username;
    var UserPasswd = req.body.password;
    console.log(UserName, UserPasswd)
    var rowData = { 'username': UserName, 'passwd': UserPasswd};
    Mongo.find(rowData, function(err, obj) {
        if (err) {
            console.log("Error:" + err);
        } else {
            if (obj.length == 0) {
                console.log('login failed')
                res.send({ status: '0'})
            } else {
                console.log('login succes')
                res.send({ status: '1'})
            }
        }
    })
});

app.post('/register', (req, res) => {
    var UserName = req.body.username;
    var UserPasswd = req.body.password;
    console.log(UserName, UserPasswd)
    var user = { 'username': UserName };
    var rowData = { 'username': UserName, 'passwd': UserPasswd};
    Mongo.find(user, function(err, obj) {
        if (err) {
            console.log("Error:" + err);
        } else {
            if (obj.length == 0) {
                db.collection('account').insertOne(rowData);
                console.log('registed succes')
                res.send({ status: '1'})
            } else {
                console.log('existed')
                res.send({ status: '0'})
            }
        }
    })
});

app.listen(3000);