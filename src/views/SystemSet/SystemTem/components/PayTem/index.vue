<template>
  <div class="payTem">
      <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>商户缴费系统模板</span>
            </div>
            <el-card>
             <el-row class="payTemRow">
                <el-col :span="12" class="netWork">
                    <div class="title">网络设备模板</div>
                    <el-row class="item" v-for="(item) in netMap" :key="item.key">
                         <el-col :span="10">{{item.key}}{{ 
                             item.key === '00' ? '出厂默认设置' : 
                             item.key === '01' ? '十路智慧款' : 
                             item.key === '02' ? '电轿款': 
                             item.key === '03' ? '脉冲板子' : 
                             item.key === '04' ? '离线充值机' : 
                             item.key === '05' ? '十六路智慧款' : 
                             item.key === '06' ? '二十路智慧款' : 
                             item.key === '07' ? '单路交流桩' : 
                             item.key === '08' ? '十路智慧款V3' : 
                             item.key === '09' ? '十六路智慧款V3' : 
                             item.key === '10' ? '二十路智慧款V3' : 
                             item.key === '11' ? '一拖二' : 
                             '— —'}}</el-col>
                         <el-col :span="14"><el-input-number v-model="item.value" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                </el-col>
                <el-col :span="12" class="blueBooth">
                    <div class="title">蓝牙设备模板</div>
                     <el-row class="item" v-for="(item) in blueMap" :key="item.key">
                     <el-col :span="10">{{item.key}}{{ 
                             item.key === '03' ? '脉冲板子' : 
                             '— —'}}</el-col>
                        <el-col :span="14"><el-input-number v-model="item.value" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                </el-col>
            </el-row>
            <div style="margin-top: 20px; text-align: center;"><el-button type="primary" icon="el-icon-document-checked" size="mini" @click="submitPayTem" >保存模板</el-button></div>
            </el-card>
        </el-card>
  </div>
</template>

<script>
import { updateSystemMerPay } from '@/require/systemSet'
import { messageTip } from '@/utils/ele'
export default {
    props: {
        payTemData: Object
    },
    computed: {
        netMap () {
            const map = this.payTemData["00"]
            const keys = Object.keys(map).map(item => parseInt(item)).sort((a, b) => a-b).map(item => {
                const key = item.toString().padStart(2, 0)
                return {
                    key,
                    value: map[key]
                }
            })
            return keys
        },
        blueMap () {
            const map = this.payTemData["01"]
            const keys = Object.keys(map).map(item => parseInt(item)).sort((a, b) => a-b).map(item => {
                const key = item.toString().padStart(2, 0)
                return {
                    key,
                    value: map[key]
                }
            })
            return keys
        }
    },
    methods: {
         submitPayTem(){ //提交修改商户的缴费模板
            // let {"00":netMap,"01":blueMap}= this.payTemData
            updateSystemMerPay({
               netMap: {
                   "00": this.fmtData(this.netMap)
               },
               blueMap: {
                    "01":  this.fmtData(this.blueMap)
               }
            }).then(res=>{
                this.payTemVisible= false
                if(res.code == 200){
                    messageTip('success','修改成功')
                }else{
                    messageTip('error','修改失败')
                     this.$emit('handleReLoad')
                }
            }).catch(err=>{
                this.payTemVisible= false
            })
        },
        fmtData (list) {
            return list.reduce((acc, item) => {
                acc[item.key] = item.value
                return acc
            }, {})
        }
    }
}
</script>

<style>

</style>