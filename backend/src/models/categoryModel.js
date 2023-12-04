const url = process.env.DBURL || 'mongodb+srv://admin:123@qlbanmi.qonjmak.mongodb.net/QLBM/?retryWrites=true&w=majority';

// require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(url ,{dbName: 'QLBM'});

const cate = new Schema({
    name: {type: String, required:true},
    price: {type: Number, required: true},
    is_active: {type: Boolean, default:true}
}, {collection: 'Category', versionKey: false});

module.exports = mongoose.model('Category', cate);