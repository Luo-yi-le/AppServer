var jwt = require("jsonwebtoken");  //引用jws模块
class JwtToken {
    constructor() {
        this.init()
    };
    init() {
        console.log("init JwtToken")
    };

    createToken(content,time){
        var payload = { msg: content }  // Token 数据
        var secret = 'gys.com' // 这是加密的key（密钥或私钥） 
        var token = jwt.sign(payload, secret, {
            expiresIn: time // 24小时过期,以秒作为单位
        })
        return token;
    };

    checkToken(token,callback){
        var secret = 'gys.com' // 这是加密的key（密钥或私钥） 
        jwt.verify(token, secret, function (err, decode) {
            if (err) { // 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑 
                console.log(err)
                callback(false);
            } else {
                console.log(decode.msg);
                callback(true);
            }
        })
    }
};
export =JwtToken;