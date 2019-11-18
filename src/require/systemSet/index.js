//系统设置请求
import ajax from '../ajax'

/**
 * 获取小区信息
 */
export const getSystemSetInfo= function (data){ 
    return ajax({
             url: '/systemSetting/systemTemplateData',
             data: data
         })
}
