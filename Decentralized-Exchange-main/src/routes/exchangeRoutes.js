const express = require('express');
const router = express.Router();
const exchangeController = require('../controllers/exchangeController');

// 获取账户余额
router.get('/balance/:account', exchangeController.getBalance);

// 创建订单
router.post('/orders', exchangeController.createOrder);

// 撤销订单
router.delete('/orders/:orderId', exchangeController.cancelOrder);

module.exports = router;
