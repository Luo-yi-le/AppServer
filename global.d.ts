interface userLoginInfo{
    email:string;
    ULoginPwd:string;
}
interface OptionsInfo{
    page:string,
    message:string,
    time?:Date,
}
interface recordConfigInfo{
    host:string,
    port: number,
    database:string,
    user:string,
    password:string,
    charset:string
}
interface Global{
    userLoginInfo:userLoginInfo;
    OptionsInfo:OptionsInfo;
    recordConfigInfo:recordConfigInfo;
}
declare var Global:Global;
declare module 'Global'{
    export= Global;
}