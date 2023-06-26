  // 引入依赖
  const express = require('express');
  const { transformPoolQuery } = require('../utils/index.js');
  
  // 导出路由中间件
  module.exports = function(pool) {
      // 创建路由
      const router = express.Router();
  
      router.get('/api/reservationList', async (req, res) => {
          const data = [];
          const result1 = await transformPoolQuery('SELECT * FROM doctor', []);
          const promiseArr = result1.map(async (item) => {
            return new Promise(async (resolve) => {
                    const { id: doctor_id, name, detail, head, hospital_id } = item;
                    const result2 = await transformPoolQuery('SELECT * FROM hospital WHERE id = ?', [hospital_id]); 
                    const result3 = await transformPoolQuery('SELECT * FROM scheduling WHERE doctor_id = ?', [doctor_id]);
                    const monthsData = [];
                    result3.forEach((schedulingItem) => {
                        const findMonthData = monthsData.find((item)=> item.date === schedulingItem.month);
                        if(!findMonthData){
                            monthsData.push({
                                date: schedulingItem.month,
                                time: [{
                                    day: schedulingItem.date,
                                    yuyue: [
                                        {
                                            shangwu: schedulingItem.time,
                                            haoma: [{ weizhi: 1, status: schedulingItem.status, id: schedulingItem.id  }],
                                        },
                                    ],
                                }]
                            })
                        }else{
                            const timeData = findMonthData.time;
                            const findDayData = timeData.find((item)=> item.day === schedulingItem.date);
                            if(!findDayData){
                                timeData.push({
                                    day: schedulingItem.date,
                                    yuyue: [
                                        {
                                            shangwu: schedulingItem.time,
                                            haoma: [{ weizhi: 1, status: schedulingItem.status, id: schedulingItem.id   }],
                                        }
                                    ],
                                })
                            }else {
                                const yuyueData = findDayData.yuyue;
                                const findYuyueData = yuyueData.find((item)=> item.shangwu === schedulingItem.time);
                                if(!findYuyueData){
                                    yuyueData.push({
                                        shangwu: schedulingItem.time,
                                        haoma: [{ weizhi: 1, status: schedulingItem.status, id: schedulingItem.id   }],
                                    })
                                }else{
                                    const haomaData = findYuyueData.haoma;
                                    const length = haomaData.length;
                                    haomaData.push({
                                        weizhi: length + 1,
                                        status: schedulingItem.status, 
                                        id: schedulingItem.id 
                                    })
                                }
                            }
                        }
                    }) 
                    data.push({
                        id: doctor_id,
                        hospital: result2[0].name, //所属医院
                        doctors: name, //医生名字
                        detail: detail,
                        head,
                        yuyueriqi:monthsData
                    })
                    resolve()
            })
          })
          await Promise.all(promiseArr);
          res.send(data)
      });

      router.post('/api/reservationDoctor', async (req, res) => {
        const { account, id, status } = req.body;
        const result1 = await transformPoolQuery('UPDATE scheduling SET status = ? WHERE id = ?;', [status, id]);
        const result2 = await transformPoolQuery('INSERT INTO reservation (account, scheduling_id) VALUES (?, ?);', [account, id]);
        if(result1.affectedRows === 1 && result2.affectedRows === 1){
            res.send({ success: true, message: 'reservation success' })
        }else {
            res.send({ success: false, message: 'reservation fail' })
        }
    });

      return router;
  };
  