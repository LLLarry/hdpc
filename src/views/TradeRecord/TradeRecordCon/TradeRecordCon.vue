<template>
    <div class="tradeRecordCon">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="tradeRecordConForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="tradeRecordConForm.ordernum" placeholder="订单号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="tradeRecordConForm.usernick" placeholder="用户昵称" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25">
                    <el-input v-model="tradeRecordConForm.dealer" placeholder="商户名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25">
                    <el-input v-model="tradeRecordConForm.mobile" placeholder="商户电话" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="tradeRecordConForm.code" placeholder="设备号" clearable size="small"></el-input>
                </el-form-item>
                
                <el-form-item label="订单状态" class="form_right25">
                     <el-select v-model="tradeRecordConForm.status" clearable placeholder="订单状态"  size="small">
                        <el-option label="正常" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易来源" class="form_right25">
                     <el-select v-model="tradeRecordConForm.paysource" clearable placeholder="交易来源"  size="small">
                        <el-option label="充电" value="1" ></el-option>
                        <el-option label="脉冲" value="2" ></el-option>
                        <el-option label="离线充值机" value="3" ></el-option>
                        <el-option label="钱包" value="4" ></el-option>
                        <el-option label="在线卡" value="5" ></el-option>
                        <el-option label="虚拟充值" value="6" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" class="form_right25">
                     <el-select v-model="tradeRecordConForm.paytype" clearable placeholder="支付方式"  size="small">
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
                        placeholder="开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="tradeRecordConForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="结束时间"
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
                v-loading="loading"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="80"
                >
                <template slot-scope="scope">
                     {{ (nowPage-1)*10+scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="230"
                >
                    <template slot-scope="scope">
                        <!-- 充电记录 -->
                        <router-link :to="`/tradeRecord/chargeRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 1"> 
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                        <!-- 投币记录 -->
                        <router-link :to="`/tradeRecord/coinRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 2">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                        <!-- 离线卡记录 -->
                        <router-link :to="`/tradeRecord/offlineCardRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 3">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                         <!-- 钱包记录 -->
                        <router-link :to="`/tradeRecord/walletRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 4">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                         <!-- 在线卡消费记录 -->
                        <router-link :to="`/iccardManage/onlineCardConsume?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 5">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                         <!-- 包月记录 -->
                        <router-link :to="`/tradeRecord/monthlyRecord?ordernum=${scope.row.ordernum}`" v-if="scope.row.paysource == 6">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column
                prop="uusername"
                label="用户名"
                min-width="120"
                >
                </el-table-column>
                 <el-table-column
                prop="dealer"
                label="商户名"
                min-width="120"
                >
                </el-table-column>
                 <el-table-column
                prop="code"
                label="设备(卡)号"
                min-width="120"
                >
                </el-table-column>
                 <el-table-column
                prop="paysource"
                label="设备类型"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <span v-if="row.paysource === 5">— —</span>
                    <span v-else>
                        {{row.hardver=='00' ? "十路智慧款" : row.hardver=='01' ? "十路智慧款" : row.hardver=='02' ? "电轿款" : row.hardver=='03' ? "脉冲板子" :  row.hardver=='04' ? "离线充值机" : "— —"}}
                    </span>
                </template>
                </el-table-column>
                 <el-table-column
                prop="money"
                label="交易金额"
                min-width="80"
                >
                <template slot-scope="scope">
                    <el-link type="success" :underline="false" v-if="scope.row.status==1">+{{scope.row.money != null ? scope.row.money.toFixed(2) : '— —'}}</el-link>
                    <el-link type="danger" :underline="false"  v-if="scope.row.status==2">-{{scope.row.money != null ? scope.row.money.toFixed(2) : '— —'}}</el-link>
                </template>
                </el-table-column>
                 <el-table-column
                prop="merMoney"
                label="商户金额"
                min-width="80"
                >
                 <template slot-scope="scope">
                    <el-link type="success" :underline="false" v-if="scope.row.status==1">+{{scope.row.mermoney != null ? scope.row.mermoney.toFixed(2) : '— —'}}</el-link>
                    <el-link type="danger" :underline="false"  v-if="scope.row.status==2">-{{scope.row.mermoney != null ? scope.row.mermoney.toFixed(2) : '— —'}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="partnerMoney"
                label="合伙人金额"
                min-width="100"
                >
                <template slot-scope="scope">
                    <div v-if="scope.row.manmoney == 0"><el-button icon="el-icon-view" size="mini"  plain disabled style="width: 60px;padding: 7px 0;" >0</el-button></div>
                    <div v-else>
                        <el-button icon="el-icon-view" size="mini" type="success" plain v-if="scope.row.status == 1" style="width: 60px;padding: 7px 0;" @click="handlePartner(scope.row)">{{scope.row.manmoney}}</el-button>
                        <el-button icon="el-icon-view" size="mini" type="danger" plain v-if="scope.row.status == 2"  style="width: 60px;padding: 7px 0;" @click="handlePartner(scope.row)">{{scope.row.manmoney}}</el-button>
                    </div>
                </template>
                </el-table-column>

                <el-table-column
                prop="status"
                label="订单状态"
                min-width="80"
                >
                 <template slot-scope="scope">
                    <el-link type="success" :underline="false" v-if="scope.row.status==1">正常</el-link>
                    <el-link type="danger" :underline="false"  v-if="scope.row.status==2">退款</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="paytype"
                label="支付方式"
                min-width="80"
                >
                 <template slot-scope="{row}">
                    {{ row.paytype == 1 ? '钱包' : row.paytype == 2 ? '微信' : row.paytype == 3 ? '支付宝' : row.paytype == 4 ? '微信小程序' : row.paytype == 5 ? '支付宝小程序' : row.paytype == 6 ? '虚拟充值' : '— —'}}
                 </template>
                </el-table-column>
                <el-table-column
                prop="form"
                label="来源"
                min-width="80"
                >
                <template slot-scope="{row}">
                    {{ row.paysource == 1 ? "充电" : row.paysource == 2 ? "投币" : row.paysource == 3 ? "离线充值" : row.paysource == 4 ? "钱包" : row.paysource == 5 ? "在线卡" : row.paysource == 6 ? "包月卡" : "— —" }}
                </template>
                </el-table-column>
                <el-table-column
                prop="create_time"
                label="交易时间"
                min-width="180"
                >
                <template slot-scope="{row}">
                    {{row.create_time | fmtDate }}
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="120"
                fixed="right"
                >
                <template slot-scope="scope">
                    <router-link :to="`/tradeRecord/tradeRecordCon/orderDetail?paysource=${scope.row.paysource}&orderId=${scope.row.id}`" tag="div">
                        <el-button type="primary" size="mini">详情</el-button>
                    </router-link> 
                </template>
                </el-table-column>  
            </el-table>
         </el-card>
         <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

         <el-dialog title="合伙人金额明细" :visible.sync="dialogMoneyDetail" width="550px">
             <div class="orderNum">订单号：{{diaOrderNum}}</div>
            <el-table :data="gridData" border :header-cell-style="{background:'#f5f7fa',color:'#666'}">
                <el-table-column property="nickname" label="合伙人昵称" min-width="120">
                     <template slot-scope="{row}">
                        {{row.nickname && row.nickname.length > 0 ? row.nickname : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="realname" label="合伙人姓名" min-width="120">
                     <template slot-scope="{row}">
                        {{row.realname && row.realname.length > 0 ? row.realname : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="phone" label="合伙人电话" min-width="120">
                     <template slot-scope="{row}">
                        {{row.phone && row.phone.length > 0 ? row.phone : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column property="partmoney" label="合伙人金额" min-width="120">
                    <template slot-scope="scope">
                        <el-link :underline="false" type="danger"  v-if="scope.row.partmoney<0">{{scope.row.partmoney}}</el-link>
                         <el-link :underline="false" type="success" v-else>{{scope.row.partmoney}}</el-link>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import { getTradeRecord,getPartnerIncomeDetail } from '@/require/tradeRecord'
import Util from '@/utils/util'
export default {
    data(){
        return {
            tradeRecordConForm: {},
            diaOrderNum: '',
            pickerOptions: dateTimeJS,
            tableData: [],
            totalData: [],
             totalPage: 1,
             nowPage: 1,
             loading: false,
             dialogMoneyDetail: false, //合伙人收益弹框
             gridData: []
        }
    },
    components: {
        MyPagination,
    },
    created(){
        let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr()
            console.log(startTime)
            this.tradeRecordConForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.tradeRecordConForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr()
            this.tradeRecordConForm= {startTime,endTime}
        }
       this.asyGetTradeRecord(this.tradeRecordConForm)
    },
    methods: {
        getPage(page){
            this.tradeRecordConForm= {...this.tradeRecordConForm,currentPage:page}
            this.$router.push({query: this.tradeRecordConForm})
            this.asyGetTradeRecord(this.tradeRecordConForm)
            this.nowPage = page
        },
        handlePartner(row){//处理点击合伙人分成金额
            getPartnerIncomeDetail({orderid: row.id}).then(res=>{
                if(res.code == 200){
                    this.gridData= res.listdata
                    this.diaOrderNum= res.ordernum
                }else{
                    this.gridData= []
                }
            }).catch(error=>{
                 this.gridData= []
            })
            this.dialogMoneyDetail= true
        },
        async asyGetTradeRecord(data){
            let _this= this
            try{
                 _this.loading= true
                let tradeInfo= await getTradeRecord(data)
                 _this.loading= false
                 if(tradeInfo.code === 200){
                    _this.tableData = tradeInfo.listdata
                    _this.totalPage = tradeInfo.totalRows
                    let {totalmoney=0,incomemoney=0,reftotalmoney=0,walletmoney=0,refwalletmoney=0}= tradeInfo.mapdata
                    _this.totalData= [
                         {
                            earnName: '收益：',
                            earn: incomemoney,
                            earnMoneyName: '收入：',
                            earnMoney: totalmoney,
                            expendName: '支出：',
                            expend: reftotalmoney,
                            walletName: '钱包消费：',
                            wallet: walletmoney,
                            walletRefName: '钱包退费：',
                            walletRef: refwalletmoney
                        }
                    ]
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleSearch(){
            this.$router.push({query:{... this.tradeRecordConForm,currentPage: 1}})
            this.asyGetTradeRecord({... this.tradeRecordConForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
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