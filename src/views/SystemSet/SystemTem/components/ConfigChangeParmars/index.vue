<template>
  <div class="configChangeParmars">
       <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>配置充电信息</span>
            </div>
            <el-table
                :data="tableData"
                style="width: 100%"
                border
                :span-method="arraySpanMethod"
            >
                <el-table-column 
                    prop="title"
                    label="标题"
                    width="120"
                >
                    
                </el-table-column>

                <el-table-column 
                    prop="time"
                    label="时间"
                    min-width="150"
                >
                    <template slot-scope="{row}">
                        <div v-show="!isEdit">{{ row.time | fmtTime }}</div>
                        <div v-show="isEdit">
                            <el-row>
                                <el-col :span="12">
                                    <el-input size="mini" v-model="configChangeParmarsFrom[row.prop][0]" style="width: 50%"></el-input>小时
                                </el-col>
                                <el-col :span="12">
                                    <el-input size="mini" v-model="configChangeParmarsFrom[row.prop][1]" style="width: 50%"></el-input>分钟
                                </el-col>
                            </el-row>
                            
                        </div>
                    </template>
                </el-table-column>

                <el-table-column 
                    label="操作"
                    min-width="90"
                >
                    <template slot-scope="{row}">
                        <div v-show="!isEdit" class="btn_content">
                            <el-button type="primary" size="mini" @click="handleEdit">编辑</el-button>
                        </div>
                        <div v-show="isEdit" class="btn_content">
                            <el-button type="success" size="mini" @click="handleSave">保存</el-button>
                            <el-button type="warning" size="mini" @click="handleCancel">取消</el-button>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
  </div>
</template>

<script>
import { changeChargeInfo } from '@/require/systemSet'
import { messageTip } from '@/utils/ele'
export default {
    props: {
        sysTime: {
            type: Object,
            default: { },
            required: true
        }
    },
    data(){
        return {
            configChangeParmarsFrom: {
                handOffline: [0,0],
                sysOffline: [0,0]
            },
            isEdit:false
        }
    },
    computed: {
        tableData(){
            let { handOffline=0,sysOffline=0 }= this.sysTime
            return [
                {
                   title: '手动断电时间' ,
                   prop: 'handOffline',
                   time: handOffline
                },
                {
                   title: '系统时间' ,
                   prop: 'sysOffline',
                   time: sysOffline
                },
            ]
        }
    },
    methods: {
         arraySpanMethod({ row, column, rowIndex, columnIndex }) {
            if(rowIndex === 0){
                if (columnIndex === 2) {
                    return  [2,1]
                }
            }else{
                if (columnIndex === 2) {
                    return [0,0]
                }
            }
           
        },
        handleEdit(){
            let { handOffline=0,sysOffline=0 }= this.sysTime
            this.configChangeParmarsFrom= { 
                handOffline: this.handleFmtTime(handOffline,true),
                sysOffline: this.handleFmtTime(sysOffline,true)
            }
            this.isEdit= true
        },
        handleFmtTime(val,type){
            if (val === void 0) return type ? [0,0] : `0小时 0分钟`
            let time= parseInt(val)
            let hours= Math.floor(time / 60)
            let mins= time % 60
            return  type ?  [hours,mins] : `${hours}小时 ${mins}分钟`
        },
        handleSave(){
            changeChargeInfo(this.handleTime())
            .then(res=>{
                if(res === 1000){
                    messageTip('success','修改成功')
                    this.$emit('handleReLoad',()=>{})
                }else{
                    messageTip('error','修改失败')
                }
            })
            .catch(err=>{
                console.log(err)
            })
            this.handleCancel()
        },
        handleCancel(){
           this.isEdit= false
        },
        handleTime(){ //处理输入的时间
            let { handOffline,sysOffline }= this.configChangeParmarsFrom
            let [handOfflineH=0,handOfflineM=0]= handOffline
            let [sysOfflineH=0,sysOfflineM=0]= sysOffline
            handOfflineH= handOfflineH == '' ? 0 : handOfflineH
            handOfflineM= handOfflineM == '' ? 0 : handOfflineM
            sysOfflineH= sysOfflineH == '' ? 0 : sysOfflineH
            sysOfflineM= sysOfflineM == '' ? 0 : sysOfflineM
            let handOfflineTime= parseInt(handOfflineH)*60+parseInt(handOfflineM)
            let sysOfflineTime= parseInt(sysOfflineH)*60+parseInt(sysOfflineM)
            return {
                handOffline: handOfflineTime,
                sysOffline: sysOfflineTime
            }
        }
    },
    filters: {
        fmtTime(val,type){
            if (val === void 0) return type ? [0,0] : `0小时 0分钟`
            let time= parseInt(val)
            let hours= Math.floor(time / 60)
            let mins= time % 60
            return  type ?  [hours,mins] : `${hours}小时 ${mins}分钟`
        },
       
    }
}
</script>

<style lang="less" scope>
.configChangeParmars {
    .btn_content {
        display: flex;
        justify-content: space-around;
        button {
            margin: 0;
        }
    }
}
    
</style>