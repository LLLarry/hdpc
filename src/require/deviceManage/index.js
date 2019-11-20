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

/**
 * 蓝牙设备信息查询获取
 */
export const getBluetoothList= function (data){ 
    return ajax({
             url: '/deviceData/getBluetoothDeviceData',
             data: data
         })
}

/**
 * 查询设备日志
 */
export const getDeviceLogInfo= function (data){ 
    return ajax({
             url: '/deviceData/inquireDeviceLogData',
             data: data
         })
}

/**
 * 查询设备操作日志
 */
export const getDeviceHandleLogInfo= function (data){ 
    return ajax({
             url: '/deviceData/inquireDeviceOperationData',
             data: data
         })
}

/**
 * 获取设备详情信息
 */
export const getDeviceDetailInfo= function (data){ 
    return ajax({
             url: '/deviceData/inquireDeviceDetail',
             data: data
         })
}
/**
 * 获取设备的系统参数
 */
export const getsystemParma= function (data){ 
    return ajax({
             url: '/readsysteminfo',
             data: data
         })
}

/**
 * 保存设备的系统参数
 */
export const savesystemParma= function (data){ 
    return ajax({
             url: '/equipment/setSysPara',
             data: data
         })
}


