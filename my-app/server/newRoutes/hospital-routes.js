  // 引入依赖
  const express = require('express');
  const { transformPoolQuery } = require('../utils/index.js');
  
  // 导出路由中间件
  module.exports = function() {
      // 创建路由
      const router = express.Router();
  
      router.get('/api/hospitalList', async (req, res) => {
           const hospitals = await transformPoolQuery(`SELECT * FROM hospital`, [])
           res.send({
            success: true,
            hospitals
           })
      });
  
      return router;
  };
  