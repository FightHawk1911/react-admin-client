import React from 'react'
import { Card, Button, Table, Modal  } from 'antd'
import { reqGetCategoryList } from "../../api";
import {
    PlusOutlined,
    ArrowRightOutlined
} from '@ant-design/icons'

/*
  商品管理路由
 */


export default class Category extends React.Component<any, any>{


    state = {
        categorys: [],
        isLoading: false,
        parentId: '0',
        subCategorys: [],
        parentName: '',
        showStatus: 0 // 模态框的显示状态 0 全不显示 1 添加模态框显示 2 更新模态框显示

    }

    getCategoryList =()=>{
        const {parentId} = this.state
        //设置loading状态
        this.setState({isLoading: true})
        //组件将要加载时提交ajax异步请求获取到商品列表
        reqGetCategoryList(parentId).then(
            response => {
                //如果partedId为0 为1级分类 否则为2级分类
                if (this.state.parentId === '0'){
                    this.setState({
                        categorys: response.data.data,
                        isLoading: false
                    })
                } else {
                    this.setState({
                        subCategorys: response.data.data,
                        isLoading: false
                    })
                }

            },
            reason => {
                this.setState({isLoading: true})
                console.log("获取商品列表失败: ", reason)
            }
        )
    }

    showFirstCategory =()=>{
        //显示一级列表
        this.setState({
            parentId: '0',
            parentName: '',
            subCategorys: []
        }, ()=>{this.getCategoryList()})

    }

    getSubCategory =(text:any)=>{
        this.setState({parentId: text._id, parentName: text.name}, ()=>{ this.getCategoryList() })
    }

    //处理模态框取消按钮点击事件
    handleCancel=()=>{
        this.setState({
            showStatus: 0
        })
    }
    //模态框添加商品
    addCategory =()=>{
        this.setState({
            showStatus: 1
        })
        console.log('添加商品')
        //处理取消事件
        //this.handleCancel()
    }
    //模态框更新商品
    updateCategory =()=>{
        this.setState({
            showStatus: 2
        })
        console.log('更新商品')
        //处理取消事件
        //this.handleCancel()
    }



    UNSAFE_componentWillMount() {
        //获取商品列表
        this.getCategoryList()
    }

    render() {
        const title = this.state.parentId === '0' ? '一级分类' :
            (<div>
                <Button size={"small"} type={"link"} onClick={this.showFirstCategory}>一级分类</Button>
                <ArrowRightOutlined style={{marginRight: '10px'}}/>
                {this.state.parentName}
            </div>)
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: '',
                width: 300,
                render: (text:any)=> {
                    return (
                        <div>
                            <Button type="link" onClick={this.updateCategory}>修改分类</Button>
                            {this.state.parentId === '0' ?
                                <Button type="link" onClick={this.getSubCategory.bind(this, text)}>查看子分类</Button>
                                : null
                            }

                        </div>
                    )
                }
            }
        ];
        return (
            <Card title={title} extra={<Button onClick={this.addCategory} type={"primary"} icon={<PlusOutlined />} >添加</Button>}>

                <Modal title="Basic Modal" visible={this.state.showStatus === 1} onCancel={this.handleCancel} onOk={this.addCategory}>
                    <p>添加模态框显示</p>
                </Modal>
                <Modal title="Basic Modal" visible={this.state.showStatus === 2} onCancel={this.handleCancel} onOk={this.updateCategory}>
                    <p>更新模态框显示</p>
                </Modal>

                <Table
                    bordered
                    dataSource={this.state.parentId === '0' ? this.state.categorys : this.state.subCategorys}
                    columns={columns}
                    pagination={
                        {defaultPageSize: 8, total: this.state.categorys.length, showQuickJumper: true }
                    }
                    loading={this.state.isLoading}
                    rowKey={"_id"}
                />
            </Card>
        );
    }
}