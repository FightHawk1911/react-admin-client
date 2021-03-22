import React from 'react'
import './login.less'
import logo from '../../assets/images/logo.png'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {reqLogin} from "../../api";
import memoryUtils from "../../utils/memoryUtils";
import storageUtils from '../../utils/storeageUtils'
import {Redirect} from "react-router-dom";


export default class Login extends React.Component<any, any>{

    onFinish = (values: any) => {
        const {username, password} = values

        reqLogin(username, password).then(
            req=>{
                // console.log(req.data.status)
                // 服务器返回状态码1登陆失败 0登陆成功
                if (req.data.status === 0){
                    // 传递用户信息给主页面显示
                    storageUtils.saveUser(JSON.stringify(req.data.data))
                    memoryUtils.user = req.data.data
                    message.success("登陆成功,跳转到主界面")
                    this.props.history.replace('/')

                } else {
                    message.error("用户名密码错误")
                }
            },
        ).catch(err =>{
            message.error("网络出错了，请稍后再试试")
        })
    }

    render() {
        // 如果存在用户id说明已经登陆, 重定向到登陆页面
        const user = memoryUtils.user
        if (user._id !== ""){
            return <Redirect to="/"/>
        }

        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h2>React后台管理系统</h2>
                </header>
                <section className="login-content">
                    <h1>用户登录</h1>
                    <div>
                        <Form
                            name="normal_login"
                            className="login-form"
                            initialValues={{ remember: true }}
                            onFinish={this.onFinish}>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: '请输入用户名' },
                                        { min: 4, message: '用户名必须大于4'},
                                        { max: 12, message: '用户名必须小于12'},
                                        { whitespace: true, message: '禁止输入空格'}]}>
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: '请输入密码' },
                                    { min: 4, message: '密码必须大于4'},
                                    { max: 12, message: '密码必须小于12'},
                                    { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文 大小写字母 下划线组成'},
                                    { whitespace: true, message: '禁止输入空格'}]}>
                                <Input
                                    prefix={<LockOutlined className="site-form-item-icon" />}
                                    type="password"
                                    placeholder="密码"/>
                            </Form.Item>
                            <Form.Item>
                                <Button type="primary" htmlType="submit" className="login-form-button">登陆</Button>
                            </Form.Item>
                        </Form>
                    </div>
                </section>

            </div>
        )
    }
}