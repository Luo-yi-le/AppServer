
import mysqlHelp from '../../resources/db/mysqlHelp';
import gradPhotoMapper from '../../resources/mappers/gradPhotoMapper'

class gradPhotoDao {
    mysql = new mysqlHelp();
    constructor() {
    };

     /**
     * @查询所有照片
     * @param sql 
     * @param param 
     * @param callback 
     */
    selectGradPhotoAll(callback: Function) {
        //"select * from `dbo_tbuser`"
        this.mysql.Query(gradPhotoMapper.selectGradPhotoAll.sql, gradPhotoMapper.selectGradPhotoAll.param, (res, fields) => {
            callback(res, fields)
        })
    }
};
export =gradPhotoDao;