import ajax from '../ajax'

export const handleDataStatis= function (data){ //处理 数据汇总（超级管理员）
    return ajax({
             url: '/dataCollectInfo/dataCollectQuery',
             data: data
         })
}
export const handleDataStatisAdmin= function (data){ //处理 数据汇总(普通管理员)
    return ajax({
             url: '/dataCollectInfo/agentdatacollect',
             data: data
         })
}


export const handleHisStatis= function (data){ //处理 历史统计
    return ajax({
             url: '/dataCollectInfo/historyStatisticsData',
             data: data
         })
}

export const handleGetDeviceEarn= function (data){ //处理 设备收益
    return ajax({
             url: '/dataCollectInfo/deviceEarningsData',
             data: data
         })
}

export const handleExportMerEarn= function (data){ //导出商户收益
    return ajax({
             url: '/dataCollectInfo/dealerEarningsDownload',
             data: data
         })
}
