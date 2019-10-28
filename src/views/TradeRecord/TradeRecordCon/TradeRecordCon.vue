<template>
    <div class="tradeRecordCon">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="tradeRecordConForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="tradeRecordConForm.orderNum" placeholder="请输入订单号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="tradeRecordConForm.userName" placeholder="请输入用户昵称"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25">
                    <el-input v-model="tradeRecordConForm.merName" placeholder="请输入商户名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25">
                    <el-input v-model="tradeRecordConForm.merPhone" placeholder="请输入商户电话"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="tradeRecordConForm.deviceNum" placeholder="请输入设备号"  size="small"></el-input>
                </el-form-item>
                
                <el-form-item label="订单状态" class="form_right25">
                     <el-select v-model="tradeRecordConForm.status"  placeholder="请选择订单状态"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="正常" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易来源" class="form_right25">
                     <el-select v-model="tradeRecordConForm.from"  placeholder="请选择交易来源"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="充电" value="1" ></el-option>
                        <el-option label="脉冲" value="2" ></el-option>
                        <el-option label="离线充值机" value="3" ></el-option>
                        <el-option label="钱包" value="4" ></el-option>
                        <el-option label="在线卡" value="5" ></el-option>
                        <el-option label="虚拟充值" value="6" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" class="form_right25">
                     <el-select v-model="tradeRecordConForm.payType"  placeholder="请选择支付方式"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="钱包" value="1" ></el-option>
                        <el-option label="微信" value="2" ></el-option>
                        <el-option label="支付宝" value="3" ></el-option>
                        <el-option label="微信小程序" value="4" ></el-option>
                        <el-option label="支付宝小程序" value="5" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="tradeRecordConForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="tradeRecordConForm.endTime"
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
                :data="totalData"
                border
                style="width: 100%"
                :show-header="false"
                :cell-style="{background:'#f5f7fa',color:'#333'}"
                >
                <el-table-column
                prop="earnName"
                label="收益"
                min-width="80"
                >
                </el-table-column>
                 <el-table-column
                prop="earn"
                label="收益"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="earnMoneyName"
                label="收入"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="earnMoney"
                label="收入"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="expendName"
                label="支出"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="expend"
                label="支出"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="walletName"
                label="钱包消费"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="wallet"
                label="钱包消费"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="walletRefName"
                label="钱包退费"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="walletRef"
                label="钱包退费"
                min-width="80"
                >
                </el-table-column>
               </el-table>
            <el-table
                :data="tableData"
                border
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
                min-width="230"
                >
                    <template slot-scope="scope">
                        <router-link to="/tradeRecord/tradeRecordCon/orderDetail">
                            <el-link type="primary">{{scope.row.orderNum}}</el-link>
                        </router-link> 
                    </template>
                </el-table-column>
                <el-table-column
                prop="userName"
                label="用户名"
                min-width="120"
                >
                </el-table-column>
                 <el-table-column
                prop="merName"
                label="商户名"
                min-width="120"
                >
                </el-table-column>
                 <el-table-column
                prop="deviceNum"
                label="设备(卡)号"
                min-width="120"
                >
                </el-table-column>
                 <el-table-column
                prop="deviceType"
                label="设备类型"
                min-width="120"
                >
                </el-table-column>
                 <el-table-column
                prop="money"
                label="交易金额"
                min-width="80"
                >
                <template slot-scope="scope">
                    <el-link type="danger" :underline="false" v-if="scope.row.money<0">{{scope.row.money}}</el-link>
                    <el-link type="success" :underline="false"  v-else>{{scope.row.money}}</el-link>
                </template>
                </el-table-column>
                 <el-table-column
                prop="merMoney"
                label="商户金额"
                min-width="80"
                >
                <template slot-scope="scope">
                    <el-link type="danger" :underline="false" v-if="scope.row.merMoney<0">{{scope.row.merMoney}}</el-link>
                    <el-link type="success" :underline="false" v-else>{{scope.row.merMoney}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="partnerMoney"
                label="合伙人金额"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-button icon="el-icon-view" size="mini" type="danger" plain v-if="scope.row.partnerMoney<0" style="width: 60px;padding: 7px 0;" >{{scope.row.partnerMoney}}</el-button>
                    <el-button icon="el-icon-view" size="mini" type="success" plain v-else :disabled="scope.row.partnerMoney===0" style="width: 60px;padding: 7px 0;" @click="handlePartner">{{scope.row.partnerMoney}}</el-button>
                </template>
                </el-table-column>

                <el-table-column
                prop="status"
                label="订单状态"
                min-width="80"
                >
                 <template slot-scope="scope">
                    <el-link type="danger" :underline="false" v-if="scope.row.status==1">退款</el-link>
                    <el-link type="success" :underline="false" v-else>正常</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="payType"
                label="支付方式"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="form"
                label="来源"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="date"
                label="交易时间"
                min-width="180"
                >
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="120"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini">详情</el-button>
                </template>
                </el-table-column>  
            </el-table>
         </el-card>
         <MyPagination :totalPage="totalPage" @getPage="getPage"/>

         <el-dialog title="合伙人金额明细" :visible.sync="dialogMoneyDetail" width="550px">
             <div class="orderNum">订单号： 201910081015163790000013</div>
            <el-table :data="gridData" border :header-cell-style="{background:'#f5f7fa',color:'#666'}">
                <el-table-column property="parNickName" label="合伙人昵称" min-width="120"></el-table-column>
                <el-table-column property="parName" label="合伙人姓名" min-width="120"></el-table-column>
                <el-table-column property="parPhone" label="合伙人电话" min-width="120"></el-table-column>
                <el-table-column property="parMoney" label="合伙人金额" min-width="120">
                    <template slot-scope="scope">
                        <el-link :underline="false" type="danger"  v-if="scope.row.parMoney<0">{{scope.row.parMoney}}</el-link>
                         <el-link :underline="false" type="success" v-else>{{scope.row.parMoney}}</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
// import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link,Dialog} from 'element-ui'
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
// Vue.use(Dialog)
export default {
    data(){
        return {
            tradeRecordConForm: {
                orderNum: '',
                userName: '',
                merName: '',
                merPhone: '',
                deviceNum: '',
                status: '0',
                form: '0',
                payType: '0',
                startTime: '',
                endTime: ''
            },
            pickerOptions: dateTimeJS,
            tableData: [
                 {
                     index: 1,
                     orderNum: '201910081015163790000013',
                     userName: '权威权威的',
                     merName: 'aswqeqw',
                     deviceNum: '005632',
                     deviceType: '十路智慧款',
                     money: 2.3,
                     merMoney: 2,
                     partnerMoney: 1.5,
                     status: 0,
                     payType: 1,
                     form:2,
                     date: '2019-10-08 10:15:21'
                 },
                 {
                     index: 2,
                     orderNum: '201910081015163790000013',
                     userName: '权威权威的',
                     merName: 'aswqeqw',
                     deviceNum: '005632',
                     deviceType: '十路智慧款',
                     money: -2.6,
                     merMoney: -1,
                     partnerMoney: 0,
                     status: 0,
                     payType: 1,
                     form:2,
                     date: '2019-10-08 10:15:21'
                 },
            ],
             totalData: [
                 {
                   earnName: '收益：',
                   earn: 124.3,
                   earnMoneyName: '收入：',
                   earnMoney: 286.4,
                   expendName: '支出：',
                   expend: 162.1,
                   walletName: '钱包消费：',
                   wallet: 167.5,
                   walletRefName: '钱包退费：',
                   walletRef: 49.53
               }
             ],
             totalPage: 301,
             dialogMoneyDetail: false, //合伙人收益弹框
             gridData: [
                 {
                    parNickName: '合伙人A',
                    parName: '张三三',
                    parPhone: '15612345678',
                    parMoney: '12.56'
                 },
                 {
                    parNickName: '合伙人B',
                    parName: '张三三',
                    parPhone: '15612345678',
                    parMoney: '-12.56'
                 },
             ]
        }
    },
    components: {
        MyPagination,
    },
    methods: {
        getPage(){
            
        },
        handlePartner(){//处理点击合伙人分成金额
            this.dialogMoneyDetail= true
        }
    }
}
</script>

<style lang="less">
    .tradeRecordCon {
        .el-dialog {
            .orderNum {
                text-align: center;
                padding-bottom: 15px;

            }
            a {
                text-decoration: none;
            }
        }
    }
</style>