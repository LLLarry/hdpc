<template>
    <div class="systemTem">
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>十路智慧款系统模板</span>
            </div>
            <Template :from="1" :list="temChargeList"/>
        </el-card>
         <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>电轿款系统模板</span>
            </div>
            <Template :from="1" :list="temelectriccar"/>
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
        
    </div>
</template>

<script>
import Template from '@/components/common/Template'
import TemplateCoin from '@/components/common/TemplateCoin'
import TemplateOffline from '@/components/common/TemplateOffline'
import TemplateWallet from '@/components/common/TemplateWallet'
import { getSystemSetInfo } from '@/require/systemSet'
export default {
    data(){
        return {
            temChargeList: [
                    {   
                        id: 1,
                        name: '充电系统默认模板',
                        remark: '和动充电站',
                        common1: '1569365326',
                        permit: 1, //是否支持退费 1是 2否
                        walletpay: 2, //是否钱包支付 1是 2否
                        common2: 1, //退费标准  1时间电量， 2时间，3电量
                        gather: [
                                {
                                    name: '1元 4小时',
                                    money:1.0,
                                    chargeTime: 240,
                                    chargeQuantity: 1,
                                    temChildId: 11,
                                },
                                {
                                    name: '8元 8小时',
                                    money:2.0,
                                    chargeTime: 480,
                                    chargeQuantity: 2,
                                    temChildId: 12,
                                }
                            ]
                    }
            ],
            temelectriccar: [], //电轿款系统模板
            temCoinList: [ //模拟投币数据
                    {   
                        id: 1,
                        name: '充电系统默认模板',
                        remark: '和动充电站',
                        common1: '1569365326',
                        permit: 1, //是否支持退费 1是 2否
                        walletpay: 2, //是否钱包支付 1是 2否
                        common2: 1, //退费标准  1时间电量， 2时间，3电量
                        gather: [
                                {
                                    name: '1元 1个币',
                                    remark: 1,
                                    money:1, //付款金额
                                    temChildId: 11,
                                },
                                {
                                    name: '4元 2个币',
                                    remark: 2,
                                    money:4, //付款金额
                                    temChildId: 12,
                                }
                            ]
                    }
            ],
             temOfflineList: [ //离线卡数据
                    /*{   
                        id: 1,
                        name: '充电系统默认模板',
                        remark: '和动充电站',
                        common1: '1569365326',
                        permit: 1, //是否支持退费 1是 2否
                        walletpay: 2, //是否钱包支付 1是 2否
                        common2: 1, //退费标准  1时间电量， 2时间，3电量
                        gather: [
                                {
                                    name: '10元',
                                    remark: 10,
                                    money:10, //付款金额
                                    temChildId: 11,
                                },
                                {
                                    name: '20元送5元',
                                    remark: 25,
                                    money:20, //付款金额
                                    temChildId: 12,
                                }
                            ]
                    }*/
            ],
            temWalletList: [ //钱包数据
                   /* {   
                        id: 1,
                        name: '充电系统默认模板',
                        remark: '和动充电站',
                        common1: '1569365326',
                        permit: 1, //是否支持退费 1是 2否
                        walletpay: 2, //是否钱包支付 1是 2否
                        common2: 1, //退费标准  1时间电量， 2时间，3电量
                        gather: [
                                {
                                    name: '10元',
                                    remark: 10,
                                    money:10, //付款金额
                                    temChildId: 11,
                                },
                                {
                                    name: '20元送5元',
                                    remark: 25,
                                    money:20, //付款金额
                                    temChildId: 12,
                                }
                            ]
                    }*/
            ],
            temOnlineList: [] //在线卡模板
        }
    },
    components: {
        Template,
        TemplateCoin,
        TemplateOffline,
        TemplateWallet
    },
    created(){
        this.sayGetSystemSetInfo()
    },
    methods: {
        async sayGetSystemSetInfo(){
            let _this= this
            try{
                let systemTemInfo= await getSystemSetInfo()
                if(systemTemInfo.code === 200) {
                    // _this.temChargeList= systemTemInfo.chargesontem
                   
                    {    
                        // 电轿款
                         let {id,name,remark,common1,permit,walletpay,common2,gather}= systemTemInfo.temelectriccar
                        _this.temelectriccar= [{id,name,remark,common1,permit,walletpay,common2,gather}]

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

                }

            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
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
}
</style>