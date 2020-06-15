let mysql_config =require('./../../../../config/mysql.config');
// import mysql_config from './../../../../config/mysql.config'
let mysql = require('mysql');
class mysqlHelp {
    constructor() {

    };

    init() {

    };

    Query(sql: string, params: any, callback: Function) {
        var connection = mysql.createConnection(mysql_config);
        connection.connect((err:any) => {
            if (err) {
                console.log('数据库链接失败');
                throw err;
            }
            //开始数据操作
            //传入三个参数，第一个参数sql语句，第二个参数sql语句中需要的数据，第三个参数回调函数
            connection.query(sql, params, (err, results, fields) => {
                if (err) {
                    console.log('数据操作失败');
                    throw err;
                }                //将查询出来的数据返回给回调函数
                callback(results, fields);
                //results作为数据操作后的结果，fields作为数据库连接的一些字段
                //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
                connection.end((err) => {
                    if (err) {
                        console.log('关闭数据库连接失败！');
                        throw err;
                    }
                });
            });
        });
    }
};

export=mysqlHelp;