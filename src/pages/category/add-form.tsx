import React from 'react'
import { Form, Select, Input } from 'antd'
import {FormInstance} from "antd";

const {Item} = Form
const {Option} = Select

class AddForm extends React.Component<any, any>{

    formRef = React.createRef<FormInstance>()

    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }

    render() {
        const {categorys, parentId} = this.props

        return (
            <Form ref={this.formRef}>
                <p>所属分类:</p>
                <Item name='selectdvalue' initialValue={parentId}>
                    <Select style={{width: '100%'}}>
                        {categorys.map((item:any)=>{
                            return <Option key={item._id} value={item._id}>{item.name}</Option>
                        })}
                    </Select>
                </Item>
                <p>分类名称:</p>
                <Item rules={[{required: true}]} name='categoryname'>
                    <Input placeholder="请输入分类名称" />
                </Item>
            </Form>
        );
    }
}

export default AddForm