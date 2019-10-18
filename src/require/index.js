import ajax from './ajax'
const base_url= 'http://127.0.0.1:8888/manage'
// const base_url= 'http://127.0.0.1/webenter/enterindex'
export const handleLogin= function (data){ //处理login
    return ajax({
             url: base_url+'/login',
             data: data
         })
}

// export const handleLogin= function (data){ //处理login
//     return ajax({
//              url: base_url+'',
//              data: data
//          })
// }