const { Mongo, fields } = require('./db_config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
    console.log('user in session')
    //查詢user
    console.log("req.body--> " + req.body);
    console.log("req.body--> " + req.body.foo);
    var UserName = req.body.username;
    var UserPsw = req.body.password;
	res.status(200).send("testing");
    //帳號驗證
//    var updatestr = { username: UserName };
//    res.setHeader('Content-type', 'application/json;charset=utf-8')
//    console.log(updatestr);
//    Mongo.find(updatestr, function(err, obj) {
//       if (err) {
//            console.log("Error:" + err);
//        } else {
//            if (obj.length == 0) {
//                insert(UserName, UserPsw);
//                res.send({ status: 'success', message: 'true' })
//            } else {
//                res.send({ status: 'success', message: 'false' })
//            }
//        }
//    })
});

app.listen(3000);
