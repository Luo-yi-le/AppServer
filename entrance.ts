// import userController from './src/service/controller/userController';
var userController= require('./src/service/controller/userController');
var messageController= require('./src/service/controller/messageController');
class entrance {
    constructor() {
        userController;
        messageController;
    };
    // init() {
    //    new userController();
    //    new messageController();
    // };
};
export =entrance;
new entrance();