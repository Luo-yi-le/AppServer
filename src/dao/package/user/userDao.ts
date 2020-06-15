import mysqlHelp from '../../resources/db/mysqlHelp';
import userMapper from '../../resources/mappers/userMapper'

class userDao {
    mysql = new mysqlHelp();
    constructor() {

    }

    /**
     * @查询所有用户
     * @param sql 
     * @param param 
     * @param callback 
     */
    selectUserAll(callback: Function) {
        //"select * from `dbo_tbuser`"
        this.mysql.Query(userMapper.selectUserAll.sql, userMapper.selectUserAll.param, (res, fields) => {
            callback(res, fields)
        })
    }

    userLogin(tab, callback: Function) {
        let sql = userMapper.userLogin.sql;
        let arr = [];
        if (tab.email != null && tab.email != undefined && tab.email != ""){
            sql+=' and email=?';
            arr.push(tab.email);
        }
        if (tab.ULoginPwd != null && tab.ULoginPwd != undefined && tab.ULoginPwd != ""){
            sql+=' and ULoginPwd=?';
            arr.push(tab.ULoginPwd);
        }
        this.mysql.Query(sql, arr, (res: any, fields) => {
            callback(res, fields)
        })
    }
}

export =userDao;