const Web3 = require('web3');
const Exchange = require('../contracts/Exchange.json'); // 导入智能合约 ABI
const dotenv = require('dotenv');

dotenv.config();

const web3 = new Web3(process.env.PROVIDER_URL); // 连接到以太坊节点

const exchangeController = {
  // 获取账户余额
  getBalance: async (req, res) => {
    const { account } = req.params;
    try {
      const balance = await web3.eth.getBalance(account);
      res.json({ balance });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to get balance' });
    }
  },

  // 创建订单
  createOrder: async (req, res) => {
    const { fromToken, toToken, amount } = req.body;
    const { privateKey } = req.user; // 假设用户已通过认证并提供了私钥

    try {
      const exchangeContract = new web3.eth.Contract(Exchange.abi, process.env.EXCHANGE_ADDRESS);
      const encodedData = exchangeContract.methods.createOrder(fromToken, toToken, amount).encodeABI();

      const tx = {
        from: req.user.address,
        to: process.env.EXCHANGE_ADDRESS,
        data: encodedData,
        gas: 2000000, // 设置 gas 上限
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      res.json({ txReceipt });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create order' });
    }
  },

  // 撤销订单
  cancelOrder: async (req, res) => {
    const { orderId } = req.params;
    const { privateKey } = req.user; // 假设用户已通过认证并提供了私钥

    try {
      const exchangeContract = new web3.eth.Contract(Exchange.abi, process.env.EXCHANGE_ADDRESS);
      const encodedData = exchangeContract.methods.cancelOrder(orderId).encodeABI();

      const tx = {
        from: req.user.address,
        to: process.env.EXCHANGE_ADDRESS,
        data: encodedData,
        gas: 2000000, // 设置 gas 上限
      };

      const signedTx = await web3.eth.accounts.signTransaction(tx, privateKey);
      const txReceipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);

      res.json({ txReceipt });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to cancel order' });
    }
  }
};

module.exports = exchangeController;
