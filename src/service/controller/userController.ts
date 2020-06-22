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
        this.userRules();
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

    //临时权限
    userRules(){
        router.get(this.routerPath+'rule', function (request, response, next) {
            let r=response.req.query;

            let a={
                code:200,
                message:"该账号可查看部分功能",
                data:{
                    rule:[
                        {path:"page/alubm",result:true},
                        {path:"message/index",result:true}
                    ]
                },
                loginStatus:true,
                result:true
            }
            if(r.token=="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtc2ciOiJsb2dpbiIsImlhdCI6MTU5MjczMjI5MywiZXhwIjoxNTkyNzMzMTkzfQ.SW6PHF3fsnZjqqo0S5HEA1x2MhMC_k4ft6ebDKa8Ugk"&& r.email=="2318927272@qq.com"){
                response.send(a);
            }else{
                a.data={rule:[]};
                a.message="无该账号";
                a.loginStatus=false;
                a.result=false;
                response.send(a);
            }

        })
    }
}
new userController();
module.exports = router;

interface loginParam{
    email:string,
    ULoginPwd:string
}
