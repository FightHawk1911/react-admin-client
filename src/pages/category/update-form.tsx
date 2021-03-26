import React from 'react'
import {Form, Input} from 'antd'
import { FormInstance } from 'antd/lib/form'
import PropTypes from "prop-types";


class UpdateForm extends React.Component<any, any>{

    formRef = React.createRef<FormInstance>()

    static propTypes = {
        categoryName: PropTypes.string,
        setForm: PropTypes.func,
    }

    componentDidMount() {
        this.props.setForm(this.formRef.current)
    }

    render() {
        return (
            <Form ref={this.formRef}>
                <p>分类名称:</p>
                <Form.Item name="categoryname" initialValue={this.props.categoryName} rules={[{required: true}]}>
                    <Input placeholder="请输入分类名称" />
                </Form.Item>
            </Form>
        );
    }
}

export default UpdateForm