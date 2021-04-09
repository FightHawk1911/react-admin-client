import React from "react";
import {Form, Input, Select} from 'antd';

const UserForm = (props:any) => {

    const {currentUser} = props


    return (
        <Form form={props.form} labelCol={{span: 5}} wrapperCol={{span: 15}}>
            <Form.Item
                initialValue={currentUser.username}
                label='用户名'
                name='username'
                rules=
                    {[{ required: true, message: '请输入用户名' },
                    { min: 4, message: '用户名必须大于4'},
                    { max: 12, message: '用户名必须小于12'},
                    { whitespace: true, message: '禁止输入空格'}]}>
                <Input type="text"  placeholder='请输入用户名' />
            </Form.Item>
            {/*如果有_id属性 说明是修改用户*/}
            {
                currentUser._id ? null : (
                    <Form.Item
                        label='密码'
                        name='password'
                        rules={[{ required: true, message: '请输入密码' },
                            { min: 4, message: '密码必须大于4'},
                            { max: 12, message: '密码必须小于12'},
                            { pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文 大小写字母 下划线组成'},
                            { whitespace: true, message: '禁止输入空格'}]}>
                        <Input type="password" autoComplete='off' placeholder='请输入密码' />
                    </Form.Item>
                )
            }

            <Form.Item label='手机号' name='phone' initialValue={currentUser.phone} rules={[{required: true, message: '请输入手机号'}, {min: 11}, {max: 11}]}>
                <Input type="text"  placeholder='请输入手机号'/>
            </Form.Item>
            <Form.Item label='邮箱' name='email' initialValue={currentUser.email} rules={[{required: true, message: '请输入邮箱'}, {type: 'email'}]}>
                <Input type="text"  placeholder='请输入邮箱'/>
            </Form.Item>
            <Form.Item label='角色' name='role_id' initialValue={currentUser.role_id} rules={[{required: true, message: '请选择角色'}]}>
                <Select placeholder='请选择角色'>
                    {props.roles.map((role:any)=>{
                        return <Select.Option value={role._id} key={role._id}>{role.name}</Select.Option>
                    })}
                </Select>
            </Form.Item>
        </Form>
    )
}


export default UserForm