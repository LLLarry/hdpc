// import axios from 'axios'
import {messageTip} from '@/utils/ele'
import store from '@/store'
//console.log(Qs) 
// import qs from 'qs'  //cdn引入后是Qs
// import axios  from 'axios'
// 加载进度条插件及样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import hdConfig from '../../hd.config' //配置文件
let proxyUrl= ''
let baseURL= window.location.origin || 'http://www.he360.com.cn'
if (process.env.NODE_ENV === "development"){ //开发环境
  baseURL= 'http://localhost'
  if(hdConfig.proxy.open){
    baseURL= ''
    proxyUrl='/api'
  }
}
//  const filterUrlList= ['/dataCollectInfo/deviceEarningsData','/dataCollectInfo/dealerEarningsData','/AccountInfo/getAccountListInfo',
// '/AccountInfo/accountOperateInfo','/orderData/orderTradeRecordData','/orderData/orderChargeRecordData','/orderData/orderOfflineRecordData',
// '/orderData/orderinCoinsRecordData','/orderData/orderPackageMonthData','/deviceData/getDeviceData','/deviceData/getBluetoothDeviceData','/deviceData/inquireDeviceLogData',
// '/deviceData/inquireDeviceOperationData','/orderData/orderOnlineCardData','/orderData/orderOnlineOperateData','/orderData/orderOnlineCardRecordData',
// '/areaData/areaManageData'
// ]
const whiteUrlList= hdConfig.axios.whiteUrlList //不进行拦截的url
const filterUrlList= hdConfig.axios.agentTransformId //代理商需要加上商户id的url
console.log(hdConfig)
const service = axios.create({ // 创建axios实例           
        timeout: 120000, // 请求超时时间
        headers: {
          // 'Content-Type': 'application/json;charset=UTF-8'
          'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        },
        baseURL,
        withCredentials : true                         
})

service.interceptors.request.use(config => { //请求拦截器
        NProgress.start()
        if(!whiteUrlList.includes(config.url)){ /*当请求的地址在配置文件中配置，则多次请求也不会被拦截*/
          let cancelTokenArr=  store.state.cancelTokenArr
          for(let i=0; i < cancelTokenArr.length ; i++){ //在请求之前，拦截、判断前面有没有相同路径正在发送请求，如果有，进行拦截，取消发送
            if(cancelTokenArr[i].url === config.url){
              cancelTokenArr[i].cancelToken('多次请求取消')
            }
          }
        }
        // 这里是筛选地址 代理商需要
        let agentSelectmerid= store.state.agentSelectMerInfo.id
        if(agentSelectmerid !== ''){ //说明代理商选择查看的商户了
          if(filterUrlList.includes(config.url)){
            config.params.agentSelectmerid= agentSelectmerid
          }
        }
        
        config.cancelToken = new axios.CancelToken(function (cancel) { //将请求的cancelToken存到 vuex中的pushToken中
          store.commit('pushToken', {cancelToken: cancel,url:config.url})
        })
        return config
      }, error => {
        Promise.reject(error)
      })

service.interceptors.response.use(  //响应拦截器                
        response => {
          if(response.data.code === 901 && response.data.message == "session缓存失效"){ //登录已过期
            store.commit('handleLayoutStore')
            store.commit('handleLayoutRemoveAsyRouterMap')
            window.location.reload() //让页面重新加载，这个是移除router中动态添加的路由，避免再次添加新的路由
          }
          NProgress.done()
          return response
        },
        error => {
          NProgress.done()
          if(error.message != '路由跳转取消请求' && error.message != '多次请求取消'){ //拦截错误信息，判断是不是
            messageTip('error','获取数据失败,请稍后重试！') //正常错误抛出异常
            return Promise.reject(error.response) 
          }
            return Promise.reject('拦截请求') //抛出拦截响应错误
         
        }
      )
      
      
export default function (obj){
                let method= obj.method || 'get'
                let url= obj.url || ''  
                let params= obj.data || {}
                let data= obj.data || {}
               if(method== 'get'){
                return  new Promise((resolve,reject)=>{
                    service.get(proxyUrl+url,{params:{...params,isolate: 1}}).then(res=>{
                        if(res.status == 200){
                            resolve(res.data)   
                        }else{
                         //提示信息
                        }
                        
                    },err=>{
                        reject(err)
                    })
                })
               }else{
                 data=  Qs.stringify({...data,isolate: 1}) //post请求，转化格式
                return  new Promise((resolve,reject)=>{
                     service.post(proxyUrl+url,data).then(res=>{
                        if(res.status == 200){
                            resolve(res.data)   
                        }else{
                        //提示信息
                        }
                    },err=>{
                        reject(err)
                    })
                })  
               }
            }

