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
                <el-form-item label="所属商户" class="form_right25">
                    <el-input v-model="walletRecordForm.dealer" placeholder="请输入所属商户" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25">
                    <el-input v-model="walletRecordForm.phone" placeholder="请输入商户电话" clearable size="small"></el-input>
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
                label="用戶姓名"
                min-width="100"
                >
                <template slot-scope="{row}">
                        {{row.realname && row.realname.length > 0 ? row.realname : '— —'}}
                </template>
                </el-table-column>

                <el-table-column
                prop="dealernick"
                label="所属商户"
                min-width="100"
                >
                <template slot-scope="{row}">
                        {{row.dealernick && row.dealernick.length > 0 ? row.dealernick : '— —'}}
                </template>
                </el-table-column>

                <el-table-column
                prop="mobile"
                label="商戶电话"
                min-width="120"
                >
                <template slot-scope="{row}">
                        {{row.mobile && row.mobile.length > 0 ? row.mobile : '— —'}}
                </template>
                </el-table-column>
                
                <el-table-column
                prop="money"
                label="操作金额"
                min-width="140"
                >
                <template slot-scope="scope">
                    <div>
                        充值金额：
                        <el-link :type=" scope.row.tomoney >= 0 ?  'success' : 'danger' " :underline="false">{{scope.row.money.toFixed(2)}}</el-link>
                    </div>
                    <div>
                        赠送金额：
                        <el-link :type=" scope.row.tomoney >= 0 ?  'success' : 'danger' " :underline="false">{{scope.row.sendmoney.toFixed(2)}}</el-link>
                    </div>
                </template>
                </el-table-column>

                <el-table-column
                prop="tomoney"
                label="到账金额"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-link :type=" scope.row.tomoney >= 0 ?  'success' : 'danger' " :underline="false">{{scope.row.tomoney.toFixed(2)}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="balance"
                label="余额"
                min-width="160"
                >
                 <template slot-scope="scope">
                     <!-- {{ scope.row.balance != null ? scope.row.balance.toFixed(2) : '— —' }} -->
                      <div>
                        充值余额：
                        <el-link type="primary" >
                            <router-link :to="`/usermanage/userInfo/userWalletDetail?uid=${scope.row.uid}`" tag="span">
                                {{ scope.row.topupbalance != null ? scope.row.topupbalance.toFixed(2)  :  '— —'}}
                            </router-link>
                        </el-link>
                    </div>
                    <div>
                        赠送余额：
                        <el-link type="primary" >
                             <router-link :to="`/usermanage/userInfo/userWalletDetail?uid=${scope.row.uid}`" tag="span">
                                {{ scope.row.givebalance != null ? scope.row.givebalance.toFixed(2)  :  '— —'}}
                             </router-link>
                        </el-link>
                    </div>
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
                    <el-button type="danger" size="mini" v-if="[0,1,7].includes(scope.row.paytype)" @click="handleRefBtn(scope.row)">退款</el-button>
                    <el-button type="danger" size="mini" v-else plain disabled>退款</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
         <el-dialog
            title="请输入右边的验证码"
            :visible.sync="dialogVisible"
            width="400px"
            :before-close="handleClose">
            <el-row>
                <el-col :span="16">
                     <el-input placeholder="请输入验证码" v-model="userVerifiCode"></el-input>
                </el-col>
                <el-col :span="7" :offset="1" >
                    <VerifiCode @backCode= "backCode" ref="verifi"/>
                </el-col>
            </el-row>
            <p style="color: red; margin-top: 5px;" v-show="tipText">验证码不正确</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;userVerifiCode= '';tipText= false; $refs.verifi.initCode()" size="small">取 消</el-button>
                <el-button type="primary" @click="confirmVerifiCode" size="small">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>

import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import {alertPassword,messageTip} from '@/utils/ele'
import { getWalletRecord , tradeRefEntrance} from '@/require/tradeRecord'
import VerifiCode from '@/components/common/VerifiCode'
import Util from '@/utils/util'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            walletRecordForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],  
             totalPage: 1,
             nowPage: 1,
             loading:  false,
            dialogVisible: false,
            verifiCode: '', //验证码
            userVerifiCode: '', //用户输入的验证码
            tipText: false,
            row: {} //这里是点击退费/撤回所存的订单一列信息，为了退费的时候使用他
        }
    },
    components: {
        MyPagination,
        VerifiCode
    },
    created(){
        let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',1)
            this.walletRecordForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.walletRecordForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',1)
            this.walletRecordForm= {startTime,endTime}
        }
       this.asyGetWalletRecord(this.walletRecordForm)
    },
    computed: {
        ...mapState(['userInfo'])
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
         handleRefBtn(row){
            this.row= row
            if(this.userInfo.classify === 'superAdmin' ){ //超级管理员
                alertPassword(()=>{
                    this.handleRef(3)
                })
            }else{ //普通管理员
                let utype= 2 //普通管理员
                 this.dialogVisible = true
            }
        },
        handleClose(){ //点击管理验证码框
            this.userVerifiCode= ''
            this.dialogVisible = false
            this.$refs.verifi.initCode()
        },
         backCode(verifiCode){ //普通管理员验证码回调
            this.verifiCode= verifiCode
        },
        confirmVerifiCode(){ //点击提交，验证验证码
            let userVerifiCode=  this.userVerifiCode.toLowerCase()
            let verifiCode=  this.verifiCode.toLowerCase()
            if(userVerifiCode != verifiCode){
                this.tipText= true
            }else{
                this.tipText= false
                this.dialogVisible= false
                // 发送请求请求
                this.handleRef(2)
                this.userVerifiCode= ''
            }
            this.$refs.verifi.initCode()
        },
         handleRef(utype){ //处理退费 逻辑
            //utype= 3超级管理员  2普通管理员       
            let url = ''
            let data= {}
            console.log(this.row)
            if(this.row.paytype == 0){
                url = "/wxpay/doRefund";
		        data ={id : this.row.id,refundState: 4,pwd : '',utype :utype}
            }else if(this.row.paytype == 1){
                url = "/wxpay/mercVirtualReturn";
		        data ={id : this.row.id,type: 1}
            }else if(this.row.paytype == 7){
                url = "/alipay/alipayRefund";
		        data ={id : this.row.id,refundState : 4,pwd : '',utype : utype}
            }
            tradeRefEntrance({url,data}).then(res=>{
                if(res.ok== 'ok'){
                    messageTip('success','退款成功')
                    this.asyGetWalletRecord(this.walletRecordForm)
                }else if(res.ok== 'error'){
                    res.message= '退款失败'
                    messageTip('error',res.message)
                }else if(res.ok== 'pwderror'){
                    res.message='退款失败'
                    messageTip('error','退款密码错误')
                }else if(res.ok== 'usererror'){
                    res.message='退款失败'
                    messageTip('error','用户金额不足')
                }else if(res.ok== 'moneyerror'){
                    res.message='退款失败'
                    messageTip('error','商户或合伙人金额不足')
                }else{
                    messageTip('error','退款异常失败');
                }
                
            }).catch(error=>{})        
        },
        handleSearch(){
            this.$router.push({query:{... this.walletRecordForm,currentPage: 1}})
            this.asyGetWalletRecord({... this.walletRecordForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>