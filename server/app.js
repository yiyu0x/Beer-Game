const { Mongo, db } = require('./db_config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
            console.log(obj)
            if (obj.length == 0) {
                db.collection('account').insertOne(rowData);
                console.log('註冊成功')
                res.send({ status: 'success', message: 'true' })
            } else {
                console.log('已存在')
                res.send({ status: 'success', message: 'false' })
            }
        }
    })
    // res.status(200).send("testing");
});

app.listen(3000);