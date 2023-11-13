const url = process.env.DBURL || 'mongodb+srv://admin:123@qlbanmi.qonjmak.mongodb.net/QLBM/?retryWrites=true&w=majority';

// require('dotenv').config();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connect(url ,{dbName: 'QLBM'});

const contents = new Schema({
    pro_id: {type: String, required:true},
    quantity: {type: Number, required:true},
    custom: {type: String}
})

const orders = new Schema({
    customer: {type: String, required:true},
    item: {type: [contents], default: undefined},
    total: {type: Number, required:true},
    date_create: {type: Date, default: Date.now},
    payment: {type: String, required:true},
    status: {type:Number, default:0},
    shipping: {type:String, required:true},
    note: {type:String}
}, {collection: 'Order'});

module.exports = mongoose.model('Order', orders);