<template>
    <div class="coinRecord">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="coinRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="coinRecordForm.ordernum" placeholder="订单号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="coinRecordForm.usernick" placeholder="用户昵称" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25">
                    <el-input v-model="coinRecordForm.dealer" placeholder="商户名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25">
                    <el-input v-model="coinRecordForm.phone" placeholder="商户电话" clearable size="small"></el-input>
                </el-form-item>
               <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="coinRecordForm.devicenum" placeholder="设备号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="订单状态" class="form_right25">
                     <el-select v-model="coinRecordForm.orderstatus"  placeholder="订单状态" clearable size="small">
                        <el-option label="正常" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item label="支付方式" class="form_right25">
                     <el-select v-model="coinRecordForm.paytype"  placeholder="支付方式" clearable size="small">
                        <el-option label="微信" value="1" ></el-option>
                        <el-option label="支付宝" value="2" ></el-option>
                        <el-option label="投币器" value="3" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否为预订单" class="form_right25">
                     <el-select v-model="coinRecordForm.advanceorder"  placeholder="是否为预订单" clearable  size="small">
                        <el-option label="否" value="1" ></el-option>
                        <el-option label="是" value="0" ></el-option>
                </el-select>
                </el-form-item>
                
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="coinRecordForm.startTime"
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
                        v-model="coinRecordForm.endTime"
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
                    <el-link type="primary">{{scope.row.ordernum}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="姓名"
                min-width="100"
                >
                 <template slot-scope="scope">
                   {{scope.row.username && scope.row.username.length > 0 ? scope.row.username : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="dealer"
                label="商户名"
                min-width="100"
                >
                 <template slot-scope="scope">
                   {{scope.row.dealer && scope.row.dealer.length > 0 ? scope.row.dealer : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="equipmentnum"
                label="设备号"
                width="80"
                >
                <template slot-scope="scope">
                    <el-link type="primary">{{scope.row.equipmentnum}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="money"
                label="消费额"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="coin_num"
                label="投币数"
                >
                <template slot-scope="scope">
                    {{scope.row.handletype == 3 ? '— —' : scope.row.coin_num}}
                </template>
                </el-table-column>
                <el-table-column
                prop="handletype"
                label="订单状态"
                >
                 <template slot-scope="{row}">
                     <el-link type="danger" :underline="false" v-if="row.handletype == 4 || row.handletype == 5">退款</el-link>
                     <el-link type="success" :underline="false" v-else>正常</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="handletype"
                label="支付方式"
                min-width="100"
                >
                <template slot-scope="{row}">
                    {{[1,4].includes(row.handletype) ? '微信' :  [2,5].includes(row.handletype) ? '支付宝' :[6,7].includes(row.handletype) ? '钱包' : [8,9].includes(row.handletype) ? '微信小程序': [10,11].includes(row.handletype) ? '支付宝小程序': '— —'}}
                </template>
                </el-table-column>

                <el-table-column
                prop="recycletype"
                label="回复状态"
                min-width="100"
                >
                <template slot-scope="{row}">
                    {{row.recycletype == 0 ? "未回复" : "回复成功"}}
                </template>
                </el-table-column>
                <el-table-column
                prop="begin_time"
                label="记录时间"
                min-width="100"
                >
                 <template slot-scope="{row}">
                    {{ row.begin_time | fmtDate }}
                </template>
                </el-table-column>
                <el-table-column
                prop="refund_time"
                label="退款时间"
                min-width="100"
                >
                <template slot-scope="{row}">
                    {{ row.refund_time | fmtDate }}
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="80"
                fixed="right"
                >
                <template slot-scope="{row}">
                    <el-button type="danger" size="mini" plain disabled v-if="[3,4,5,7,9,11].includes(row.handletype)">退款</el-button>
                    <el-button type="danger" size="mini" v-if="[1,2,6,8,10].includes(row.handletype)" @click="handleRefBtn(row.id,row.handletype)">退款</el-button>
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
import { getincoinRecord } from '@/require/tradeRecord'
import Util from '@/utils/util'
export default {
    data(){
        return {
            coinRecordForm: {},
            pickerOptions: dateTimeJS,
            nowPage: 1,
            loading: false,
            tableData: [],
            totalPage: 1,
        }
    },
    components: {
        MyPagination
    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr()
            this.coinRecordForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.coinRecordForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr()
            this.coinRecordForm= {startTime,endTime}
        }
       this.asyGetincoinRecord(this.coinRecordForm)
    },
    methods: {
       getPage(page){
            this.coinRecordForm= {...this.coinRecordForm,currentPage:page}
            this.$router.push({query: this.coinRecordForm})
            this.asyGetincoinRecord(this.coinRecordForm)
            this.nowPage = page
        },
         async asyGetincoinRecord(data){
            let _this= this
            try{
                 _this.loading= true
                let iconInfo= await getincoinRecord(data)
                 _this.loading= false
                 if(iconInfo.code === 200){
                    _this.tableData = iconInfo.listdata
                    _this.totalPage = iconInfo.totalRows
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
            this.$router.push({query:{... this.coinRecordForm,currentPage: 1}})
            this.asyGetincoinRecord({... this.coinRecordForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style lang="less">

</style>