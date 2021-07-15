const routerList = [
    {
      path: '/datastatis/total',
      name: '数据监控',
      component: ()=> import('@/views/DataStatis/DataTotal'),
      meta: {
        role: ['superAdmin']
      }
    },
    {
    path: '/',
    component: ()=> import('@/components/Layout/layout'),
    meta: {
        role: ['superAdmin', 'Admin', 'Agent', 'subMer']
    },
    children: [
      {
        path: '/',
        redirect: '/datastatis/index',
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        },
      },
      
      {
        path: '/datastatis/index',
        name: '数据汇总',
        component: ()=> import('@/views/DataStatis/DataStatis'),
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/datastatis/hisstatis',
        name: '历史统计',
        component: ()=> import('@/views/DataStatis/Hisstatis'),
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/datastatis/deviceearn',
        name: '设备收益',
        component: ()=> import('@/views/DataStatis/DeviceEarn'),
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/datastatis/merearn',
        name: '商户收益',
        component: ()=> import('@/views/DataStatis/MerEarn'),
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/datastatis/earndetail',
        name: '收益明细',
        component: ()=> import('@/views/DataStatis/EarnDetail'),
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/datastatis/areastatis',
        name: '小区统计',
        component: ()=> import('@/views/DataStatis/AreaStatis'),
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
       // 用户管理==================>
      {
        path: '/usermanage/merInfo',
        name: '商户信息',
        component: ()=> import('@/views/UserManage/MerInfo/MerInfo'),
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/usermanage/merInfo/merEarnDetail',
        name: '商户收益信息',
        component: ()=> import('@/views/UserManage/MerInfo/MerEarnDetail/MerEarnDetail'),
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/usermanage/merInfo/merOrderEarnDetail',
        name: '商户订单收益信息',
        component: ()=> import('@/views/UserManage/MerInfo/MerOrderEarnDetail/MerOrderEarnDetail'),
        meta: {
            role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      
      {
        path: '/usermanage/merInfo/merBinkInfo',
        name: '商户银行卡信息',
        component: ()=> import('@/views/UserManage/MerInfo/MerBinkInfo/MerBinkInfo'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/usermanage/merInfo/MerInfoDetail',
        name: '商户信息详情',
        component: ()=> import('@/views/UserManage/MerInfo/MerInfoDetail/MerInfoDetail'),
        meta: {
          role: ['superAdmin']
        }
      },
      {
        path: '/usermanage/userInfo',
        name: '用户信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserInfo'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/usermanage/userInfo/userWalletDetail',
        name: '用户钱包信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserWalletDetail/UserWalletDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/usermanage/userInfo/userOrderDetail',
        name: '用户订单信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserOrderDetail/UserOrderDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/usermanage/userInfo/userOnlineCardInfo',
        name: '用户在线卡信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserOnlineCardInfo/UserOnlineCardInfo'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/usermanage/userHandleInfo',
        name: '用户操作信息',
        component: ()=> import('@/views/UserManage/UserHandleInfo/UserHandleInfo'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/usermanage/agentManage',
        name: '代理商信息',
        component: ()=> import('@/views/UserManage/AgentManage/AgentManage'),
        meta: {
          role: ['superAdmin']
        }
      },
      {
        path: '/usermanage/subAccount',
        name: '子账号信息',
        component: ()=> import('@/views/UserManage/SubAccount'),
        meta: {
          role: ['superAdmin']
        }
      },
      {
        path: '/usermanage/agentManage/agentManageDetail',
        name: '代理商详情',
        component: ()=> import('@/views/UserManage/AgentManage/AgentManageDetail/AgentManageDetail'),
        meta: {
          role: ['superAdmin']
        }
      },
       // 用户管理 <==================
      //  交易记录TradeRecord
      {
        path: '/tradeRecord/tradeRecordCon',
        name: '交易记录',
        component: ()=> import('@/views/TradeRecord/TradeRecordCon/TradeRecordCon'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/tradeRecord/tradeRecordCon/orderDetail',
        name: '订单详情',
        component: ()=> import('@/views/TradeRecord/TradeRecordCon/OrderDetail/orderDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/tradeRecord/chargeRecord',
        name: '充电记录',
        component: ()=> import('@/views/TradeRecord/ChargeRecord/ChargeRecord'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/tradeRecord/chargeRecord/chargeRecordDetail',
        name: '充电详情',
        component: ()=> import('@/views/TradeRecord/ChargeRecord/ChargeRecordDetail/ChargeRecordDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/tradeRecord/offlineCardRecord',
        name: '离线卡记录',
        component: ()=> import('@/views/TradeRecord/OfflineCardRecord/OfflineCardRecord'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/tradeRecord/coinRecord',
        name: '投币记录',
        component: ()=> import('@/views/TradeRecord/CoinRecord/CoinRecord'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/tradeRecord/monthlyRecord',
        name: '包月记录',
        component: ()=> import('@/views/TradeRecord/MonthlyRecord/MonthlyRecord'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/tradeRecord/cashManage',
        name: '提现管理',
        component: ()=> import('@/views/TradeRecord/CashManage/CashManage'),
        meta: {
          role: ['superAdmin', 'subMer']
        }
      },
      {
        path: '/tradeRecord/walletRecord',
        name: '钱包记录',
        component: ()=> import('@/views/TradeRecord/WalletRecord/WalletRecord'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/tradeRecord/feescaleRecord',
        name: '缴费记录',
        component: ()=> import('@/views/TradeRecord/FeescaleRecord/FeescaleRecord'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/tradeRecord/feescaleRecord/feescaleRecordDetail',
        name: '缴费详情',
        component: ()=> import('@/views/TradeRecord/FeescaleRecord/FeescaleRecordDetail/FeescaleRecordDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      // 交易记录
      // 设备管理
      
      {
        path: '/deviceManage/deviceList',
        name: '设备列表',
        component: ()=> import('@/views/DeviceManage/DeviceList/DeviceList'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/deviceManage/bluetoothList',
        name: '蓝牙设备',
        component: ()=> import('@/views/DeviceManage/BluetoothList/BluetoothList'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/deviceManage/deviceLog',
        name: '设备日志',
        component: ()=> import('@/views/DeviceManage/DeviceLog/DeviceLog'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/deviceManage/handleLog',
        name: '操作日志',
        component: ()=> import('@/views/DeviceManage/HandleLog/HandleLog'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/deviceManage/deviceList/deviceDetail',
        name: '设备详情',
        component: ()=> import('@/views/DeviceManage/DeviceList/DeviceDetail/DeviceDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/deviceManage/bluetoothList/deviceDetail',
        name: '蓝牙设备详情',
        component: ()=> import('@/views/DeviceManage/BluetoothList/DeviceDetail/DeviceDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/deviceManage/deviceList/temperhistory',
        name: '历史数据',
        component: ()=> import('@/views/DeviceManage/DeviceList/DeviceDetail/components/AlarmConfig/AlarmHistory'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/deviceManage/deviceList/templateDetail',
        name: '模板详情',
        component: ()=> import('@/views/DeviceManage/DeviceList/TemplateDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/deviceManage/bluetoothList/templateDetail',
        name: '蓝牙模板详情',
        component: ()=> import('@/views/DeviceManage/bluetoothList/TemplateDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      // 设备管理结束
      // IC卡管理开始
      {
        path: '/iccardManage/onlineCardQuery',
        name: '在线卡查询',
        component: ()=> import('@/views/ICCardManage/OnlineCardQuery/OnlineCardQuery'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/iccardManage/onlineCardHandle',
        name: '在线卡操作',
        component: ()=> import('@/views/ICCardManage/OnlineCardHandle/OnlineCardHandle'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/iccardManage/onlineCardConsume',
        name: '在线卡消费',
        component: ()=> import('@/views/ICCardManage/OnlineCardConsume/OnlineCardConsume'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      // IC卡管理结束
      // 小区管理开始
      {
        path: '/communManage/communManageCon',
        name: '小区管理',
        component: ()=> import('@/views/CommunManage/CommunManageCon/CommunManageCon'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/communManage/communManageCon/comManageDetail',
        name: '小区详情',
        component: ()=> import('@/views/CommunManage/CommunManageCon/ComManageDetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      {
        path: '/communManage/communManageCon/tempdetail',
        name: '小区模板详情',
        component: ()=> import('@/views/CommunManage/CommunManageCon/ComManageDetail/Tempdetail'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },
      
      // 小区管理结束
       // 系统设置开始
       {
        path: '/systemSet/systemTem',
        name: '系统模板',
        component: ()=> import('@/views/SystemSet/SystemTem/SystemTem'),
        meta: {
          role: ['superAdmin']
        }
      },
      // 系统设置结束
      // 结算收益
      {
        path: '/settlement/index',
        name: '结算收益',
        component: ()=> import('@/views/Settlement/Settlement'),
        meta: {
          role: ['superAdmin']
        }
      },
      {
        path: '/settlement/wechartOrder',
        name: '微信订单',
        component: ()=> import('@/views/Settlement/WechartOrder'),
        meta: {
          role: ['superAdmin']
        }
      },
      {
        path: '*',
        component: ()=> import('@/components/NoFind/NoFind'),
        meta: {
          role: ['superAdmin', 'Admin', 'Agent', 'subMer']
        }
      },     
    ]
  },
]

function abc (list, classify) {
    return list.filter(router => {
        if(router.children && router.children.length > 0) {
            router.children = abc(router.children, classify)
        }
        return router.meta.role.includes(classify)
    })
}

export default (classify) => {
    return abc(routerList, classify)
}