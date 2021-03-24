import React from 'react'
import { Card, Button, Table  } from 'antd'
import { reqGetCategoryList } from "../../api";
import {
    PlusOutlined
} from '@ant-design/icons'

/*
  商品管理路由
 */


export default class Category extends React.Component<any, any>{


    state = {
        dataSource: [],
        isLoading: false
    }

    getCategoryList =()=>{

        //设置loading状态
        this.setState({isLoading: true})

        //组件将要加载时提交ajax异步请求获取到商品列表
        reqGetCategoryList('0').then(
            response => {
                this.setState({
                    dataSource: response.data.data,
                    isLoading: false
                })
            },
            reason => {
                this.setState({isLoading: true})
                console.log("获取商品列表失败: ", reason)
            }
        )
    }



    UNSAFE_componentWillMount() {
        //获取商品列表
        this.getCategoryList()
    }

    render() {
        const title = '一级列表'
        const columns = [
            {
                title: '分类名称',
                dataIndex: 'name',
            },
            {
                title: '操作',
                dataIndex: '',
                width: 300,
                render: ()=> {
                    return (
                        <div>
                            <Button type="link">修改分类</Button>
                            <Button type="link">添加子分类</Button>
                        </div>
                    )
                }
            }
        ];
        return (

            <Card title={title} extra={<Button type={"primary"} icon={<PlusOutlined />}>添加</Button>}>
                <Table
                    bordered
                    dataSource={this.state.dataSource}
                    columns={columns}
                    pagination={
                        {defaultPageSize: 8, total: this.state.dataSource.length, showQuickJumper: true }
                    }
                    loading={this.state.isLoading}
                    rowKey={"_id"}
                />;
            </Card>
        );
    }
}