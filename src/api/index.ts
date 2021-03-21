// 包含所有接口请求函数的模块

import ajax from "./ajax";


export const reqLogin = (username:string, password:string) =>
    ajax('/login', {username: username, password: password}, 'POST')


