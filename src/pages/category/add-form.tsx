import React from 'react'
import { Form, Select, Input } from 'antd'

const {Item} = Form
const {Option} = Select

class AddForm extends React.Component<any, any>{

    onFinish = (values:any)=>{
        console.log(values)
    }
    
    render() {
        return (
            <Form onFinish={this.onFinish}>
                <Item>
                    <p>所属分类:</p>
                    <Select
                        style={{width: '100%'}}
                        //默认显示一级分类
                        defaultValue={"0"}
                    >
                        <Option value="0">一级分类</Option>
                        <Option value="1">电脑</Option>
                        <Option value="2">图书</Option>
                    </Select>
                </Item>
                <Item rules={[{required: true}]}>
                    <p>分类名称:</p>
                    <Input placeholder="请输入分类名称" />
                </Item>
            </Form>
        );
    }
}

export default AddForm