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