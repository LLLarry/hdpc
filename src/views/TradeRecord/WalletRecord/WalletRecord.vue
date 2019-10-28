<template>
  <div class="walletRecord">
     <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="walletRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="walletRecordForm.orderNum" placeholder="请输入订单号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="walletRecordForm.userName" placeholder="请输入用户昵称"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" class="form_right25">
                    <el-input v-model="walletRecordForm.userRealName" placeholder="请输入用户姓名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="类型" class="form_right25">
                    <el-select v-model="walletRecordForm.type"  placeholder="请选择状态"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="充值" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="walletRecordForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="walletRecordForm.endTime"
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
                label="昵称"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="userRealName"
                label="姓名"
                min-width="100"
                >
                </el-table-column>
                
                <el-table-column
                prop="money"
                label="金额"
                min-width="100"
                >
                </el-table-column>

                <el-table-column
                prop="balance"
                label="余额"
                min-width="100"
                >
                </el-table-column>

                <el-table-column
                prop="type"
                label="类型"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="cardBag"
                label="卡包"
                min-width="120"
                >
                </el-table-column>
                
                <el-table-column
                prop="handleTime"
                label="操作时间"
                min-width="150"
                >
                </el-table-column>
                <el-table-column
                prop="handle"
                label="退款"
                min-width="80"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" v-if="scope.row.handle ===1" @click="handleRefBtn">退款</el-button>
                    <el-button type="danger" size="mini" v-if="scope.row.handle !=1" plain disabled>退款</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage"/>
  </div>
</template>

<script>
// import {Card,Table,Input,TableColumn,Form,Select,Option,OptionGroup, FormItem, DatePicker,TimeSelect,TimePicker, Link,Dialog} from 'element-ui'
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
            walletRecordForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
                {
                    index: 1,
                    orderNum: '20191028090806445886048',
                    userName: '艾文先森',
                    userRealName: '朱可可',
                    money: 1.0,
                    balance: 9.6,
                    type: 1,
                    cardBag: 2,
                    handleTime: '2019-10-28 09:08:06',
                    handle: 1
                },
                 {
                  index: 2,
                  orderNum: '20191028090806445886048',
                  userName: '艾文先森',
                  userRealName: '朱可可',
                  money: 1.0,
                  balance: 9.6,
                  type: 1,
                  cardBag: 2,
                  handleTime: '2019-10-28 09:08:06',
                  handle: 2
                }
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