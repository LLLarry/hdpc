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
             url: '/allowAuthority/messSwitch',
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