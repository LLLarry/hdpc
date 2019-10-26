<template>
    <div class="monthlyRecord">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="monthlyRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="monthlyRecordForm.orderNum" placeholder="请输入订单号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="monthlyRecordForm.userName" placeholder="请输入用户昵称"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="monthlyRecordForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="monthlyRecordForm.endTime"
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
                prop="money"
                label="金额"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="form"
                label="来源"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="everyDayTimes"
                label="每日次数"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="changeTimes"
                label="变动次数"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="surTimes"
                label="剩余次数"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="handleTime"
                label="记录时间"
                min-width="150"
                >
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage"/>
    </div>
</template>

<script>
import {Card,Table,Input,TableColumn,Form, FormItem, DatePicker,TimeSelect,TimePicker, Link,Dialog} from 'element-ui'
import Vue from 'vue'
import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import {alertPassword} from '@/utils/ele'
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Link)
Vue.use(Dialog)
export default {
    data(){
        return {
            monthlyRecordForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
                {
                  index: 1,
                  orderNum: '20191026091752648002291',
                  userName: '',
                  money: 0.6,
                  form: 2,
                  status: 1,
                  everyDayTimes: 1,
                  changeTimes: 1,
                  surTimes: 43,
                  handleTime: '2019-10-26 10:34:55'
                },
                {
                  index: 1,
                  orderNum: '20191026091752648002291',
                  userName: '',
                  money: 0.6,
                  form: 2,
                  status: 1,
                  everyDayTimes: 1,
                  changeTimes: 1,
                  surTimes: 43,
                  handleTime: '2019-10-26 10:34:55'
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