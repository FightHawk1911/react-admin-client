const USER_KEY = 'user_key'

//将用户信息保存到localstorage中,以便下次使用

const tools = {
    saveUser(user:any){
        localStorage.setItem(USER_KEY, user)
    },
    getUser(){
        return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
    },
    removeUser(){
        localStorage.removeItem(USER_KEY)
    }
}
export default tools