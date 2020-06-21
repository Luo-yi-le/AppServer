var express = require('express');
var router = express.Router();
import gradPhotoDao from '../../dao/package/gradPhoto/gradPhotoDao';

class gradPhotoController {
    // userDao = new userDao();
    routerPath: string = 'user/'
    constructor() {
        this.init();
    }

    init() {
        this.selectGradPhotoAll();
    }
    selectGradPhotoAll() {
        router.post('/gradPhoto/selectGradPhotoAll', function (request, response, next) {
            new gradPhotoDao().selectGradPhotoAll((res, fields) => {
                let data={
                    code:200,
                    message:"sessuss",
                    reslut: true,
                    data:{
                        graduationPhoto:{
                            content: "我们的毕业照",
                            Userfolder: "admin",
                            list:res
                        } 
                    }
                }
                response.send(data);
            })
        });
    };
}
new gradPhotoController();
module.exports = router;
