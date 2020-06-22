var express = require('express');
var router = express.Router();
var https = require("https");
const util = require("util");
import menuDao from '../../dao/package/menu/menuDao';

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
            new menuDao().selectMenuAll((res, fields) => {
                let data = {
                    code: 200,
                    message: "sessuss",
                    reslut: true,
                    data: res
                }
                response.send(data);
            })
        });
    };

    getIpAddress(){
        let __this=this;
        router.get("/ip",function(request, response, next){
            var clientIp = __this.getIp(request);
            __this.getIpInfo(clientIp, function (err, msg) {
                console.log('Address: ' + util.inspect(msg.data[0].location, true, 8));
            });
        })
    }

    getIp(req) {
        var ip = req.headers['x-real-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddres || req.socket.remoteAddress || '';
        if (ip.split(',').length > 0) {
            ip = ip.split(',')[0];
        }
        return ip;
    }
    getIpInfo(ip, cb) {
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
