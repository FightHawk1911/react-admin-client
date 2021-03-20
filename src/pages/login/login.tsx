import React from 'react'
import './login.less'
import logo from './images/logo.png'
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';



export default class Login extends React.Component<any, any>{

    onFinish = (values: any) => {
        console.log(`用户名: ${values.username} 密码: ${values.password}`);
    }


    render() {
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