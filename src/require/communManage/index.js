//小区管理请求
import ajax from '../ajax'

/**
 * 获取小区信息
 */
export const getCommunInfo= function (data){ 
    return ajax({
             url: '/areaData/areaManageData',
             data: data
         })
}



