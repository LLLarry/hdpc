import axios from 'axios'
import {messageTip} from '@/utils/ele'
const service = axios.create({ // 创建axios实例           
        timeout: 20000, // 请求超时时间
        baseURL: 'http://127.0.0.1:8888/manage'  
        // baseURL: 'http://127.0.0.1'                                 
})

service.interceptors.request.use(config => { //请求拦截器   
        // console.log(config) 
        return config
      }, error => {
        Promise.reject(error)
      })

service.interceptors.response.use(  //响应拦截器                
        response => {
          console.log(response)
          return response
        },
        error => {
          messageTip('error','获取数据失败,请稍后重试！')
          return Promise.reject(error.response)
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

