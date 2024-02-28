const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const exchangeRoutes = require('./routes/exchangeRoutes');
const web3 = require('web3');

dotenv.config();

const app = express();

// 解析请求体
app.use(bodyParser.json());

// 配置路由
app.use('/exchange', exchangeRoutes);

// 启动服务器
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
