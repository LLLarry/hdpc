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
 * 获取功率曲线信息
 */
export const getpowerLineInfo= function (data){ 
    return ajax({
             url: '/orderData/inquirePowerBrokenLine',
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

/**
 * 获取交易订单详情 （从交易记录中进）
 */
export const getOrderTradeDataDetail= function (data){ 
    return ajax({
             url: '/orderData/orderTradeDataDetail',
             data: data
         })
}

/**
 * 获取交易订单详情 （从其他记录中进）
 */
export const getOtherOrderTradeDataDetail= function (data){ 
    return ajax({
             url: '/orderData/orderDataDetail',
             data: data
         })
}

/**
 * 获取合伙人收益详情
 */
export const getPartnerIncomeDetail= function (data){ 
    return ajax({
             url: '/orderData/partnerIncomeDetail',
             data: data
         })
}


/**
 * 获取投币记录详情
 */
export const getincoinRecord= function (data){ 
    return ajax({
             url: '/orderData/orderinCoinsRecordData',
             data: data
         })
}

/**
 * 获取包月记录信息
 */
export const getMonthRecordInfo= function (data){ 
    return ajax({
             url: '/orderData/orderPackageMonthData',
             data: data
         })
}

/**
 * 获取提现管理信息
 */
export const getWithDrawRecord= function (data){ 
    return ajax({
             url: '/orderData/orderWithdrawRecordData',
             data: data
         })
}

/**
 * 获取钱包记录
 */
export const getWalletRecord= function (data){ 
    return ajax({
             url: '/orderData/orderWalletRecordData',
             data: data
         })
}

/**
 * 交易退费入口
 */
export const tradeRefEntrance= function (options){ 
    return ajax({
             url: options.url,
             data: options.data
         })
}

/**
 * 充电记录撤回退款
 */
export const withdrawEntrance= function (data){ 
    return ajax({
             url: '/wxpay/withdrawWalletRefund',
             data: data
         })
}

/**
 *商户提现拒绝通过
 */
export const merWithdrawResolve= function (data){ 
    return ajax({
             url: '/orderData/withdrawResolve',
             data: data
         })
}

/**
 *商户缴费记录
 */
export const merFeescaleRecode= function (data){ 
    return ajax({
             url: '/orderData/feescaleRecode',
             data: data
         })
}


