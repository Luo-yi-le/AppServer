var express = require('express');
var router = express.Router();
import menuDao from '../../dao/package/menu/menuDao';

class muneController {
    // userDao = new userDao();
    routerPath: string = 'user/'
    constructor() {
        this.init();
    }

    init() {
        this.selectGradPhotoAll();
    }
    selectGradPhotoAll() {
        router.get('/mune/selectMenuAll', function (request, response, next) {
            new menuDao().selectMenuAll((res, fields) => {
                let data={
                    code:200,
                    message:"sessuss",
                    reslut: true,
                    data:res
                }
                response.send(data);
            })
        });
    };
}
new muneController();
module.exports = router;
