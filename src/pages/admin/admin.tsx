import React from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils";

import Header from "../../components/header/header";
import LeftNav from "../../components/left-nav/left-nav";
//导入相关路由
import Home from "../home/home";
import Category from "../category/category";
import Product from "../product/product";
import Role from "../role/role";
import User from "../user/user";
import Bar from "../charts/bar"
import Line from "../charts/line";
import Pie from "../charts/pie";


//导入antd组件
import {Layout} from "antd";
const {Sider, Content, Footer} = Layout

//admin管理路由


export default class Admin extends React.Component<any, any>{


    render() {
        const user = memoryUtils.user
        if (user.id === ""){
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{minHeight: '100%'}}>
                <Sider>
                    <LeftNav/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content style={{backgroundColor: 'white'}}>
                        <Switch>
                            <Route path='/home' component={Home} />
                            <Route path='/category' component={Category} />
                            <Route path='/product' component={Product} />
                            <Route path='/role' component={Role} />
                            <Route path='/user' component={User} />
                            <Route path='/charts/bar' component={Bar} />
                            <Route path='/charts/line' component={Line} />
                            <Route path='/charts/pie' component={Pie} />
                            <Redirect to="/home"/>
                        </Switch>
                    </Content>
                    <Footer style={{textAlign: 'center', color: 'gray'}}>为确保最佳使用体验,请使用Chrome浏览器</Footer>
                </Layout>
            </Layout>
        )

    }
}