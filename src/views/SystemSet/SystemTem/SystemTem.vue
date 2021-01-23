<template>
    <div class="systemTem">
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>十路智慧款系统模板</span>
            </div>
            <TemplateCharge :from="1" :list="temChargeList"/>
        </el-card>
         <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>电轿款系统模板</span>
            </div>
            <TemplateCharge :from="1" :list="temelectriccar"/>
        </el-card>
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>模拟投币系统模板</span>
            </div>
            <TemplateCoin :from="1" :list="temCoinList"/>
        </el-card>
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>在线卡系统模板</span>
            </div>
            <TemplateOffline :from="1" :list="temOnlineList"/>
        </el-card>
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>离线卡系统模板</span>
            </div>
            <TemplateOffline :from="1" :list="temOfflineList"/>
        </el-card>
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>钱包系统模板</span>
            </div>
            <TemplateWallet :from="1" :list="temWalletList"/>
        </el-card>
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>智慧款V3模板</span>
            </div>
            <TemplateV3 :from="1" :list="templateV3" @handleReLoad="handleReLoad" />
        </el-card>

        <!-- <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>商户缴费系统模板</span>
            </div>
            <el-card>
             <el-row class="payTemRow">
                <el-col :span="12" class="netWork">
                    <div class="title">网络设备模板</div>
                     <el-row class="item">
                         <el-col :span="10">00出厂默认设置</el-col>
                         <el-col :span="14"><el-input-number v-model="payTemData['00']['00']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">01十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['01']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">02电轿款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['02']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">03脉冲板子</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['03']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">04离线充值机</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['04']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>

                     <el-row class="item">
                         <el-col :span="10">05十六路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['05']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                      <el-row class="item">
                         <el-col :span="10">06二十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['06']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                </el-col>
                <el-col :span="12" class="blueBooth">
                    <div class="title">蓝牙设备模板</div>
                     <el-row class="item">
                         <el-col :span="10">03脉冲板子</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['03']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                </el-col>
            </el-row>
            <div style="margin-top: 20px; text-align: center;"><el-button type="primary" icon="el-icon-document-checked" size="mini" @click="submitPayTem" >保存模板</el-button></div>
            </el-card>
        </el-card> -->
        <!-- 商户缴费系统模板 -->
        <PayTem :payTemData="payTemData"  @handleReLoad="handleReLoad" />
        <!-- 商户缴费系统模板 -->
        <el-row>
            <el-col :xs="{span: 24}" :sm="{span: 11}">
                <el-card class="box-card card_content">
                    <div slot="header" class="clearfix">
                        <span>上传文件</span>
                    </div>
                    <UpLoadFile :baseURL="baseURL" />
                </el-card>
            </el-col>
            <el-col :xs="{span: 24}" :sm="{span: 11, offset: 2}"> &nbsp;
                 <ConfigChangeParmars :sysTime="sysTime" @handleReLoad="handleReLoad" />
            </el-col>
        </el-row>
    
    </div>
</template>

<script>
import TemplateCharge from '@/components/common/Template'
import TemplateV3 from '@/components/common/TemplateV3'
import TemplateCoin from '@/components/common/TemplateCoin'
import TemplateOffline from '@/components/common/TemplateOffline'
import TemplateWallet from '@/components/common/TemplateWallet'
import UpLoadFile from '@/components/common/upLoadFile'
import ConfigChangeParmars from './components/ConfigChangeParmars'
import PayTem from './components/PayTem'
import { getSystemSetInfo } from '@/require/systemSet'
import { messageTip } from '@/utils/ele'
export default {
    data(){
        return {
            baseURL: 'http://www.he360.com.cn',
            temChargeList: [],
            temelectriccar: [], //电轿款系统模板
            temCoinList: [],//模拟投币模板
             temOfflineList: [],//离线卡模板
            temWalletList: [],//钱包模板
            templateV3: [], // 智慧款v3模板
            temOnlineList: [], //在线卡模板
            templateCart: [], // 汽车模板
            payTemData: { //商户缴费系统模板
                '00': {},
                '01': {}
            },
            sysTime: {} //配置充电时间
        }
    },
    components: {
        TemplateCharge,
        TemplateCoin,
        TemplateOffline,
        TemplateWallet,
        UpLoadFile,
        TemplateV3,
        ConfigChangeParmars,
        PayTem
    },
    created(){
        let baseURL= window.location.origin || 'http://www.he360.com.cn'
        if (process.env.NODE_ENV === "development"){ //开发环境
        baseURL= 'http://localhost'
        }
        this.baseURL= baseURL
        this.sayGetSystemSetInfo()
    },
    methods: {
        async sayGetSystemSetInfo(callback){
            let _this= this
            try{
                let systemTemInfo= await getSystemSetInfo()
                if(systemTemInfo.code === 200) {
                    callback && callback()
                    {
                        //十路智慧款
                        let {id,name,remark,common1,permit,walletpay,common2,gather,ifalipay}= systemTemInfo.tempcharge
                         common2= common2 == null ? 1 : common2
                        _this.temChargeList= [{id,name,remark,common1,permit,walletpay,common2,gather,ifalipay}]
                    }
                   
                    {    
                        // 电轿款
                         let {id,name,remark,common1,permit,walletpay,common2,gather,ifalipay}= systemTemInfo.temelectriccar
                         common2= common2 == null ? 1 : common2
                        _this.temelectriccar= [{id,name,remark,common1,permit,walletpay,common2,gather,ifalipay}]

                    }
                   
                    {
                        // 模拟投币
                        let {id,name,remark,common1,permit,walletpay,common2,gather}= systemTemInfo.temincoins
                        _this.temCoinList= [{id,name,remark,common1,permit,walletpay,common2,gather}]
                    }

                    {
                         // 离线卡系统模板
                        let {id,name,remark,common1,permit,walletpay,common2,gather}= systemTemInfo.temoffline
                        _this.temOfflineList= [{id,name,remark,common1,permit,walletpay,common2,gather}]
                        
                    }

                    {
                         //钱包系统模板
                        let {id,name,remark,common1,permit,walletpay,common2,gather}= systemTemInfo.temwallet
                        _this.temWalletList= [{id,name,remark,common1,permit,walletpay,common2,gather}]
                        
                    }
                     
                    {
                        // 在线卡模板
                         let {id,name,remark,common1,permit,walletpay,common2,gather}= systemTemInfo.temonline
                        _this.temOnlineList=[{id,name,remark,common1,permit,walletpay,common2,gather}]
                    }

                    {
                        // V3充电模板
                         _this.templateV3= [systemTemInfo.templatev3]
                
                    }

                    {
                        // 商户缴费默认模板
                        this.payTemData= systemTemInfo.payTemData
                    }
                    // 获取充电配置
                    _this.sysTime= systemTemInfo.sysTime

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
       
        handleReLoad(callback){ //重新请求数据
            this.sayGetSystemSetInfo(callback)
        }
    }
}
</script>

<style lang="less" scope>
.systemTem {
    .card_content {
        box-shadow: none;
        border: none;
    }
    .payTemRow {
        .title {
            font-size: 18px;
            text-align: center;
            padding-bottom: 25px;
        }
        .item {
            border-top: 1px solid #EBEEF5;
            border-left: 1px solid #EBEEF5;
            line-height: 32px;
            font-size: 13px;
            color: rgb(102, 102, 102);
            &>div {
                padding: 8px 15px;
            }
        }
        .netWork {
             border-bottom: 1px solid #EBEEF5;
             .item {
                  border-right: 1px solid #EBEEF5;
             }
        }
        .blueBooth {
             border-bottom: 1px solid #EBEEF5;
             .item {
                  border-right: 1px solid #EBEEF5;
                  border-left: none;
             }
        }
    }
    .downloadLog {
        color: #409EFF;
    }
}
</style>