  // 引入依赖
  const express = require('express');
  const { transformPoolQuery, strFn } = require('../utils/index.js');
  
  // 导出路由中间件
  module.exports = function() {
      // 创建路由
      const router = express.Router();
  
      router.get('/api/doctorList', async (req, res) => {
           const { selectedCity = [], selectedHospital = [], selectedCategory = [] } = req.query;
           let doctorsResult = [];
           const citySet = new Set([]);
           const hospitalNameSet = new Set([]);
           const hospitalCategorySet = new Set([]);
           const hospitals = await transformPoolQuery(`SELECT * FROM hospital`, [])
           let cityQuery = selectedCity.length > 0 ? `city IN (${strFn(selectedCity)})` : `city IS NOT NULL`
           let hospitalQuery = selectedHospital.length > 0 ? `name IN (${strFn(selectedHospital)})` :  `name IS NOT NULL`
           let categoryQuery = selectedCategory.length > 0 ? `category IN (${strFn(selectedCategory)})` : `category IS NOT NULL`
           const queryHospitals = await transformPoolQuery(`SELECT * FROM hospital WHERE ${cityQuery} AND ${hospitalQuery} AND ${categoryQuery}`, [])

           if(queryHospitals.length > 0){
            const queryDoctorsPromise = queryHospitals.map(async (item) => {
                const queryDoctors = await transformPoolQuery(`SELECT * FROM doctor WHERE hospital_id = ?`, [item.id || '%']) 
                return queryDoctors;
            })
            const queryDoctors = await Promise.all(queryDoctorsPromise);
            for(let i= 0; i < queryDoctors.length; i++){
                 doctorsResult = doctorsResult.concat(queryDoctors[i]);
            }
           }else {
            doctorsResult = [];
           }
           hospitals.forEach((item) => {
                citySet.add(item.city)
                hospitalNameSet.add(item.name)
                hospitalCategorySet.add(item.category)
           })
           res.send({ success: true, data: { 
             doctors: doctorsResult,
             citys: Array.from(citySet),
             hospitals: Array.from(hospitalNameSet),
             category: Array.from(hospitalCategorySet),
           }})
      });
  
      return router;
  };
  