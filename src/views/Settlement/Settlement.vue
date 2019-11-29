<template>
  <div class="settlement">
    <el-card style="width: 500px; margin: 0 auto;">
        <div slot="header" class="clearfix"  style="text-align: center;">
            <span>结算收益</span>
        </div>
        <el-tabs type="border-card" >
            <el-tab-pane label="结算个人">
                <el-form  :model="settlementForm1" label-width="120px" ref="personSettlement" :rules="rules">
                    <el-form-item label="手机号" prop="phone">
                        <el-input v-model="settlementForm1.phone"  style="width: 200px;" clearable></el-input>
                    </el-form-item>
                   
                    <el-form-item label="选择日期" prop="time">
                        <el-date-picker
                            style="width: 200px;"
                            v-model="settlementForm1.time"
                            type="date"
                            clearable
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
            
                    <el-form-item label="结算种类">
                        <el-radio-group v-model="settlementForm1.type">
                            <el-radio label="1" >收益</el-radio>
                            <el-radio label="2" >设备</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button @click="resetForm('personSettlement')">重置</el-button> -->
                        <el-button size="small" type="primary" @click="onSubmit('personSettlement')">立即结算</el-button>
                        
                    </el-form-item>
                </el-form>    
            </el-tab-pane>
            <el-tab-pane label="结算全部">
                 <el-form  :model="settlementForm2" label-width="120px" ref="personSettlement2">
                    <el-form-item label="选择日期">
                        <el-date-picker
                            style="width: 200px;"
                            v-model="settlementForm2.time"
                            type="date"
                            clearable
                            value-format="yyyy-MM-dd"
                            placeholder="选择日期">
                        </el-date-picker>
                    </el-form-item>
            
                    <el-form-item label="结算种类">
                        <el-radio-group v-model="settlementForm2.type">
                            <el-radio label="1" >收益</el-radio>
                            <el-radio label="2" >设备</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <!-- <el-button @click="resetForm('personSettlement2')">重置</el-button> -->
                        <el-button size="small" type="primary" @click="onSubmit('personSettlement2')">立即结算</el-button>
                    </el-form-item>
                </el-form>    

            </el-tab-pane>
        </el-tabs>
    </el-card>
   
  </div>
</template>

<script>
import { settlementTotalEarn,settlementAllEarn } from '@/require/settlement'
import {messageTip} from '@/utils/ele'
export default {
    data(){
        return {
            settlementForm1: {
                type: "1"
            },
            settlementForm2: {
                type: "1"
            },
            rules: {
                phone: [
                    { required: true, message: '请输入手机号', trigger: 'blur' },
                ],
                time: [
                    { required: true, message: '请输入时间', trigger: 'blur' },
                ]
            }
        }
    },
    methods: {
         onSubmit(name){
                let data= {}
                let requireFn= null
                if(name == 'personSettlement'){
                    let {phone,time,type}= this.settlementForm1
                    data={phone,time,type}
                    requireFn= settlementAllEarn
                }else{
                     let {time,type}= this.settlementForm2
                     data={time,type}
                     requireFn=  settlementTotalEarn
                }
                this.$refs[name].validate(async(valid) => {
                if (valid) {
                    try{
                        let info= await requireFn(data)
                        if(info.code == 200){
                            messageTip('success','结算成功')
                        }else{
                            messageTip('error','结算失败')
                        }
                    }catch(error){
                        messageTip('warning','请输入表单内容')
                    }
                } else {
                    console.log('error submit!!');
                    return false;
                }
                });
        
            
        },
        resetForm(name){
            this.$refs[name].resetFields();
            this.$refs.personSettlement.resetFields()
            console.log(this.$refs.personSettlement.resetFields)
        }
    }
}
</script>

<style>

</style>