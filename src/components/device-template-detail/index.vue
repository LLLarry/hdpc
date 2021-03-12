<template>
    <div class="templateDetail">
        <div class="topContent" ref="topContent">
            <span class="title">
                {{  
                    $route.query.hw == '03' ? '模拟投币模板' : 
                    $route.query.hw == '04' ? '离线卡模板' : 
                    $route.query.hw == '07' ? '汽车桩模板' : 
                    $route.query.hw == '08' ? 'V3充电模板': '充电模板'
                }}
            </span>
            <el-button type="primary" icon="el-icon-plus" size="mini" @click="handleAddTem">添加主模板</el-button>
        </div>

        <TemplateCharge 
            :from="3" 
            :list="temChargeList" 
            v-if="$route.query.hw == '01' " 
            :source="source" 
            :arecode="arecode" 
        /> <!--充电模板-->

        <TemplateCoin 
            :from="3" 
            :list="temCoinList" 
            v-else-if="$route.query.hw == '03' " 
            :source="source" :arecode="arecode" 
        /> <!--脉冲模板-->

        <TemplateOffline 
            :from="3" 
            :list="temOfflineList" 
            v-if="$route.query.hw == '04' "  
            :source="source" 
            :arecode="arecode" 
        /> <!--离线卡模板-->

        <TemplateCart 
            :from="3" 
            :list="temChargeList" 
            v-if="$route.query.hw == '07' "  
            :source="source" 
            :arecode="arecode" 
            @handleReLoad="handleReLoad" 
        />
        <!--
        <GradeTemplate 
            :from="3" 
            :list="tempgather" 
            v-if="$route.query.hw == '01' " 
            :source="source" 
            :arecode="arecode" 
        />
        -->

        <TemplateV3   
            :from="3"  
            :list="temV3List" 
            v-if="$route.query.hw == '08'" 
            @handleReLoad="handleReLoad" 
            :deviceNum="code"  
        />
        
        <el-dialog 
            :title="
                    $route.query.hw == '03' ? '新增模拟投币模板' : 
                    $route.query.hw == '04' ? '新增离线卡模板' : 
                    $route.query.hw == '07' ? '新增汽车桩充电模板' : 
                    $route.query.hw == '08' ? '新增V3充电模板': '新增充电模板'
                " 
            :visible.sync="visiblesHw01" 
            :width="['07', '08'].includes($route.query.hw) ? '95vw' : '450px'" 
            custom-class="dialog_form" 
            validate="handleSubmit1"
        >
            <!-- 添加汽车桩模板 -->
            <TemplateCart  
                v-if="visiblesHw01 && $route.query.hw == '07'"  
                :from="4"  
                :list="addCartTem" 
                ref="template-cart"
            />
            <!-- 添加V3模板 -->
            <TemplateV3  
                v-else-if="visiblesHw01 && $route.query.hw == '08'"  
                :from="4"  
                :list="addV3Tem" 
                :getFrom="getFrom" 
                @getDataFromTem="getDataFromTem"
            ></TemplateV3>
            <!-- 添加V3以外的模板 -->
            <el-form 
                :model="hwForm" 
                label-position="top" 
                :rules="rule1" 
                ref="hwForm1" 
                v-else-if="visiblesHw01 && $route.query.hw != '08' && $route.query.hw != '07'"
            >
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
                <el-form-item label="是否支持支付宝充电" label-width="150px"  v-if="$route.query.hw != '04' && $route.query.hw != '03'">
                    <el-radio-group v-model="hwForm.ifalipay">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否创建分等级模板" label-width="150px"  v-if="$route.query.hw != '04' && $route.query.hw != '03'">
                    <el-radio-group v-model="hwForm.grade" :disabled="tempgather.length > 0">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="visiblesHw01 = false">取 消</el-button>
                <el-button type="primary" @click="handleSubmitAddTemp">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
const time= new Date().getTime() // 当前时间的时间戳
const tempv3= [
    {
        "common1": "",
        "common2": 1,
        "chargeInfo": "付费方式两种：\n1  按时间付费（先充电后扣费，公众号钱包需预充值）\n2   按金额付费。 先付费，显示充电时间为二轮车最长时间。实际充电时间为机器自动检测功率后计算的时间，比显示时间要少。",
        "stairid": 0,
        "gather3": [
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 60,
                "chargeQuantity": 100,
                "remark": null,
                "telephone": null,
                "type": 3,
                "common3": null,
                "money": 1,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "1元",
                "id": time-1,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 120,
                "chargeQuantity": 200,
                "remark": null,
                "telephone": null,
                "type": 3,
                "common3": null,
                "money": 2,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "2元",
                "id": time-2,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 180,
                "chargeQuantity": 300,
                "remark": null,
                "telephone": null,
                "type": 3,
                "common3": null,
                "money": 3,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "3元",
                "id": time-3,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 240,
                "chargeQuantity": 400,
                "remark": 0,
                "telephone": null,
                "type": 3,
                "common3": null,
                "money": 4,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "4元",
                "id": time-4,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 300,
                "chargeQuantity": 500,
                "remark": 0,
                "telephone": null,
                "type": 3,
                "common3": null,
                "money": 5,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "5元",
                "id": time-5,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 360,
                "chargeQuantity": 600,
                "remark": 0,
                "telephone": null,
                "type": 3,
                "common3": null,
                "money": 6,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "6元",
                "id": time-6,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 420,
                "chargeQuantity": 700,
                "remark": null,
                "telephone": null,
                "type": 3,
                "common3": null,
                "money": 7,
                "createTime": "2020-08-13T00:21:32.000+0000",
                "name": "7元",
                "id": time-7,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 480,
                "chargeQuantity": 800,
                "remark": null,
                "telephone": null,
                "type": 3,
                "common3": null,
                "money": 8,
                "createTime": "2020-08-13T00:21:33.000+0000",
                "name": "8元",
                "id": time-8,
                "status": null,
                "tempparid": 281805
            }
        ],
        "ifalipay": 1,
        "remark": "",
        "gather2": [
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 600,
                "chargeQuantity": 0,
                "remark": null,
                "telephone": null,
                "type": 2,
                "common3": null,
                "money": 0,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "充满自停",
                "id": time-9,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 120,
                "chargeQuantity": 0,
                "remark": null,
                "telephone": null,
                "type": 2,
                "common3": null,
                "money": 0,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "2小时",
                "id": time-10,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 240,
                "chargeQuantity": 0,
                "remark": null,
                "telephone": null,
                "type": 2,
                "common3": null,
                "money": 0,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "4小时",
                "id": time-11,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 360,
                "chargeQuantity": 0,
                "remark": 0,
                "telephone": null,
                "type": 2,
                "common3": null,
                "money": 0,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "6小时",
                "id": time-12,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 480,
                "chargeQuantity": 0,
                "remark": 0,
                "telephone": null,
                "type": 2,
                "common3": null,
                "money": 0,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "8小时",
                "id": time-13,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 600,
                "chargeQuantity": 0,
                "remark": 0,
                "telephone": null,
                "type": 2,
                "common3": null,
                "money": 0,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "10小时",
                "id": time-14,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": null,
                "common2": null,
                "brandName": null,
                "chargeTime": 660,
                "chargeQuantity": 0,
                "remark": 0,
                "telephone": null,
                "type": 2,
                "common3": null,
                "money": 0,
                "createTime": "2020-12-14T05:24:08.000+0000",
                "name": "11小时",
                "id": time-15,
                "status": 0,
                "tempparid": 281805
            }
        ],
        "gather1": [
            {
                "common1": "0",
                "common2": "200",
                "brandName": null,
                "chargeTime": 0,
                "chargeQuantity": 0,
                "remark": 0,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 0.25,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "1594286176395",
                "id": time-16,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": "200",
                "common2": "300",
                "brandName": null,
                "chargeTime": 0,
                "chargeQuantity": 0,
                "remark": 0,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 0.35,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "1594286177369",
                "id": time-17,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": "300",
                "common2": "500",
                "brandName": null,
                "chargeTime": 0,
                "chargeQuantity": 0,
                "remark": 0,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 0.45,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "1594286178002",
                "id": time-18,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": "500",
                "common2": "600",
                "brandName": null,
                "chargeTime": 0,
                "chargeQuantity": 0,
                "remark": 0,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 0.7,
                "createTime": "2020-08-13T00:20:05.000+0000",
                "name": "1594286178794",
                "id": time-19,
                "status": 0,
                "tempparid": 281805
            },
            {
                "common1": "600",
                "common2": "800",
                "brandName": null,
                "chargeTime": 75,
                "chargeQuantity": 0,
                "remark": null,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 0.9,
                "createTime": "2020-08-13T00:22:04.000+0000",
                "name": "收费标准25177",
                "id": time-20,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": "1000",
                "common2": "1200",
                "brandName": null,
                "chargeTime": 90,
                "chargeQuantity": 0,
                "remark": null,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 1.2,
                "createTime": "2020-08-13T00:22:05.000+0000",
                "name": "收费标准26351",
                "id": time-21,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": "1200",
                "common2": "1400",
                "brandName": null,
                "chargeTime": 105,
                "chargeQuantity": 0,
                "remark": null,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 1.4,
                "createTime": "2020-08-13T00:22:07.000+0000",
                "name": "收费标准27934",
                "id": time-22,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": "1400",
                "common2": "1600",
                "brandName": null,
                "chargeTime": 120,
                "chargeQuantity": 0,
                "remark": null,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 1.6,
                "createTime": "2020-08-13T00:22:07.000+0000",
                "name": "收费标准28875",
                "id": time-23,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": "1600",
                "common2": "1800",
                "brandName": null,
                "chargeTime": 135,
                "chargeQuantity": 0,
                "remark": null,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 2,
                "createTime": "2020-08-13T00:22:09.000+0000",
                "name": "收费标准30223",
                "id": time-24,
                "status": null,
                "tempparid": 281805
            },
            {
                "common1": "1800",
                "common2": "2100",
                "brandName": null,
                "chargeTime": 150,
                "chargeQuantity": 0,
                "remark": null,
                "telephone": null,
                "type": 1,
                "common3": null,
                "money": 2.1,
                "createTime": "2020-08-13T00:22:11.000+0000",
                "name": "收费标准31925",
                "id": time-24,
                "status": null,
                "tempparid": 281805
            }
        ],
        "temporaryc": 1,
        "createTime": "2020-08-13 08:20:05.0",
        "merchantid": -1,
        "grade": 2,
        "name": "智慧款v3模板"+time,
        "permit": 1,
        "rank": 600,
        "id": -1,
        "walletpay": 1,
        "status": 6
    }
]
const tempCart= [{
  "common2": 1,
  "chargeInfo": "本设备收费标准为：  1元 / 度电",
  "stairid": 0,
  "ifalipay": 1,
  "gather": [
    {
      "common1": null,
      "common2": null,
      "brandName": null,
      "chargeTime": 0,
      "chargeQuantity": 5,
      "remark": 0,
      "telephone": null,
      "type": 0,
      "common3": null,
      "money": 5,
      "createTime": "2021-01-23T07:27:27.000+0000",
      "name": "5元5度电",
      "id": time-1,
      "status": null,
      "tempparid": 6593
    },
    {
      "common1": null,
      "common2": null,
      "brandName": null,
      "chargeTime": 0,
      "chargeQuantity": 10,
      "remark": 0,
      "telephone": null,
      "type": 0,
      "common3": null,
      "money": 10,
      "createTime": "2021-01-23T07:27:27.000+0000",
      "name": "10元10度电",
      "id": time-2,
      "status": null,
      "tempparid": 6593
    },
    {
      "common1": null,
      "common2": null,
      "brandName": null,
      "chargeTime": 0,
      "chargeQuantity": 15,
      "remark": 0,
      "telephone": null,
      "type": 0,
      "common3": null,
      "money": 15,
      "createTime": "2021-01-23T07:27:28.000+0000",
      "name": "15元15度电",
      "id": time-3,
      "status": null,
      "tempparid": 6593
    }
  ],
  "common3": "0",
  "ifmonth": 2,
  "createTime": "2021-01-23 15:27:27.0",
  "merchantid": -1,
  "grade": 2,
  "name": "汽车桩模板",
  "permit": 1,
  "rank": 1,
  "id": -1,
  "walletpay": 2,
  "status": 7
}]
import TemplateCharge from '@/components/common/Template'
import TemplateOffline from '@/components/common/TemplateOffline'
import TemplateCoin from '@/components/common/TemplateCoin'
import TemplateCart from '@/components/common/TemplateCart'
import GradeTemplate from '@/components/common/GradeTemplate'
import TemplateV3 from '@/components/common/TemplateV3'
import Util from '@/utils/util'
import { getDeviceDetailTemInfo,addTemplate,changeV3ChargeTem,disposeSyncTemplate } from '@/require/template'
import {messageTip} from '@/utils/ele'
import { mapState } from 'vuex'
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
            ],
            temV3List:[],
             temOfflineList: [ //离线卡数据
            ],
            topHeight: 0,//顶部框到顶部固定定位据顶部的距离
            visiblesHw01: false, //版本号为01的模板是否显示
            hwForm: {
                name: '',
                remark: '',
                common1: '',
                permitObj: ["1","1"],
                walletpay: 2,
                grade: 2,
                ifalipay: 1
            },//版本号为01的模板form表单容器
            rule1:{
                name: [{required: true,message: '模板名称不能为空', trigger: 'change'}]
            }, // 表单1的校验
            addV3Tem: tempv3,
            addCartTem: tempCart, // 新增汽车桩模板
            getFrom: false //父组件时候向子组件获取值
        }
    },
    components: {
        TemplateCharge,
        TemplateCoin,
        TemplateOffline,
        GradeTemplate,
        TemplateV3,
        TemplateCart
    },
    created(){
        let {code,merid,hw}= this.$route.query
        this.code= code
        this.merid= merid
        this.hw= hw
        // this.asyGetDeviceDetailTemInfo({devicenum: this.code,merid})
        this.$store.dispatch('asyGetDeviceDetailTemInfo',{devicenum: this.code,merid})
    },
    mounted(){
        // 获取topContent距顶部的距离，滚动让其定位，离开组件时销毁
        const mainElement= document.getElementsByClassName('main')[0]
        if(mainElement){
            this.topHeight= parseFloat(Util.getAttr(this.$refs.topContent,'top'))
            mainElement.addEventListener('scroll',this.handleTopTitle)
            // 组件销毁时移除滚动
            this.$once('hook:beforeDestroy',()=>{
                mainElement.removeEventListener('scroll',this.handleTopTitle)
            })
        }
    },
    computed: {
        ...mapState(['temDetail'])
    },
    watch: {
        temDetail(temListInfo,oldVal){
            if(temListInfo.code == 200){
                    this.source= temListInfo.source
                    this.arecode= temListInfo.arecode
                    if(this.hw == '03'){
                        // this.temChargeList= temListInfo.templatelist
                        this.temCoinList= temListInfo.templatelist
                    }else if(this.hw == '04'){
                        this.temOfflineList= temListInfo.templatelist
                    }else if(this.hw == '08'){
                       let newTemList= temListInfo.templatelist.map(val=>{
                            return {...val.gather, ...val }
                        })
                        this.temV3List = newTemList
                    }else{
                        this.temChargeList= temListInfo.templatelist
                        this.tempgather= temListInfo.tempgather || []
                    }
                }else{
                    messageTip('error','获取主模板失败')
            }
        }
    },
    methods: {
        handleTopTitle(e){
            e= e || window.event
            let target= e.target || e.srcElement
            let scrollTop= target.scrollTop
            let topContent= this.$refs.topContent
            if(this.topHeight-scrollTop > 80){
                topContent.style.top= (this.topHeight-scrollTop)+'px'
            }else{
                topContent.style.top= '80px'
            }
        },
        // 添加主模板
        handleAddTem(){
            if(this.$route.query.hw === '08'){
                this.addV3Tem=tempv3
                this.getFrom= false
            }
            this.visiblesHw01= true
        },
        // 提交添主模板hw01
        handleSubmit1(){
            this.$refs['hwForm1'].validate((valid)=>{
                let status= 0
                if(valid){
                    if(this.$route.query.hw === '03' || this.$route.query.hw === '04'){
                        const {name,remark,common1,walletpay}= this.hwForm
                        status= this.$route.query.hw === '03' ? 2 : 1
                         const data= {
                            name,
                            remark,
                            common1,
                            status,
                            walletpay,
                            merid: this.merid
                        }
                        addTemplate(data).then(res=>{
                                if(res.code === 200){
                                    if(this.$route.query.hw === '03'){ //脉冲模板
                                        this.temCoinList.push(res.data[0])
                                    }else{ //离线充值机模板
                                        this.temOfflineList.push(res.data[0])
                                    }   
                                }
                            }).catch(error=>{})

                    }else{
                        status= 0
                         const {name,remark,common1,walletpay,grade,permit: permitObj,ifalipay}= this.hwForm
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
                                grade,
                                status, //0充电模板
                                merid: this.merid,
                                ifalipay
                            }
                            addTemplate(data).then(res=>{
                                if(res.code === 200){
                                    if(grade == 2){ //添加的普通模板
                                        this.temChargeList.push(res.data[0])
                                    }else if(grade == 1){ //添加分等级模板
                                        // this.tempgather.push(res.data[0])
                                        this.$store.dispatch('asyGetDeviceDetailTemInfo',{devicenum: this.code,merid})
                                    }   
                                }
                            }).catch(error=>{})
                    }
                }
                this.visiblesHw01= false
            })
        },
        // 添加v3充电新模板
        handleSubmit08(){
            this.getFrom= true
        },
        async getDataFromTem(data){ //接收添加v3模板传过来的值
            try {
                if(data.name.length > 0 ){
                    data.merid= this.merid
                    let info= await changeV3ChargeTem({ paratem: JSON.stringify(data) })
                    if(info.code === 200){
                        this.handleReLoad(()=>{})
                        messageTip('success','添加成功')  
                    }else{
                        messageTip('error','添加失败')
                    }
                    this.addV3Tem = tempv3
                    this.getFrom= false
                    this.visiblesHw01= false
                }else{
                    messageTip('warning','模板名称不能为空！')
                }
            }catch(e){
                this.visiblesHw01= false
            }     
            this.getFrom= false
        },
        handleReLoad(callback){ //v3模板修改成功之后的回调
            this.$store.dispatch('asyGetDeviceDetailTemInfo',{devicenum: this.code,merid: this.merid,callback})
        },
        handleSubmitAddTemp() { // 点击确定，新增模板
            switch(this.$route.query.hw){
                case '07' :
                    this.handleSubmit07()
                    break
                case '08' :
                    this.handleSubmit08()
                    break
                default :
                    this.handleSubmit1()
                    break
            }
           
        },
        async handleSubmit07() { //新增07模板
            const templateCart = this.$refs['template-cart']
            if (templateCart.temForm.name.length <= 0) return messageTip('error', '模板名称不能为空')
            try {
                const info = await disposeSyncTemplate({param: JSON.stringify({...templateCart.temForm, merchantid: this.merid})})
                if (info.code === 200) {
                    this.$store.dispatch('asyGetDeviceDetailTemInfo',{devicenum: this.code,merid: this.merid})
                    this.visiblesHw01= false
                    messageTip('success', '新增成功')
                } else {
                    messageTip('error', info.messageTip)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="less">
.templateDetail {
    table {
        width: 100% !important;
    }
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