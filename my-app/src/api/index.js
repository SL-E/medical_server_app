import axios from 'axios';

let ws = null;

const instance = axios.create({
    baseURL: '/api',
    timeout: 5000, // 超时时间
  });

async function checkIsLogin(options) {
    return instance.post('/isLogin', options)
}

async function userRegister(options){
    return instance.post('/register', options)
 }

async function userLogin(options){
   return instance.post('/login', options)
}

async function userLoginout(options){
  return instance.post('/loginout', options)
}

async function getSchedulingList() {
  return instance.get('/reservationList')
}

async function reservationDoctor(options) {
  return instance.post('/reservationDoctor', options)
}

async function getDoctorList(options) {
  return instance.get('/doctorList', options)
}

async function getMedicineList(options) {
  return instance.get('/medicineList', options)
}

async function getHospitalList(options) {
  return instance.get('/hospitalList', options)
}

async function getOnlineUser(options) {
  return instance.get('/onlineUsers', options)
}


async function sendMsgToUser(options) {
  return instance.post('/sendMsgToUser', options)
}

async function getMsgList(options) {
  return instance.get('/msgList', options)
}

async function readMsg(options) {
  return instance.post('/readMsg', options)
}

async function connectWs(query) {
  ws = new WebSocket(`ws://127.0.0.1:5001?${query}`);
  return ws;
}

function getWs() {
  return ws;
}


export {
    checkIsLogin,
    userRegister,
    userLogin,
    userLoginout,
    getSchedulingList,
    reservationDoctor,
    getDoctorList,
    getMedicineList,
    getHospitalList,
    getOnlineUser,
    getMsgList,
    sendMsgToUser,
    readMsg,
    connectWs,
    getWs
}