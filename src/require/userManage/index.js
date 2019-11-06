//用户管理请求
import ajax from '../ajax'

export const handleMerInfo= function (data){ //处理 历史统计
    return ajax({
             url: '/AccountInfo/getDealerListInfo',
             data: data
         })
}