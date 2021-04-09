import React from "react";
import {Input, Form, Tree} from "antd";
import menuList from "../../config/menuConfig";


export default class AuthForm extends React.Component<any, any> {


    // 递归获取
    // getTreeNodes = (menuList:Imenu[])=> {
    //
    //     return menuList.map(item=>{
    //         if (!item.children){
    //             return (<TreeNode title={item.title} key={item.key}/>)
    //         } else {
    //             return (<TreeNode title={item.title} key={item.key}>{this.getTreeNodes(item.children)} </TreeNode>)
    //         }
    //     })
    // }
    // UNSAFE_componentWillMount() {
    //
    // }
    constructor(props:any) {
        super(props);
        this.state = {roleMenus: JSON.parse(this.props.role.menus)}
    }

    getRoles = () => this.state.roleMenus

    handleCheck = (checkedKeys:any) => {
        this.setState({roleMenus: checkedKeys})
    }

    render() {
        //所有权限树
        const item = [ {
            title: '平台管理',
            key: 'all',
            children: menuList
        }]



        return(
            <Form labelCol={{span: 4}} wrapperCol={{span: 15}}>
                <Form.Item label='角色名称'>
                    <Input  value={this.props.value} disabled/>
                </Form.Item>
                <Form.Item>
                    <Tree
                    checkable
                    defaultExpandAll
                    treeData={item}
                    checkedKeys={this.state.roleMenus}
                    //defaultCheckedKeys={this.state.roleMenus}
                    onCheck={this.handleCheck}
                    >
                        {/*<TreeNode title='平台管理' key='all'>*/}
                        {/*    {this.getTreeNodes(menuList)}*/}
                        {/*</TreeNode>*/}
                    </Tree>
                </Form.Item>

            </Form>

            )
    }
}