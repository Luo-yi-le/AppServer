var express = require('express');
var router = express.Router();
import userDao from '../../dao/package/user/userDao';
import Token from '../../common/main/Token/JwtToken'
import ipTool from '../tools/ipTools';

class userController {
    // userDao = new userDao();
    routerPath: string = '/account/'
    
    constructor() {
        this.init();
    }

    init() {
        this.selectUserAll();
        this.userLogin();
    }
    selectUserAll() {
        router.get(this.routerPath+'selectUserAll', function (request, response, next) {
            let  r=response.req.query;
            let options:OptionsInfo={
                page:r.page,
                message:r.msg
            }
            new userDao().selectUserAll((res, fields) => {
                let data={
                    code:200,
                    message:"sessuss",
                    data:res
                }
                new ipTool(request,options)
                response.send(data);
            })
        });
    };

    userLogin(){
        router.get(this.routerPath+'userLogin', function (request, response, next) {
            var token=new Token().createToken("login",60 * 15)
            let r=response.req.query;
            let p:loginParam={
                email:r.email,
                ULoginPwd:r.pwd
            }
            let options:OptionsInfo={
                page:r.page,
                message:r.msg
            }
            new userDao().userLogin(p,(re, fields) => {
                let a={
                    code:200,
                    message:"登陆成功！",
                    data:{}
                }
                if(re.length===1){
                    a.data={
                        email:re[0].email,
                        token:token
                    }
                    options.message="登陆成功！"
                    new ipTool(request,options)
                    response.send(a);
                }else{
                    a.message="登陆失败！"
                    options.message="登陆失败！"
                    new ipTool(request,options)
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
