const Web3 = require('web3');
const Exchange = require('../contracts/Exchange.json');
const ExchangeService = require('../services/exchangeService');

// 初始化 web3
const web3 = new Web3('http://localhost:8545');

// 初始化 ExchangeService
const exchangeService = new ExchangeService(web3, process.env.EXCHANGE_ADDRESS);

describe('Exchange', () => {
  test('should create order', async () => {
    // 模拟订单信息
    const fromToken = 'ETH';
    const toToken = 'DAI';
    const amount = 1;
    const privateKey = process.env.PRIVATE_KEY; // 假设用户提供了私钥

    // 创建订单
    const txReceipt = await exchangeService.createOrder(fromToken, toToken, amount, privateKey);

    expect(txReceipt.status).toBe(true);
    expect(txReceipt.transactionHash).toBeDefined();
  });

  test('should cancel order', async () => {
    // 假设订单 ID 为 1
    const orderId = 1;
    const privateKey = process.env.PRIVATE_KEY; // 假设用户提供了私钥

    // 撤销订单
    const txReceipt = await exchangeService.cancelOrder(orderId, privateKey);

    expect(txReceipt.status).toBe(true);
    expect(txReceipt.transactionHash).toBeDefined();
  });
});
