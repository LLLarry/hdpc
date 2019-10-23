/**这里存放的是路由权限设置 */
// 超级管理员路由
export const constantRouterMapSuperAdmin= [ 
    {
    path: '/',
    component: ()=> import('@/components/Layout/layout'),
    meta: {
        role: ['superAdmin','admin']
        },
    children: [
      {
        path: '/',
        redirect: '/datastatis/index'
      },
      {
        path: '/datastatis/total',
        name: '数据监控',
        component: ()=> import('@/views/DataStatis/DataTotal'),
        meta: {
          role: ['superAdmin']
        }
      },
      {
        path: '/datastatis/index',
        name: '数据汇总',
        component: ()=> import('@/views/DataStatis/DataStatis'),
        meta: {
          role: ['superAdmin']
        }
      },
      {
        path: '/datastatis/hisstatis',
        name: '历史统计',
        component: ()=> import('@/views/DataStatis/Hisstatis'),
        meta: {
          role: ['superAdmin']
        }
      },
      {
        path: '/datastatis/deviceearn',
        name: '设备收益',
        component: ()=> import('@/views/DataStatis/DeviceEarn'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/datastatis/merearn',
        name: '商户收益',
        component: ()=> import('@/views/DataStatis/MerEarn'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
       // 用户管理==================>
      {
        path: '/usermanage/merInfo',
        name: '商户信息',
        component: ()=> import('@/views/UserManage/MerInfo/MerInfo'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/merInfo/merEarnDetail',
        name: '商户收益信息',
        component: ()=> import('@/views/UserManage/MerInfo/MerEarnDetail/MerEarnDetail'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/userInfo',
        name: '用户信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserInfo'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/userInfo/userWalletDetail',
        name: '用户钱包信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserWalletDetail/UserWalletDetail'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/userInfo/userOnlineCardInfo',
        name: '用户在线卡信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserOnlineCardInfo/UserOnlineCardInfo'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/userHandleInfo',
        name: '用户操作信息',
        component: ()=> import('@/views/UserManage/UserHandleInfo/UserHandleInfo'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
       // 用户管理 <==================
      //  交易记录TradeRecord
      {
        path: '/tradeRecord/tradeRecordCon',
        name: '交易记录',
        component: ()=> import('@/views/TradeRecord/TradeRecordCon/TradeRecordCon'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/tradeRecord/tradeRecordCon/orderDetail',
        name: '订单详情',
        component: ()=> import('@/views/TradeRecord/TradeRecordCon/OrderDetail/orderDetail'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/tradeRecord/chargeRecord',
        name: '充电记录',
        component: ()=> import('@/views/TradeRecord/ChargeRecord/ChargeRecord'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      // 交易记录
      {
        path: '/datastatis/merearn/test',
        name: 'Test',
        component: ()=> import('@/views/DataStatis/Test'),
        meta: {
          role: ['superAdmin','admin']
        }
      },

      {
        path: '*',
        component: ()=> import('@/components/NoFind/NoFind'),
        meta: {
          role: ['superAdmin','admin']
        }
      }, 
      
    ]
  },
]
// 管理员路由
export const constantRouterMapAdmin= [
    {
    path: '/',
    component: ()=> import('@/components/Layout/layout'),
    meta: {
        role: ['superAdmin','admin']
        },
    children: [
      {
        path: '/',
        redirect: '/datastatis/index'
      },
      {
        path: '/datastatis/index',
        name: '数据汇总',
        component: ()=> import('@/views/DataStatis/DataStatis'),
        meta: {
          role: ['superAdmin']
        }
      },
      {
        path: '/datastatis/deviceearn',
        name: '设备收益',
        component: ()=> import('@/views/DataStatis/DeviceEarn'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/datastatis/merearn',
        name: '商户收益',
        component: ()=> import('@/views/DataStatis/MerEarn'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/merInfo',
        name: '商户信息',
        component: ()=> import('@/views/UserManage/MerInfo/MerInfo'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/merInfo/merEarnDetail',
        name: '商户收益信息',
        component: ()=> import('@/views/UserManage/MerInfo/MerEarnDetail/MerEarnDetail'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/userInfo',
        name: '用户信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserInfo'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/userInfo/userWalletDetail',
        name: '用户钱包信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserWalletDetail/UserWalletDetail'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/userInfo/userOnlineCardInfo',
        name: '用户在线卡信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserOnlineCardInfo/UserOnlineCardInfo'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/usermanage/userHandleInfo',
        name: '用户操作信息',
        component: ()=> import('@/views/UserManage/UserHandleInfo/UserHandleInfo'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
       //  交易记录TradeRecord
      {
        path: '/tradeRecord/tradeRecordCon',
        name: '交易记录',
        component: ()=> import('@/views/TradeRecord/TradeRecordCon/TradeRecordCon'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/tradeRecord/tradeRecordCon/orderDetail',
        name: '订单详情',
        component: ()=> import('@/views/TradeRecord/TradeRecordCon/OrderDetail/orderDetail'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '/tradeRecord/chargeRecord',
        name: '充电记录',
        component: ()=> import('@/views/TradeRecord/ChargeRecord/ChargeRecord'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      // 交易记录
      {
        path: '/datastatis/merearn/test',
        name: 'Test',
        component: ()=> import('@/views/DataStatis/Test'),
        meta: {
          role: ['superAdmin','admin']
        }
      },
      {
        path: '*',
        component: ()=> import('@/components/NoFind/NoFind'),
        meta: {
          role: ['superAdmin','admin']
        }
      }, 
    ]
  },
]