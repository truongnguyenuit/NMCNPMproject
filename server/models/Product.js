const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  name: {
    type: String,
    default: ''
  },
  amount: {
    type: String,
    default: ''
  },
  originPrice: {
    type: Number,
    default: 0
  },
  costPrice: {
    type: Number,
    default: 0
  },
  salePrice: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0
  },
  img: {
    type: String,
    default: '',
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  UpdateAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('product', ProductSchema)