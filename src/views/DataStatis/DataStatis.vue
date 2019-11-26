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
                           <td>{{dataStatisInfo.validdealer}}</td>
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
                           <td>{{dataStatisInfo.devisenum}}</td>
                           <td>设备在线总数</td>
                           <td>{{dataStatisInfo.online}}</td>
                           <td>设备离线总数</td>
                           <td>{{dataStatisInfo.disline}}</td>
                           <td>设备绑定总数</td>
                           <td>{{dataStatisInfo.onbinding}}</td>
                           <td>设备未绑定数</td>
                           <td>{{dataStatisInfo.disbinding}}</td>
                       </tr>
                   </tbody>

                   <thead>
                       <tr >
                           <th colspan="10">总订单信息</th>
                       </tr>
                   </thead>
                   <tbody>
                        <tr>
                           <td>收益总额</td>
                           <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.incomemoney}}</td>
                           <td>累计提现</td>
                           <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.extractmoney}}</td>
                           <td>累计提现手续费</td>
                           <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.sumservicecharge}}</td>
                           <td>未提现金额</td>
                           <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.earningsMoney}}</td>
                           <td>资金总额</td>
                           <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.onlinemoney}}</td>
                        </tr>                     
                        <tr>
                            <td>微信收入总额</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.wechatmoney}}</td>
                            <td>支付宝收入总额</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.alipaymoney}}</td>
                            <td>微信退费总额</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.refwechatmoney}}</td>
                            <td>支付宝退费总额</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.refalipaymoney}}</td>
                            <td>订单总数</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.totalorder}}</td>
                        </tr>
                        <tr>
                            <td>微信总订单</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.wechatorder}}</td>
                            <td>支付宝总订单</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.alipayorder}}</td>
                            <td>微信退费总订单</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.refwechatorder}}</td>
                            <td>支付宝退费总订单</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.refalipayorder}}</td>
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
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.totalorder}}</td>
                           <td>微信总订单</td>
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.wechatnum}}</td>
                           <td>支付宝总订单</td>
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.alipaynum}}</td>
                           <td>微信退费总订单</td>
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.refwechatnum}}</td>
                           <td>支付宝退费总订单</td>
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.refalipaynum}}</td>
                       </tr>
                        <tr>
                           <td>资金总额</td>
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.totalmoney}}</td>
                           <td>微信支付总额</td>
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.wechatmoney}}</td>
                           <td>支付宝支付总额</td>
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.alipaymoney}}</td>
                           <td>微信退费总额</td>
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.refwechatmoney}}</td>
                           <td>支付宝退费总额</td>
                           <td>{{dataStatisInfo.totaltodayinfo && dataStatisInfo.totaltodayinfo.refalipaymoney}}</td>
                       </tr>
                   </tbody>

               </table>
            </div>
        </el-card>
    </div>
</template>

<script>
import {Loading} from 'element-ui'
import { handleDataStatis,handleDataStatisAdmin } from '@/require/datastatis'
import { mapState } from 'vuex'
export default {
    data(){
        return {
            dataStatisInfo: {},
            loading: null
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created(){
        this.handleDataStatisInfo()
    },
    beforeDestroy(){ //退出之间，将未关闭的Loading关闭
        this.loading && this.loading.close()
    },
    methods:{
        async handleDataStatisInfo(){
            let loading= Loading.service({
                        lock: true,
                        text: '加载中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.loading= loading
            let handleDataStatisFn= this.userInfo.classify=='superAdmin' ? handleDataStatis : handleDataStatisAdmin
            try{
                let dataStatisInfo= await handleDataStatisFn()
                this.dataStatisInfo= dataStatisInfo
                loading.close()
            }catch(error){
                if(error == '拦截请求'){ //当访问出错时会error为字符串，当拦截器拦截时error为undefined,当拦截器拦截时继续加载
                    return 
                }
                loading.close()
            }
        }
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