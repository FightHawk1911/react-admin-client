import React from 'react'
import { Menu } from 'antd';

import  * as Icon from '@ant-design/icons';

import {Link, withRouter} from 'react-router-dom'
import './left-nav.less'
import logo from '../../assets/images/logo.png'

import menuList, {Imenu} from "../../config/menuConfig";
import memoryUtils from "../../utils/memoryUtils";

const SubMenu = Menu.SubMenu




class LeftNav extends React.Component<any, any>{

    menuNode:any;
    currentPath: string = ''
    openKey: string = ''
    cItem: Imenu|undefined;

    //判断单个菜单项有没有权限
    hasAuth(item:Imenu){
        //取出当前用户的菜单权限列表和当前用户名
        // @ts-ignore
        const menus = JSON.parse(memoryUtils.user.role.menus)
        const {username} = memoryUtils.user

        //如果当前用户是admin 或者 当前菜单项为public 或者 当前菜单项在用户菜单权限列表里 返回true
        if (username==='admin' || item.isPublic || menus.indexOf(item.key) !== -1) {
            return true
        } else if (item.children) {
            return !!item.children.find(item => menus.indexOf(item.key) !== -1)
        }

    }

    getMenuNode = (menuList:Imenu[])=>{
        //初次渲染前获取url path
        const path = this.props.location.pathname

        return menuList.map((item:Imenu)=> {
            //如果当前菜单项有权限 则进行渲染
            if (this.hasAuth(item)){
                if (!item.children){
                    return (
                        <Menu.Item key={item.key}>
                            {
                                React.createElement(
                                    // @ts-ignore
                                    //暂时忽略报错 以后写   TS7053
                                    Icon[item.icon]
                                )
                            }
                            <Link to={item.key}>{item.title}</Link>
                        </Menu.Item>
                    )
                } else {
                    //查找
                    const cItem = item.children.find(cItem => path.indexOf(cItem.key)===0)
                    if (cItem){
                        this.openKey = item.key
                    }
                    return (
                        // @ts-ignore
                        //暂时忽略报错 以后写   TS7053
                        <SubMenu key={item.key} icon={React.createElement(Icon[item.icon])} title={item.title}>
                            {this.getMenuNode(item.children)}
                        </SubMenu>
                    )
                }
            }

        }
        )
    }

    //组件将要挂载时 加载菜单选项
    UNSAFE_componentWillMount() {
        this.menuNode = this.getMenuNode(menuList)
    }


    render() {
        //url显示的当前路径
        this.currentPath = this.props.location.pathname
        if ( this.currentPath.indexOf('/product/') === 0 ){
            this.currentPath = '/product'
        }
        return (
            <div className="left-nav">
                <Link to='/' className="left-nav-header">
                    <img src={logo} alt=""/>
                    <h1>后台管理</h1>
                </Link>

                {/*导航区域*/}
                <div>
                    <Menu
                        selectedKeys={[this.currentPath]}
                        defaultOpenKeys={[this.openKey]}
                        mode="inline"
                        theme="dark"
                    >
                        {this.menuNode}
                    </Menu>
                </div>
            </div>
        );
    }
}

// 高阶组件 包装非路由组件 返回一个包含路由属性的新组件 this.history match location
export default withRouter(LeftNav)