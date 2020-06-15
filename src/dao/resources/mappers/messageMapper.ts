/**
 * 留言sql
 */
const messageMapper={
    selectMessageAll:{
        sql:"select * from `dbo_tbmessage`",
        param:[]
    },
    insertMessage:{
        sql:"INSERT INTO dbo_tbmessage(`content`, `mTitle`, `category`, `showType`, `time`) VALUES ?",
        param:[]
    }
}
export=messageMapper;