import React from 'react'
import {Redirect} from 'react-router-dom'
import memoryUtils from "../../utils/memoryUtils";
import {Layout} from "antd";
const {Sider, Content, Footer, Header} = Layout

export default class Admin extends React.Component<any, any>{


    render() {
        const user = memoryUtils.user
        if (user._id === ""){
            return <Redirect to='/login'/>
        }
        return (
            <Layout style={{height: '100%'}}>
                <Sider>Sider</Sider>
                <Layout>
                    <Header>Header</Header>
                    <Content>Content</Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )

    }
}