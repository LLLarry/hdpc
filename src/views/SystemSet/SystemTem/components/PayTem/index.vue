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
                     <el-row class="item">
                         <el-col :span="10">00出厂默认设置</el-col>
                         <el-col :span="14"><el-input-number v-model="payTemData['00']['00']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">01十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['01']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">02电轿款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['02']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">03脉冲板子</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['03']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">04离线充值机</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['04']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>

                     <el-row class="item">
                         <el-col :span="10">05十六路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['05']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                      <el-row class="item">
                         <el-col :span="10">06二十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['06']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                </el-col>
                <el-col :span="12" class="blueBooth">
                    <div class="title">蓝牙设备模板</div>
                    <!-- <el-row class="item">
                         <el-col :span="10">00出厂默认设置</el-col>
                         <el-col :span="14"><el-input-number v-model="payTemData['01']['00']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">01十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['01']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">02电轿款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['02']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row> -->
                     <el-row class="item">
                         <el-col :span="10">03脉冲板子</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['03']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <!-- <el-row class="item">
                         <el-col :span="10">04离线充值机</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['04']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">05十六路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['05']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">06二十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['06']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row> -->
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
    methods: {
         submitPayTem(){ //提交修改商户的缴费模板
            let {"00":netMap,"01":blueMap}= this.payTemData
            updateSystemMerPay({
               netMap: {
                   "00": this.payTemData["00"]
               },
               blueMap: {
                    "01": this.payTemData["01"]
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
    }
}
</script>

<style>

</style>