import React from 'react'
import './header.less'
import {Link} from 'react-router-dom'

export default class Header extends React.Component<any, any>{

    render() {
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,admin</span>
                    <Link to='/'>退出</Link>
                </div>

                <div className="header-bottom">
                    <div className='header-bottom-left'>首页</div>
                    <div className='header-bottom-right'>
                        <span>2019-5-16 10:12:34</span>
                        <img src="#" alt="weather"/>
                        <span>晴</span>
                    </div>
                </div>
            </div>
        );
    }
}