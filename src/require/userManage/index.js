//用户管理请求
import ajax from '../ajax'

export const handleMerInfo= function (data){ //请求 商户信息
    return ajax({
             url: '/AccountInfo/getDealerListInfo',
             data: data
         })
}

export const handleMerInfoSet= function (data){ //请求 商户信息中的设置信息
    return ajax({
             url: '/allowAuthority/selectMessSwitch',
             data: data
         })
}

/**
 * 
 *  设置 商户信息中的设置信息
 */
export const setMerInfoSetInfo= function (data){
    return ajax({
             url: '/allowAuthority/settingSwitch',
             data: data
         })
}

/**
 * 修改提现费率
 */
export const updataFeerate= function (data){
    return ajax({
             url: '/AccountInfo/editDealerPersonRate',
             data: data
         })
}


/**
 * 修改对公账户提现费率
 */
export const updataRate= function (data){
    return ajax({
             url: '/AccountInfo/editDealerCorporateRate',
             data: data
         })
}

/**
 * 商户收益信息
 */

 export const merEarnDetail= function (data){
    return ajax({
             url: '/AccountInfo/dealerEarningsDetail',
             data: data
         })
}

/**
 * 商户银行卡信息
 */

export const merBankInfo= function (data){
    return ajax({
             url: '/AccountInfo/dealerBankCardData',
             data: data
         })
}

/**
 * 用户信息
 */

export const getUserInfo= function (data){
    return ajax({
             url: '/AccountInfo/getAccountListInfo',
             data: data
         })
}

/**
 * 查询包月信息记录
 */

export const getUserMonthlyInfo= function (data){
    return ajax({
             url: '/AccountInfo/inquireMonthlyData',
             data: data
         })
}

/**
 * 查询用户钱包详情
 */

export const getUserWalletDetail= function (data){
    return ajax({
             url: '/AccountInfo/touristWalletData',
             data: data
         })
}

/**
 * 查询用户在线卡信息
 */

export const getUserOnlineCardInfo= function (data){
    return ajax({
             url: '/AccountInfo//inquireTouristOnlineData',
             data: data
         })
}

/**
 * 查询用户管理的操作信息
 */

export const getUserHandleInfo= function (data){
    return ajax({
             url: '/AccountInfo/accountOperateInfo',
             data: data
         })
}

/**
 * 商户订单收益明细
 */

export const getDealerEarningsOrderDetail= function (data){
    return ajax({
             url: '/AccountInfo/dealerEarningsOrderDetail',
             data: data
         })
}


/**
 * 获取商户缴费模板
 */

export const getMerPayTem= function (data){
    return ajax({
             url: '/AccountInfo/getListFeescale',
             data: data
         })
}