<template>
  <div class="comManageDetail">
        <!-- 顶部详情 -->
        <TopInfo />
        <!-- 合伙人和商户 -->
        <PartnerAndDevice />
        <!-- 钱包模板 -->
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>钱包系统模板</span>
            </div>
            <TemplateWallet :from="1" :list="temWalletList"/>
        </el-card>
        <!-- 在线卡模板 -->
        <el-card class="box-card card_content">
            <div slot="header" class="clearfix">
                <span>在线卡系统模板</span>
            </div>
            <TemplateOffline :from="1" :list="temonline"/>
        </el-card>
  </div>
</template>

<script>
import TopInfo from './components/TopInfo'
import TemplateWallet from '@/components/common/TemplateWallet'
import TemplateOffline from '@/components/common/TemplateOffline'
import PartnerAndDevice from './components/PartnerAndDevice'
export default {
    data(){
        return {
            temWalletList: [ //钱包数据
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
            temonline: [{
            "common1": null,
            "common2": 1,
            "chargeInfo": null,
            "stairid": 0,
            "pitchon": null,
            "tempparList": null,
            "remark": null,
            "gather": [
            {
            "common1": null,
            "common2": null,
            "brandName": null,
            "chargeTime": 0,
            "chargeQuantity": 0,
            "remark": 50,
            "telephone": null,
            "type": 0,
            "common3": null,
            "money": 50,
            "createTime": "2019-05-24T02:41:34.000+0000",
            "name": "50元",
            "id": 955,
            "status": 1,
            "tempparid": 296
            },
            {
            "common1": null,
            "common2": null,
            "brandName": null,
            "chargeTime": 0,
            "chargeQuantity": 0,
            "remark": 100,
            "telephone": null,
            "type": 0,
            "common3": null,
            "money": 100,
            "createTime": "2019-05-24T02:41:53.000+0000",
            "name": "100元",
            "id": 956,
            "status": 1,
            "tempparid": 296
            },
            {
            "common1": null,
            "common2": null,
            "brandName": null,
            "chargeTime": 0,
            "chargeQuantity": 0,
            "remark": 200,
            "telephone": null,
            "type": 0,
            "common3": null,
            "money": 200,
            "createTime": "2019-05-24T02:42:10.000+0000",
            "name": "200元",
            "id": 957,
            "status": 1,
            "tempparid": 296
            }
            ],
            "hasbagMonth": null,
            "common3": "0",
            "ifmonth": 2,
            "createTime": "2019-05-24 10:36:59.0",
            "merchantid": 0,
            "grade": 2,
            "name": "在线卡系统模板",
            "permit": 1,
            "rank": 1,
            "id": 296,
            "walletpay": 2,
            "status": 4
            }],
        }
    },
    components:{
        TopInfo,
        PartnerAndDevice,
        TemplateWallet,
        TemplateOffline
    }
}
</script>

<style lang="less">
.comManageDetail {
    background-color: #F8F8F9;
    .el-card.is-always-shadow {
        box-shadow: none;
        margin-bottom: 0px;
        margin-bottom: 40px;
        &:hover {
            -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        }
        &.temCard {
            .el-card.is-always-shadow {
                margin-bottom: 0;
                padding: 20px;
                 &:hover {
                        -webkit-box-shadow: none;
                        box-shadow: none;
                    }
            }
            .el-card__body {
                padding: 0;
            }   
        }
    }
}   
</style>