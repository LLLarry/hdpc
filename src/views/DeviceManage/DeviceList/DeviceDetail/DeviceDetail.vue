<template>
    <div class="deviceDetail">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>十路智慧款系统模板</span>
            </div>
            <Template :from="2" :list="temChargeList" />
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>模拟投币系统模板</span>
            </div>
            <TemplateCoin :from="2" :list="temCoinList" />
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>离线卡系统模板</span>
            </div>
            <TemplateOffline :from="2" :list="temOfflineList" />
        </el-card>
    </div>
</template>

<script>
import Template from '@/components/common/Template'
import TemplateCoin from '@/components/common/TemplateCoin'
import TemplateOffline from '@/components/common/TemplateOffline'
export default {
    data(){
        return {
            temChargeList: [
                    {   
                        isSelected: 1,//被选中的模板
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
                    }
            ],
            
        }
    },
    components: {
        Template,
        TemplateCoin,
        TemplateOffline
    },
}
</script>

<style>

</style>