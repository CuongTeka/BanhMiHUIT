const url = process.env.DBURL || 'mongodb+srv://admin:123@qlbanmi.qonjmak.mongodb.net/QLBM/?retryWrites=true&w=majority';

const mongoose = require('mongoose');
mongoose.connect(url ,{dbName: 'QLBM'});

const products = new mongoose.Schema({
    name: {type: String, required:true, unique: true},
    category_id: {type: String, required: true},
    price: {type: Number, required:true},
    discount: {type: Number, required: true, default:0},
    detail: {type: String},
    image: {type: String, required:true},
    date_create: {type: Date, default: Date.now},
    date_edit: {type: Date, default: Date.now},
    is_active: {type: Boolean, default:true}
}, {collection: 'Product'});

const Product = mongoose.model('Product', products);

module.exports = Product;