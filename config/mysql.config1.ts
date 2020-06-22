const recordConfig:recordConfigInfo={
    host:'localhost',
    port: 3306,
    database:'record',
    user:'root',
    password:'123456',
    charset:"UTF8_GENERAL_CI"
};

interface recordConfig{
    host:string,
    port: number,
    database:string,
    user:string,
    password:string,
    charset:string
}
module. exports=recordConfig;