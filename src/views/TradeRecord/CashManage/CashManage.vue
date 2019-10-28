<template>
    <div class="cashManage">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="cashManageForm" size="mini">
                <el-form-item label="单号" class="form_right25 w220">
                    <el-input v-model="cashManageForm.orderNum" placeholder="请输入单号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="申请人" class="form_right25">
                    <el-input v-model="cashManageForm.name" placeholder="请输入姓名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25">
                    <el-input v-model="cashManageForm.phone" placeholder="请输入手机号"  size="small"></el-input>
                </el-form-item>
               <el-form-item label="银行卡号 " class="form_right25 w220">
                    <el-input v-model="cashManageForm.bankNum" placeholder="请输入银行卡号"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="银行名称 " class="form_right25 w220">
                    <el-input v-model="cashManageForm.bankName" placeholder="请输入银行名称"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="类型" class="form_right25">
                     <el-select v-model="cashManageForm.type"  placeholder="请选择类型"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="个人银行卡" value="1" ></el-option>
                        <el-option label="对公账户" value="2" ></el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item label="状态" class="form_right25">
                     <el-select v-model="cashManageForm.conType"  placeholder="请选择状态"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="提现待处理" value="1" ></el-option>
                        <el-option label="提现已到账" value="2" ></el-option>
                        <el-option label="提现被拒绝" value="3" ></el-option>
                        <el-option label="提现到零钱" value="4" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="cashManageForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="cashManageForm.endTime"
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
                label="提现单号"
                min-width="230"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="申请人"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="bankInfo"
                label="账户与开户行"
                min-width="150"
                >
                    <template slot-scope="scope">
                        <div>银行名称:{{scope.row.bankInfo.bankName}}</div>
                        <div>银行账号:{{scope.row.bankInfo.bankNum}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="type"
                label="类型"
                width="70"
                >
                    <template slot-scope="scope">   
                        <span v-if="scope.row.type==1">个人</span>
                        <span v-else>对公</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="nowMoney"
                label="现有金额"
               
                >
                </el-table-column>
                <el-table-column
                prop="cashMoney"
                label="提现金额"
               
                >
                </el-table-column>
                <el-table-column
                prop="amoMoney"
                label="到账金额"
                min-width="80"
                >
                <template slot-scope="scope">
                    <el-link type="success" :underline="false">{{scope.row.amoMoney}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="fee"
                label="手续费"
                min-width="60"
                >
                </el-table-column>
                <el-table-column
                prop="handleTime"
                label="申请时间"
                min-width="135"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="当前状态"
                min-width="80"
                >
                <template slot-scope="scope">
                     <el-link type="success" :underline="false" v-if="scope.row.status === 1">提现已到账</el-link>
                    <el-link type="info" :underline="false" v-else>提现待处理</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="150"
                fixed="right"
                >
                <template slot-scope="scope">
                    <div v-if="scope.row.handle === 2"> 
                        <el-button type="primary" size="mini" >通过</el-button>
                        <el-button type="danger" size="mini" @click="handleRefBtn">拒绝</el-button>
                    </div>
                     <div v-else> 
                        <el-button type="primary" size="mini" plain disabled>通过</el-button>
                        <el-button type="danger" size="mini" plain disabled>拒绝</el-button>
                    </div>
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
            cashManageForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
                 {
                  index: 1,
                  orderNum: '4252019102600402660620254',
                  name: '刘明远',
                  phone: '17761602930',
                  bankInfo: {
                      bankName: '黑龙江省大庆市。建设银行。',
                      bankNum: '6217001020005863361'
                  },
                  type: 1,
                  nowMoney: 135.0,
                  cashMoney: 135.0,
                  amoMoney: 134.19,
                  fee: 0.81,
                  handleTime: '2019-10-26 12:38:55',
                  status: 1,
                  handle: 1
              },
                {
                  index: 1,
                  orderNum: '4252019102600402660620254',
                  name: '刘明远',
                  phone: '17761602930',
                  bankInfo: {
                      bankName: '黑龙江省大庆市。建设银行。',
                      bankNum: '6217001020005863361'
                  },
                  type: 1,
                  nowMoney: 135.0,
                  cashMoney: 135.0,
                  amoMoney: 134.19,
                  fee: 0.81,
                  handleTime: '2019-10-26 12:38:55',
                  status: 2,
                  handle: 2
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