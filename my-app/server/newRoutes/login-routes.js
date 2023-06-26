  // 引入依赖
const express = require('express');
const { transformPoolQuery } = require('../utils/index.js');

// 导出路由中间件
module.exports = function(options) {
    // 创建路由
    const router = express.Router();
    const { wss } = options;

    router.post('/api/register', async (req, res) => {
        const { account, password } = req.body;
        if(account){
          if(!req.session.users){
            req.session.users = []
          }
          req.session.users.push(account);  
        }
        const result1 = await transformPoolQuery('SELECT * FROM user WHERE account=?', [account])
        if(result1 instanceof Error){
            return res.send({ success: false, message: 'register fail' }) ;
        }else if(result1.length > 0){
          return res.send({ success: false, message: 'register fail: duplicate account or password' }) ;
        }
        const result2 = await transformPoolQuery('INSERT INTO user (account, password) VALUES (?, ?)', [account, password])
        if(result2 instanceof Error){
          return res.send({ success: false, message: 'register fail' }) ;
        }
         res.send({ success: true, message: 'register success', data: { account } }) 
    });

    router.post('/api/login', async (req, res) => {
        const { account, password } = req.body;
        if(!req.session.users){
          req.session.users = []
        }
        req.session.users.push(account);
        const result = await transformPoolQuery('SELECT * FROM user WHERE account=? AND password=?', [account, password])
        if(result instanceof Error){
          res.send({ success: false, message: 'login fail' }) ;
        }else if(result.length === 0) {
          res.send({ success: false, message: 'login fail: check your account or password'}) ;
        }else {
            res.send({ success: true, message: 'login success', data: { account }}) ;
        }
    });


    router.post('/api/isLogin', async (req, res) => {
        const { account } = req.body;
        const isLogin = req.session.users && req.session.users.includes(account);
        return res.send({ success: true, isLogin })
    });


    router.post('/api/loginout', async (req, res) => {
      const { account } = req.body;
      const idx = req.session.users ? req.session.users.findIndex((item) => item === account) : -1;
      if(idx !== -1){
         req.session.users.splice(idx, 1);
      }
      return res.send({ success: account && req.session.users.findIndex((item) => item === account) === -1 })
    });


    router.get('/api/onlineUsers', async (req, res) => {
        const { account: curAccount } = req.query;
        const onLineUsers = wss.clients;
        const users = await transformPoolQuery('SELECT * FROM user', []);
        let arrPromise = [];
        users.forEach(async (item) => {
          if(item.account === curAccount){
              return;
          }
          arrPromise.push(new Promise(async (resolve) => {
              const communacationInfo = await transformPoolQuery('SELECT * FROM communacation WHERE (fromUser = ? AND toUser = ?) OR (fromUser = ? AND toUser = ?)', [curAccount, item.account, item.account, curAccount]);
              const { account, avatar = '' } = item || {};
              communacationInfo.sort((a, b) => b.time - a.time);
              const { content = '', time } = communacationInfo[0] || {};
              const unReadMsg = (communacationInfo.filter((item) => item.isRead === 0 && item.toUser === curAccount ).length) || 0;
              let isOnline = false;
              onLineUsers.forEach((onLineItem) => {
                if(onLineItem.account === item.account){
                  isOnline = true;
                }
              })
              resolve({
                  name: account,
                  isOnline: isOnline,
                  avatar,
                  lastMsg: content,
                  unReadMsg,
                  lastChatTime: time 
              })
          }))
      })
      const data = await Promise.all(arrPromise) || [];
      return res.send({ success: true, data })
    });


    router.post('/api/sendMsgToUser', async (req, res) => {
      const { content =  '', from = '', to = '', time } = req.body;
      let toUserIsOnline = false;
      wss.clients.forEach((item) => {
        if(item.account === to){
          toUserIsOnline = true;
        }
      })
      const res1 = await transformPoolQuery('INSERT INTO communacation (fromUser, toUser, time, content, isRead) VALUES (?, ?, ?, ?, ?)', [from, to, time, content, toUserIsOnline ? 1 : 0])
      const success = Boolean(res1.affectedRows === 1);
      if(success) {
        wss.clients.forEach(async (client) => {
          if(client.account === to){
            const res1 = await transformPoolQuery('SELECT * FROM communacation WHERE (fromUser = ? AND toUser = ?) OR (fromUser = ? AND toUser = ?)', [from, to, to, from]);
            const formatList = res1.map((item) => {
               return {
                 id: item.id,
                 text: item.content,
                 avatar: '',
                 name: item.fromUser
               }
            })
            client.send(JSON.stringify({
                list: formatList
            }))
          }

          if(client.account === from || client.account === to){
            client.send(JSON.stringify({ fetchNewOnlineUsers: true }))
          }
        })
      }
      return res.send({ success })
    });


    router.get('/api/msgList', async (req, res) => {
      const { from = '', to = '' } = req.query;
      const res1 = await transformPoolQuery('SELECT * FROM communacation WHERE (fromUser = ? AND toUser = ?) OR (fromUser = ? AND toUser = ?)', [from, to, to, from]);
      const formatList = res1.map((item) => {
         return {
           id: item.id,
           text: item.content,
           avatar: '',
           name: item.fromUser
         }
      })
      return res.send({ success: true, data: formatList })
    });


    router.post('/api/readMsg', async (req, res) => {
      const { from = '', to = '' } = req.body;
      const result1 = await transformPoolQuery('UPDATE communacation SET isRead = ? WHERE (fromUser = ? AND toUser = ?) OR (fromUser = ? AND toUser = ?);', [1, from, to, to, from]);
      return res.send({ success: true })
    });

    return router;
};
