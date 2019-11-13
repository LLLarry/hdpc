//交易记录请求
import ajax from '../ajax'

/**
 * 获取交易记录信息
 */
export const getTradeRecord= function (data){ 
    return ajax({
             url: '/orderData/orderTradeRecordData',
             data: data
         })
}

/**
 * 获取充电记录信息
 */
export const getChargeRecord= function (data){ 
    return ajax({
             url: '/orderData/orderChargeRecordData',
             data: data
         })
}

/**
 * 获取离线卡记录信息
 */
export const getOfflineRecord= function (data){ 
    return ajax({
             url: '/orderData/orderOfflineRecordData',
             data: data
         })
}