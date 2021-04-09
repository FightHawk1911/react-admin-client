import React, {ChangeEvent} from 'react'
import {reqGetProduct, reqSearchProduct, reqUpdateStatus} from "../../api";
import {Card, Select, Button, Input, Table, message} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import {PAGE_SIZE} from '../../utils/constants'

const {Option} = Select;



//Product首页
class ProductHome extends React.Component<any, any> {

    currentPageNum: number = 1
    columns:any = []

    state = {
        products: [],
        total: 0,

        selectValue: 'productName',
        inputValue: '',
    }


    //初始化Table字段
    initColumns = () =>{
        this.columns = [
            {
                title: '商品名称',
                dataIndex: 'name',
            },
            {
                title: '商品描述',
                dataIndex: 'productdesc',
            },
            {
                title: '价格',
                dataIndex: 'price',
                render: (price:number)=> '￥'+ price
            },
            {
                width: 100,
                title: '状态',
                key: 'status',
                render: (product:any) => {
                    const {_id, status} = product
                    return (
                        <span>
                            <Button
                                type='primary'
                                size='small'
                                style={{textAlign: 'center'}}
                                onClick={ async ()=>{
                                    const result = await reqUpdateStatus(_id, status === 1 ? 2 : 1)
                                    if (result.data.status === 0){
                                        message.success('成功更改商品状态')
                                        this.getProductInfo(this.currentPageNum);
                                    }
                                }}
                            >
                                {product.status === 1 ? '下架' : '上架'}
                            </Button>
                            <br/>
                            <span>
                                {product.status === 1 ? '发售中': '已下架'}
                            </span>
                        </span>
                    )
                }
            },
            {
                width: 100,
                title: '操作',
                key: 'action',
                render: (product:any)=>{
                    return (
                        <span>
                            <Button type='link' size='small' onClick={()=>{ this.props.history.push('/product/detail', product)}}>详情</Button><br/>
                            <Button type='link' size='small' onClick={()=>{ this.props.history.push('/product/addupdate', product)}}>修改</Button>
                        </span>
                    )
                }
            },
        ];
    }


    getProductInfo= async (pageNum:number)=>{
        this.currentPageNum = pageNum
        const {selectValue, inputValue} = this.state

        let result;

        // 如果input输入框有值
        if (inputValue){
            //搜索分页
            result = await reqSearchProduct(pageNum, PAGE_SIZE, selectValue, inputValue)
        } else {
            //一般分页
            result = await reqGetProduct(pageNum, PAGE_SIZE)
        }


        if (result.data.status === 0){
            //成功获取数据
            const {total, list} = result.data.data
            this.setState({
                products: list,
                total: total
            })
        }
    }


    //处理select选择框内容改变回调函数
    selectHandle = (value:string)=>{
        this.setState({
            selectValue: value
        })
    }


    //处理Input输入框 内容改变回调函数
    inputHandle = (e:ChangeEvent<HTMLInputElement>) =>{
        // if (this.state.selectValue === 'productName') {
        //     e.target.placeholder = "输入名称"
        // } else if (this.state.selectValue === 'productDesc'){
        //     e.target.placeholder = "输入详情"
        // }

        this.setState({
            inputValue: e.target.value
        })
    }


    componentDidMount() {
        //异步请求获取商品信息
        this.getProductInfo(1)

    }


    UNSAFE_componentWillMount() {
       this.initColumns()
    }


    render() {


        const title = (
            <span>
                <Select defaultValue={this.state.selectValue} style={{width: '130px'}} onChange={this.selectHandle}>
                    <Option value={'productName'}>按名称搜索</Option>
                    <Option value={'productDesc'}>按详情搜索</Option>
                </Select>
                <Input style={{width: '150px', margin: '0 10px'}} placeholder='关键字' onChange={(e) => this.inputHandle(e)}/>
                <Button type='primary' onClick={()=>{this.getProductInfo(1)}}>搜索</Button>
            </span>
        )

        const extra = (

            <Button
                type={'primary'}
                icon={<PlusOutlined/>}
                onClick={()=>{this.props.history.push('/product/addupdate')}}
                >
                添加商品
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table
                    columns={this.columns}
                    dataSource={this.state.products}
                    bordered
                    rowKey='_id'
                    pagination={{total: this.state.total, pageSize: PAGE_SIZE, showQuickJumper: true, current: this.currentPageNum}}
                    onChange={(page)=>{
                        if (page.current === undefined){
                            page.current = 1
                        }
                        this.getProductInfo(page.current)}
                    }
                />
            </Card>)
    }
}

export default ProductHome
