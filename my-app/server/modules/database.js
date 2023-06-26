const mysql = require("mysql");
const { default: user } = require("./src/pages/user/user");
const { default: Password } = require("antd/es/input/Password");
const { ProfileTwoTone } = require("@ant-design/icons");
const { useParams } = require("react-router-dom");

const connection = mysql.createConnection({
    host: '192.168.1.250',
    database: 'medicalproject',
    user: 'root',
    password: '19950119',
    Port: "3316",
});

module.exports = connection;

/*

const mysql = require("mysql");
const { default: user } = require("./src/pages/user/user");
const { default: Password } = require("antd/es/input/Password");
const { ProfileTwoTone } = require("@ant-design/icons");
const { useParams } = require("react-router-dom");

const pool = mysql.createPool({
    host: "192.168.1.250",
    user: "root",
    Password: "19950119",
    Port: "3316",
})

const query=(sql, params, callback) => {
    pool.getConnection((err.conn) => {
        if(err){
            console.log("mysql connection failed!");
            pool.releaseConnection();
        }
        conn.query(sql,params,(err,result,fields) => {
            if(err){
                conn.release();
                console.log("sql execution failed!");
                return;
            }
            
            callback(result,fields)
            conn.release();
        })
    })
}

let sql="select * from users";
let params=[];
query(sql,params,function(result){
    console.log(result);
}

*/