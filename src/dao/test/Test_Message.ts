import messageDao from '../package/message/messageDao';
let Data=require('../resources/json/Data_2020_06_11.json')
class Test_Message {
    constructor() {
        this.init()
    };
    init() {
        let param=Data.messageData;
        // console.log(param)
        new messageDao().insertMessage(param,(err,res,f)=>{
            console.log(err,res,f)
        })
    };
};
export =Test_Message;
new Test_Message();