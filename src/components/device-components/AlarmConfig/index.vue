<template>
  <div class="alarmConfig">
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>报警系统</span>
            </div>
            <div>
                <el-row>
                    <el-col :lg="12">
                        <el-table 
                            :data="alarmSetData"
                            border
                        >
                            <el-table-column 
                                label="类型"
                                prop="name"
                                min-width="100"
                            ></el-table-column>
                            <el-table-column 
                                label="数值"
                                prop="value"
                                min-width="220"
                            >
                                <template slot-scope="{row}">
                                    <div v-if="row.name==='温度报警阈值'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <span>{{row.value}}℃</span>
                                            <div>
                                                <el-button type="primary" size="mini" @click="handleSet(row)">设置报警阈值</el-button>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-refresh'" @click="getDeviceAlarmCallBack(row)" >获取报警阈值</el-button>
                                            </div>
                                        </div>
                                        <div v-show="row.edit"  class="edit_item">
                                            <el-input size="mini" class="edit_input" v-model="alarmConfigFrom[row.type]"></el-input>℃
                                            <div>
                                                <el-button type="success" :icon="row.editloading ? 'el-icon-loading' : 'el-icon-folder-checked'" size="mini" @click="handleSave(row)">保存</el-button>
                                                <el-button type="warning" size="mini" @click="handleClose(row)">取消</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='烟感报警阈值'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <span>{{row.value}}</span>
                                            <div>
                                                <el-button type="primary" size="mini" @click="handleSet(row)">设置报警阈值</el-button>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-refresh'" @click="getDeviceAlarmCallBack(row)" >获取报警阈值</el-button>
                                            </div>
                                        </div>
                                        <div v-show="row.edit"  class="edit_item">
                                            <el-input size="mini" class="edit_input" v-model="alarmConfigFrom[row.type]"></el-input>℃
                                            <div>
                                                <el-button type="success" :icon="row.editloading ? 'el-icon-loading' : 'el-icon-folder-checked'" size="mini" @click="handleSave(row)">保存</el-button>
                                                <el-button type="warning" size="mini" @click="handleClose(row)">取消</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='设备总功率报警阈值'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <span>{{row.value}}W</span>
                                            <div>
                                                <el-button type="primary" size="mini" @click="handleSet(row)">设置报警阈值</el-button>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-refresh'" @click="getDeviceAlarmCallBack(row)" >获取报警阈值</el-button>
                                            </div>
                                        </div>
                                        <div v-show="row.edit"  class="edit_item">
                                            <el-input size="mini" class="edit_input" v-model="alarmConfigFrom[row.type]"></el-input>W
                                            <div>
                                                <el-button type="success" :icon="row.editloading ? 'el-icon-loading' : 'el-icon-folder-checked'" size="mini" @click="handleSave(row)">保存</el-button>
                                                <el-button type="warning" size="mini" @click="handleClose(row)">取消</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col class="hidden-lg-and-up" style="height:25px;"></el-col>
                    <el-col :lg="12">
                        <el-table 
                            :data="alarmNowData"
                            border
                        >
                            <el-table-column 
                                label="类型"
                                prop="name"
                                min-width="100"
                            ></el-table-column>
                            <el-table-column 
                                label="数值"
                                prop="value"
                                min-width="220"
                            >
                                <template slot-scope="{row}">
                                    <div v-if="row.name==='当前温度'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <el-link :underline="false" :type="warnGrad(row)">{{row.value}}℃</el-link>
                                            <div>
                                                
                                            <router-link :to="'/deviceManage/deviceList/temperhistory?code='+code+'&merid='+merid+'&type=1'">
                                                    <el-link type="primary" size="mini" style="margin-right: 10px;">历史温度</el-link>
                                                </router-link>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-refresh'" @click="getNowDeviceAlarmFn(row)">获取</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='当前烟感'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <el-link :underline="false" :type="warnGrad(row)">{{row.value}}</el-link>
                                            <div>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-refresh'"  @click="getNowDeviceAlarmFn(row)">获取</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='当前总功率'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <el-link :underline="false" :type="warnGrad(row)">{{row.value}}W</el-link>
                                            <div>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-refresh'"  @click="getNowDeviceAlarmFn(row)">获取</el-button>
                                            </div>
                                        </div>
                                    </div>
                                    <div v-else-if="row.name==='远程抄表'">
                                        <div v-show="!row.edit" class="edit_item">
                                            <span>{{row.value}}度</span>
                                            <div>
                                                <router-link :to="'/deviceManage/deviceList/temperhistory?code='+code+'&merid='+merid+'&type=4'">
                                                    <el-link type="primary" size="mini" style="margin-right: 10px;">历史电量</el-link>
                                                </router-link>
                                                <el-button type="success" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-refresh'"  @click="getNowDeviceAlarmFn(row)">获取</el-button>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-col>
                </el-row>
            </div>
        </el-card>
  </div>
</template>

<script>
import { setDeviceAlarm,getNowDeviceAlarm,getDeviceSetAlarm } from '@/require/deviceManage'
import Utils from '@/utils/util'
import { messageTip } from '@/utils/ele'
let loading //loading实例
export default {
    props: {
        code: String,
        merid: [Number,String],
        alarmdata: {
            type: Object,
            default: ()=>( {resultDoorsill: null, resultData:null} )
        }
    },
    mounted(){
        console.log(Utils.Hd_Loading)
        loading= new Utils.Hd_Loading()
    },
    beforeDestroy(){ //关闭前销毁
        loading && loading.hide()
    },
    deactivated(){ //关闭前销毁 （keep-alive销毁回调）
        loading && loading.hide()
    },
    computed: {
        alarmSetData(){
            let resultDoorsill= this.alarmdata.resultDoorsill
            let list= [
                {type: 'temperature', name:'温度报警阈值', value: 0},
                {type: 'smoke', name:'烟感报警阈值', value: 0},
                {type: 'power', name:'设备总功率报警阈值', value: 0},
            ]
            if(resultDoorsill){
                for(let key in resultDoorsill){
                    switch(key){
                        case 'hotDoorsill': /**设置温度阈值 */
                            list[0].value= resultDoorsill[key];
                            break;
                        case 'smokeDoorsill': /**设置烟感阈值*/
                            list[1].value= resultDoorsill[key];
                            break;
                        case 'powerTotal': /**设置总功率阈值 */
                            list[2].value= resultDoorsill[key];
                            break;
                    }
                }
            }
            return list
        },
        alarmNowData(){ 
            let resultData= this.alarmdata.resultData
            let list= [
                {type: 'nowTemperature', name:'当前温度', value: 601},
                {type: 'nowSmoke', name:'当前烟感', value: 0},
                {type: 'nowPower', name:'当前总功率', value: 0},
                {type: 'read', name:'远程抄表', value: 0},
            ]
            if(resultData){
                for(let key in resultData){
                    switch(key){
                        case 'hotDoorsillData': /**实时或上一次温度 */
                            list[0].value= resultData[key];
                            break;
                        case 'smokeDoorsillData': /**实时或上一次烟感 */
                            list[1].value= resultData[key];
                            break;
                        case 'powerTotalData': /**实时或上一次总功率 */
                            list[2].value= resultData[key];
                            break;
                        case 'electricData': /**实时或上一次抄表电量 */
                            list[3].value= resultData[key];
                            break;
                    }
                }
            }
            return list
        }
    },
    data(){
        return {
            warnGrad(row){
                let type= row.type
                let newType= type.split(/now/g)[1].toLowerCase()
                let index= this.alarmSetData.findIndex((item)=>item.type === newType)
                let setVal= this.alarmSetData[index].value
                let a= row.value - setVal
                if(setVal != '' && setVal != 0 && setVal != null){
                    let threshold= 0
                    switch(type){
                        case 'nowTemperature' :
                            threshold= 10
                            break
                        case  'nowSmoke' :
                            threshold= 20
                            break
                        case  'nowPower' :
                            threshold= 500
                            break
                    }

                    if(a >= (0-threshold) && a < 0){
                        return 'warning'
                    }else if(a >= 0){
                        return 'danger'
                    }else{
                        return 'default' 
                    }
                }else{
                    return 'default'
                } 
            },
            // alarmData: [ //阈值
            //     {type: 'temperature', name:'温度报警阈值', value: 62},
            //     {type: 'smoke', name:'烟感报警阈值', value: 56},
            //     {type: 'power', name:'设备总功率报警阈值', value: '8000'},
            // ],
            // alarmData1: [ //实时
            //     {type: 'nowTemperature', name:'当前温度', value: 61},
            //     {type: 'nowSmoke', name:'当前烟感', value: 90},
            //     {type: 'nowPower', name:'当前总功率', value: 2},
            //     {type: 'read', name:'远程抄表', value: '123'},
            // ],
            alarmConfigFrom: {}
        }
    },
    methods:{
        handleSet(row){  //设置
           let newRow= {...row}
           this.alarmConfigFrom= {...this.alarmConfigFrom,[row.type]: row.value}
           this.$set(row,'edit',true) 
        },
        handleClose(row){ //取消
            this.$set(row,'edit',false) 
        },
        async handleSave(row){ //设备报警阈值
            try{
                this.$set(row,'editloading',true)
                const keyCode= {
                    temperature: 1,
                    smoke: 2,
                    power: 3
                }
                let newtype= keyCode[row.type]
                let value= this.alarmConfigFrom[row.type]
                let info = await setDeviceAlarm({
                    type: newtype,
                    value,
                    code: this.code,
                    merid: this.merid
                })
                if(info.returncode == 200){
                    messageTip('success',"设置报警阈值成功")
                    this.$set(this.alarmSetData[newtype-1],'value',value)
                }else{
                    messageTip('error',"设置报警阈值失败")
                }
            }catch(e){
                messageTip('error',"设置报警阈值异常")
            }finally{
                this.$set(row,'editloading',false)
            }
        },
        async getDeviceAlarmCallBack(row){ //获取设置的参数
            try{
                this.$set(row,'loading',true)
                const keyCode= {
                    temperature: 1,
                    smoke: 2,
                    power: 3
                }
                let newtype= keyCode[row.type]
                let info = await getDeviceSetAlarm({
                    type: newtype,
                    code: this.code,
                    merid: this.merid
                })
                if(info.returncode == 200){
                    messageTip('success',"获取报警阈值数据成功")
                    this.$set(this.alarmSetData[newtype-1],'value',info.value)
                }else{
                    messageTip('error',"获取报警阈值数据失败")
                }
            }catch(e){
                messageTip('error',"获取异常")
            }finally{
                this.$set(row,'loading',false)
            }
        },
        async getNowDeviceAlarmFn(row){ //获取实时数据
            try{
                this.$set(row,'loading',true)
                const keyCode= {
                    nowTemperature: 1,
                    nowSmoke: 2,
                    nowPower: 3,
                    read: 4
                }
                let newtype= keyCode[row.type]
                let info= await getNowDeviceAlarm({
                    type: newtype,
                    code: this.code,
                    merid: this.merid
                })
                if(info.returncode == 200){
                    messageTip('success',"获取实时数据成功")
                    this.$set(this.alarmNowData[newtype-1],'value',info.value)
                }else{
                    messageTip('error',"获取实时数据失败")
                }
            }catch(e){
                messageTip('error',"异常错误")
            }finally {
                this.$set(row,'loading',false)
            }
        }
    }
}
</script>

<style lang="less">
    .alarmConfig {
        .edit_item {
            display: flex;
            justify-content: space-between;
            .edit_input {
                width: 35%;
                min-width: 65px;
            }
        }
    } 
</style>