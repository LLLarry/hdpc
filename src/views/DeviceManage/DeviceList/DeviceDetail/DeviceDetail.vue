<template>
<el-row>
    <el-col :md="22" :lg="21" :xl="20">
    <div class="deviceDetail">
        <TopDetailInfo 
            :bindtype="bindtype" 
            :code="code" 
            :username="username"
            :remark="remark"
            :expirationTime="expirationTime"
            :totalOnlineEarn="totalOnlineEarn"
            @backFn="backFn"
             />
        <!-- 模块信息 -->
        <ModuleInfo v-if="userInfo.classify== 'superAdmin'" :moduleInfo="moduleInfo" :code="code" :mapInfo="mapInfo" />

        <!-- 模板信息 -->
        <el-card class="box-card temCard" id="template_card">
            <div slot="header" class="clearfix">
                <span>{{code}}设备使用的模板（{{hwVerson == '03' ? '脉冲模板': hwVerson== '04' ? '离线模板' : ['08','09','10'].includes(hwVerson) ? 'V3充电模板' :'充电模板'}}）</span>
            </div>
            <!-- 十路智慧款 -->
            <div v-if=" hwVerson != '03' && hwVerson != '04' &&  !['08','09','10'].includes(hwVerson)" >
                <!-- 正常模板 -->
                 <TemplateCharge :from="2" :list="temChargeList" v-if="!isGrade" :deviceInfo="{code:this.code,merid: this.merid, hwVerson: hwVerson}" /> 
                 <!-- 分等级模板 -->
                 <GradeTemplate :from="2" :list="temChargeList" :deviceInfo="{code:this.code,merid: this.merid , hwVerson: hwVerson}" v-else />
            </div>
            <!-- 脉冲模板 -->
            <div v-else-if="hwVerson == '03'">
                <TemplateCoin :from="2" :list="temChargeList" :deviceInfo="{code:this.code,merid: this.merid , hwVerson: hwVerson}" />
            </div>
            <!-- 离线充值机模板 -->
            <div v-else-if="hwVerson == '04'">
                <TemplateOffline :from="2" :list="temChargeList" :deviceInfo="{code:this.code,merid: this.merid , hwVerson: hwVerson}" />
            </div>
            <!-- V3充电模板 -->
           
            <div v-else-if="['08','09','10'].indexOf(hwVerson) !== -1">
                <TemplateV3 :from="2" :list="temChargeList" @handleReLoad="handleReLoad" :deviceInfo="{code:this.code,merid: this.merid , hwVerson: hwVerson}" />
            </div>
        </el-card>
       
        <!-- 00 01 02 03 04 05 06 端口状态 --> 
         <PortStatus 
            :portStatusList="portStatusList" 
            :hwVerson="hwVerson" 
            :code="code" 
            @handleGetPortStatusCallback="handleGetPortStatusCallback"
            @handleLockPortStatusCallback="handleLockPortStatusCallback"
        />
        <!-- 远程充电 -->
        <RemotoCharge 
            :remoteCharge="remoteCharge" 
            :chargeSendList="chargeSendList" 
            :hwVerson="hwVerson" 
            :code="code"
        />
         <!-- 远程充电 -->
         <el-row v-if="!['03','04','07'].includes(hwVerson) &&  userInfo.classify== 'superAdmin' ">
             <el-col :xs="24" :sm="12" >
                  <!-- 查看消费总金额 -->
                 <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span> 查看消费总金额</span>
                    </div>
                    <el-table
                        :data="scanTotalMoney"
                        border
                        fit
                        style="width: 100%"
                        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                        >
                        <el-table-column
                        prop="type"
                        label="类型"
                        min-width="120"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="money"
                        label="金额"
                        min-width="120"
                        >
                        </el-table-column>
                    </el-table>
                     <div class="remoteChargeTit" style="margin-top: 15px; text-align:center;">
                        <el-button type="primary" size="mini">查看消费总金额</el-button>
                    </div>
                </el-card>
             </el-col>
            <el-col :xs="24" :sm="12" style="padding-left: 20px;">
                  <!-- 设置IC卡、投币器是否可用 -->
                 <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>设置IC卡、投币器是否可用</span>
                    </div>
                    <el-table
                        :data="seticCard"
                        border
                        fit
                        style="width: 100%"
                        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                        >
                        <el-table-column
                        prop="type"
                        label="类型"
                        min-width="120"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="handle"
                        label="解锁/锁定"
                        min-width="120"
                        >
                        <template slot-scope="scope">
                            <el-switch
                                v-model="scope.row.handle"
                                :active-value="1"
                                :inactive-value="2"
                                active-text="解锁"
                                inactive-text="锁定">
                            </el-switch>
                        </template>
                        </el-table-column>
                    </el-table>
                     <div class="remoteChargeTit" style="margin-top: 15px; text-align:center;">
                        <el-button type="primary" size="mini">设置</el-button>
                    </div>
                </el-card>
             </el-col>
         </el-row>

         <!-- 报警系统配置 -->
        <AlarmConfig :code="code" :merid="merid" :alarmdata="alarmdata" v-if="hwVerson == '08'" />

        <!-- 设备新的主板信息 -->
         <el-row v-if="['07'].includes(hwVerson)">
             <el-col :xs="24" :sm="12" >
                  <!-- 查看消费总金额 -->
                 <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span> 读取/设置参数</span>
                    </div>
                    <el-table
                        :data="deviceSysList"
                        border
                        fit
                        style="width: 100%"
                        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                        >
                        <el-table-column
                        prop="type"
                        label="类型"
                        min-width="120"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="val"
                        label="金额"
                        min-width="120"
                        >
                        <template slot-scope="{row}">
                            <el-input-number size="small"  v-model="row.val" style="width: 80%" ></el-input-number>
                        </template>
                        </el-table-column>
                    </el-table>
                     <div class="remoteChargeTit" style="margin-top: 15px; overflow: hidden;">
                        <el-button type="success" size="mini" style="float: left; margin-left: 25%;" @click="getBoardRead">读取参数</el-button>
                        <el-button type="primary" size="mini" style="float: right; margin-right: 25%;" @click="getBoardSet">设置参数</el-button>
                    </div>
                </el-card>
             </el-col>
         </el-row>
        <!-- 系统参数 -->
        <SystemParma :systemParamer="systemParamer" :hwVerson="hwVerson" :code="code" :deviceInfo="deviceInfo" :elecTimeFirst="elecTimeFirst" @changeSystemParamerCallBack="changeSystemParamerCallBack" />
        <div class="nav_tag">
            <div class="nav_tag_item">
                <a href="#module_card">
                    <el-tag>模块信息</el-tag>
                </a>
                <a href="#position_card">
                    <el-tag>位置信息</el-tag>
                </a>
                <a href="#template_card">
                    <el-tag>设备模板</el-tag>
                </a>
                <a href="#port_card" v-if="!['03','04'].includes(hwVerson)">
                    <el-tag>端口状态</el-tag>
                </a>
                <a href="#originCharcge_card" v-if="!['03','04'].includes(hwVerson)">
                    <el-tag>远程充电</el-tag>
                </a>
                <a href="#sysParmas_card" v-if="!['03','04'].includes(hwVerson)">
                    <el-tag>系统参数</el-tag>
                </a>
            </div>
        </div>

    </div>
    </el-col>
    <el-col :md="3" :lg="3" :xl="3">&nbsp;</el-col>
</el-row>
</template>

<script>
import TemplateCharge from '@/components/common/Template'
import TemplateV3 from '@/components/common/TemplateV3'
import TemplateCoin from '@/components/common/TemplateCoin'
import TemplateOffline from '@/components/common/TemplateOffline'
import GradeTemplate from '@/components/common/GradeTemplate'

import ModuleInfo from '@/components/device-components/MouleInfo' 
import PortStatus from '@/components/device-components/PortStatus' 
import RemotoCharge from '@/components/device-components/RemoteCharge' 
import SystemParma from '@/components/device-components/SystemParma' 
import TopDetailInfo from '@/components/device-components/TopDetailInfo' 
import AlarmConfig from '@/components/device-components/AlarmConfig' 
import {Loading, Button} from 'element-ui'
import {alertPassword,messageTip,confirDelete} from '@/utils/ele'
import { getDeviceDetailInfo,getsystemParma,savesystemParma,getDeviceStatus,lockDevicePort,remoteChargeByPort,
remoteChargeBreakOff,updateMapPosition,updateDeviceName,updateDeviceExpire,getWolfsetsys,
getWolfreadsys,getWolftestpay ,sendUpdataTip,changeDeviceIMEI,sendUpdataInfo,changeDeviceCode,queryAllAddress} from '@/require/deviceManage'
import Vue from 'vue'
import { mapState,mapMutations } from 'vuex'
export default {
    data(){
        return {
            Loading: null ,//Loading加载实例
            code: '', //设备号
            merid: 0, //默认是 0 绑定了就有值
            username: '0' , //username默认是0，0代表设备未绑定，非0代表设备已绑定
            bindtype: 0, //0为未绑定， 1为绑定
            hwVerson:'01',//硬件版本
            remark: '' , //设备名
            expirationTime: null,//设备到期时间
            totalOnlineEarn: 0, //总在线收益
            dialogVisible: false, //地图默认隐藏
            moduleInfo: [ 
                {title1: '硬件版本',content1: '', title2: '主板版本',content2: '',title3: '经度',content3: ''},
                {title1: '硬件版本号',content1: '', title2: '主板硬件版本',content2: '',title3: '纬度',content3: ''},
                {title1: '软件版本号',content1: '', title2: '主版软件版本',content2: '',title3: '查看地图',content3: ''},
                {title1: 'CCID',content1: '', title2: '主板ID',content2: '',title3: '更新经纬度',content3: ''},
                {title1: 'IMEI',content1: '',  title2: '升级通知',content2: '',title3: '',content3: ''},
                {title1: '信号强度',content1: '', title2: '',content2: '发送升级程序',title3: '',content3: ''}
            ],
            mapInfo: [
                {title: '经度', content: ''},
                {title: '维度', content: ''},
                {title: '查看', content: 'scanMap'},
                {title: '更新经纬度', content: 'updateData'}
            ],
            portStatusList: [],
            isGrade: false, //默认分等级模板为false,当为分等级模板的时候 isGrade= true
            temChargeList: [], 
             temCoinList: [], //模拟投币数据
             temOfflineList: [], //离线卡数据
           
            remoteCharge: [], //远程充电
            scanTotalMoney: [ //查看总金额
                {type: '刷卡总金额',money: ''},
                {type: '投币总金额	',money: ''}
            ],
            seticCard: [ //设置IC卡、投币器是否可用
                {type: '投币器',handle:1},
                {type: 'IC卡',handle:2},
            ],
            deviceSysList: [//设置/读取参数
                {type:'刷卡扣费金额',val: ''},
                {type:'扣费价格',val: ''},
            ],
            chargeSendList: [], // 07 开始充电 （发送充电信息） 
            elecTimeFirst: 0,//这个是设置系统参数的时候另外传的值
            systemParamer: [ //系统参数
                        {
                           type_key: 'coinMin', type: '设置投币充电时间(单位为分钟)', val: 240, unit: '分钟', maxVal: 999, minVal: 0
                        },
                        {
                           type_key: 'cardMin', type: '设置刷卡充电时间 (单位为分钟)', val: 240, unit: '分钟', maxVal: 999, minVal: 0
                        },
                        {
                           type_key: 'coinElec', type: '设置单次投币最大用电量(单位为度,KWH)', val: 1.0, unit: '0.1度', maxVal: 15, minVal: 0.1
                        },
                        {
                           type_key: 'cardElec', type: '设置单次刷卡最大用电量(单位为度,KWH)', val: 1.0, unit: '0.1度', maxVal: 15, minVal: 0.1
                        },
                        {
                           type_key: 'cst', type: '设置刷卡扣费金额(单位为元)', val: 1.0, unit: '元', maxVal: 15, minVal: 0.1
                        },
                        {
                           type_key: 'powerMax1', type: '设置第一档最大充电功率（最大功率以机器支持为准）', val: 200, unit: '瓦', maxVal: 8000, minVal: 50
                        },
                        {
                           type_key: 'powerMax2', type: '设置第二档最大充电功率（最大功率以机器支持为准）', val: 400, unit: '瓦', maxVal: 8000, minVal: 50
                        },
                        {
                           type_key: 'powerMax3', type: '设置第三档最大充电功率（最大功率以机器支持为准）', val: 600, unit: '瓦', maxVal: 8000, minVal: 50
                        },
                        {
                           type_key: 'powerMax4', type: '设置第四档最大充电功率（最大功率以机器支持为准）', val: 800, unit: '瓦', maxVal: 8000, minVal: 50
                        },

                        {
                           type_key: 'powerTim2', type: '设置第二档充电时间百分比', val: 75, unit: '%', maxVal: 100, minVal: 1
                        },
                        {
                           type_key: 'powerTim3', type: '设置第三档充电时间百分比', val: 50, unit: '%', maxVal: 100, minVal: 1
                        },
                        {
                           type_key: 'powerTim4', type: '设置第四档充电时间百分比', val: 25, unit: '%', maxVal: 100, minVal: 1
                        },
                        {
                           type_key: 'spRecMon', type: '是否支持余额回收（1为支持 0为不支持)', val: 1, unit: '无', maxVal: 1, minVal: 0
                        },
                        {
                           type_key: 'spFullEmpty', type: '是否支持断电自停（1为支持 0为不支持)', val: 1, unit: '无', maxVal: 1, minVal: 0
                        },

                        {
                           type_key: 'fullPowerMin', type: '设置充电器最大浮充功率 （功率为瓦，当充电器功率低于这个值的话，可视为充电器已充满)', val: 30, unit: '瓦', maxVal: 200, minVal: 0
                        },
                        {
                           type_key: 'fullChargeTime', type: '设置浮充时间 （充电器充满变绿灯之后的，继续浮充时间，单位为分钟）', val: 120, unit: '分钟', maxVal: 240, minVal: 0
                        },
                        {
                           type_key: 'elecTimeFirst1', type: '是否初始显示电量 （此功能是否支持和设备相关）', val: 0, unit: '无', maxVal: '1表示屏幕初始显示剩余电量，0表示初始时间， 255表示不支持此功能', minVal: 0
                        },
                    ],
            deviceInfo: {},//模板复用的信息
            alarmdata: {}, //报警系统容器
            addrlist: [],//从机地址，
            selectIndex: 0 // 选中的从机
        }
    },
    components: {
        TemplateCharge,
        TemplateV3,
        TemplateCoin,
        TemplateOffline,
        GradeTemplate,
        ModuleInfo,
        PortStatus,
        RemotoCharge,
        SystemParma,
        TopDetailInfo,
        AlarmConfig
    },
    created(){
        this.code= this.$route.query.code
        this.asyGetDeviceDetailInfo({code: this.code})
        const warpHeight= (document.documentElement.clientHeight - 80)*0.75
        this.warpHeight= warpHeight
        
        // this.$bus.$on('changeSelectIndex',(index)=>{ //监听修改selectInde
        //     this.selectIndex= index
        //     this.sendMessageToMachine('selectIndex',index)
        // })
    },
    mounted(){
        document.getElementsByClassName('main')[0].scrollTop= '0px'
    },
    beforeDestroy(){
        this.Loading && this.Loading.close()
        // this.$bus.$off('changeSelectIndex')
    },
    deactivated(){
       this.Loading && this.Loading.close()
    //    this.$bus.$off('changeSelectIndex')
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapMutations(['clearToken']),
        backFn(){ //绑定成功之后的回调
           this.asyGetDeviceDetailInfo({code: this.code}) 
        },
        async asyGetDeviceDetailInfo(data,callback){
            let _this= this
            let loading= Loading.service({
                        lock: true,
                        text: '加载中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            try{
                let deviceInfo= await getDeviceDetailInfo(data)
                callback && callback() //执行v3模板回调
                _this.username= deviceInfo.username
                _this.merid= deviceInfo.merid
                let  {code,ccid:CCID,imei:IMEI,hardversion:hwVerson,hardversionnum:hwVersonNum,softversionnum:sfVerson,
                csq:single,lat:latitude,lon:longitude,remark,expirationTime,mainid,mainType,mainHardver,mainSoftver,totalOnlineEarn }= deviceInfo.equipment
                this.deviceInfo= {merid: deviceInfo.merid,hwVerson,code}
               _this.remark= remark 
                _this.moduleInfo=[ //设备信息  
                    {title1: '硬件版本',content1: hwVerson, title2: '主板版本',content2: mainType,title3: '经度',content3: longitude},
                    {title1: '硬件版本号',content1: hwVersonNum, title2: '主板硬件版本',content2: mainHardver,title3: '纬度',content3: latitude},
                    {title1: '软件版本号',content1: sfVerson, title2: '主版软件版本',content2: mainSoftver,title3: '查看地图',content3: ''},
                    {title1: 'CCID',content1: CCID, title2: '主板ID',content2: mainid,title3: '更新经纬度',content3: ''},
                    {title1: 'IMEI',content1: IMEI,  title2: '升级通知',content2: '',title3: '',content3: ''},
                    {title1: '信号强度',content1: single, title2: '发送升级程序',content2: '',title3: '',content3: ''}
                ],
                _this.mapInfo= [ //经纬度信息
                    {title: '经度', content: longitude},
                    {title: '维度', content: latitude},
                    {title: '查看', content: 'scanMap'},
                    {title: '更新经纬度', content: 'updateData'}
                ],
                _this.hwVerson= hwVerson
                _this.expirationTime= expirationTime
                _this.totalOnlineEarn= totalOnlineEarn
                _this.bindtype= deviceInfo.bindtype
                _this.alarmdata= {
                    resultData: deviceInfo.resultData,
                    resultDoorsill: deviceInfo.resultDoorsill
                }
                if(['03','04','08','09','10'].indexOf(hwVerson) === -1){
                    if(deviceInfo.temp != null){ //temp存在，说明此模板不是分等级模板
                        //十路智慧款
                        let {id,name,remark,common1,permit,walletpay,common2,gather,merchantid,chargeInfo,ifalipay}= deviceInfo.temp //merchantid是模板所属商户的id，可以通过它来判断是否是系统模板
                            common2= common2 == null ? 1 : common2
                            // console.log(id,name,remark,common1,permit,walletpay,common2,gather)
                        _this.temChargeList= [{id,name,remark,common1,permit,walletpay,common2,gather,merchantid,chargeInfo,ifalipay}]
                
                    }else{ //分等级模板
                        _this.isGrade= true  //将分等级设为true
                         _this.temChargeList= deviceInfo.templist || []
                    }
                }else if(['08','09','10'].includes(hwVerson)){
                    _this.temChargeList= [ deviceInfo.templatev3 ]
                }else{ //其他模板
                     let {id,name,remark,common1,permit,walletpay,common2,gather,merchantid}= deviceInfo.temp
                     _this.temChargeList= [{id,name,remark,common1,permit,walletpay,common2,gather,merchantid}]
                }
                // 系统参数
                 _this.portStatusList= deviceInfo.allPortStatusList || []
                 _this.remoteCharge= JSON.parse(JSON.stringify(deviceInfo.allPortStatusList || [] ))// 非07设备的远程充电
                 _this.chargeSendList= JSON.parse(JSON.stringify(deviceInfo.allPortStatusList || [] ))  //07设备的远程充电
                 _this.remoteCharge= _this.remoteCharge.map((item,i)=>{ //给remoteCharge的键赋值
                      item.chargeTime= 240
                      item.elePower= 1.0
                      return item
                })
                 _this.chargeSendList= _this.remoteCharge.map((item,i)=>{ //给remoteCharge的键赋值
                      item.chargeTime= 60
                      item.elePower= 1.0
                      item.money= 1.0
                      return item
                })

                let sysparam= deviceInfo.sysparam
                let systemParamer=  _this.systemParamer
                this.elecTimeFirst= sysparam && sysparam.elecTimeFirst ? sysparam.elecTimeFirst : 0 //设置参数需要传递的值

                _this.systemParamer= systemParamer.map((item,i)=>{
                    item.val= sysparam[item.type_key]== null ? item.val : sysparam[item.type_key]
                    return item
                })
                this.sendMessageToMachine('addrlist',this.addrlist) //machine
                loading.close()
            }
            catch(error){
                 loading.close()
            }
        },
        getBoardSet(){ //设置参数 07
        
            let cst= this.deviceSysList[0].val
            let elec_pri= this.deviceSysList[1].val
             let loading= Loading.service({
                lock: true,
                text: '加载中',
                spinner: 'el-icon-loading',
                customClass: "loadClass"
            });
            this.Loading= loading
            getWolfsetsys({code: this.code,cst,elec_pri}).then(res=>{
               if(res.wolferror == 1001){
                   messageTip('error',res.wolfmsg || '设置超时，请稍后重试')
               }else{
                   messageTip('success','设置成功')
               }
               loading.close()
            }).catch(err=>{
               loading.close()
            })
        },
        getBoardRead(){ //07 读取
            let loading= Loading.service({
                        lock: true,
                        text: '加载中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            getWolfreadsys({code: this.code}).then(res=>{
               if(res.wolferror == 1001){
                   messageTip('error',res.wolfmsg || '读取超时，请稍后重试')
               }else{
                   messageTip('success','读取成功')
                   this.deviceSysList[0].val= res.cst
                   this.deviceSysList[1].val= res.elec_pri
               }
               loading.close()
            }).catch(err=>{
                loading.close()
            })
        },
        handleGetPortStatusCallback({index,copeRow}){ //更新页面的回调
            let row= this.portStatusList[index]
            let portStatusListCope= JSON.parse(JSON.stringify(this.portStatusList))
            portStatusListCope[index]= { ...row, ...copeRow }
            this.portStatusList= portStatusListCope
        },
        handleLockPortStatusCallback({index,portStatus}){ //锁定端口状态
             let row= this.portStatusList[index]
             let portStatusListCope= JSON.parse(JSON.stringify(this.portStatusList))
             portStatusListCope[index]= { ...row, portStatus }
             this.portStatusList= portStatusListCope
        },
        changeSystemParamerCallBack(newSystemParmamer){ //修改系统参数
            this.systemParamer= newSystemParmamer
        },
        handleReLoad(callback){ //v3模板的回调函数
            this.asyGetDeviceDetailInfo({code: this.code},callback)
        },
        sendMessageToMachine(type,data){ //发送数据到选择主机组件
            this[type]= data
            this.$bus.$emit('machine-data',{type,data})
        },
        getAddrList(type,data){ //获取从机地址
            this[type]= data
            this.$bus.$emit('machine-data',{type,data})
        },
        async handleQueryAllAddr(){ //查询所有的从机地址
          try{
            let info= await queryAllAddress({code:this.code})
            if(info.code == 200){
              this.addrlist= info.addrlist
              this.sendMessageToMachine('addrlist',this.addrlist)
            }else{
                messageTip('error',info.message)
            }
          }catch(e){
            messageTip('error','获取异常')
            console.log(e)
          }
        },

    }
}
</script>

<style lang="less">

.deviceDetail {
    table {
        width: 100% !important;
    }
    background-color: #F8F8F9;
    .code_handle {
        float: left;
        margin-right: 40px;
        &:last-of-type {
            margin-right: 0;
        }
    }
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
   
    .el-card {
        .colCon {
            font-size: 14px !important;
        }
    }
    .mapDialog {
        width: 80vw;
        height: 85vh;
        margin-top: 9vh !important;
        .el-dialog__body{
            height: calc(100% - 120px);
        }
    }
    .amap-wrapper {
        width: 500px;
        height: 500px;
    }
    .nav_tag {
        position: fixed;
        z-index: 3;
        top: 100px;
        right: 20px;
        .nav_tag_item {
            // opacity: 0;
            // transition: opacity .3s;  
            a {
                display: block;
                margin-bottom: 15px;
            }
        }
        // &:hover {
        //     .nav_tag_item {
        //         opacity: 1;
        //         transform: translateY(0);
        //     }
        // }
    }
    .lastInput {
        .el-input__inner {
            text-align: center;
        }
    }
    .sysAlert {
        position: fixed;
        left: 180px;
        top: 80px;
        bottom: 0;
        right: 0;
        background-color: rgba(255,255,255,.8 );
        z-index: 999;
        .box-card {
            margin-top: 5%;
        }
        
    }
    .oveflow_ecllipsis{
        &.active {
            color: #409EFF;
        }
    }
}
</style>