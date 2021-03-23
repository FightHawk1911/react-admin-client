// 包含所有接口请求函数的模块

import ajax from "./ajax";

const key = "411d5781f9531bc2bdbac14c2d464726"


export const reqLogin = (username:string, password:string) =>
    ajax('/login', {username: username, password: password}, 'POST')

export const reqWeather = async ()=> {
    const res = await ajax(`https://restapi.amap.com/v3/ip`, {key: key, output: 'JSON'})

    if (res.data.status === '1'){
        return ajax('https://restapi.amap.com/v3/weather/weatherInfo', {
            key: key, output: 'JSON', extensions: 'base', city: res.data.adcode
        })
    }
}


