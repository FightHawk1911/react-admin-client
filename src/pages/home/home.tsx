import React from 'react'
import './home.less'
/*
  Home路由
 */
export default class Home extends React.Component<any, any>{

    render() {
        return (
            <div className='home'>
                <span>欢迎使用React后台管理系统</span>
            </div>
        );
    }
}