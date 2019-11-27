<template>
    <div class="deviceDetail">
         <el-card class="box-card">
            <el-row>
                <el-col :xs="8" :sm="4" :md="3">
                    <div class="colCon">
                        绑定状态： <el-link :type="username != 0 ? 'success' : 'danger'">{{username != 0 ? '已绑定' : '未绑定'}}</el-link>
                    </div>
                </el-col>
                <el-col :xs="8" :sm="3" :md="3">
                    <div class="colCon">
                        <el-button type="danger" size="mini" v-if="username != 0" @click="handleTaggleBind(2)">解绑设备</el-button>
                        <el-button type="primary" size="mini" v-else @click="handleTaggleBind(1)">绑定设备</el-button>
                    </div>
                </el-col>
                <el-col :xs="8" :sm="4" :md="3">
                    <div class="colCon">
                         设备号: <router-link :to="`/deviceManage/deviceList?devicenum=${code}`"><el-link type="primary">{{code}}</el-link></router-link>
                    </div>
                </el-col>
                <el-col :xs="8" :sm="4">
                    <div class="colCon">
                         绑定商户：
                         <router-link :to="`/usermanage/merInfo?nick=${username}`" v-if="username != 0"><el-link type="primary">{{username}}</el-link></router-link>
                         <span v-else>— —</span> 
                    </div>
                </el-col>
                <el-col :xs="8" :sm="4">
                    <div class="colCon">
                        <!-- <router-link to="/" v-if="deviceInfo.areaName && deviceInfo.areaName.length > 0">
                        
                        </router-link> -->
                        
                         所属小区： {{ '— —'}}
                    </div>
                </el-col>
                <el-col :xs="8" :sm="4">
                    <div class="colCon">
                         电话： {{ '— —'}}
                    </div>
                </el-col>
            </el-row>
         </el-card>
        <!-- 模块信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>模块信息（硬件，软件，IMEI, +CCID）</span>
            </div>
            <el-table
                :data="moduleInfo"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="code"
                label="设备号"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="CCID"
                label="CCID"
                min-width="200"
                >
                </el-table-column>
                <el-table-column
                prop="IMEI"
                label="IMEI"
                min-width="160"
                >
                </el-table-column>
                <el-table-column
                prop="hwVerson"
                label="硬件版本"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="hwVersonNum"
                label="硬件版本号"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="sfVerson"
                label="软件版本号"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="single"
                label="信号强度"
                min-width="80"
                >
                </el-table-column>
            </el-table>

        </el-card>
        <!-- 位置信息 -->
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>位置信息</span>
            </div>
            <el-table
                :data="mapInfo"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="longitude"
                label="经度"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="latitude"
                label="纬度"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="see"
                label="查看"
                min-width="120"
                >
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini" icon="el-icon-view" @click="handleScanMap">查看地图</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="upDate"
                label="更新经纬度"
                min-width="120"
                >
                     <template slot-scope="{row}">
                        <el-button type="primary" size="mini" icon="el-icon-position" @click="upDatePosition">更新经纬度</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>

        <el-card class="box-card temCard">
            <div slot="header" class="clearfix">
                <span>{{code}}设备使用的模板（{{hwVerson == '03' ? '脉冲模板': hwVerson== '04' ? '离线模板' : '充电模板'}}）</span>
            </div>
            <!-- 十路智慧款 -->
            <div v-if=" hwVerson != '03' && hwVerson != '04'" >
                <!-- 正常模板 -->
                 <Template :from="2" :list="temChargeList" v-if="!isGrade" :deviceInfo="{code:this.code,merid: this.merid, hwVerson: hwVerson}" /> 
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
           
        </el-card>
       
        <!-- 端口状态 -->
         <el-card class="box-card" v-if="!['03','04'].includes(hwVerson)">
            <div slot="header" class="clearfix">
                <span>端口状态</span>
            </div>
            <el-table
                :data="portStatusList"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="port"
                label="端口号"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="portStatus"
                label="端口状态"
                width="120"
                >
                    <template slot-scope="{row}">
                        <el-link :type="row.portStatus== 1 ? 'success': row.portStatus== 2 ? 'danger': 'default' " size="mini" :underline="false" >
                            {{row.portStatus== 1 ? '空闲': row.portStatus== 2 ? '使用':  row.portStatus== 3 ? '锁定' : '故障'}}
                            <!-- 自己设置的  portStatus 等于3时为锁定-->
                        </el-link>
                    </template>
                </el-table-column>
               
                <el-table-column
                prop="time"
                label="充电时间（分钟）"
                width="150"
                >
                </el-table-column>
                <el-table-column
                prop="power"
                label="充电功率（W）"
                width="150"
                >
                </el-table-column>
                <el-table-column
                prop="elec"
                label="剩余电量（度）"
                min-width="120"
                >
                <template slot-scope="{row}">
                    {{ row.elec/100 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="surp"
                label="可回收余额"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="updateTime"
                label="更新时间"
                min-width="140"
                >
                 <template slot-scope="{row}">
                    {{ row.updateTime | fmtDate }}
                </template>
                </el-table-column>

                <el-table-column
                prop="update"
                label="实时更新"
                min-width="100"
                >
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini" icon="el-icon-refresh-left" @click="handleGetPortStatus(row)">更新</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lock"
                label="锁定"
                min-width="120"
                >
                    <template slot-scope="{row}">
                        <el-button type="danger" size="mini" plain icon="el-icon-lock" @click="handleLockPort(row)">锁定</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="unLock"
                label="解锁"
                min-width="120"
                >
                    <template slot-scope="{row}">
                        <el-button type="success" size="mini" icon="el-icon-unlock" @click="handleDebloack(row)">解锁</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="log"
                label="日志"
                min-width="120"
                >
                    <template slot-scope="{row}">
                        <router-link :to="`/deviceManage/deviceLog?startTime=&endTime=&devicenum=${code}&port=${row.port}`">
                            <el-link type="primary">查看</el-link>
                        </router-link>
                    </template>
                </el-table-column>
            </el-table>
         </el-card>
        <!-- 远程充电 -->
        <el-card class="box-card" v-if="!['03','04'].includes(hwVerson)">
            <div slot="header" class="clearfix">
                <span>远程充电</span>
            </div>
            <div class="remoteChargeTit" style="margin-bottom: 15px;">
                <el-button type="primary" size="mini">查询空闲端口</el-button>
                <el-button type="primary" size="mini">查询端口状态</el-button>
            </div>
            <el-table
                :data="remoteCharge"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="port"
                label="端口号"
                width="100"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="端口状态"
                min-width="80"
                >
                <template slot-scope="{row}">
                    <el-link :type="row.portStatus== 1 ? 'success': row.portStatus== 2 ? 'danger': 'default' " size="mini" :underline="false" >
                        {{row.portStatus== 1 ? '空闲': row.portStatus== 2 ? '使用':  row.portStatus== 3 ? '锁定' : '故障'}}
                        <!-- 自己设置的  portStatus 等于3时为锁定-->
                    </el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="free"
                label="是否空闲"
                min-width="80"
                >
               <template slot-scope="{row}">
                    <el-link :type="row.portStatus== 1 ? 'success': 'danger' " size="mini" :underline="false" >
                        {{row.portStatus== 1 ? '是': '否'}}
                    </el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="chargeTime"
                label="充电时间（分钟）"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-input-number :controls="false" style="width: 80%; min-width: 120px;" size="small" :max="1500" :min="0" v-model="scope.row.chargeTime" :step="20"></el-input-number>
                </template>
                </el-table-column>
                <el-table-column
                prop="elePower"
                label="充电电量（度）"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-input-number :controls="false" style="width: 80%; min-width: 120px;" size="small" :max="20" :min="0" :precision="2" v-model="scope.row.elePower" :step="1"></el-input-number>
                </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="开始充电"
                width="150"
                >
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini" :icon="row.loading ? 'el-icon-loading' : 'el-icon-open'" @click="handleRemoteCharge(row)">充电</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="远程断电"
                width="150"
                >
                    <template slot-scope="{row}">
                        <el-button type="danger" size="mini" icon="el-icon-turn-off" @click="handleRemoteBreakOff(row)">断电</el-button>
                    </template>
                </el-table-column>
            </el-table>
         </el-card>
         <el-row v-if="!['03','04'].includes(hwVerson)">
             <el-col :xs="24" :sm="12" style="padding: 0 20px;">
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
            <el-col :xs="24" :sm="12" style="padding: 0 20px;">
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
         <el-card class="box-card" v-if="!['03','04'].includes(hwVerson)">
                    <div slot="header" class="clearfix">
                        <span>系统参数表</span>
                    </div>
                    <el-table
                        :data="systemParamer"
                        border
                        fit
                        style="width: 100%"
                        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                        >
                        <el-table-column
                        prop="type"
                        label="类型"
                        min-width="300"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="val"
                        label="数值"
                        min-width="120"
                        >
                        <template slot-scope="{row}">
                            <el-input-number size="small" :max="row.maxVal" :min="row.minVal" v-model="row.val" :step="20" v-if="['coinMin','cardMin'].includes(row.type_key)"></el-input-number>
                            <el-input-number size="small" :max="row.maxVal" :min="row.minVal" v-model="row.val" :precision="1" :step="1" v-if="['coinElec','cardElec'].includes(row.type_key)"></el-input-number>
                            <el-input-number size="small" :max="row.maxVal" :min="row.minVal" v-model="row.val" :precision="1" :step="1" v-if="['cst'].includes(row.type_key)"></el-input-number>
                            <el-input-number size="small" :max="row.maxVal" :min="row.minVal" v-model="row.val"  :step="50" v-if="['powerMax1','power_max_2','power_max_3','power_max_4'].includes(row.type_key)"></el-input-number>
                            <el-input-number size="small" :max="row.maxVal" :min="row.minVal" v-model="row.val"  :step="5" v-if="['power_2_tim','power_3_tim','power_4_tim'].includes(row.type_key)"></el-input-number>
                            <el-input-number size="small" :max="row.maxVal" :min="row.minVal" v-model="row.val"  :step="1" :step-strictly="true" v-if="['spRecMon','spFullEmpty'].includes(row.type_key)"></el-input-number>
                            <el-input-number size="small" :max="row.maxVal" :min="row.minVal" v-model="row.val"  :step="10" v-if="['fullPowerMin'].includes(row.type_key)"></el-input-number>
                            <el-input-number size="small" :max="row.maxVal" :min="row.minVal" v-model="row.val"  :step="10" v-if="['fullChargeTime'].includes(row.type_key)"></el-input-number>
                            <el-input-number size="small" :max="row.maxVal" :min="row.minVal" v-model="row.val"  :step="1" :step-strictly="true" v-if="['elecTimeFirst1'].includes(row.type_key)"></el-input-number>
                        </template>
                        </el-table-column>
                        
                          <el-table-column
                        prop="unit"
                        label="单位"
                        min-width="100"
                        >
                        </el-table-column>
                        <el-table-column
                        prop="maxVal"
                        label="最大值"
                        min-width="120"
                        >
                        
                        </el-table-column>
                        <el-table-column
                        prop="minVal"
                        label="最小值"
                        min-width="120"
                        >
                        </el-table-column>
                    </el-table>
                     <div class="remoteChargeTit" style="margin-top: 15px ; overflow: hidden; ">
                        <el-button type="primary" size="mini" style="float: left; margin-left: 30%;" @click="getDeviceSysParam">读取系统参数</el-button>
                        <el-button type="success" size="mini" style="float: right; margin-right: 30%;" @click="saveDeviceSysParam">保存系统参数</el-button>
                    </div>
                </el-card>
                <!-- 地图弹框 -->
                <el-dialog
                    :title="`${code}设备地图位置`"
                    :visible.sync="dialogVisible"
                    custom-class="mapDialog"
                    >
                     <!-- [{position: [112.421181,35.989792]},{position: [116.481181,35.989792]}] -->
                    <!-- <el-amap :vid="'amap-vue'" ref="tt"></el-amap> -->
                    <el-amap vid="amapDemo" >
                        <el-amap-marker
                         v-for="(marker) in mapList" 
                         :position="marker.position" 
                         :key="marker.position[0]">
                         </el-amap-marker>
                         <el-amap-info-window
                            v-for="(marker) in mapList" 
                            :position="marker.position"
                            :key="marker.position[1]"
                            :content="marker.content"
                            :visible="true"
                            :offset="[0,-28]"
                            >
                         </el-amap-info-window>
                    </el-amap>
                </el-dialog>
                <!-- 设备绑定商户信息框 用户页面传的信息{show: true,from: 1,page: {id: 125}}  page里是用户的信息，包含id等，设备详情传的信息{show: true,from: 1,page: {code: '000001'}}--> 
            <bindMerOrArea :bindInfo="bindInfo" @backFn="backFn"/>  
    </div>
</template>

<script>
import Template from '@/components/common/Template'
import TemplateCoin from '@/components/common/TemplateCoin'
import TemplateOffline from '@/components/common/TemplateOffline'
import GradeTemplate from '@/components/common/GradeTemplate'
import bindMerOrArea from '@/components/common/bindMerOrArea'
import {Loading} from 'element-ui'
import {alertPassword,messageTip} from '@/utils/ele'
import { getDeviceDetailInfo,getsystemParma,savesystemParma,getDeviceStatus,lockDevicePort,remoteChargeByPort,remoteChargeBreakOff,updateMapPosition } from '@/require/deviceManage'
import { unbindDevice } from '@/require'
import Vue from 'vue'
import VueAMap from 'vue-amap';
import { lazyAMapApiLoaderInstance } from 'vue-amap';
export default {
    data(){
        return {
            Loading: null ,//Loading加载实例
            code: '', //设备号
            merid: 0, //默认是 0 绑定了就有值
            username: '0' , //username默认是0，0代表设备未绑定，非0代表设备已绑定
            hwVerson:'01',//硬件版本
            dialogVisible: false, //地图默认隐藏
            bindInfo: {show: false},//默认绑定信息 {show: false,from: 1,page: {code: '0'}}
            deviceInfo: {
                bindStatus: 1,
                code: '000001',
                merName: '',
                areaName: '',
                phone: ''
            },
            moduleInfo: [
                // {
                //     code: '000001',
                //     CCID: '89860433161871471648',
                //     IMEI: '868994034714761',
                //     hwVerson: '04',
                //     hwVersonNum: '00',
                //     sfVerson: '03',
                //     single: 31
                // }
            ],
            mapList: [],
            mapInfo: [],
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
            elecTimeFirst: 0,//这个是设置系统参数的时候另外传的值
            systemParamer: [ //系统参数
                        {
                           type_key: 'coinMin', type: '设置投币充电时间(单位为分钟)', val: 120, unit: '分钟', maxVal: 999, minVal: 0
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
                           type_key: 'cst', type: '设置刷卡扣费金额(单位为元)', val: 1.0, unit: '角', maxVal: 15, minVal: 0.1
                        },
                        {
                           type_key: 'powerMax1', type: '设置第一档最大充电功率（最大功率以机器支持为准）', val: 200, unit: '瓦', maxVal: 3500, minVal: 50
                        },
                        {
                           type_key: 'power_max_2', type: '设置第二档最大充电功率（最大功率以机器支持为准）', val: 144, unit: '瓦', maxVal: 3500, minVal: 50
                        },
                        {
                           type_key: 'power_max_3', type: '设置第三档最大充电功率（最大功率以机器支持为准）', val: 88, unit: '瓦', maxVal: 3500, minVal: 50
                        },
                        {
                           type_key: 'power_max_4', type: '设置第四档最大充电功率（最大功率以机器支持为准）', val: 50, unit: '瓦', maxVal: 3500, minVal: 50
                        },

                        {
                           type_key: 'power_2_tim', type: '设置第二档充电时间百分比', val: 75, unit: '%', maxVal: 100, minVal: 1
                        },
                        {
                           type_key: 'power_3_tim', type: '设置第三档充电时间百分比', val: 50, unit: '%', maxVal: 100, minVal: 1
                        },
                        {
                           type_key: 'power_4_tim', type: '设置第四档充电时间百分比', val: 25, unit: '%', maxVal: 100, minVal: 1
                        },
                        {
                           type_key: 'spRecMon', type: '是否支持余额回收（1为支持 0为不支持)', val: 1, unit: '无', maxVal: 1, minVal: 0
                        },
                        {
                           type_key: 'spFullEmpty', type: '是否支持断电自停（1为支持 0为不支持)', val: 0, unit: '无', maxVal: 1, minVal: 0
                        },

                        {
                           type_key: 'fullPowerMin', type: '设置充电器最大浮充功率 （功率为瓦，当充电器功率低于这个值的话，可视为充电器已充满)', val: 30, unit: '瓦', maxVal: 200, minVal: 0
                        },
                        {
                           type_key: 'fullChargeTime', type: '设置浮充时间 （充电器充满变绿灯之后的，继续浮充时间，单位为分钟）', val: 120, unit: '分钟', maxVal: 240, minVal: 30
                        },
                        {
                           type_key: 'elecTimeFirst1', type: '是否初始显示电量 （此功能是否支持和设备相关）', val: 255, unit: '无', maxVal: 1, minVal: 0
                        },
                    ]
            
        }
    },
    components: {
        Template,
        TemplateCoin,
        TemplateOffline,
        GradeTemplate,
        bindMerOrArea
    },
    created(){
        this.code= this.$route.query.code
        this.asyGetDeviceDetailInfo({code: this.code})
        Vue.use(VueAMap);
        VueAMap.initAMapApiLoader({
        key: '2c85f8508cc8c9c37829d4609cd8cad1',
        plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
        v: '1.4.4',
        });
        lazyAMapApiLoaderInstance.load().then(() => {
        // your code ...
        this.map = new AMap.Map('tt', {
            center: new AMap.LngLat(121.59996, 31.197646)
        });
        });
    },
    mounted(){
        document.getElementsByClassName('main')[0].scrollTop= '0px'
    },
    beforeDestroy(){
        this.Loading && this.Loading.close()
    },
    methods: {
         handleTaggleBind(type){ //绑定或解绑设备
            alertPassword(()=>{
                // 发送请求，进行绑定或解绑操作，成功了之后修改原本的状态
                console.log(type)
                if(type== 1){ //绑定设备
                    this.bindInfo= {show: true,from: 1,page: {code: this.code}}
                }else{ //解绑设备
                    unbindDevice({devicenum: this.code}).then(res=>{
                        if(res.code == 200){
                            messageTip('success','解绑成功')
                            this.asyGetDeviceDetailInfo({code: this.code})       
                        }else{
                            messageTip('error','解绑失败')
                        }
                    }).catch(err=>{})
                }
                
            })
        },
        backFn(bindInfo){ //绑定成功之后的回调
           this.asyGetDeviceDetailInfo({code: this.code}) 
        },
        async asyGetDeviceDetailInfo(data){
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
                _this.username= deviceInfo.username
                _this.merid= deviceInfo.merid
                let  {code,ccid:CCID,imei:IMEI,hardversion:hwVerson,hardversionnum:hwVersonNum,softversionnum:sfVerson,csq:single,lat:latitude,lon:longitude }= deviceInfo.equipment
                _this.moduleInfo= [{code,CCID,IMEI,hwVerson,hwVersonNum,sfVerson,single}] //设备信息
                _this.mapInfo= [{longitude,latitude}] //经纬度信息
                _this.hwVerson= hwVerson
                if(hwVerson != '03' && hwVerson != '04'){
                    if(deviceInfo.temp != null){ //temp存在，说明此模板不是分等级模板
                        //十路智慧款
                        let {id,name,remark,common1,permit,walletpay,common2,gather,merchantid}= deviceInfo.temp //merchantid是模板所属商户的id，可以通过它来判断是否是系统模板
                            common2= common2 == null ? 1 : common2
                            // console.log(id,name,remark,common1,permit,walletpay,common2,gather)
                        _this.temChargeList= [{id,name,remark,common1,permit,walletpay,common2,gather,merchantid}]
                
                    }else{ //分等级模板
                        _this.isGrade= true  //将分等级设为true
                         _this.temChargeList= deviceInfo.templist || []
                    }
                }else{ //其他模板
                     let {id,name,remark,common1,permit,walletpay,common2,gather,merchantid}= deviceInfo.temp
                     _this.temChargeList= [{id,name,remark,common1,permit,walletpay,common2,gather,merchantid}]
                }
                // 系统参数
                 _this.portStatusList= deviceInfo.allPortStatusList || []
                 _this.remoteCharge= deviceInfo.allPortStatusList || []
                 _this.remoteCharge= _this.remoteCharge.map((item,i)=>{ //给remoteCharge的键赋值
                      item.chargeTime= 240
                      item.elePower= 1.0
                      return item
                })
                let sysparam= deviceInfo.sysparam
                let systemParamer=  _this.systemParamer
                thi.elecTimeFirst= sysparam && sysparam.elecTimeFirst ? sysparam.elecTimeFirst : 0 //设置参数需要传递的值
                _this.systemParamer= systemParamer.map((item,i)=>{
                    item.val= sysparam[item.type_key]== null ? item.val : sysparam[item.type_key]
                    return item
                })
                loading.close()
            }
            catch(error){
                 loading.close()
            }
        },
        handleScanMap(){ //点击查看地图
        // [{position: [112.421181,35.989792]},{position: [116.481181,35.989792]}]
            let {longitude,latitude}= this.mapInfo[0]
            this.mapList= [
                {
                    position: [longitude,latitude],
                    content: `<div>设备:${this.code}<div><p>地址：<p>`
                    }
                ]
                console.log(this.mapList)
            this.dialogVisible= true
        },
        upDatePosition(){ //更新地图信息
            updateMapPosition({code: this.code}).then(res=>{
                if(res == 1){
                     messageTip('success','更新位置成功')
                }else{
                    messageTip('error','更新位置失败')
                }
            }).catch(err=>{
               
            })
        },
        handleGetPortStatus(row){ //更新端口状态
            let loading= Loading.service({
                        lock: true,
                        text: '加载中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            getDeviceStatus({port: row.port,code: this.code}).then(res=>{
                loading.close()
                if (res.err == "0") {
                    messageTip('error','获取端口状态失败')
                    return
				}
                row= {...data}
            }).catch(err=>{ 
                loading.close()
            })
        },
        handleLockPort(row){ //锁定端口
            let loading= Loading.service({
                        lock: true,
                        text: '锁定中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            lockDevicePort({port: row.port,status: 0,code: this.code}).then(res=>{
                loading.close()
                if (res.err == "0") {
                    messageTip('error',res.errinfo)
                    return
                }
                if (res.err == "1") {
                    messageTip('error',res.errinfo)
                    return
                }
                let portStatus
                if(res.status == 0){ //当返回的status为0时，portStatus改为3（锁定）
                    portStatus= 3
                }else if(row.portStatus == 3){ //当portStatus为3（锁定）是，设置portStatus为1，为1是空闲
                    portStatus= 1
                }
                row.portStatus= portStatus
            }).catch(err=>{ 
                loading.close()
            })
        },
        handleDebloack(row){ //更新端口
            let loading= Loading.service({
                        lock: true,
                        text: '解锁中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            lockDevicePort({port: row.port,status: 1,code: this.code}).then(res=>{
                loading.close()
                if (res.err == "0") {
                    messageTip('error',res.errinfo)
                    return
                }
                if (res.err == "1") {
                    messageTip('error',res.errinfo)
                    return
                }
                let portStatus
                if(res.status == 1){ //当返回的status为0时，portStatus改为3（锁定）
                    portStatus= 1
                }else if(row.portStatus == 3){ //当portStatus为3（锁定）是，设置portStatus为1，为1是空闲
                    portStatus= 1
                }
                row.portStatus= portStatus
            }).catch(err=>{ 
                loading.close()
            })
        },
        handleRemoteCharge(row){ //远程充电
            let {port:payport,chargeTime:time,elePower:elec }= row
            Vue.set(row,'loading',true)
            remoteChargeByPort({payport,time,elec,code: this.code}).then(res=>{
                Vue.set(row,'loading',false)
                if(res.wolfcode == '1000'){
                    messageTip('success',`端口${port}，远程充电设置成功`)
                }else{
                     messageTip('error',`端口${port}，远程充电设置失败`)
                }
            }).catch(err=>{
                  Vue.set(row,'loading',false)
            })
        },
        handleRemoteBreakOff(row){ //远程断电
            let {port}= row
             Vue.set(row,'loading',true)
            remoteChargeBreakOff({port,code: this.code}).then(res=>{
                 Vue.set(row,'loading',false)
                if(res.wolfcode == '1000'){
                    messageTip('success',`端口${port}，远程充电设置成功`)
                }else{
                     messageTip('error',`端口${port}，远程充电设置失败`)
                }
            }).catch(err=>{
                 Vue.set(row,'loading',false)
            })
            
        },
        getDeviceSysParam(){ //获取设备的系统参数信息
            let loading= Loading.service({
                        lock: true,
                        text: '加载中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            getsystemParma({code:this.code}).then(res=>{
                loading.close()
                if(res.status == '0'){
                    messageTip('error','系统参数获取失败')
                    return
                    let systemParamer=  _this.systemParamer
                    _this.systemParamer= systemParamer.map((item,i)=>{
                        item.val= res['param'+(i+1)]
                        return item
                    })
                }

            }).catch(err=>{ loading.close() })
        },
        saveDeviceSysParam(){ //保存系统参数
            let loading= Loading.service({
                        lock: true,
                        text: '设置中',
                        spinner: 'el-icon-loading',
                        customClass: "loadClass"
                    });
            this.Loading= loading
            let systemParamer=  this.systemParamer
            let parmas= {}
            for (const iterator of systemParamer) {
                if(['coinElec','cardElec','cst'].includes(iterator.type_key)){
                     parmas[iterator.type_key]= iterator.val.toFixed(1)
                }else{
                     parmas[iterator.type_key]= iterator.val
                }
               
            }
            savesystemParma({code: this.code ,elecTimeFirst: this.elecTimeFirst,...parmas}).then(res=>{
                loading.close()
                if (res.status == "0") {
                     messageTip('success','系统参数设置成功')
                     return
                }
                messageTip('error','系统参数设置失败')
            
            }).catch(err=>{  loading.close() })
        }
    }
}
</script>

<style lang="less">
.deviceDetail {
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
}
</style>