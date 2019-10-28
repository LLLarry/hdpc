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
                >
                </el-table-column>
                <el-table-column
                prop="payMoney"
                label="付款金额（元）"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-link :underline="false" type="success" v-if="scope.row.payMoney>=0">{{scope.row.payMoney}}</el-link>
                     <el-link :underline="false" type="danger" v-else>{{scope.row.payMoney}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="chargeTime"
                label="充电时间（分钟）"
                min-width="120"
                >
                </el-table-column>
               
                <el-table-column
                prop="quantity"
                label="充电电量（度）"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="patType"
                label="付款方式"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="date"
                label="开始充电时间"
                min-width="200"
                >
                </el-table-column>

                <el-table-column
                prop="status"
                label="订单状态"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-link :underline="false" type="success">{{scope.row.status}}</el-link>
                    <!-- <el-link :underline="false" type="success" v-if="scope.row.status>=0">{{scope.row.status}}</el-link>
                     <el-link :underline="false" type="danger" v-else>{{scope.row.status}}</el-link> -->
                </template>
                </el-table-column>
            </el-table>
         </el-card>
    </div>
</template>

<script>
// import {Card,Table,TableColumn,Link} from 'element-ui'
// import Vue from 'vue'
// Vue.use(Card)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Link)
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
            ]
        }
    }
}
</script>

<style>

</style>