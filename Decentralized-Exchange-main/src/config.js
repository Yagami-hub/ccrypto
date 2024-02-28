module.exports = {
    PROVIDER_URL: process.env.PROVIDER_URL || 'http://localhost:8545', // 以太坊节点提供者 URL
    EXCHANGE_ADDRESS: process.env.EXCHANGE_ADDRESS || '0x1234567890123456789012345678901234567890', // 去中心化交易所合约地址
    PORT: process.env.PORT || 3000, // 服务器端口号
  };
  