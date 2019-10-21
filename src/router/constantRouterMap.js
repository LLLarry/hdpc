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
        path: '/usermanage/userInfo',
        name: '用户信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserInfo'),
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
       // 用户管理 <==================
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
    redirect:'/datastatis/index',
    component: ()=> import('@/components/Layout/layout'),
    meta: {
        role: ['superAdmin','admin']
        },
    children: [
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
        path: '/usermanage/userInfo',
        name: '用户信息',
        component: ()=> import('@/views/UserManage/UserInfo/UserInfo'),
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