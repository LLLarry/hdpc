<template>
    <div class="templateDetail">
        <div class="topContent" ref="topContent">
            <span class="title">{{temType === 2 ? '在线卡模板' : '钱包模板' }}</span>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddTem">添加主模板</el-button>
        </div>
       
        <el-dialog 
            :title="temType === 2 ? '新增在线卡模板' : '新增钱包模板'" 
            :visible.sync="visibles" 
            :width="'450px'" 
            custom-class="dialog_form" 
            validate="handleSubmit1">
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
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visibles = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmit1">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import TemplateCharge from '@/components/common/Template'
import TemplateOffline from '@/components/common/TemplateOffline'
import TemplateCoin from '@/components/common/TemplateCoin'
import GradeTemplate from '@/components/common/GradeTemplate'
import TemplateV3 from '@/components/common/TemplateV3'
import Util from '@/utils/util'
import {messageTip} from '@/utils/ele'
import { mapState } from 'vuex'
export default {
    data(){
        return{
            topHeight: 0,//顶部框到顶部固定定位据顶部的距离
            visibles: false, //添加模板是否显示
            temType: 1, // 1钱包模板 2在线卡模板
            hwForm: {},//版本号为01的模板form表单容器
            rule1:{
                name: [{required: true,message: '模板名称不能为空', trigger: 'change'}]
            }, // 表单1的校验
        }
    },
    components: {
        TemplateCharge,
        TemplateCoin,
        TemplateOffline,
        GradeTemplate,
        TemplateV3
    },
    created(){
        let {temType}= this.$route.query
        this.temType= temType
    },
    mounted(){
        // 获取topContent距顶部的距离，滚动让其定位，离开组件时销毁
        this.topHeight= parseFloat(Util.getAttr(this.$refs.topContent,'top'))
        document.getElementsByClassName('main')[0].addEventListener('scroll',this.handleTopTitle)
    },
    beforeDestroy(){
       document.getElementsByClassName('main')[0].removeEventListener('scroll',this.handleTopTitle)
    },
    deactivated(){
        document.getElementsByClassName('main')[0].removeEventListener('scroll',this.handleTopTitle)
    },
    // computed: {
    //     ...mapState(['temDetail'])
    // },
    // watch: {
    //     temDetail(temListInfo,oldVal){
    //         if(temListInfo.code == 200){
    //                 this.source= temListInfo.source
    //                 this.arecode= temListInfo.arecode
    //                 if(this.hw == '03'){
    //                     // this.temChargeList= temListInfo.templatelist
    //                     this.temCoinList= temListInfo.templatelist
    //                 }else if(this.hw == '04'){
    //                     this.temOfflineList= temListInfo.templatelist
    //                 }else if(this.hw == '08'){
    //                    let newTemList= temListInfo.templatelist.map(val=>{
    //                         return {...val.gather, ...val }
    //                     })
    //                     this.temV3List = newTemList
    //                 }else{
    //                     this.temChargeList= temListInfo.templatelist
    //                     this.tempgather= temListInfo.tempgather || []
    //                 }
    //             }else{
    //                 messageTip('error','获取主模板失败')
    //         }
    //     }
    // },
    methods: {
        handleTopTitle(e){
            console.log(e)
            e= e || window.event
            let target= e.target || e.srcElement
            let scrollTop= target.scrollTop
            if(this.topHeight-scrollTop > 80){
                this.$refs.topContent.style.top= (this.topHeight-scrollTop)+'px'
            }else{
                this.$refs.topContent.style.top= '80px'
            }
        },
        // 添加主模板
        handleAddTem(){
            this.visibles= true
        },
        // 提交添主模板hw01
        handleSubmit1(){
            this.$refs['hwForm1'].validate((valid)=>{
                let status= 0
                if(valid){
                    console.log(valid)
                    console.log(this.hwForm)
                    if(temType == 1){ //钱包模板

                    }else{ //在线卡模板

                    }
                    this.visibles= false
                }
            })
        },
        // handleReLoad(callback){ //v3模板修改成功之后的回调
        //     this.$store.dispatch('asyGetDeviceDetailTemInfo',{devicenum: this.code,merid: this.merid,callback})
        // }
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
        width: calc(100% - 196px);
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