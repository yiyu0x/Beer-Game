const { Mongo, fields } = require('./db_config');
const express = require('express');
const app = express();


app.post('/register', (req, res) => {
    console.log('user in session')
    console.log(req.session);
    console.log("req.body" + req.body);
    var UserName = req.body.username;
    var UserPasswd = req.body.password;
    var data = { username: UserName };
    Mongo.find(data, function(err, obj) {
        if (err) {
            console.log("Error:" + err);
        } else {
            if (obj.length == 0) {
                // insert(UserName, UserPsw);
                console.log('not found')
                res.send({ status: 'success', message: 'true' })
            } else {
                console.log('found')
                res.send({ status: 'success', message: 'false' })
            }
        }
    })
});
