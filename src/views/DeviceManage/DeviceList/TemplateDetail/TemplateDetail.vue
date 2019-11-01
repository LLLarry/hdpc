<template>
    <div class="templateDetail">
        <div class="topContent" ref="topContent">
            <span class="title">充电模板</span>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddTem">添加主模板</el-button>
        </div>
        <Template :from="3" :list="temChargeList" v-if="$route.query.hw == '01' " /> <!--充电模板-->
        <TemplateCoin :from="3" :list="temCoinList" v-else-if="$route.query.hw == '03' " /> <!--脉冲模板-->
        <TemplateOffline :from="3" :list="temOfflineList" v-if="$route.query.hw == '04' "  /> <!--离线卡模板-->

        <el-dialog title="新增充电模板" :visible.sync="visiblesHw01" width="450px" custom-class="dialog_form">
            <el-form :model="hw01Form" label-position="top" >
                <el-form-item label="模板名称" label-width="120px">
                    <el-input v-model="hw01Form.name" autocomplete="off" placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌名称" label-width="120px">
                    <el-input v-model="hw01Form.name" autocomplete="off" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="售后电话" label-width="120px">
                    <el-input v-model="hw01Form.name" autocomplete="off" placeholder="请输入售后电话"></el-input>
                </el-form-item>
                <el-form-item label="是否支持退费" label-width="150px">
                    <el-switch v-model="hw01Form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="是否钱包强制支付" label-width="150px">
                    <el-switch v-model="hw01Form.delivery"></el-switch>
                </el-form-item>
                <el-form-item label="是否创建分等级模板" label-width="150px">
                    <el-switch v-model="hw01Form.delivery"></el-switch>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visiblesHw01 = false">取 消</el-button>
                <el-button type="primary" @click="visiblesHw01 = false">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Template from '@/components/common/Template'
import TemplateOffline from '@/components/common/TemplateOffline'
import TemplateCoin from '@/components/common/TemplateCoin'
import Util from '@/utils/util'

export default {
    data(){
        return{
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
                    },
                    {   
                        id: 2,
                        name: '充电系统默认模板',
                        remark: '和动充电站',
                        common1: '1569365326',
                        permit: 1,
                        walletpay: 2,
                        common2: 2, //退费标准
                        gather: [
                                {   
                                    name: '1元 4小时',
                                    money:1.0,
                                    chargeTime: 240,
                                    chargeQuantity: 1,
                                    temChildId: 21,
                                },
                                {
                                    name: '8元 8小时',
                                    money:2.0,
                                    chargeTime: 480,
                                    chargeQuantity: 2,
                                    temChildId: 22,
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
                    },
                    {   
                        id: 2,
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
                                    temChildId: 21,
                                },
                                {
                                    name: '4元 2个币',
                                    remark: 2,
                                    money:4, //付款金额
                                    temChildId: 22,
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
                    },
                     {   
                        id: 2,
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
                                    temChildId: 21,
                                },
                                {
                                    name: '20元送5元',
                                    remark: 25,
                                    money:20, //付款金额
                                    temChildId: 22,
                                }
                            ]
                    }
            ],
            topHeight: 0,//顶部框到顶部固定定位据顶部的距离
            visiblesHw01: false, //版本号为01的模板是否显示
            hw01Form: {}////版本号为01的模板form表单容器
        }
    },
    components: {
        Template,
        TemplateCoin,
        TemplateOffline
    },
    mounted(){
        // 获取topContent距顶部的距离，滚动让其定位，离开组件时销毁
        this.topHeight= parseFloat(Util.getAttr(this.$refs.topContent,'top'))
        document.getElementsByClassName('main')[0].addEventListener('scroll',this.handleTopTitle)
    },
    beforeDestroy(){
       document.getElementsByClassName('main')[0].removeEventListener('scroll',this.handleTopTitle)
    },
    methods: {
        handleTopTitle(e){
            e= e || window.event
            let target= e.target || e.srcElement
            let scrollTop= target.scrollTop
            if(this.topHeight-scrollTop > 80){
                 console.log(this.$refs.topContent)
                this.$refs.topContent.style.top= (this.topHeight-scrollTop)+'px'
            }else{
                this.$refs.topContent.style.top= '80px'
            }
        },
        // 添加主模板
        handleAddTem(){
            if(this.$route.query.hw === '01'){
                this.visiblesHw01= true
            }
        }
    }
}
</script>

<style lang="less">
.templateDetail {
    position: relative;
    padding-top: 49px;
    .topContent {
        position: fixed;
        left: 180px;
        top: 125px;
        width: calc(100% - 186px);
        height: 50px;
        background-color: #f5f7fa;
        z-index: 99;
        line-height: 50px;
        text-align: center;
        padding-right: 5%;
        box-sizing: border-box;
        border: 1px solid #EBEEF5;
        color: #666;
        button {
            float: right;
            margin-top: 10px;
        }
    }
    .dialog_form {
        .el-dialog__body {
            padding: 15px 30px;
             form {
                    .el-form-item {
                        margin-bottom:20px;
                    }
                    .el-form-item__label {
                        padding: 0;
                        line-height: 26px;
                    }
                    
                }
        }
       
    }
}
</style>