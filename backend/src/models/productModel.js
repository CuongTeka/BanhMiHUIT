
const mongoose = require('mongoose');

const products = new mongoose.Schema({
    id: {type: Number, required: true},
    name: {type: String, required:true, unique: true},
    category_id: {type: String, required: true},
    price: {type: Number, required:true},
    discount: {type: Number, required: true, default:0},
    detail: {type: String, required:true},
    image: {type: String, required:true},
    date_create: {type: Date, default: Date.now},
    date_edit: {type: Date, default: Date.now},
    is_active: {type: Boolean, default:true}
}, {collection: 'Product'}

);
const Product = mongoose.model('Product', products);

module.exports = Product;