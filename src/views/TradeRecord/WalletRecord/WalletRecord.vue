<template>
  <div class="walletRecord">
     <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="walletRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="walletRecordForm.ordernum" placeholder="请输入订单号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="walletRecordForm.usernick" placeholder="请输入用户昵称" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户姓名" class="form_right25">
                    <el-input v-model="walletRecordForm.username" placeholder="请输入用户姓名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="类型" class="form_right25">
                    <el-select v-model="walletRecordForm.paytype"  placeholder="请选择状态" clearable  size="small">
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
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
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
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>
          <el-card class="box-card">
             
            <el-table
                :data="tableData"
                border
                fit
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="75"
                >
                <template slot-scope="scope">
                     {{ (nowPage-1)*10+scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="220"
                >
                    <template slot-scope="scope">
                        <router-link :to="`/tradeRecord/tradeRecordCon/orderDetail?paysource=4&orderId=${scope.row.id}&status=${scope.row.status}&orderNum=${scope.row.ordernum}`">
                             <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="昵称"
                min-width="100"
                >
                <template slot-scope="{row}">
                        {{row.username && row.username.length > 0 ? row.username : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="realname"
                label="姓名"
                min-width="100"
                >
                <template slot-scope="{row}">
                        {{row.realname && row.realname.length > 0 ? row.realname : '— —'}}
                </template>
                </el-table-column>
                
                <el-table-column
                prop="money"
                label="金额"
                min-width="100"
                >
                <template slot-scope="scope">
                        <el-link :type=" scope.row.money >= 0 ?  'success' : 'danger' " :underline="false">{{scope.row.money.toFixed(2)}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="balance"
                label="余额"
                min-width="100"
                >
                 <template slot-scope="scope">
                     {{ scope.row.balance != null ? scope.row.balance.toFixed(2) : '— —' }}
                </template>
                </el-table-column>

                <el-table-column
                prop="paytype"
                label="类型"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <el-link type="info" :underline="false">
                        {{ [0].includes(row.paytype) ? '微信充值钱包' : [1].includes(row.paytype) ? '虚拟充值钱包' : [7].includes(row.paytype) ? '支付宝充值钱包' : [2].includes(row.paytype) ? '钱包微信退款' : [6].includes(row.paytype) ? '钱包虚拟退款' : [3,4,5].includes(row.paytype) ? '退款到钱包' : '— —'}}
                    </el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                label="卡包"
                min-width="120"
                >
                <template slot-scope="{row}">
                    {{ row.remark != "wallet" ? row.remark:"钱包" }}
                </template>
                </el-table-column>
                
                <el-table-column
                prop="paytime"
                label="操作时间"
                min-width="150"
                >
                <template slot-scope="{row}">
                    {{ row.paytime | fmtDate }}
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="退款"
                min-width="80"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" v-if="[0,1,7].includes(scope.row.paytype)" @click="handleRefBtn(row)">退款</el-button>
                    <el-button type="danger" size="mini" v-else plain disabled>退款</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
  </div>
</template>

<script>

import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import {alertPassword} from '@/utils/ele'
import { getWalletRecord } from '@/require/tradeRecord'
import Util from '@/utils/util'
export default {
    data(){
        return {
            walletRecordForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],  
             totalPage: 1,
             nowPage: 1,
             loading:  false
        }
    },
    components: {
        MyPagination
    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr()
            this.walletRecordForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.walletRecordForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr()
            this.walletRecordForm= {startTime,endTime}
        }
       this.asyGetWalletRecord(this.walletRecordForm)
    },
    methods: {
        getPage(page){
            this.walletRecordForm= {...this.walletRecordForm,currentPage:page}
            this.$router.push({query: this.walletRecordForm})
            this.asyGetWalletRecord(this.walletRecordForm)
            this.nowPage = page
        },
        async asyGetWalletRecord(data){
            let _this= this
            try{
                 _this.loading= true
                let walletInfo= await getWalletRecord(data)
                 _this.loading= false
                 if(walletInfo.code === 200){
                    _this.tableData = walletInfo.listdata
                    _this.totalPage = walletInfo.totalRows
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleRefBtn(){
            alertPassword(function(){
                console.log(1)
            })
        },
        handleSearch(){
            this.$router.push({query:{... this.walletRecordForm,currentPage: 1}})
            this.asyGetWalletRecord({... this.walletRecordForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>