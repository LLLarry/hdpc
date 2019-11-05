import ajax from '../ajax'

export const handleGetDeviceEarn= function (data){ //处理 设备收益
    return ajax({
             url: '/dataCollectInfo/deviceEarningsData',
             data: data
         })
}