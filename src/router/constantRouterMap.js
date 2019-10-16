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