
//用户默认的导航菜单项目文件

//定义菜单接口
export interface Imenu{
    title: string,
    link: string,
    icon: string,
    children?: Imenu[]
}


const menuList: Imenu[] = [
    {
        title: '首页',
        link: '/home',
        icon: 'PieChartOutlined'
    },
    {
        title: '商品',
        link: 'sub1',
        icon: 'UnorderedListOutlined',
        children: [
            {
                title: '品类管理',
                link: '/Category',
                icon: 'RocketOutlined'
            },
            {
                title: '商品管理',
                link: '/product',
                icon: 'ScheduleOutlined'
            }
        ]
    },
    {
        title: '用户管理',
        link: '/user',
        icon: 'UserOutlined'
    },
    {
        title: '角色管理',
        link: '/role',
        icon: 'SecurityScanOutlined'
    },
    {
        title: '图形图表',
        link: 'sub2',
        icon: 'AppstoreOutlined',
        children: [
            {
                title: '柱形图',
                link: '/charts/bar',
                icon: 'AreaChartOutlined'
            },
            {
                title: '折线图',
                link: '/charts/line',
                icon: 'LineChartOutlined'
            },
            {
                title: '饼图',
                link: '/charts/pie',
                icon: 'PieChartOutlined'
            }
        ]
    }
]

export default menuList