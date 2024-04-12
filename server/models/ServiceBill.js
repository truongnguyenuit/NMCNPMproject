const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceBillSchema = new Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'user'
  },
  prePayment: {
    type: number,
    default: ''
  },
  leftPayment: {
    type: number,
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

module.exports = mongoose.model('serviceBill', ServiceBillSchema)