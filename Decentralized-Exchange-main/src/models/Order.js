class Order {
    constructor(id, fromToken, toToken, amount, status) {
      this.id = id;
      this.fromToken = fromToken;
      this.toToken = toToken;
      this.amount = amount;
      this.status = status;
    }
  
    // 获取订单详情
    getOrderDetails() {
      return {
        id: this.id,
        fromToken: this.fromToken,
        toToken: this.toToken,
        amount: this.amount,
        status: this.status,
      };
    }
  
    // 更新订单状态
    updateStatus(newStatus) {
      this.status = newStatus;
    }
  }
  
  module.exports = Order;
  