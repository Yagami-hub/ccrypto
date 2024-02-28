class ExchangeService {
    constructor(web3, exchangeContractAddress) {
      this.web3 = web3;
      this.exchangeContract = new this.web3.eth.Contract(Exchange.abi, exchangeContractAddress);
    }
  
    // 获取账户余额
    async getBalance(account) {
      try {
        const balance = await this.web3.eth.getBalance(account);
        return balance;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to get balance');
      }
    }
  
    // 创建订单
    async createOrder(fromToken, toToken, amount, privateKey) {
      try {
        const encodedData = this.exchangeContract.methods.createOrder(fromToken, toToken, amount).encodeABI();
        const tx = {
          from: this.web3.eth.accounts.privateKeyToAccount(privateKey).address,
          to: this.exchangeContract.options.address,
          data: encodedData,
          gas: 2000000, // 设置 gas 上限
        };
        const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
        const txReceipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return txReceipt;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to create order');
      }
    }
  
    // 撤销订单
    async cancelOrder(orderId, privateKey) {
      try {
        const encodedData = this.exchangeContract.methods.cancelOrder(orderId).encodeABI();
        const tx = {
          from: this.web3.eth.accounts.privateKeyToAccount(privateKey).address,
          to: this.exchangeContract.options.address,
          data: encodedData,
          gas: 2000000, // 设置 gas 上限
        };
        const signedTx = await this.web3.eth.accounts.signTransaction(tx, privateKey);
        const txReceipt = await this.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        return txReceipt;
      } catch (error) {
        console.error(error);
        throw new Error('Failed to cancel order');
      }
    }
  }
  
  module.exports = ExchangeService;
  