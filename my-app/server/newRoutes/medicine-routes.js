  // 引入依赖
  const express = require('express');
  const { transformPoolQuery } = require('../utils/index.js');
  
  // 导出路由中间件
  module.exports = function() {
      // 创建路由
      const router = express.Router();
  
      router.get('/api/medicineList', async (req, res) => {
           const { pageNum = 1, pageSize = 18 } = req.query;
           const result1 = await transformPoolQuery('SELECT * FROM medicine', [])
           const data = result1.slice((pageNum - 1) * pageSize, (pageNum - 1) * pageSize + pageSize)
           res.send({ success: true, message: 'register success', data, pageNum: Number(pageNum), pageSize: Number(pageSize), total: result1.length }) 
      });

      return router;
  };
  