
const mongoose = require('mongoose');
const Schema = new mongoose.Schema;
const bcrypt = require('bcrypt');

const users = new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    mssv: {type:String, required:true},
    phone: {type:String, required: true},
    date_create: {type: Date, default: Date.now},
    date_update: {type: Date, default: Date.now},
    role: {type: String, default:0}
}, {collection: 'User', versionKey: false});


const User = mongoose.model('User', users)
module.exports = User;