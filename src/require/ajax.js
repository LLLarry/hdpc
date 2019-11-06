import axios from 'axios'
import {messageTip} from '@/utils/ele'
import store from '@/store'
// 加载进度条插件及样式
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

const service = axios.create({ // 创建axios实例           
        timeout: 120000, // 请求超时时间
        //baseURL: 'http://127.0.0.1:8888/manage'  
        // baseURL: 'http://127.0.0.1',
        baseURL:' http://192.168.3.45',
        withCredentials : true                         
})

service.interceptors.request.use(config => { //请求拦截器   
        NProgress.start()
        let cancelTokenArr=  store.state.cancelTokenArr
        for(let i=0; i < cancelTokenArr.length ; i++){ //在请求之前，拦截、判断前面有没有相同路径正在发送请求，如果有，进行拦截，取消发送
          if(cancelTokenArr[i].url === config.url){
            cancelTokenArr[i].cancelToken('多次请求取消')
          }
        }
        config.cancelToken = new axios.CancelToken(function (cancel) { //将请求的cancelToken存到 vuex中的pushToken中
          //  console.log('config',cancel) 
          store.commit('pushToken', {cancelToken: cancel,url:config.url})
        })
      
        return config
      }, error => {
        Promise.reject(error)
      })

service.interceptors.response.use(  //响应拦截器                
        response => {
          if(response.data.code === 100 && response.data.message == "session缓存失效"){ //登录已过期
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
                    service.get(url,{params:params}).then(res=>{
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
                return  new Promise((resolve,reject)=>{
                     service.post(url,data).then(res=>{
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

