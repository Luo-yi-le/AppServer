var express = require('express');
var router = express.Router();
import userDao from '../../dao/package/user/userDao';

class userController {
    // userDao = new userDao();
    routerPath: string = 'user/'
    constructor() {
        this.init();
    }

    init() {
        this.selectUserAll();
        this.userLogin();
    }
    selectUserAll() {
        router.get('/user/selectUserAll', function (request, response, next) {
            new userDao().selectUserAll((res, fields) => {
                let data={
                    code:200,
                    message:"sessuss",
                    data:res
                }
                response.send(data);
            })
        });
    };

    userLogin(){
        router.get('/user/userLogin', function (request, response, next) {
            let r=response.req.query;
            let p:loginParam={
                email:r.email,
                ULoginPwd:r.pwd
            }
            
            new userDao().userLogin(p,(re, fields) => {
                let a={
                    code:200,
                    message:"登陆成功！",
                    data:[]
                }
                if(re.length===1){
                    response.send(a);
                }else{
                    a.message="登陆失败！"
                    response.send(a);
                }
                
            })
        }); 
    }
}
new userController();
module.exports = router;

interface loginParam{
    email:string,
    ULoginPwd:string
}
