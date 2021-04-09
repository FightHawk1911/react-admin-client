import React from 'react'
import {Card, Button, Table, Modal, Form, Input, message} from "antd";
import {reqAddRole, reqGetRoleList, reqUpdateRole} from "../../api";
import {FormInstance} from "antd/lib/form";
import {formatDate} from "../../utils/formatDateUtils";

import AuthForm from "./auth-form";
import {PAGE_SIZE} from "../../utils/constants";
import memoryUtils from "../../utils/memoryUtils";
import storeageUtils from "../../utils/storeageUtils";

/*
  角色管理路由
 */


export default class Role extends React.Component<any, any>{

    addForm = React.createRef<FormInstance>()
    authForm = React.createRef<AuthForm>()

    columns:any = []
    state = {
        roles: [], //所有行
        role: {}, //当前选中行
        isShowAdd: false,
        isShowAuth: false,
    }

    initColumns=()=>{
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name',
            },
            {
                title: '创建时间',
                dataIndex: 'create_time',
                render: formatDate
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time',
                render: formatDate
            },
            {
                title: '授权人',
                dataIndex: 'auth_name',
            },
        ];
    }

    getRoles = async () => {

        const result = await reqGetRoleList()
        if (result.data.status === 0) {
            //成功获取角色列表
            this.setState({
                roles: result.data.data
            })
        }
    }

    handleAddModalOk = () => {
        //表单验证数据验证通过进入.then
        this.addForm.current?.validateFields().then(
            async value => {
                const result = await reqAddRole(value.name)
                if (result.data.status === 0){
                    //服务器成功添加数据
                    this.setState({
                        roles: [...this.state.roles, result.data.data]
                    })
                    //退出窗口
                    this.handleAddModalCancel()
                }
            }
        ).catch(error => {
            console.log(error)
        })
    }

    handleAuthModalOk = async () =>{
        const role = this.state.role
        const current_time = new Date().getTime()

        const menus = JSON.stringify(this.authForm.current?.getRoles())

        // @ts-ignore
        role.menus = menus

        // @ts-ignore
        const result = await reqUpdateRole(role._id, menus, current_time, role.name)

        if (result.data.status === 0) {
            // @ts-ignore
            if (role._id === memoryUtils.user.role_id) {
                memoryUtils.user = {id: '', username: ''}
                storeageUtils.removeUser()
                this.props.history.replace("/login")
                message.success("更新角色为自己的角色,请重新登录")
            } else {
                message.success("更新角色成功")
                this.getRoles()
                this.handleAuthModalCancel()
            }
        } else {
            message.error("更新角色权限失败")
        }

    }

    handleAddModalCancel = () => {
        this.addForm.current?.resetFields()
        this.setState({
            isShowAdd: false
        })
    }

    handleAuthModalCancel = () => {
        this.setState({isShowAuth: false})
    }

    onRow = (role:any)=>{
        return {
            onClick: (event:any) => {
                this.setState({role})
            }
        }
    }


    UNSAFE_componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getRoles()
    }

    render() {
        const {roles, role} = this.state

        // @ts-ignore
        const visible:boolean = !role._id
        // @ts-ignore
        const roleName:string = role.name
        const title = (
            <span>
                <Button type='primary' onClick={()=>{this.setState({isShowAdd: true})}}>创建角色</Button>&nbsp;
                <Button type='primary' disabled={visible} onClick={()=>this.setState({isShowAuth: true})}>设置角色权限</Button>
            </span>
        )


        return (
            <Card title={title}>
                <Modal title="添加角色"
                       visible={this.state.isShowAdd}
                       onOk={this.handleAddModalOk}
                       onCancel={this.handleAddModalCancel}
                       okText='确认'
                       cancelText='取消'>
                    <Form ref={this.addForm}>
                        <Form.Item label='角色名称:' name='name' rules={[{required: true, message: '必须输入角色名称'}]}>
                            <Input  placeholder='输入角色名称' />
                        </Form.Item>
                    </Form>
                </Modal>

                <Modal title="验证角色"
                       okText='确认'
                       cancelText='取消'
                       visible={this.state.isShowAuth}
                       onOk={this.handleAuthModalOk}
                       onCancel={this.handleAuthModalCancel}
                       destroyOnClose={true}
                >
                    <AuthForm value={roleName} role={role} ref={this.authForm} />
                </Modal>


                <Table
                    rowSelection={
                        {
                            type: 'radio',
                            // @ts-ignore
                            selectedRowKeys: [role._id],
                            onSelect: (role)=>this.setState({role})
                        }
                    }
                    columns={this.columns}
                    rowKey='_id'
                    dataSource={roles}
                    onRow={(role:any)=>this.onRow(role)}
                    pagination={{total: this.state.roles.length, pageSize: PAGE_SIZE}}
                />
            </Card>
        );
    }
}