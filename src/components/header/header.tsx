import React from 'react'
//antd模态框
import { Modal, Button } from 'antd'
import './header.less'
import { reqWeather } from "../../api";
import { formatDate } from "../../utils/formatDateUtils";
import memoryUtils from "../../utils/memoryUtils";
import { withRouter } from 'react-router-dom'
import menuList from "../../config/menuConfig";
import storeageUtils from "../../utils/storeageUtils";

class Header extends React.Component<any, any>{

    //定时器ID
    timer:any
    title:string = ''

    state = {
        //当前日期
        currentDate: formatDate(Date.now()),
        //天气信息 省 市 温度 天气 风向 风力
        // city: '',
        // province: '',
        temperature: '',
        weather: '',
        // winddirection: '',
        // windpower: ''
        isModalVisible: false,


    }

    handleExitClick=()=>{
        this.setState({isModalVisible: true})
    }

    handleModalOk=()=>{
        //点击模态框ok 从localstorage删除用户信息
        storeageUtils.removeUser()
        memoryUtils.user = {id: '', username: ''};

        //重定向到登录界面
        this.props.history.replace('/login')


        this.setState({isModalVisible: false})
    }

    handleModalCancel=()=>{
        //点击模态框取消按钮,隐藏模态框
        this.setState({isModalVisible: false})
    }

    getTitle=()=>{
        const pathname = this.props.location.pathname
        menuList.forEach(item =>{
            if (item.key === pathname) {
                this.title = item.title
            } else if (item.children) {
                const cItem = item.children.find(item => item.key === pathname)
                if (cItem) {
                    this.title = cItem.title
                }
            }
        })
    }

    getWeatherInfo =()=> {
        reqWeather().then(
            res =>{
                //状态为1 成功获取数据
                if (res.data.status === '1'){
                    const {temperature, weather} = res.data.lives[0]
                    this.setState({
                        // city: city,
                        // province: province,
                        temperature: temperature,
                        weather: weather,
                        // winddirection: winddirection,
                        // windpower: windpower
                    })
                }
            }
        )
    }
    // componentDidMount() {
    //     const data = {
    //         key: "3BFBZ-ZKD3X-LW54A-ZT76D-E7AHO-4RBD5", output: "jsonp",
    //     }
    //     jsonpGet('https://apis.map.qq.com/ws/location/v1/ip', data)
    //         .then(res=>{
    //             console.log(res)
    //         }, reason=>{
    //             console.log(reason)
    //         })
    // }

    getCurrentDate =()=> {
        this.timer = setInterval(
            ()=>{
                const currentDate = Date.now()
                this.setState({
                    currentDate: formatDate(currentDate)
                })
            }
        )
    }

    componentDidMount() {

        //获取当前时间并render页面
        this.getCurrentDate()
        // 获取天气信息
        this.getWeatherInfo()
    }


    componentWillUnmount() {
        //组件卸载清除定时器
        clearInterval(this.timer)
    }

    render() {
        const {username} = memoryUtils.user
        this.getTitle()
        return (
            <div className="header">
                <div className="header-top">
                    <span>欢迎,{username}</span>
                    {/*<a href="javascript:" onClick={this.handleExitClick}>退出</a>*/}
                    <Button
                        type="link"
                        onClick={this.handleExitClick}
                        size="small"
                    >
                        退出
                    </Button>
                    <Modal
                           title="退出确认"
                           cancelText="退出"
                           okText="确认"
                           visible={this.state.isModalVisible}
                           onOk={this.handleModalOk}
                           onCancel={this.handleModalCancel}>
                        <p>是否退出当前用户?</p>
                    </Modal>
                </div>

                <div className="header-bottom">
                    <div className='header-bottom-left'>{this.title}</div>
                    <div className='header-bottom-right'>
                        <div className="time">
                            <span>{this.state.currentDate}</span>
                        </div>
                        <div className="weather">
                            <span>{this.state.weather}</span>
                            <span>{this.state.temperature}℃</span>
                        </div>


                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Header)