<template>
    <div class="cashManage">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="cashManageForm" size="mini">
                <el-form-item label="单号" class="form_right25 w220">
                    <el-input v-model="cashManageForm.ordernum" placeholder="请输入单号" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="申请人" class="form_right25">
                    <el-input v-model="cashManageForm.realname" placeholder="请输入姓名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25">
                    <el-input v-model="cashManageForm.phone" placeholder="请输入手机号" clearable size="small"></el-input>
                </el-form-item>
               <el-form-item label="银行卡号 " class="form_right25 w220">
                    <el-input v-model="cashManageForm.bankcardnum" placeholder="请输入银行卡号" clearable size="small"></el-input>
                </el-form-item>
                 <el-form-item label="银行名称 " class="form_right25 w220">
                    <el-input v-model="cashManageForm.bankname" placeholder="请输入银行名称" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="提现类型" class="form_right25">
                     <el-select v-model="cashManageForm.type"  placeholder="提现类型" clearable size="small">
                        <el-option label="个人银行卡" value="1" ></el-option>
                        <el-option label="对公账户" value="2" ></el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item label="提现状态" class="form_right25">
                     <el-select v-model="cashManageForm.status"  placeholder="提现状态" clearable size="small">
                        <el-option label="提现待处理" value="0" ></el-option>
                        <el-option label="提现已到账" value="1" ></el-option>
                        <el-option label="提现被拒绝" value="2" ></el-option>
                        <el-option label="提现到零钱" value="3" ></el-option>
                        <el-option label="代开发票" value="4" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="cashManageForm.startTime"
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
                        v-model="cashManageForm.endTime"
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
                min-width="65"
                >
                <template slot-scope="scope">
                     {{ (nowPage-1)*10+scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="withdrawnum"
                label="提现单号"
                min-width="200"
                >
                </el-table-column>
                <el-table-column
                prop="realname"
                label="申请人"
                min-width="100"
                >
                <template slot-scope="{row}">
                    {{ row.realname && row.realname.length > 0 ? row.realname : '— —' }}
                </template>
                </el-table-column>
                <el-table-column
                prop="phone_num"
                label="手机号"
                min-width="120"
                >
                 <template slot-scope="{row}">
                    <router-link :to="`/usermanage/merInfo?phone=${row.phone_num}`">
                        <el-link type="primary">{{row.phone_num}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="bankname"
                label="账户与开户行"
                min-width="180"
                >
                    <template slot-scope="{row}">
                        <div v-if="row.company != null">公司名称：{{`  ${row.company}` }}</div>
                        <div v-if="row.bankcardnum != 0">银行名称:{{row.bankname && row.bankname.length > 0 ? `  ${row.bankname}` : `  — —`}}</div>
                        <div v-else>微信零钱</div>
                        <div v-if="row.bankcardnum != 0">银行账号:{{row.bankcardnum && row.bankcardnum.length > 0 ? `  ${row.bankcardnum}` : `  — —`}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                prop="type"
                label="类型"
                width="70"
                >
                    <template slot-scope="scope">   
                        <span v-if="scope.row.type==2" >对公</span>
                        <span v-else>个人</span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="user_money"
                label="现有金额"
               
                >
                </el-table-column>
                <el-table-column
                prop="money"
                label="提现金额"
                >
                </el-table-column>
                <el-table-column
                prop="amoMoney"
                label="到账金额"
                min-width="80"
                >
                <template slot-scope="scope">
                    <el-link type="success" :underline="false">
                        {{  scope.row.money - scope.row.servicecharge }}
                    </el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="servicecharge"
                label="手续费"
                min-width="60"
                >
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="申请时间"
                min-width="135"
                >
                <template slot-scope="{row}">
                    <div v-html="$fmtDate(row.create_time)"></div>
                </template>
                </el-table-column>
                <el-table-column
                prop="status"
                label="当前状态"
                min-width="80"
                >
                <template slot-scope="scope">
                    <el-link type="info" :underline="false" v-if="scope.row.status === 0">提现待处理</el-link>
                    <el-link type="success" :underline="false" v-else-if="scope.row.status === 1 || scope.row.status === 3">提现已到账</el-link>
                    <el-link type="warning" :underline="false" v-else-if="scope.row.status === 4">待开发票</el-link>
                    <el-link type="danger" :underline="false" v-else>提现被拒绝</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="150"
                fixed="right"
                >
                <template slot-scope="scope">
                    <div v-if="scope.row.status != 0 && scope.row.status != 4"> 
                        <el-button type="primary" size="mini" plain disabled>通过</el-button>
                        <el-button type="danger" size="mini" plain disabled>拒绝</el-button>
                    </div>
                    <div v-else> 
                        <el-button type="primary" size="mini" @click="handleRefBtn(scope.row,1)">通过</el-button>
                        <el-button type="danger" size="mini" @click="handleRefBtn(scope.row,2)">拒绝</el-button>
                    </div>
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
import {alertConfim,messageTip} from '@/utils/ele'
import { getWithDrawRecord,merWithdrawResolve } from '@/require/tradeRecord'
import Util from '@/utils/util'
export default {
    data(){
        return {
            cashManageForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],
             totalPage: 1,
             nowPage: 1,
             loading: false,
             row: {}
        }
    },
    components: {
        MyPagination
    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',30)
            this.cashManageForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.cashManageForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',30)
            this.cashManageForm= {startTime,endTime}
        }
       this.asyGetWithDrawRecord(this.cashManageForm)
    },
    methods: {
        getPage(page){
            this.cashManageForm= {...this.cashManageForm,currentPage:page}
            this.$router.push({query: this.cashManageForm})
            this.asyGetWithDrawRecord(this.cashManageForm)
            this.nowPage = page
        },
        async asyGetWithDrawRecord(data){
            let _this= this
            try{
                 _this.loading= true
                let drawRecordInfo= await getWithDrawRecord(data)
                 _this.loading= false
                 if(drawRecordInfo.code === 200){
                    _this.tableData = drawRecordInfo.listdata
                    _this.totalPage = drawRecordInfo.totalRows
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleRefBtn(row,status){
            this.row= row
            let title= status == 1 ? '确认通过提现吗？' : '确认拒绝提现吗？'
            let data= {}
            alertConfim(title,()=>{
                merWithdrawResolve({id: this.row.id, status:status}).then(res=>{
                    if(res.code == 200 ){
                        if(status == 1){
                            messageTip('success','提现已通过')
                        }else{
                             messageTip('success','提现已拒绝')
                        }
                         this.asyGetWithDrawRecord(this.cashManageForm)
                    }else{
                        messageTip('error','错误')
                    }
                }).catch(error=>{})
            })
        },
        handleSearch(){
            this.$router.push({query:{... this.cashManageForm,currentPage: 1}})
            this.asyGetWithDrawRecord({... this.cashManageForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style lang="less">

</style>