<template>
    <div class="orderDetail">
         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="orderNum"
                label="订单号"
                min-width="230"
                v-if="['1','2','3','4','5','6'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="cardNum"
                label="卡号"
                min-width="120"
                v-if="['3','5'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="cardMoney"
                label="卡余额"
                min-width="120"
                v-if="['3','5'].includes(paysource)"
                >
                </el-table-column>

                 <!-- <el-table-column
                prop="cardMoney1"
                label="余额"
                min-width="120"
                v-if="['6'].includes(paysource)"
                >
                </el-table-column> -->

                <el-table-column
                prop="money1"
                label="充值金额"
                min-width="120"
                v-if="['5','6'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="money2"
                label="到账金额"
                min-width="120"
                v-if="['5'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="payMoney"
                label="付款金额（元）"
                min-width="120"
                 v-if="['1','2','4'].includes(paysource)"
                >
                <template slot-scope="scope">
                    <el-link :underline="false" type="success" v-if="scope.row.payMoney>=0">{{scope.row.payMoney}}</el-link>
                     <el-link :underline="false" type="danger" v-else>{{scope.row.payMoney}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="walletMoney"
                label="钱包金额（元）"
                min-width="120"
                v-if="['4'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="num"
                label="投币个数"
                min-width="120"
                 v-if="['2'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="payType"
                label="支付方式"
                min-width="120"
                 v-if="['2','3','4'].includes(paysource)"
                >
                <template slot-scope="scope">
                    微信
                </template>
                </el-table-column>

                <el-table-column
                prop="handleType"
                label="操作类型"
                min-width="120"
                 v-if="['4','5'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="handleTime"
                label="交易时间"
                min-width="120"
                 v-if="['2','4'].includes(paysource)"
                >
                <template slot-scope="scope">
                    {{scope.row.handleTime | fmtDate}}
                </template>
                </el-table-column>

                <el-table-column
                prop="chargeTime"
                label="充电时间（分钟）"
                min-width="120"
                v-if="['1'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="time"
                label="充值时间"
                min-width="120"
                v-if="['3'].includes(paysource)"
                >
                <template slot-scope="scope">
                    {{scope.row.time | fmtDate}}
                </template>
                </el-table-column>
               
                <el-table-column
                prop="quantity"
                label="充电电量（度）"
                min-width="120"
                v-if="['1'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="payType"
                label="付款方式"
                min-width="120"
                v-if="['1'].includes(paysource)"
                >
                </el-table-column>
                <el-table-column
                prop="date"
                label="充电时间"
                min-width="200"
                v-if="['1'].includes(paysource)"
                >
                <template slot-scope="scope">
                    {{scope.row.date | fmtDate}}
                </template>
                </el-table-column>
                   
                <el-table-column
                prop="status"
                label="订单状态"
                min-width="120"
                 v-if="['1','2','3','4','5','6'].includes(paysource)"
                >
                <template slot-scope="scope">
                   <span v-html="scope.row.status"></span>
                </template>
                </el-table-column>

                <el-table-column
                prop="time3"
                label="创建时间"
                min-width="120"
                 v-if="['5','6'].includes(paysource)"
                >
                <template slot-scope="scope">
                    {{scope.row.time3 | fmtDate}}
                </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="操作"
                min-width="120"
                 v-if="['1','2','3','4','5','6'].includes(paysource)"
                >
                <template slot-scope="{row}">
                    <div v-if="paysource ==1">
                         <el-button type="danger" size="mini" v-if="row.number == 0 && [2,3].includes(row.paytype)"
                        @click="refundMoney(row.paytype)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                    <div v-if="paysource ==2">
                         <el-button type="danger" size="mini" v-if="[1,2,6,8,10].includes(row.handletype)"
                        @click="refundMoney(row.handletype)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                     <div v-if="paysource ==3">
                         <el-button type="danger" size="mini" v-if="[1,2].includes(row.paytype)"
                        @click="refundMoney(row.paytype)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                     <div v-if="paysource ==4">
                         <el-button type="danger" size="mini" v-if="[0,1,7].includes(row.paytype)"
                        @click="refundMoney(row.paytype)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                     <div v-if="paysource ==5">
                         <el-button type="danger" size="mini" v-if="row.flag == 1"
                        @click="refundMoney(row.type)"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>

                     <div v-if="paysource ==6">
                         <el-button type="danger" size="mini" v-if="row.status2 != 2 && row.ifrefund == 0" 
                        @click="refundMoney('2')"
                        >退款</el-button>
                        <el-button type="danger" size="mini" disabled plain v-else>退款</el-button>
                    </div>
                   
                </template>
                </el-table-column>
            </el-table>
         </el-card>
    </div>
</template>

<script>
import { getOrderTradeDataDetail } from '@/require/tradeRecord'
import { messageTip } from '@/utils/ele'
export default {
    data(){
        return {
            tableData: [],
            loading: false,
            paysource: 1,
            orderId: 0
        }
    },
    created(){
        let {paysource,orderId}=  this.$route.query
        this.paysource= paysource
        this.orderId= orderId
        this.asyGetOrderTradeDataDetail({orderid: this.orderId})
    },
    methods: {
        async asyGetOrderTradeDataDetail(data){
            let _this= this
            try {
                 _this.loading= true
                let tradeDataDetail= await getOrderTradeDataDetail(data)
                 _this.loading= false
                 if(tradeDataDetail.code == 200){
                     _this.handleData(tradeDataDetail.order,tradeDataDetail.ordertrade)
                 }

            }catch(error){
                console.log(error)
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleData(order,ordertrade){
            let obj= {}
            if(this.paysource == 1){
                let {ordernum,number,durationtime,quantity,paytype,begintime,expenditure,refundMoney } = order
                obj.orderNum= ordernum
                console.log(expenditure)
                expenditure= expenditure== null ? 0 : expenditure
                obj.payMoney= [1,2].includes(number) ? (0-expenditure).toFixed(2) : expenditure.toFixed(2) 
                obj.chargeTime= durationtime
                obj.quantity= quantity/100
                obj.payType= paytype == 1 ? "钱包" : paytype == 2 ? "微信" : paytype == 3 ? "支付宝" : paytype == 4 ? "包月" : "— —" 
                obj.date= begintime
                obj.status= number == 1 ? '全额退款' : number == 0 ? '正常' : number == 2 ?  `部分退款(<span style="color: red;">${refundMoney}</span>)` : '— —'
                obj.number= number
                obj.paytype= paytype
                this.tableData= [obj]
            }else if(this.paysource == 2){
                let {ordernum,money,status,handletype,beginTime,coinNum} = order
                let {status:parstatus}= ordertrade

                obj.payMoney= status == 1 ? money.toFixed(2) : status == 2 ? (0-money).toFixed(2) : '— —'
                obj.orderNum= ordernum
                obj.num= coinNum
                obj.payType= [1,4].includes(handletype) ? '微信' : [2,5].includes(handletype) ? '虚拟操作' : [3].includes(handletype) ? '投币' : [6,7].includes(handletype) ? '钱包': [8,9].includes(handletype) ? '微信小程序' : [10,11].includes(handletype) ? '支付宝小程序' : '— —'
                obj.handleTime= beginTime
                obj.status= [1,2,3,6,8,10].includes(handletype) ? '正常' : [4].includes(handletype) ? '微信已退费' :  [5].includes(handletype) ? '支付宝已退费' : [7].includes(handletype) ? '已退款到钱包' : [9].includes(handletype) ? '微信小程序已退费' : [11].includes(handletype) ? '支付宝小程序已退费' : '— —'
                obj.handletype= handletype
                this.tableData= [obj]
            }else if(this.paysource == 3){
                let {ordernum,cardID,balance,paytype,beginTime,status} = order
        
                obj.orderNum= ordernum
                obj.cardNum= cardID
                obj.cardMoney= balance.toFixed(2)
                obj.payType= [1,3].includes(paytype) ? '微信' : [2,4].includes(paytype) ? '支付宝' :  '查询'
                obj.time= beginTime
                obj.status= [1,2,5].includes(paytype) ? '正常' : [3,4,6].includes(paytype) ? '退款' :  '— —'
                obj.paytype= paytype
                this.tableData= [obj]
            }else if(this.paysource == 4){
                let {ordernum,money,balance,paytype,paytime} = order
                obj.payMoney= money.toFixed(2)
                obj.walletMoney= balance.toFixed(2)
                obj.orderNum= ordernum
                obj.payType= [0,2].includes(paytype) ? '微信' : [1,6].includes(paytype) ? '虚拟操作' : [3,4,5].includes(paytype) ? '自动退费' : [7,8].includes(paytype) ? '支付宝' : '— —'
                obj.handleType= paytype == 0 ? "微信钱包充值" : paytype == 1 ? "虚拟充值钱包" : paytype == 2 ? "钱包退款" : paytype == 3 ? "充电记录退费" : 
						paytype == 4 ? "离线卡充值退费" : paytype == 5 ? "模拟投币退费" : paytype == 6 ? "虚拟钱包退费" : 
                        paytype == 7 ? "支付宝钱包充值" : paytype == 8? "钱包退款" : "— —" 
                obj.handleTime= paytime
                obj.status= [0,1,7].includes(paytype) ? '正常' : [2,6,8].includes(paytype) ? '钱包退款' :  [3,4,5].includes(paytype) ? '退费到钱包' : '— —'
                obj.paytype= paytype
                this.tableData= [obj]

            }else if(this.paysource == 5){
                let {ordernum,cardID,balance,money,accountmoney,type,flag,status,createTime} = order
                obj.orderNum= ordernum
                obj.cardNum= cardID
                obj.cardMoney= balance.toFixed(2)
                obj.money1= money.toFixed(2)
                obj.money2= accountmoney.toFixed(2)
                obj.handleType= type == 1 ? "消费" : type == 2 ? "余额回收": type == 3 ? "微信充值" : type == 4 ? "卡操作" : type == 5 ? "微信退款" : type == 6 ? "支付宝充值" : type == 7 ? "支付宝退款" : type == 8 ? "虚拟充值" : type == 9 ? "虚拟充值退款" : "其它"
                let payType= ''
                if(flag == 1){
                   payType=  status==1 ? "正常" : status==2 ? "激活" : status==3 ? "绑定" : 
							type==4 ? "删除" : status==5 ? "挂失" : status==6 ? "解挂" : status==7 ? "卡号修改" : "修改备注"
                }else{
                   payType= '已退款'
                }
                obj.type= type
                obj.flag= flag
                obj.status= payType 
                obj.time3= createTime
                this.tableData= [obj]
            }else if(this.paysource == 6){
                let {ordernum,money,accountmoney,ifrefund,status,createTime} = order
                obj.orderNum= ordernum
                obj.money1= money
                obj.status= ifrefund == 1 ? '已退款' : ifrefund == 0 ? (status == 2 ? '已退款' : '正常')  : '— —'
                obj.time3= createTime
                obj.status2= status
                obj.ifrefund= ifrefund
                this.tableData= [obj]
            }
        }
    }
}
</script>

<style>

</style>