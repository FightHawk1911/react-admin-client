
//用户默认的导航菜单项目文件

//定义菜单接口
export interface Imenu{
    title: string,
    key: string,
    icon: string,
    children?: Imenu[],
    isPublic?:boolean
}


const menuList: Imenu[] = [
    {
        title: '首页',
        key: '/home',
        icon: 'PieChartOutlined',
        isPublic: true,
    },
    {
        title: '商品',
        key: '/category',
        icon: 'UnorderedListOutlined',
        children: [
            {
                title: '品类管理',
                key: '/Category',
                icon: 'RocketOutlined'
            },
            {
                title: '商品管理',
                key: '/product',
                icon: 'ScheduleOutlined'
            }
        ]
    },
    {
        title: '用户管理',
        key: '/user',
        icon: 'UserOutlined'
    },
    {
        title: '角色管理',
        key: '/role',
        icon: 'SecurityScanOutlined'
    },
    {
        title: '图形图表',
        key: '/charts',
        icon: 'AppstoreOutlined',
        children: [
            {
                title: '柱形图',
                key: '/charts/bar',
                icon: 'AreaChartOutlined'
            },
            {
                title: '折线图',
                key: '/charts/line',
                icon: 'LineChartOutlined'
            },
            {
                title: '饼图',
                key: '/charts/pie',
                icon: 'PieChartOutlined'
            }
        ]
    }
]

export default menuList