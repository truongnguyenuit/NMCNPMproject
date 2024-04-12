require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')

const authRouter = require('./routes/auth')
const customerRouter = require('./routes/customer')
const productRouter = require('./routes/product')
const saleRouter = require('./routes/sale')
const cors = require('cors')

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(
      `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@doandatabasename.wqxftfr.mongodb.net/?retryWrites=true&w=majority`,
    )
    console.log('MongoDB connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}
connectDB()

const app = express()

app.use(cors({
  origin: "http://localhost:3000"
}))

app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/customer', customerRouter)
app.use('/api/product', productRouter)
app.use('/api/sale', saleRouter)

app.listen(5001, () => console.log(`server started on port 5001`))