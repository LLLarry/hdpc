<template>
    <div class="orderDetail">
         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
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
                v-if="['3','5','6'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="cardMoney"
                label="卡余额"
                min-width="120"
                v-if="['3','5'].includes(paysource)"
                >
                </el-table-column>

                 <el-table-column
                prop="cardMoney"
                label="余额"
                min-width="120"
                v-if="['6'].includes(paysource)"
                >
                </el-table-column>

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
                v-if="['5','6'].includes(paysource)"
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
                <template slot-scope="scope">
                    <el-link :underline="false" type="success" v-if="scope.row.payMoney>=0">{{scope.row.payMoney}}</el-link>
                     <el-link :underline="false" type="danger" v-else>{{scope.row.payMoney}}</el-link>
                </template>
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
                 v-if="['4','5','6'].includes(paysource)"
                >
                <template slot-scope="scope">
                   
                </template>
                </el-table-column>

                <el-table-column
                prop="handleTime"
                label="交易时间"
                min-width="120"
                 v-if="['4'].includes(paysource)"
                >
                <template slot-scope="scope">
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
                </el-table-column>
               
                <el-table-column
                prop="quantity"
                label="充电电量（度）"
                min-width="120"
                v-if="['1'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="patType"
                label="付款方式"
                min-width="120"
                v-if="['1','2'].includes(paysource)"
                >
                </el-table-column>
                <el-table-column
                prop="date"
                label="开始充电时间"
                min-width="200"
                v-if="['1','2'].includes(paysource)"
                >
                </el-table-column>

                <el-table-column
                prop="status"
                label="订单状态"
                min-width="120"
                 v-if="['1','2','3','4','5','6'].includes(paysource)"
                >
                <template slot-scope="scope">
                    <el-link :underline="false" type="success">{{scope.row.status}}</el-link>
                    <!-- <el-link :underline="false" type="success" v-if="scope.row.status>=0">{{scope.row.status}}</el-link>
                     <el-link :underline="false" type="danger" v-else>{{scope.row.status}}</el-link> -->
                </template>
                </el-table-column>

                <el-table-column
                prop="time3"
                label="创建时间"
                min-width="120"
                 v-if="['5','6'].includes(paysource)"
                >
                <template slot-scope="scope">
                    
                </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="操作"
                min-width="120"
                 v-if="['2','3','4','5','6'].includes(paysource)"
                >
                <template slot-scope="scope">
                    <el-button type="danger">退款</el-button>
                </template>
                </el-table-column>
            </el-table>
         </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            tableData: [
                {
                 orderNum: '201910231129409050000018',
                 payMoney: -1.00,
                 chargeTime: '480',
                 quantity:  1.56,
                 patType: 1,
                 date: '2019-10-23 11:29:47',
                 status: 1
                }
            ],
            paysource: 1
        }
    },
    created(){
        this.paysource= this.$route.query.paysource
    }
}
</script>

<style>

</style>