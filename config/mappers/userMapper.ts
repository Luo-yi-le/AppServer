/**
 * 用户sql
 */
const userMapper={
    selectUserAll:{
        sql:"select * from `dbo_tbuser`",
        param:[]
    },
    userLogin:{
        sql:"select * from `dbo_tbuser` where 1=1",
        param:[]
    }
}
export=userMapper;