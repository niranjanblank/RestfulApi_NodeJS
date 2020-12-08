const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    name: {type:String, required: true},
    price: {type: Number, requierd: true}
}, {timestamps: true})

// const blogSchema = new Schema({
//     title: { 
//             type: String,
//         required: true },
//     snippet: { 
//         type: String,
//         required: true },
//     body: {
//         type: String,
//         required: true
//     }
// }, {timestamps: true})

const Product = mongoose.model('Product', productSchema)

module.exports = Product