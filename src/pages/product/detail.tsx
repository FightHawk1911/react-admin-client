import React from 'react'
import {reqGetCategoryID} from "../../api";
import { Card, List, Button } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import './detail.less'
import {IMG_URL} from "../../utils/constants";

//product的详情路由
class ProductDetail extends React.Component<any, any>{

    state = {
        cName1: '',
        cName2: '',
    }


    async componentDidMount() {
        const {categoryId, pCategoryId} = this.props.location.state

        const result1 = await reqGetCategoryID(pCategoryId)
        const result2 = await reqGetCategoryID(categoryId)
        // const results = await Promise.all([reqGetCategoryID(pCategoryId), reqGetCategoryID(categoryId)])
        this.setState({cName1: result1.data.data.name, cName2: result2.data.data.name})
    }


    render() {

        const {name, productdesc, price, detail, imgs} = this.props.location.state
        const imgArrays = JSON.parse(imgs)
        const title = (
            <span>
                <Button type='link' onClick={()=>{this.props.history.goBack()}}><ArrowLeftOutlined style={{fontSize: '20px'}}/></Button>
                <span>商品详情</span>
            </span>

        )
        return (
            <Card title={title} className={'detail'}>
                <List>
                    <List.Item>
                        <span className='left-item'>商品名称:</span>
                        <span>{name}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left-item'>商品描述:</span>
                        <span>{productdesc}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left-item'>商品价格:</span>
                        <span>{price}元</span>
                    </List.Item>
                    <List.Item>
                        <span className='left-item'>所属分类:</span>
                        <span>{this.state.cName1}-{'>'}{this.state.cName2}</span>
                    </List.Item>
                    <List.Item>
                        <span className='left-item'>商品图片:</span>
                        {imgArrays.map((img:string) => {
                            return (<img src={IMG_URL+img} key={img} alt="这是一张图片" />)
                        })}
                    </List.Item>
                    <List.Item>
                        <span className='left-item'>商品详情:</span>
                        <span style={{display: 'inline-block'}} dangerouslySetInnerHTML={{__html: detail}} />
                    </List.Item>
                </List>
            </Card>
        )
    }
}

export default ProductDetail
