const hdConfig= {
    axios: {
        whiteUrlList: [
            '/deviceData/exportDeviceData',
            '/getDeviceNowArgument',
            '/getDeviceSetArgument',
            '/setDeviceArgument'
        ], //不进行拦截的请求地址,当结果没返回过来时，还是能再次请求
        agentTransformId:  [
            '/dataCollectInfo/deviceEarningsData',
            '/dataCollectInfo/dealerEarningsData',
            '/AccountInfo/getAccountListInfo',
            '/AccountInfo/accountOperateInfo',
            '/orderData/orderTradeRecordData',
            '/orderData/orderChargeRecordData',
            '/orderData/orderOfflineRecordData',
            '/orderData/orderinCoinsRecordData',
            '/orderData/orderPackageMonthData',
            '/deviceData/getDeviceData',
            '/deviceData/getBluetoothDeviceData',
            '/deviceData/inquireDeviceLogData',
            '/deviceData/inquireDeviceOperationData',
            '/orderData/orderOnlineCardData',
            '/orderData/orderOnlineOperateData',
            '/orderData/orderOnlineCardRecordData',
            '/areaData/areaManageData'
        ], //代理商，当选中名下的商户时，访问以下路径会在请求参数中添加 params 参数，params参数为选中商户的id
    },
    proxy: { 
        open: false, //是否开启代理
    }
}
export default hdConfig