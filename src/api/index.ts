// 包含所有接口请求函数的模块

import ajax from "./ajax";

const key = "411d5781f9531bc2bdbac14c2d464726"

//请求登录接口
export const reqLogin = (username:string, password:string) =>
    ajax('/login', {username: username, password: password}, 'POST')


//请求获取分类列表接口
export const reqGetCategoryList = (parentId:string) =>
    ajax('/manage/category/list', {parentId})


//请求添加分类接口
export const reqAddCategory = (parentId:string, categoryName:string) =>
    ajax('/manage/category/add', {parentId, categoryName}, 'POST')


//请求更新分类接口
export const reqUpdateCategory = (categoryId:string, categoryName:string) =>
    ajax('/manage/category/update', {categoryId, categoryName}, 'POST')


//请求天气接口
export const reqWeather = async ()=> {
    const res = await ajax(`https://restapi.amap.com/v3/ip`, {key: key, output: 'JSON'})

    if (res.data.status === '1'){
        return ajax('https://restapi.amap.com/v3/weather/weatherInfo', {
            key: key, output: 'JSON', extensions: 'base', city: res.data.adcode
        })
    }
}


