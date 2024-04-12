const express = require('express')
const router = express.Router()
const verifyToken = require('../middleware/auth')

const Product = require('../models/Product')

router.post('/', verifyToken, async (req, res) => {
  const { name, amount, originPrice, costPrice, salePrice, discount, img } = req.body
  console.log({ name, amount, originPrice, costPrice, salePrice, discount, img })

  if (!name
    || parseInt(amount) < 0
    || parseFloat(originPrice) < 0
    || parseFloat(costPrice) < 0
    || parseFloat(salePrice) < 0
    || parseFloat(discount) < 0
  )
    return res.status(400).json({ success: false, message: 'Thiếu thông tin cần thiết' })
    
  const exitstingProduct = await Product.findOne({ name: name })
  if (exitstingProduct) return res.status(400).json({ success: false, message: "sản phẩm đã tồn tại"})

  try {
    const newProduct = new Product({
      name,
      amount,
      originPrice,
      costPrice,
      salePrice,
      discount,
      img
    })

    await newProduct.save()

    res.status(200).json({ success: true, message: 'Tạo sản phẩm mới thành công', customer: newProduct })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.put('/:id', verifyToken, async (req, res) => {
  const { name, amount, originPrice, costPrice, salePrice, discount, img } = req.body

  if (!name || parseInt(amount)<0 || parseFloat(originPrice)<0 || parseFloat(costPrice)<0 || parseFloat(salePrice)<0 || parseFloat(discount)<0 )
    return res.status(400).json({ success: false, message: 'Thiếu thông tin cần thiết' })
  try {
    let updateProduct = {
      name,
      amount,
      originPrice,
      costPrice,
      salePrice,
      discount,
      img
    }

    updateProduct = await Product.findByIdAndUpdate({ _id: req.params.id }, updateProduct, { new: true })

    if (!updateProduct) {
      return res
        .status(401)
        .json({ success: false, message: 'không tìm sản phẩm cần thay đổi' })
    }

    res.status(200).json({ success: true, message: 'Cập nhập sản phẩm thành công', customer: updateProduct })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.get('/products', verifyToken, async (req, res) => {

  try {
    const products = await Product.find()

    if (!products) {
      return res.status(401).json({ success: false, message: "Tài khoản chưa xác thực" })
    }

    res.json({ success: true, message: 'Lấy sản phẩm thành công', products: products })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    let deleteProduct = await Product.findByIdAndDelete({ _id: req.params.id })

    if (!deleteProduct) {
      return res
        .status(401)
        .json({ success: false, message: 'không tìm thấy sản phẩm cần xóa' })
    }

    res.json({ success: true, message: 'Xóa sản phẩm thành công' })

  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: 'Mạng của bạn có vấn đề' })
  }
})

router.get('/search/:search', async (req, res) => {
  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: req.params.search, $options: 'i' } },
      ]
    });
    return res.status(200).json({ success: true, products: products })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
});

module.exports = router