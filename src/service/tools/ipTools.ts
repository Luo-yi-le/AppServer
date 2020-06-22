//日志
var log = require("../../../config/log4j/log4js");
var https = require("https");

class ipTools {
    constructor(request,options) {
        this.init(request,options)
    };
    init(request,options:OptionsInfo) {
        let __this = this;
        var clientIp = __this.getIp(request);
        __this.getIpInfo(clientIp, function (err, msg) {
            let logger = log.log.getLogger("["+options.page+"]");
            logger.info('访问路径: '+options.message+', 访问ip: ' + clientIp+'/'+msg.data[0].location);
        });

    };

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
};
export =ipTools;
