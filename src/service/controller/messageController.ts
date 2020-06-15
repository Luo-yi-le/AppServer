var express = require('express');
var router = express.Router();
import messageDao from '../../dao/package/message/messageDao';

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
            new messageDao().selectMessageAll((res, fields) => {
                let data={
                    code:200,
                    message:"sessuss",
                    data:res
                }
                response.send(data);
            })
        });
    };
}
new messageController();
module.exports = router;
