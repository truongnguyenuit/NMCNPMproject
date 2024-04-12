const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SaleSchema = new Schema({
  account: {
    type: mongoose.Types.ObjectId,
    ref: 'account',
  },
  customer: {
    type: mongoose.Types.ObjectId,
    ref: 'customer',
  },
  subTotal: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  orderTotal: {
    type: Number,
    default: 0
  },
  point: {
    type: Number,
    default: 0
  },
  orderDetails:
    [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: 'product'
        },
        amount: {
          type: Number,
          default: 20
        },
      }
    ],
  updateAt: {
    type: Date,
    default: Date.now
  },
  createAt: {
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('sale', SaleSchema)