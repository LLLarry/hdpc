<template>
  <div class="chargeRecord">
    <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="chargeRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="chargeRecordForm.orderNum" placeholder="请输入订单号"  size="small"></el-input>
                </el-form-item>

                <el-form-item label="用户姓名" class="form_right25">
                    <el-input v-model="chargeRecordForm.userName" placeholder="请输入用户姓名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户姓名" class="form_right25">
                    <el-input v-model="chargeRecordForm.merName" placeholder="请输入商户姓名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="chargeRecordForm.deviceNum" placeholder="请输入设备号"  size="small"></el-input>
                </el-form-item>

                <el-form-item label="订单状态" class="form_right25">
                     <el-select v-model="chargeRecordForm.status"  placeholder="请选择订单状态"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="正常" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="消费类型" class="form_right25">
                     <el-select v-model="chargeRecordForm.consumeType"  placeholder="请选择消费类型"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="钱包" value="1" ></el-option>
                        <el-option label="微信" value="2" ></el-option>
                        <el-option label="支付宝" value="3" ></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="chargeRecordForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                         :picker-options="pickerOptions"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="chargeRecordForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="选择结束时间"
                         :picker-options="pickerOptions"
                        >
                      </el-date-picker>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" size="small">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>

         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="42"
                >
                </el-table-column>
                <el-table-column
                prop="orderNum"
                label="订单号"
                min-width="220"
                >
                    <template slot-scope="scope">
                        <el-link type="primary">{{scope.row.orderNum}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                prop="userName"
                label="用户名"
                min-width="80"
                >
                </el-table-column>
                 <el-table-column
                prop="merName"
                label="商户名"
                min-width="80"
                >
                </el-table-column>
                 <el-table-column
                prop="deviceNum"
                label="设备号"
                min-width="80"
                >
                <template slot-scope="scope">
                    <router-link to="">
                         <el-link type="primary">{{scope.row.deviceNum}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                 <el-table-column
                prop="devicePort"
                label="端口号"
                min-width="60"
                >
                </el-table-column>
                 <el-table-column
                prop="money"
                label="消费额"
                min-width="60"
                >
                <!-- <template slot-scope="scope">
                    <el-link type="danger" :underline="false" v-if="scope.row.money<0">{{scope.row.money}}</el-link>
                    <el-link type="success" :underline="false"  v-else>{{scope.row.money}}</el-link>
                </template> -->
                </el-table-column>
                 <el-table-column
                <el-table-column
                prop="status"
                label="订单状态"
                min-width="80"
                >
                 <template slot-scope="scope">
                    <el-link type="danger" :underline="false" v-if="scope.row.status==1">全额退款</el-link>
                    <el-link type="warning" :underline="false" v-else-if="scope.row.status==2">部分退款</el-link>
                    <el-link type="success" :underline="false" v-else>正常</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="payType"
                label="支付方式"
                min-width="65"
                >
                </el-table-column>
                <el-table-column
                prop="chargeInfo"
                label="充电信息"
                min-width="80"
                >
                <template slot-scope="scope">
                    <div>{{scope.row.chargeInfo.quantity}}度</div>
                    <div>{{scope.row.chargeInfo.time}}分钟</div>
                </template>
                </el-table-column>
                 <el-table-column
                prop="isConCharge"
                label="是否续充"
                min-width="65"
                >
                <template slot-scope="scope">
                    <router-link v-if="scope.row.isConCharge === 1" to="/tradeRecord/chargeRecord">
                         <el-link type="primary" >是</el-link>
                    </router-link>
                    <span v-else>否</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="startDate"
                label="开始时间"
                min-width="100"
                >
                <template slot-scope="scope">
                    <div v-html="scope.row.startDate"></div>
                </template>
                </el-table-column>
                <el-table-column
                prop="endDate"
                label="结束时间"
                min-width="100"
                >
                <template slot-scope="scope">
                    <div v-html="scope.row.endDate"></div>
                </template>
                </el-table-column>
                <el-table-column
                prop="refDate"
                label="退款时间"
                min-width="100"
                >
                <template slot-scope="scope">
                    <div v-html="scope.row.refDate"></div>
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="148"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini">详情</el-button>
                    <el-button type="danger" size="mini" v-if="scope.row.status === 0" @click="handleRef(scope)">退款</el-button>
                   <el-button type="danger" size="mini" v-else plain disabled>退款</el-button>
                </template>
                </el-table-column>  
            </el-table>
         </el-card>
          <MyPagination :totalPage="totalPage" @getPage="getPage"/>
  </div>
</template>

<script>
// import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link} from 'element-ui'
// import Vue from 'vue'
import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
// Vue.use(Card)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(OptionGroup)
// Vue.use(DatePicker)
// Vue.use(TimeSelect)
// Vue.use(TimePicker)
// Vue.use(Link)
export default {
    data(){
        return{
            pickerOptions: dateTimeJS, //配置日期快捷项
            chargeRecordForm:{

            },
            tableData: [
                  {
                    index: 1,
                    orderNum: '201910231129409050000018',
                    userName: 'Roar Wolf',
                    merName: '永夜',
                    deviceNum: '000001',
                    devicePort: '10',
                    money: 5.3,
                    status: 0,
                    payType: 1,
                    chargeInfo: {
                         quantity: 0.01,
                         time: 236
                    },
                    isConCharge: 0,
                    startDate: '2019-10-23<br/>11:29:47',
                    endDate: '2019-10-23<br/>11:36:38',
                    refDate: '',

                },
                {
                    index: 2,
                    orderNum: '201910231129409050000018',
                    userName: 'Roar Wolf',
                    merName: '永夜',
                    deviceNum: '000001',
                    devicePort: '10',
                    money: 5.3,
                    status: 1,
                    payType: 1,
                    chargeInfo: {
                         quantity: 0.01,
                         time: 236
                    },
                    isConCharge: 1,
                    startDate: '2019-10-23<br/>11:29:47',
                    endDate: '2019-10-23<br/>11:36:38',
                    refDate: '2019-10-23<br/>11:36:38'
                },
                {
                    index: 3,
                    orderNum: '201910231129409050000018',
                    userName: 'Roar Wolf',
                    merName: '永夜',
                    deviceNum: '000001',
                    devicePort: '10',
                    money: 5.3,
                    status: 2,
                    payType: 1,
                    chargeInfo: {
                         quantity: 0.01,
                         time: 236
                    },
                    isConCharge: 1,
                    startDate: '2019-10-23<br/>11:29:47',
                    endDate: '2019-10-23<br/>11:36:38',
                    refDate: '2019-10-23<br/>11:36:38'
                },
            ],
            totalPage: 12,
            
        }
    },
    components: {
        MyPagination
    },
    methods: {
        getPage(){

        },
        handleRef(scope){ //处理退费
             this.$prompt('请输入密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '请输入密码',
                lockScroll: true,
                inputType: 'password'
            }).then(({ value }) => {
            this.$message({
                type: 'success',
                message: '你的密码是: ' + value
            });
            this.handleRefDetail(scope)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        handleRefDetail(scope){
            // 发送ajax请求，请求成功之后，修改tableData的值
            let { tableData }= this //ES6 解构
            tableData= tableData.map((item,i)=>{
                if(scope.row.index === item.index){
                    item.status= 1
                    // 这里将退费时间也加上去
                }
                return item
            })
            this.tableData= tableData
        }
    }
}
</script>

<style lang="less">
    .chargeRecord table{
        
    }
</style>