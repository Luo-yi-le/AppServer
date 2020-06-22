var express = require('express');
var router = express.Router();
import messageDao from '../../dao/package/message/messageDao';
import ipTool from '../tools/ipTools';

class messageController {
    // userDao = new userDao();
    routerPath: string = 'user/'
    constructor() {
        this.init();
    }

    init() {
        this.selectUserAll();
    }
    selectUserAll() {
        router.get('/message/selectMessageAll', function (request, response, next) {
            let  r=response.req.query;
            let options:OptionsInfo={
                page:r.page,
                message:r.msg
            }

            new messageDao().selectMessageAll((res, fields) => {
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
}
new messageController();
module.exports = router;
