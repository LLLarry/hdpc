<template>
    <div class="templateDetail">
        <div class="topContent" ref="topContent">
            <span class="title">{{$route.query.hw == '03' ? '模拟投币模板' : $route.query.hw == '04' ? '离线卡模板': '充电模板'}}</span>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddTem">添加主模板</el-button>
        </div>
        <Template :from="3" :list="temChargeList" v-if="$route.query.hw == '01' " :source="source" :arecode="arecode" /> <!--充电模板-->
        <TemplateCoin :from="3" :list="temCoinList" v-else-if="$route.query.hw == '03' " :source="source" :arecode="arecode" /> <!--脉冲模板-->
        <TemplateOffline :from="3" :list="temOfflineList" v-if="$route.query.hw == '04' "  :source="source" :arecode="arecode" /> <!--离线卡模板-->
        <GradeTemplate :from="3" :list="tempgather" v-if="$route.query.hw == '01' " :source="source" :arecode="arecode" />
        <el-dialog :title="$route.query.hw == '03' ? '新增模拟投币模板' : $route.query.hw == '04' ? '新增离线卡模板': '新增充电模板'" :visible.sync="visiblesHw01" width="450px" custom-class="dialog_form" validate="handleSubmit1">
            <el-form :model="hwForm" label-position="top" :rules="rule1" ref="hwForm1">
                <el-form-item label="模板名称" label-width="120px" prop="name">
                    <el-input v-model="hwForm.name" autocomplete="off" placeholder="请输入模板名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌名称" label-width="120px">
                    <el-input v-model="hwForm.remark" autocomplete="off" placeholder="请输入品牌名称"></el-input>
                </el-form-item>
                <el-form-item label="售后电话" label-width="120px">
                    <el-input v-model="hwForm.common1" autocomplete="off" placeholder="请输入售后电话"></el-input>
                </el-form-item>
                <el-form-item label="是否支持退费" label-width="150px" v-if="$route.query.hw != '04' && $route.query.hw != '03'">
                    <el-cascader
                        v-model="hwForm.permitObj"
                        :options="[{
                            value: '1',
                            label: '是',
                            children: [{
                                    value: '1',
                                    label: '时间和电量最小',
                                },
                                {
                                    value: '2',
                                    label: '时间最小',
                                },
                                {
                                    value: '3',
                                    label: '电量最小',
                                }]
                        },
                        {
                            value: '2',
                            label: '否'
                        }]"
                        :props="{ expandTrigger: 'hover' }"
                        size="mini">
                    </el-cascader>
                </el-form-item>
                <el-form-item label="是否钱包强制支付" label-width="150px"  v-if="$route.query.hw != '04' && $route.query.hw != '03'">
                    <el-radio-group v-model="hwForm.walletpay">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否创建分等级模板" label-width="150px"  v-if="$route.query.hw != '04' && $route.query.hw != '03'">
                    <el-radio-group v-model="hwForm.grade" disabled>
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visiblesHw01 = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit1">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import Template from '@/components/common/Template'
import TemplateOffline from '@/components/common/TemplateOffline'
import TemplateCoin from '@/components/common/TemplateCoin'
import GradeTemplate from '@/components/common/GradeTemplate'
import Util from '@/utils/util'
import { getDeviceDetailTemInfo } from '@/require/template'
import {messageTip} from '@/utils/ele'
export default {
    data(){
        return{
            code: '',
            merid: '',
            hw: '01',
            source: 1,
            arecode:'',
            temChargeList: [], 
            tempgather: [], //分等级模板
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
            hwForm: {
                name: '',
                remark: '',
                common1: '',
                permitObj: ["1","1"],
                walletpay: 2,
                grade: 2
            },//版本号为01的模板form表单容器
            rule1:{
                name: [{required: true,message: '模板名称不能为空', trigger: 'change'}]
            }, // 表单1的校验
        }
    },
    components: {
        Template,
        TemplateCoin,
        TemplateOffline,
        GradeTemplate
    },
    created(){
        let {code,merid,hw}= this.$route.query
        this.code= code
        this.merid= merid
        this.hw= hw
        this.asyGetDeviceDetailTemInfo({devicenum: this.code,merid})
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
        async asyGetDeviceDetailTemInfo(data){
            let _this= this
            try{
                let temListInfo= await getDeviceDetailTemInfo(data)
                if(temListInfo.code == 200){
                    this.source= temListInfo.source
                    this.arecode= temListInfo.arecode
                    if(this.hw == '03'){
                        // this.temChargeList= temListInfo.templatelist
                        this.temCoinList= temListInfo.templatelist
                    }else if(this.hw == '04'){
                        this.temOfflineList= temListInfo.templatelist
                    }else{
                        this.temChargeList= temListInfo.templatelist
                        this.tempgather= temListInfo.tempgather || []
                    }
                }else{
                    messageTip('danger','获取主模板失败')
                }
            }catch(error){

            }
        },
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
            // if(this.$route.query.hw === '01'){
            //     this.visiblesHw01= true
            // }
            this.visiblesHw01= true
        },
        // 提交添主模板hw01
        handleSubmit1(){
            this.$refs['hwForm1'].validate((valid)=>{
                if(valid){
                    if(this.$route.query.hw === '03' || this.$route.query.hw === '04'){
                        const {name,remark,common1}= this.hwForm
                         const data= {
                            name,
                            remark,
                            common1
                        }
                        console.log(data)
                    }else{
                         const {name,remark,common1,walletpay,grade,permit: permitObj}= this.hwForm
                        let permit= this.hwForm.permitObj[0]
                        let common2= ''
                        if(this.hwForm.permitObj.length == 2){
                            common2= this.hwForm.permitObj[1]
                        }
                        const data= {
                                name,
                                remark,
                                common1,
                                permit,
                                common2,
                                walletpay,
                                grade
                            }
                            console.log(data)
                    }
                }
            })
        },
    }
}
</script>

<style lang="less">
.templateDetail {
    position: relative;
    padding: 69px 20px 0 20px;
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