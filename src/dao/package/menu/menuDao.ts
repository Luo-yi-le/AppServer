
import mysqlHelp from '../../resources/db/mysqlHelp';
import menu from '../../resources/mappers/menuMapper'

class menuDao {
    mysql = new mysqlHelp();
    constructor() {
    };

     /**
     * @查询所有菜单集合
     * @param sql 
     * @param param 
     * @param callback 
     */
    selectMenuAll(callback: Function) {
        //"select * from `dbo_tbuser`"
        this.mysql.Query(menu.selectMenuAll.sql, menu.selectMenuAll.param, (res, fields) => {
            callback(res, fields)
        })
    }
};
export =menuDao;