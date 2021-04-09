import React from 'react'
import {reqAddProduct, reqUpdateProduct} from "../../api";
import PicturesWall from "../../components/uploadImage";
import RichTextEditor from '../../components/richtexteditor'
import { Card, Button, Form, Input, Cascader, message} from "antd";
import {ArrowLeftOutlined} from "@ant-design/icons";
import {FormInstance} from 'antd/lib/form';
import {reqGetChildParentCategoryID ,reqGetCategoryParentIDeq0} from "../../api";

const { TextArea } = Input

//product的添加和更新路由
class ProductAddUpdate extends React.Component<any, any>{

    state = {
        options:  [],
        isUpdate: false
    }

    product:any //商品信息

    formRef = React.createRef<FormInstance>()
    pw = React.createRef<PicturesWall>()
    editor = React.createRef<RichTextEditor>()

    //级联选择框获取一级分类
    initOptions = async () =>{

        //一级分类列表
        const result = await reqGetCategoryParentIDeq0()
        if (result.data.status === 0){
            const options = result.data.data.list.map((currentItem:any)=>({
                value: currentItem._id,
                label: currentItem.name,
                isLeaf: false
            }))
            this.setState({options})
        }
    }

    loadData = async (selectedOptions:any) => {
        const targetOption = selectedOptions[0];
        targetOption.loading = true;
        const result = await reqGetChildParentCategoryID(targetOption.value)

        if (result.data.status === 0){
            targetOption.loading = false
            if (result.data.data.list.length > 0){
                targetOption.children = result.data.data.list.map((cItem:any)=>({label: cItem.name, value: cItem._id}))
            }
            this.setState({options: [...this.state.options]})
        }

    };


    submit = () =>{
        this.formRef.current?.validateFields().then(
            async value => {
                let pic = this.pw.current?.getImgs()
                const imgs = pic ? JSON.stringify(pic) : ''
                const productdetail = this.editor.current?.getDetail()
                const detail = productdetail ? JSON.stringify(productdetail) : ''
                if (this.state.isUpdate){
                    //为更新商品信息
                    const result = await reqUpdateProduct(this.product._id, value.productClass[1], value.productClass[0],
                        value.name, value.productdesc, value.price, detail, imgs)
                    if (result.data.status === 0) {
                        //成功更新
                        message.success("更新商品成功")
                        this.props.history.goBack()
                    }
                } else {
                    //添加商品信息
                    const result = await reqAddProduct(value.productClass[1], value.productClass[0],
                        value.name, value.productdesc, value.price, detail, imgs)

                    if (result.data.status === 0){
                        //成功添加
                        message.success("添加商品成功")
                        this.props.history.goBack()
                    }
                }
            }
        ).catch(errorInfo=>{})
    }

    componentDidMount() {
        this.initOptions()
    }

    UNSAFE_componentWillMount() {

        //如果状态有值 说明事更新页面
        if (this.props.location.state){
            this.setState({isUpdate: true})
        }
        this.product = this.props.location.state || {}
    }

    render() {
        const {categoryId, pCategoryId, imgs, detail} = this.product
        const pic = imgs ? JSON.parse(imgs): null

        let categoryIDs = []
        if (this.state.isUpdate){
            categoryIDs.push(pCategoryId)
            categoryIDs.push(categoryId)
        }

        const title = (
            <span>
                <Button type="link" size='small' onClick={()=>this.props.history.goBack()}>
                    <ArrowLeftOutlined />
                </Button>
                <span>{this.state.isUpdate ? '更新商品' : '添加商品'}</span>
            </span>
        )
        return (
            <Card title={title}>
                <Form
                    ref={this.formRef}
                    labelCol={{span: 2}}
                    wrapperCol={{span: 4}}
                >
                    <Form.Item label='商品名称'
                               name='name'
                               rules={[{ required: true, message: "商品名称必须输入"}]}
                               initialValue={ this.product.name }
                    >
                        <Input placeholder='请输入商品名称' />
                    </Form.Item>
                    <Form.Item label='商品描述'
                               name='productdesc'
                               rules={[{required: true, message: "商品描述必须输入"}]}
                               initialValue={ this.product.productdesc }
                    >
                        <TextArea placeholder='请输入商品描述' autoSize={{minRows: 2, maxRows: 6}} />
                    </Form.Item>
                    <Form.Item label='商品价格'
                               name='price'
                               required
                               rules={[{
                                   validator: (rule,value)=> {
                                       if (value === undefined){
                                           return Promise.reject(rule.message='商品价格必须输入')
                                       } else if (value <= 0){
                                           return Promise.reject(rule.message='商品价格必须大于0')
                                       }
                                       return Promise.resolve()
                               }
                               }]}
                               initialValue={ this.product.price }
                    >
                        <Input addonAfter='元' type="number" placeholder='请输入商品价格' />
                    </Form.Item>
                    <Form.Item label='商品分类' name='productClass' initialValue={categoryIDs} >
                        <Cascader options={this.state.options} loadData={this.loadData}/>
                    </Form.Item>
                    <Form.Item label='商品图片'>
                        <PicturesWall ref={this.pw} imgs={pic}/>
                    </Form.Item>
                    <Form.Item label='商品详情' labelCol={{span: 2}} wrapperCol={{span: 10}}>
                        <RichTextEditor ref={this.editor} detail={detail}/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 0.5}}>
                        <Button type='primary' onClick={this.submit}>提交</Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default ProductAddUpdate
