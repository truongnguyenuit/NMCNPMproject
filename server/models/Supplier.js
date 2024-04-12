const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SupplierSchema = new Schema({
  supplierName: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: ''
  },
  telephoneNumber: {
    type: String,
    default: ''
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

module.exports = mongoose.model('supplier', SupplierSchema)