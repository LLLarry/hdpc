<template>
    <div class="dataStatis">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>数据汇总</span>
            </div>
            <div class="contentTab">
               <table class="table_a">
                   <thead>
                       <tr >
                           <th colspan="10">有效客户</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>有效客户数</td>
                           <td>921</td>
                           <td colspan="8"></td>
                          
                       </tr>
                   </tbody>

                    <thead>
                       <tr >
                           <th colspan="10">设备信息</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>设备总数</td>
                           <td>5632</td>
                           <td>设备在线总数</td>
                           <td>2896</td>
                           <td>设备离线总数</td>
                           <td>2170</td>
                           <td>设备绑定总数</td>
                           <td>3294</td>
                           <td>设备未绑定数</td>
                           <td>1770</td>
                       </tr>
                   </tbody>

                   <thead>
                       <tr >
                           <th colspan="10">总订单信息</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>订单总数</td>
                           <td>898402</td>
                           <td>微信总订单</td>
                           <td>766459</td>
                           <td>支付宝总订单</td>
                           <td>131943</td>
                           <td>微信退费总订单</td>
                           <td>33189</td>
                           <td>支付宝退费总订单</td>
                           <td>2291</td>
                       </tr>
                       <tr>
                           <td>资金总额</td>
                           <td>17202730.69</td>
                           <td>微信支付总额</td>
                           <td>1466976.28</td>
                           <td>支付宝支付总额</td>
                           <td>253297.41</td>
                           <td>微信退费总额</td>
                           <td>62667.12</td>
                           <td>支付宝退费总额</td>
                           <td>5450.10</td>
                       </tr>
                        <tr>
                           <td>累计提现</td>
                           <td>1480554.69</td>
                           <td>累计提现手续费</td>
                           <td>9016.66</td>
                           <td>待提现金额</td>
                           <td>9404.0</td>
                           <td>未提现金额</td>
                           <td>231362.67</td>
                           <td></td>
                           <td></td>
                       </tr>
                   </tbody>

                   <thead>
                       <tr >
                           <th colspan="10">今日订单信息</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>订单总数</td>
                           <td>3079</td>
                           <td>微信总订单</td>
                           <td>2629</td>
                           <td>支付宝总订单</td>
                           <td>406</td>
                           <td>微信退费总订单</td>
                           <td>91</td>
                           <td>支付宝退费总订单</td>
                           <td>5</td>
                       </tr>
                        <tr>
                           <td>资金总额</td>
                           <td>5492.60</td>
                           <td>微信支付总额</td>
                           <td>4655.00</td>
                           <td>支付宝支付总额</td>
                           <td>779.60</td>
                           <td>微信退费总额</td>
                           <td>138.00</td>
                           <td>支付宝退费总额</td>
                           <td>11.00</td>
                       </tr>
                   </tbody>

               </table>
            </div>
        </el-card>
    </div>
</template>

<script>
// import {Card,Table,TableColumn} from 'element-ui'
// import Vue from 'vue'
// Vue.use(Card)
// Vue.use(Table)
// Vue.use(TableColumn)
export default {
    data(){
        return {
         
        }
    },
    created(){
        console.log(this.$route.query)
    },
    methods:{
        
    },
    
}
</script>

<style lang="less">
@import '../../../static/style/default.less';
    .dataStatis {
        width: 100%;
        .el-card__body {
            overflow: auto;
            .contentTab {
                min-width: 1050px;
                .table_a {
                    width: 100%;
                    thead {
                        tr {
                            th {
                                min-width: 120px;   
                                border: 1px solid @colorJ;
                                padding: 5px 10px;
                                color: #1989fa;
                                text-align: left;
                                line-height: 32px;
                                font-size: @fontA;
                                background-color: @colorK;
                                font-family: 'Courier New', Courier, monospace;
                            }
                        }
                    }
                    tbody {
                        tr {
                            td {
                                width: 120px; 
                                border: 1px solid @colorJ;
                                padding: 5px 10px;
                                color: @colorI;
                                line-height: 32px;
                                font-size: @fontA;
                                &:nth-child(odd){
                                    font-weight: 700;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
</style>