import React from 'react'
import { Menu } from 'antd';

import  * as Icon from '@ant-design/icons';

import {Link, withRouter} from 'react-router-dom'
import './left-nav.less'
import logo from '../../assets/images/logo.png'

import menuList, {Imenu} from "../../config/menuConfig";

const SubMenu = Menu.SubMenu




class LeftNav extends React.Component<any, any>{

    menuNode:JSX.Element[] = []
    currentPath: string = ''
    openKey: string = ''
    cItem: Imenu|undefined;

    getMenuNode = (menuList:Imenu[])=>{
        //初次渲染前获取url path
        const path = this.props.location.pathname

        return menuList.map((item:Imenu)=> {
            if (!item.children){

                return (
                    <Menu.Item key={item.link}>
                        {
                            React.createElement(
                                // @ts-ignore
                                //暂时忽略报错 以后写   TS7053
                                Icon[item.icon]
                            )
                        }

                        <Link to={item.link}>{item.title}</Link>
                    </Menu.Item>
                )
            } else {
                //查找
                const cItem = item.children.find(cItem => cItem.link === path)
                if (cItem){
                    this.openKey = item.link
                    console.log(item.link)
                }
                return (
                    // @ts-ignore
                    //暂时忽略报错 以后写   TS7053
                    <SubMenu key={item.link} icon={React.createElement(Icon[item.icon])} title={item.title}>
                        {this.getMenuNode(item.children)}
                    </SubMenu>
                )
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