const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')
const Sale = require('../models/Sale')
const Customer = require('../models/Customer')

router.post('/', verifyToken, async (req, res) => {
  const { account, customer, subTotal, discount, orderTotal, point, orderDetails } = req.body

  if (!account || !customer || !subTotal || parseFloat(discount) < 0 || !orderTotal || parseFloat(point)< 0 || !orderDetails)
    return res.status(400).json({ success: false, message: 'Thiếu thông tin cần thiết' })

  try {
    const newSaleBill = new Sale({
      account,
      customer,
      subTotal,
      discount,
      orderTotal,
      point,
      orderDetails,
    })

    await newSaleBill.save()

    const updatedCustomer = await Customer.findByIdAndUpdate(
      customer,
      { $inc: { point: parseFloat(point) } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: 'Tạo biên lai thành công',
      saleBill: newSaleBill,
      customer: updatedCustomer,
    });

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề', error: error })
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const saleBills = await Sale
      .find({ customerId: req.params.id })
      .populate("customer")
      .populate("account")
      .populate('orderDetails.product')

    if (!saleBills) {
      return res.status(401).json({ success: false, message: "Tài khoản chưa xác thực" })
    }

    res.json({ success: true, message: 'Lấy biên lai thành công', saleBill: saleBills })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    let saleBill = await Sale.findByIdAndDelete({ _id: req.params.id })

    if (!saleBill) {
      return res
        .status(401)
        .json({ success: false, message: 'không tìm thấy biên lai cần xóa' })
    }

    res.json({ success: true, message: 'Xóa biên lai thành công' })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.get('/orders', verifyToken, async (req, res) => {
  try {
    const saleBills = await Sale.find()
      .populate("customer")
      .populate("account")
      .populate('orderDetails.product')

    if (!saleBills) {
      return res.status(401).json({ success: false, message: "Tài khoản chưa xác thực" })
    }

    res.json({ success: true, message: 'Lấy tất cả biên lai thành công', saleBill: saleBills })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

module.exports = router