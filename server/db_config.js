const mongoose = require('mongoose');
let mongodb_path = 'mongodb://admin:yiyuoliver@35.194.134.133:27017/account';

mongoose.connect(mongodb_path, { useNewUrlParser: true }, function(err, db) {
    if (err) {
        console.log('Unable to connect to the server. Please start the server. Error:', err);
    } else {
        console.log('Connected to Server successfully!');
    }
});


const db = mongoose.connection;
const Schema = new mongoose.Schema({});
const Mongo = mongoose.model('Mongo', Schema, 'account');

// const fields = {
//     _id: 0,
//     account: 1,
//     passwd: 1
// };

module.exports = {
    Mongo, 
    db
}
