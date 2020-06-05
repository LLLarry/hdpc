//结算收益请求
import ajax from '../ajax'

/**
 * 结算个人收益路径
 */
export const settlementTotalEarn= function (data){ 
    return ajax({
             url: '/systemSetting/calculateTotalCollect',
             data: data
         })
}

/**
 * 结算总共收益路径
 */
export const settlementAllEarn= function (data){ 
    return ajax({
             url: '/systemSetting/calculateAloneCollect',
             data: data
         })
}


/**
 * 微信订单
 */
export const getWechartList= function (data){ 
    return ajax({
             url: '/wxpay/downloadbillShow',
             data: data
         })
}
