const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ServiceSchema = new Schema({
  serviceName: {
    type: string,
    default: ''
  },
  price: {
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

module.exports = mongoose.model('service', ServiceSchema)