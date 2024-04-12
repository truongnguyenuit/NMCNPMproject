const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImportBillSchema = new Schema({
  supplierID: {
    type: mongoose.Types.ObjectId,
    ref: 'supplier'
  },
  products: {
    type: [{
      type: mongoose.Types.ObjectId,
      ref: 'product'
    }],
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

module.exports = mongoose.model('importBill', ImportBillSchema)