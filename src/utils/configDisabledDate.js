/**
 * @time 时间为禁用时间戳
 */
export default (a)=>{
    return  {
        disabledDate(time) {
            return time.getTime() < Date.now()-a;
        }
    }
}