import React, {useState, useEffect} from "react";

import {Card, Button, Table, Modal, message, Form} from "antd";
import {reqGetUsers, reqDeleteUser, reqAddUser, reqUpdateUser} from "../../api";
import UserForm from "./userform";
import {formatDate} from "../../utils/formatDateUtils";
import {PAGE_SIZE} from "../../utils/constants";

import { ExclamationCircleOutlined } from '@ant-design/icons';


const User = () => {

    const [isShow, setShow] = useState(false)
    const [users, setUsers] = useState([])
    const [roles, setRoles] = useState([])
    const [currentUser, setCurrentUser] = useState({})

    const [form] = Form.useForm()

    //初始字段
    const columns  = [
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '邮箱',
            dataIndex: 'email',
        },
        {
            title: '手机号码',
            dataIndex: 'phone',
        },
        {
            title: '注册时间',
            dataIndex: 'create_time',
            render: formatDate
        },
        {
            title: '所属角色',
            dataIndex: 'role_id',
            render: (role_id:number)=>{
                // @ts-ignore
                return roles.find((role)=>role._id===role_id) ? roles.find((role)=>role._id===role_id).name : ''
            }
        },
        {
            title: '操作',
            width: 200,
            dataIndex: '',
            render: (user:any) => (
                <div>
                    <Button type="link" onClick={()=> {
                        setShow(true)
                        //重新获取一遍用户信息
                        getUsers()
                        //把传入得单行用户信息存储起来 给添加或修改用户模态框使用
                        setCurrentUser(user)
                        //重置表单字段
                        form.resetFields()
                    }}>修改</Button>
                    <Button type="link" onClick={()=>deleteUserModal(user)}>删除</Button>
                </div>
            ),
        },
    ]

    //Card标题
    const title = <Button type="primary" onClick={()=>{
        setShow(true)
        //点击创建用户 清除当前用户状态
        setCurrentUser({})
        //重置表单字段
        form.resetFields()
    }}>创建用户</Button>

    //获取用户信息
    const getUsers = ()=> {
        reqGetUsers().then((result)=>{
            setUsers(result.data.data.users)
            setRoles(result.data.data.roles)
        })
    }

    //处理删除用户模态框
    const deleteUserModal = (user:any) => {
        Modal.confirm({
            title: `是否删除用户${user.username}?`,
            icon: <ExclamationCircleOutlined/>,
            onOk() {
                reqDeleteUser(user._id).then(result => {
                        message.success(`删除用户${user.username}成功`)
                        //重新获取一遍用户
                        getUsers()
                    }

                ).catch(
                    error=>{message.error(`删除用户${user.username}失败`)}
                );
            },
            onCancel() {},
        })
    }

    const addOrUpdate = () => {

        form.validateFields()
        .then((user)=>{
           console.log(user)
            //如果表单中没有password属性则为更新用户
            if (!user.password){
                // @ts-ignore
                reqUpdateUser(currentUser._id, user.username, user.phone, user.email, user.role_id)
                    .then( result=>{
                        if (result.data.status === 0){
                            message.success("成功更新用户")
                            getUsers()
                            setShow(false)
                        }
                    })
                    .catch( error=>{console.log("更新用户失败")})
            } else {
                const current_time = new Date().getTime()
                reqAddUser(user.username, user.password, user.phone, current_time, user.email, user.role_id)
                    .then(result=>{
                        if (result.data.status === 0){
                            message.success("成功添加用户")
                            getUsers()
                            setShow(false)
                        }
                    })
                    .catch(error=>{
                        console.log('添加用户失败')
                    })
            }

       })
       .catch()
    }

    //初次渲染获取用户
    useEffect( ()=>{
        getUsers()
    }, [])



    return (
        <Card title={title}>
            <Modal
                // @ts-ignore
                title={currentUser._id ? "修改用户" : "添加用户"}
                visible={isShow}
                onOk={addOrUpdate}
                onCancel={()=>setShow(false)}
                okText='确认'
                cancelText='取消'
                destroyOnClose
            >
                <UserForm form={form} roles={roles} currentUser={currentUser}/>
            </Modal>
            <Table
                bordered
                rowKey='_id'
                columns={columns}
                dataSource={users}
                pagination={{total: users.length, pageSize: PAGE_SIZE}}
            />
        </Card>
    )

}

export default User