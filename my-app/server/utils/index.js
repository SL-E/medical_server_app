const mysql = require('mysql');

let pool;
function createMysqlPool() {
// 创建连接池
   pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '123456', // 这里更改成你的密码
    database: 'hospital'
  });
  return pool;
}

function transformPoolQuery(sql, args) {
    return new Promise((resolve, reject) => {
        pool.query(sql, args, (err, result) => {
            if (err) reject(err)
            resolve(result)
        })
    })
  }

   function escapeSingleQuotes(str) {
    // 遍历字符串中的每个字符
    for (var i = 1; i < str.length - 1; i++) {
      var char = str.charAt(i);
  
      if (char === "'") {
        // 如果该字符是单引号，则在其前面加上反斜杠
        str = str.slice(0, i) + '\\' + str.slice(i);
        i++; // 跳过新增加的反斜杠符号
      }
    }
  
    return str;
  }

  const strFn = (arr) => {
    return arr.map(function(num) {
        return "'" + escapeSingleQuotes(num) + "'";
      }).join(',');
   }


   const dispatchOnlineUser = async (clients, curAccount) => {
    clients.forEach(async (client) => {
      if(client.account === curAccount){
        return;
      }
      const users = await transformPoolQuery('SELECT * FROM user WHERE account != ? ', [client.account]);
      let arrPromise = [];
      users.forEach((item) => {
        arrPromise.push(new Promise(async (resolve) => {
          const communacationInfo = await transformPoolQuery('SELECT * FROM communacation WHERE (fromUser = ? AND toUser = ?) OR (fromUser = ? AND toUser = ?)', [client.account, item.account, item.account, client.account]);
          const { account, avatar = '' } = item || {};
          communacationInfo.sort((a, b) => b.time - a.time);
          const { content = '', time } = communacationInfo?.[0] || {};
          const unReadMsg = (communacationInfo.filter((item) => item.isRead === 0).length) || 0;
          let isOnline = false;
          clients.forEach((client) => {
            if(client.account === item.account){
              isOnline = true
            }
          })
          resolve({
              name: account,
              isOnline,
              avatar,
              lastMsg: content,
              unReadMsg,
              lastChatTime: time
          })
      }))
      })
      const formatUsers = await Promise.all(arrPromise) || [];
      const filterUsers = formatUsers.filter((item) => !!item);
      client.send(JSON.stringify({
         onlineUser: filterUsers
      }))
    })

   }
  

  module.exports = {
    createMysqlPool,
    transformPoolQuery,
    strFn,
    escapeSingleQuotes,
    dispatchOnlineUser
  }