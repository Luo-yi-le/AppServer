import mysqlHelp from '../../resources/db/mysqlHelp';
import messageMapper from '../../resources/mappers/messageMapper';

class messageDao {
    mysql = new mysqlHelp();
    constructor() {
    };

     /**
     * @查询所有留言
     * @param sql 
     * @param param 
     * @param CALLBACK 
     */
    selectMessageAll(CALLBACK: Function) {
        this.mysql.Query(messageMapper.selectMessageAll.sql, messageMapper.selectMessageAll.param, (res, fields) => {
            CALLBACK(res, fields)
        })
    };

    /**
     * /添加留言
     * @param tab 参数
     * @param CALLBACK 回调函数
     */
    insertMessage(tab,CALLBACK:Function){
        let param=messageMapper.insertMessage.param;
        param=tab;
        // console.log(param,messageMapper.insertMessage.sql)
        this.mysql.Query(messageMapper.insertMessage.sql,[param],(err,res,fields)=>{
            CALLBACK(err,res, fields)
        })
    }
};
export =messageDao;