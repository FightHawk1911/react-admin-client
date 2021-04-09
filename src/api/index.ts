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

//请求显示商品接口
export const reqGetProduct = (pageNum:number, pageSize: number) =>
    ajax('/manage/product/list', {pageNum, pageSize})

//请求搜索商品接口
export const reqSearchProduct = (pageNum: number, pageSize: number, searchType:string, searchName:string) =>
    ajax('/manage/product/search', {pageNum, pageSize, [searchType]:searchName})

//请求获取分类ID接口
export const reqGetCategoryID = (categoryId:string) =>
    ajax('/manage/category/info', {categoryId})

//请求更新产品状态接口
export const reqUpdateStatus = (productId:string, status:number) =>
    ajax('/manage/product/updateStatus', {productId, status}, 'POST')

//测试接口 获取ID为0的所有数据
export const reqGetCategoryParentIDeq0 = () =>
    ajax('/showParentIdList')

export const reqGetChildParentCategoryID = (parentId:string) =>
    ajax('/showChildIdList', {parentId})

//请求删除图片接口
export const reqDeletePicture = (name:string) =>
    ajax('/manage/img/delete', {name}, 'POST')

//请求添加产品接口
export const reqAddProduct = (categoryId:string, pCategoryId:string, name:string, productdesc:string, price:string, detail:string, imgs:string) =>
    ajax('/manage/product/add', {categoryId,pCategoryId,name,productdesc,price,detail,imgs}, 'POST')

//请求更新产品接口
export const reqUpdateProduct = (_id:string, categoryId:string, pCategoryId:string, name:string, productdesc:string, price:string, detail:string, imgs:string) =>
    ajax('/manage/product/update', {_id,categoryId,pCategoryId,name,productdesc,price,detail,imgs}, 'POST')

//请求获取角色接口
export const reqGetRoleList = () =>
    ajax('/manage/role/list')

//请求添加角色接口
export const reqAddRole = (rolename:string) =>
    ajax('/manage/role/add', {rolename}, 'POST')

//请求更新角色接口
export const reqUpdateRole = (_id:string, menus:string, auth_time:string, auth_name:string) =>
    ajax('/manage/role/update', {_id, menus, auth_time, auth_name}, 'POST')

//请求获取所有用户接口
export const reqGetUsers = () =>
    ajax('/manage/user/list')

//请求删除用户接口
export const reqDeleteUser = (userId:string) =>
    ajax('/manage/user/delete', {userId}, 'POST')

//请求添加用户接口
export const reqAddUser = (username:string, password:string, phone:string, create_time:number, email:string, role_id:number) =>
    ajax('/manage/user/add', {username,password,phone,create_time,email,role_id}, 'POST')

//请求更新用户接口
export const reqUpdateUser = (_id:number, username:string, phone:string, email:string, role_id:string) =>
    ajax('/manage/user/update', {_id, username, phone, email, role_id}, 'POST')

//请求天气接口
export const reqWeather = async ()=> {
    const res = await ajax(`https://restapi.amap.com/v3/ip`, {key: key, output: 'JSON'})

    if (res.data.status === '1'){
        return ajax('https://restapi.amap.com/v3/weather/weatherInfo', {
            key: key, output: 'JSON', extensions: 'base', city: res.data.adcode
        })
    }
}


