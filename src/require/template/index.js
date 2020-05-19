//设置模板请求
import ajax from '../ajax'

/**
 * 添加子模板
 */
export const addTemplateChild= function (data){  
    return ajax({
             url: '/deviceData/insertSecondTemplateData',
             data: data
         })
}

/**
 * 删除子模板
 */
export const deleteTemplateChild= function (data){  
    return ajax({
             url: '/deviceData/deleteSecondTemplateData',
             data: data
         })
}

/**
 * 编辑子模板
 */
export const editTemplateChild= function (data){  
    return ajax({
             url: '/deviceData/updateSecondTemplateData',
             data: data
         })
}

/**
 * 修改主模板信息
 */
export const updateTemplate= function (data){  
    return ajax({
             url: '/deviceData/updateFirstTemplateData',
             data: data
         })
}

/**
 * 获取设备详情主模板信息
 */
export const getDeviceDetailTemInfo= function (data){  
    return ajax({
             url: '/deviceData/inquireDeviceTemplateData',
             data: data
         })
}

/**
 * 设置选中模板
 */
export const setSelectTem= function (data){  //?
    return ajax({
             url: '/wctemplate/templatechoice',
             data: data
         })
}

/**
 * 删除主模板
 */
export const deleteTem= function (data){  //?
    return ajax({
             url: '/deviceData/deleteTemplateData',
             data: data
         })
}

/**
 * 添加主模板
 */
export const addTemplate= function (data){  
    return ajax({
             url: '/deviceData/insertFirstTemplateData',
             data: data
         })
}

/**
 * 添加模板的收费说明
 */
export const getChargeInfo= function (data){  
    return ajax({
             url: '/merchant/editTempForInfo',
             data: data,
             method: 'post'
         })
}

/**
 * 修改V3充电模板
 */
export const changeV3ChargeTem= function (data){  
    return ajax({
             url: '/deviceData/insertOrModifyTemp',
             data: data,
             method: 'post'
         })
}

/**
 * V3设备选中默认模板
 */
export const selectV3ChargeTem= function (data){  
    return ajax({
             url: '/deviceData/pitchOnTemplate',
             data: data
         })
}

/*
* 删除钱包主模板
*/
export const deletestairwallet= function (data){ 
    return ajax({
             url: '/wctemplate/deletestairwallet',
             data: data
        })
}


/*
* 小区选中钱包模板/在线卡模板
*/
export const areaTempChoose= function (data){ 
    return ajax({
             url: '/areaData/areaTempChoose',
             data: data
        })
}







