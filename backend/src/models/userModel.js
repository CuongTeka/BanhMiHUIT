const url = process.env.DBURL || 'mongodb+srv://admin:123@qlbanmi.qonjmak.mongodb.net/QLBM/?retryWrites=true&w=majority';

// require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
mongoose.connect(url ,{dbName: 'QLBM'});

const users = new Schema({
    name: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mssv: {type:String, required:true},
    phone: {type:String, required: true},
    date_create: {type: Date, default: Date.now},
    date_update: {type: Date, default: Date.now},
    role: {type: String, default:0}
}, {collection: 'User'});

// const UserModel = mongoose.model('User', users);

module.exports = mongoose.model('User', users);