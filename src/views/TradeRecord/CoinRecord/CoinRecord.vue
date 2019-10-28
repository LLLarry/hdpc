<template>
    <div class="coinRecord">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="coinRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="coinRecordForm.orderNum" placeholder="请输入订单号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="coinRecordForm.userName" placeholder="请输入用户昵称"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25">
                    <el-input v-model="coinRecordForm.merName" placeholder="请输入商户名"  size="small"></el-input>
                </el-form-item>
               <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="coinRecordForm.deviceNum" placeholder="请输入设备号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="订单状态" class="form_right25">
                     <el-select v-model="coinRecordForm.handleType"  placeholder="请选择订单状态"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="正常" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item label="消费类型" class="form_right25">
                     <el-select v-model="coinRecordForm.conType"  placeholder="请选择消费类型"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="微信" value="1" ></el-option>
                        <el-option label="支付宝" value="2" ></el-option>
                        <el-option label="投币器" value="3" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否为预订单" class="form_right25">
                     <el-select v-model="coinRecordForm.replyType"  placeholder="请选择"  size="small">
                        <el-option label="否" value="1" ></el-option>
                        <el-option label="是" value="2" ></el-option>
                </el-select>
                </el-form-item>
                
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="coinRecordForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="coinRecordForm.endTime"
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
                min-width="50"
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
                label="姓名"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="merName"
                label="商户名"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="deviceNum"
                label="设备号"
                width="80"
                >
                    <template slot-scope="scope">
                        <el-link type="primary">{{scope.row.deviceNum}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                prop="money"
                label="消费额"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="coinNum"
                label="投币数"
               
                >
                </el-table-column>
                <el-table-column
                prop="orderStatus"
                label="订单状态"
               
                >
                </el-table-column>
                <el-table-column
                prop="payType"
                label="支付方式"
                min-width="100"
                >
                </el-table-column>

                <el-table-column
                prop="recType"
                label="回复状态"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="handleTime"
                label="记录时间"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="refTime"
                label="退款时间"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="80"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" plain disabled v-if="scope.row.handle == 1">退款</el-button>
                    <el-button type="danger" size="mini" v-else @click="handleRefBtn">退款</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage"/>
    </div>
</template>

<script>
// import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link,Dialog} from 'element-ui'
// import Vue from 'vue'
import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import {alertPassword} from '@/utils/ele'
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
// Vue.use(Dialog)
export default {
    data(){
        return {
            coinRecordForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
                {
                  index: 1,
                  orderNum: '20191026091752648002291',
                  userName: '',
                  merName: '小区智能充电桩15319778450',
                  deviceNum: '002291',
                  cardNum: 'cc61a021',
                  money: 50.7,
                  coinNum:5,
                  orderStatus:1,
                  payType: 1,
                  recType: 2,
                  handleTime: '2019-10-26 09:17:52',
                  refTime: '',
                  handle: 2
                },
                {
                  index: 1,
                  orderNum: '20191026091752648002291',
                  userName: '',
                  merName: '小区智能充电桩15319778450',
                  deviceNum: '002291',
                  cardNum: 'cc61a021',
                  money: 50.7,
                  coinNum:5,
                  orderStatus:1,
                  payType: 1,
                  recType: 2,
                  handleTime: '2019-10-26 09:17:52',
                  refTime: '',
                  handle: 1
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
        handleRefBtn(){
            alertPassword(function(){
                console.log(1)
            })
        }
    }
}
</script>

<style lang="less">

</style>