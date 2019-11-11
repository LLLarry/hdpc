 //设备管理请求
 import ajax from '../ajax'

/**
 * 获取设备列表信息
 *  */ 
export const getDeviceList= function (data){ 
    return ajax({
             url: '/deviceData/getDeviceData',
             data: data
         })
}

/**
 * 设置设备版本号信息
 */
export const setHardversion= function (data){ 
    return ajax({
             url: '/deviceData/editDeviceHardversion',
             data: data
         })
}

/**
 * 重置设备测试次数
 */
export const resetDeviceTestTime= function (data){ 
    return ajax({
             url: '/deviceData/resetDeviceTestTime',
             data: data
         })
}

