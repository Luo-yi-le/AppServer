var express = require('express');
var router = express.Router();
import gradPhotoDao from '../../dao/package/gradPhoto/gradPhotoDao';
import ipTool from '../tools/ipTools';

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
            let  r=response.req.body;
            let options:OptionsInfo={
                page:r.page,
                message:r.msg
            }
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
                new ipTool(request,options)
                response.send(data);
            })
        });
    };
}
new gradPhotoController();
module.exports = router;
