var express = require('express');
var router = express.Router();
var https = require("https");
import menuDao from '../../dao/package/menu/menuDao';
import ipTool from '../tools/ipTools';

//日志
var log = require("../../../config/log4j/log4js");
class muneController {
    // userDao = new userDao();
    routerPath: string = 'user/'
    constructor() {
        this.init();
    }

    init() {
        this.selectGradPhotoAll();
        this.getIpAddress();
    }
    selectGradPhotoAll() {
        router.get('/mune/selectMenuAll', function (request, response, next) {
            let  r=response.req.query;
            
            new menuDao().selectMenuAll((res, fields) => {
                let data = {
                    code: 200,
                    message: "sessuss",
                    reslut: true,
                    data: res
                }
                let options:OptionsInfo={
                    page:r.page,
                    message:r.msg
                }
                new ipTool(request,options)
                // let logger = log.log.getLogger("[/mune/selectMenuAll]");
                // logger.info('操作: ' +r.page);
                response.send(data);
                
            })
        });
    };

    getIpAddress() {
        let __this = this;
        router.get("/ip", function (request, response, next) {
            var clientIp = __this.getIp(request);
           
            __this.getIpInfo(clientIp, function (err, msg) {
               let logger = log.log.getLogger("[/ip]");
                logger.info('ip地址: ' +msg.data[0].location);
                response.send(msg)

            });
        })
    }

    getIp(req: any) {
        var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
        if (ip.split(',').length > 0) {
            ip = ip.split(',')[0];
        }
        return ip.match(/\d+\.\d+\.\d+\.\d+/)[0];
    }
    getIpInfo(ip: string, cb: Function) {
        var url = "https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query="
            + ip + "&co=&resource_id=6006&t=1555898284898&ie=utf8&oe=utf8&format=json&tn=baidu";
        https.get(url, function (res) {
            var code = res.statusCode;
            if (code == 200) {
                res.on('data', function (data) {
                    try {
                        cb(null, JSON.parse(data));
                    } catch (err) {
                        cb(err);
                    }
                });
            } else {
                cb({ code: code });
            }
        }).on('error', function (e) {
            cb(e);
        });
    }
}
new muneController();
module.exports = router;
