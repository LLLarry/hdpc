// 这里是菜单配置页面
// 超级管理员菜单列表
export const superAdminMenuList= [
    {
        title: '数据汇总',
        link: '/datastatis',
        index: "0",
        icon: 'icon-shujuhuizong',
         children: [
            {
                title: '数据监控',
                link: '/datastatis/total',
                index: '0-0'
            },
            {
                title: '数据汇总',
                link: '/datastatis/index',
                index: '0-1'
            },
            {
                title: '历史统计',
                link: '/datastatis/hisstatis',
                index: '0-2'
            },
            {
                title: '设备收益',
                link: '/datastatis/deviceearn',
                index: '0-3'
            },
            {
                title: '商户收益',
                link: '/datastatis/merearn',
                index: '0-4'
            }
        ]
    },
    {
        title: '用户管理',
        link: 'usermanage',
        index: '1',
        icon: 'icon-yonghu',
        children: [
            {
                title: '商户信息',
                link: '/usermanage/merInfo',
                index: '1-0'
            },
            {
                title: '用户信息',
                link: '/usermanage/userInfo',
                index: '1-1'
            },
             {
                title: '操作信息',
                link: '/user/money',
                index: '1-2'
            }
        ]
    },
     {
        title: '交易记录',
        index: '2',
        icon: 'icon-dingdan',
        children: [
            {
                title: '交易记录',
                link: '/user/num',
                index: '2-0'
            },
            {
                title: '充电记录',
                link: '/user/money',
                index: '2-1'
            },
            {
                title: '离线卡记录',
                link: '/user/num',
                index: '2-2'
            },
            {
                title: '投币记录',
                link: '/user/money',
                index: '2-3'
            },
            {
                title: '包月记录',
                link: '/user/num',
                index: '2-4'
            },
            {
                title: '提现管理',
                link: '/user/money',
                index: '2-5'
            },
            {
                title: '钱包记录',
                link: '/user/num',
                index: '2-6'
            }
        ]
    },
    {
        title: '设备管理',
        index: "3",
        icon: 'icon-shebei',
        children: [
            {
                title: '设备列表',
                link: '/user/num',
                index: '3-0'
            },
            {
                title: '蓝牙设备',
                link: '/user/money',
                index: '3-1'
            },
            {
                title: '设备日志',
                link: '/user/num',
                index: '3-2'
            },
            {
                title: '操作日志',
                link: '/user/money',
                index: '3-3'
            }
        ]
    },
    {
        title: 'IC卡管理',
        index: "4",
        icon: 'icon-qiapian',
        children: [
            {
                title: '在线卡查询',
                link: '/user/num',
                index: '4-0'
            },
            {
                title: '在线卡操作',
                link: '/user/money',
                index: '4-1'
            },
            {
                title: '在线卡消费',
                link: '/user/num',
                index: '4-2'
            }
        ]
    },
    {
        title: '小区管理',
         index: "5",
         icon: 'icon-haofangtuo400iconfont2xiaoqu',
        children: [
            {
                title: '小区管理',
                link: '/user/num',
                index: '5-0'
            }
        ]
    },
    {
        title: '系统设置',
        index: "6",
        icon: 'icon-guanli',
        children: [
            {
                title: '系统设置',
                link: '/user/num',
                index: '6-0'
            }
        ]
    },

]

// 普通管理员菜单列表
export const adminMenuList= [
    {
        title: '数据汇总',
        link: '/datastatis',
        index: "0",
        icon: 'icon-shujuhuizong',
         children: [
            {
                title: '数据汇总',
                link: '/datastatis/index',
                index: '0-0'
            },
            {
                title: '设备收益',
                link: '/datastatis/deviceearn',
                index: '0-1'
            },
            {
                title: '商户收益',
                link: '/datastatis/merearn',
                index: '0-2'
            }
        ]
    },
    {
        title: '用户管理',
        index: '1',
        link: '/usermanage',
        icon: 'icon-yonghu',
        children: [
            {
                title: '商户信息',
                link: '/usermanage/merInfo',
                index: '1-0'
            },
            {
                title: '用户信息',
                link: '/usermanage/userInfo',
                index: '1-1'
            },
             {
                title: '操作信息',
                link: '/user/money',
                index: '1-2'
            }
        ]
    },
     {
        title: '交易记录',
        index: '2',
        icon: 'icon-dingdan',
        children: [
            {
                title: '交易记录',
                link: '/user/num',
                index: '2-0'
            },
            {
                title: '充电记录',
                link: '/user/money',
                index: '2-1'
            },
            {
                title: '离线卡记录',
                link: '/user/num',
                index: '2-2'
            },
            {
                title: '投币记录',
                link: '/user/money',
                index: '2-3'
            },
            {
                title: '包月记录',
                link: '/user/num',
                index: '2-4'
            },
        ]
    },
    {
        title: '设备管理',
        index: "3",
        icon: 'icon-shebei',
        children: [
            {
                title: '设备列表',
                link: '/user/num',
                index: '3-0'
            },
            {
                title: '蓝牙设备',
                link: '/user/money',
                index: '3-1'
            },
            {
                title: '设备日志',
                link: '/user/num',
                index: '3-2'
            },
            {
                title: '操作日志',
                link: '/user/money',
                index: '3-3'
            }
        ]
    },
    {
        title: 'IC卡管理',
        index: "4",
        icon: 'icon-qiapian',
        children: [
            {
                title: '在线卡查询',
                link: '/user/num',
                index: '4-0'
            },
            {
                title: '在线卡操作',
                link: '/user/money',
                index: '4-1'
            },
            {
                title: '在线卡消费',
                link: '/user/num',
                index: '4-2'
            }
        ]
    },
    {
        title: '小区管理',
         index: "5",
         icon: 'icon-haofangtuo400iconfont2xiaoqu',
        children: [
            {
                title: '小区管理',
                link: '/user/num',
                index: '5-0'
            }
        ]
    }

]