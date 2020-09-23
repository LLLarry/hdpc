export default {
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
    test: {"code":200,"resultData":{"hotDoorsillData":0,"powerTotalData":0,"smokeDoorsillData":0,"electricData":0},"equipment":{"csq":"0","nowCoinsEarn":0,"code":"000001","totalCoinsEarn":0,"nowOnlineEarn":0,"several":0,"lon":116.481181,"phoneNum":null,"remark":null,"numPerPage":null,"totalOnlineEarn":0,"startIndex":null,"coinsMoney":null,"failnum":0,"ccid":"89860461161972094268","freenum":0,"manid":null,"liveTime":null,"state":0,"tempid":444,"ipaddr":"39.144.3.78:38940","mainHardver":"2","mainid":"002600571347373439353937","lat":39.989792,"deviceType":1,"registTime":null,"deviceIdAndroid":null,"address":null,"hardversionnum":"00","tempname":null,"totalMoney":null,"mainSoftver":"2","mainType":"1","hardversion":"09","usenum":0,"createTime":"2018-09-19T16:00:00.000+0000","expirationTime":"2022-02-15T16:00:00.000+0000","deviceIdIos":null,"name":null,"bindtype":1,"imei":"868994034714761","location":null,"softversionnum":"03","aid":0,"username":null},"phonenum":"15355555555","message":"成功","templatev3":{"common1":"15355555555","chargeInfo":"每小时收费：2元， 功率区间：200-400瓦\n每小时收费：4元， 功率区间：600-800瓦","stairid":0,"gather3":[{"common1":null,"common2":null,"brandName":null,"chargeTime":60,"chargeQuantity":100,"remark":null,"telephone":null,"type":3,"common3":null,"money":1,"createTime":"2020-03-20T06:09:37.000+0000","name":"1元","id":1444,"status":null,"tempparid":444},{"common1":null,"common2":null,"brandName":null,"chargeTime":120,"chargeQuantity":200,"remark":null,"telephone":null,"type":3,"common3":null,"money":2,"createTime":"2020-03-20T06:09:42.000+0000","name":"2元","id":1445,"status":null,"tempparid":444}],"ifalipay":1,"remark":"测试名称8","gather2":[{"common1":null,"common2":null,"brandName":null,"chargeTime":60,"chargeQuantity":0,"remark":null,"telephone":null,"type":2,"common3":null,"money":0,"createTime":"2020-03-20T06:09:33.000+0000","name":"1小时","id":1441,"status":null,"tempparid":444},{"common1":null,"common2":null,"brandName":null,"chargeTime":120,"chargeQuantity":0,"remark":null,"telephone":null,"type":2,"common3":null,"money":0,"createTime":"2020-03-20T06:09:34.000+0000","name":"2小时","id":1442,"status":null,"tempparid":444}],"gather1":[{"common1":"200","common2":"400","brandName":null,"chargeTime":0,"chargeQuantity":0,"remark":0,"telephone":null,"type":1,"common3":null,"money":2,"createTime":"2020-07-01T09:07:40.000+0000","name":"1593594460654","id":1757,"status":0,"tempparid":444},{"common1":"600","common2":"800","brandName":null,"chargeTime":0,"chargeQuantity":0,"remark":0,"telephone":null,"type":1,"common3":null,"money":4,"createTime":"2020-07-01T09:07:48.000+0000","name":"1593594468094","id":1759,"status":0,"tempparid":444}],"temporaryc":1,"createTime":"2020-03-20 14:09:24.0","merchantid":1,"name":"测试v3模板","permit":1,"rank":1,"id":444,"walletpay":2,"status":6},"sysparam":{"powerTim3":50,"powerTim4":25,"code":"000001","cst":1,"cardMin":240,"powerMax3":600,"spFullEmpty":1,"powerMax4":800,"updateTime":"2020-06-29T07:41:51.000+0000","coinMin":240,"cardElec":1,"powerMax1":200,"powerMax2":400,"fullPowerMin":30,"spRecMon":1,"powerTotal":6600,"coinElec":1,"fullChargeTime":120,"smokeDoorsill":5000,"elecPri":1,"hotDoorsill":80,"elecTimeFirst":0,"powerTim2":75},"resultDoorsill":{"powerTotal":6600,"hotDoorsill":80,"smokeDoorsill":5000},"uid":1,"bindtype":1,"merid":1,"allPortStatusList":[{"port":"1","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"0"},{"port":"2","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"0"},{"port":"3","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"172"},{"port":"4","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"0"},{"port":"5","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"0"},{"port":"6","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"0"},{"port":"7","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"0"},{"port":"8","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"0"},{"port":"9","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"0"},{"port":"10","portStatus":"1","elec":"0","updateTime":"2020-09-19 11:47:05","time":"0","power":"0"}],"username":"Roar Wolf"}
}