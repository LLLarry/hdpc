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
                           <td>有效商户数</td>
                           <td>{{dataStatisInfo.validdealer}}</td>
                           <td>客户总数</td>
                           <td>{{dataStatisInfo.clientsnum}}</td>
                           <td colspan="6"></td>
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
                            <td>待提现金额</td>
                            <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.penextractmoney}}</td>
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
                   
                     <thead>
                       <tr >
                           <th colspan="10">缴费信息</th>
                       </tr>
                   </thead>
                   <tbody>
                        <tr>
                           <td>缴费总额</td>
                           <td>{{dataStatisInfo.totaldatainfo && dataStatisInfo.totaldatainfo.feescaleEarns}}</td>
                         
                       </tr>
                   </tbody>


               </table>
            </div>
        </el-card>

        <!-- 代理商操作： 查看商户信息提示框 -->
        <el-dialog title="提示" :visible.sync="agentTipDialog" width="720px" :before-close="handleClose" v-if="userInfo.classify == 'Agent'">
            <div>
                <p style="margin-bottom: 30px;  font-size: 16px; line-height: 1.8em;"> 代理商可以通过自己的账户，查看自己名下商户的后台信息（包括：<strong>用户管理</strong>、<strong>交易记录</strong>、<strong>设备管理</strong>、<strong>IC卡管理</strong>、<strong>小区管理</strong> 等）</p>
                <h2 style="margin-bottom: 10px; font-size: 16px;">查看步骤：</h2>
                <el-steps :active="4" align-center>
                    <el-step title="步骤1" description="打开“用户管理”"></el-step>
                    <el-step title="步骤2" description="打开“商户信息”"></el-step>
                    <el-step title="步骤3" description="选择要查看的商户（默认选择自己）"></el-step>
                    <el-step title="步骤4" description="点击“设备列表”即可查看选择商户的设备信息"></el-step>
                </el-steps>
                <p style="margin-top: 15px;  font-size: 16px;">注：选中查看商户之后，在右上角会有“<span class="el-icon-chat-dot-square" style="font-size: 18px;"></span>”图标，鼠标移到上面会显示当前选中的商户</p>
                <div style="text-align: center; margin: 30px 0 20px 0;">
                    <el-button type="primary" style="width: 350px;" @click="handlegoToMerinfo">立即前往</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import {Loading} from 'element-ui'
import { handleDataStatis,handleDataStatisAdmin } from '@/require/datastatis'
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {
            dataStatisInfo: {},
            loading: null,
        }
    },
    computed: {
        ...mapState(['userInfo','agentTipDialog'])
    },
    created(){
        this.handleDataStatisInfo()
    },
    beforeDestroy(){ //退出之间，将未关闭的Loading关闭
        this.loading && this.loading.close()
    },
    deactivated(){
       this.loading && this.loading.close()
    },
    methods:{
        ...mapMutations(['setAgentTipDialog']),
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
        },
        handlegoToMerinfo(){
            this.setAgentTipDialog(false) //设置提示框关闭
            this.$router.push({path: '/usermanage/merInfo'})
        },
        handleClose(){
            this.setAgentTipDialog(false) //设置提示框关闭
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