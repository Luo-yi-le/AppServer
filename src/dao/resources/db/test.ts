import mysqlHelp from './mysqlHelp';
import userDao from '../../package/user/userDao'
class test {
    constructor() {
        // this.init();
        this.userLogin()
    }
    init() {
        let mysql = new mysqlHelp();
        var u = 'user'
        mysql.Query("select * from `dbo_tbMessage`", "dbo_tbMessage", function (res, fields) {
            console.log(JSON.stringify(res));
        })
    }
    userLogin(){
        let user=new userDao();
        let p={
            email:'wangwu@qq.com',
            ULoginPwd:'wangwu'
        }
        user.userLogin(p,(res,f)=>{
            console.log(res)
        })
    }
}
exports=test;
new test();