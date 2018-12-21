const { Mongo, fields } = require('./db_config');
const express = require('express');
const app = express();


app.post('/register', (req, res) => {
    console.log('user in session')
    console.log(req.session);
    //先查询有没有这个user
    console.log("req.body" + req.body);
    var UserName = req.body.username;
    var UserPsw = req.body.password;
    //通过账号验证
    var updatestr = { username: UserName };
    res.setHeader('Content-type', 'application/json;charset=utf-8')
    console.log(updatestr);
    Mongo.find(updatestr, function(err, obj) {
        if (err) {
            console.log("Error:" + err);
        } else {
            if (obj.length == 0) {
                insert(UserName, UserPsw);
                res.send({ status: 'success', message: 'true' })
            } else {
                res.send({ status: 'success', message: 'false' })
            }
        }
    })
});