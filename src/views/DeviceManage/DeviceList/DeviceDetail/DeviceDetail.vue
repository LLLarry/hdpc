<template>
    <div class="deviceDetail">
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
                        <el-button type="primary" size="mini" icon="el-icon-view">查看地图</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="upDate"
                label="更新经纬度"
                min-width="120"
                >
                     <template slot-scope="{row}">
                        <el-button type="primary" size="mini" icon="el-icon-position">更新经纬度</el-button>
                    </template>
                </el-table-column>
            </el-table>

        </el-card>

        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>000001设备使用的模板</span>
            </div>
            <Template :from="2" :list="temChargeList" />
        </el-card>
        <!-- <el-card class="box-card">
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
        </el-card> -->
        <!-- 端口状态 -->
         <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>端口状态</span>
            </div>
            <el-table
                :data="portStatus"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="port"
                label="端口号"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="端口状态"
                min-width="120"
                >
                    <template slot-scope="{row}">
                        <el-link :type="row.status== 1 ? 'success': row.status== 2 ? 'danger': 'default' " size="mini" :underline="false" >
                            {{row.status== 1 ? '空闲': row.status== 2 ? '使用': '故障'}}
                        </el-link>
                    </template>
                </el-table-column>
                <el-table-column
                prop="free"
                label="是否空闲"
                min-width="120"
                >
                是
                </el-table-column>
                <el-table-column
                prop="time"
                label="充电时间（分钟）"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="power"
                label="充电功率（W）"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="surEle"
                label="剩余电量（度）"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="recMoney"
                label="可回收余额"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="update"
                label="实时更新"
                min-width="100"
                >
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini" icon="el-icon-refresh-left">更新</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="lock"
                label="锁定"
                min-width="120"
                >
                    <template slot-scope="{row}">
                        <el-button type="danger" size="mini" plain icon="el-icon-lock">锁定</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="unLock"
                label="解锁"
                min-width="120"
                >
                    <template slot-scope="{row}">
                        <el-button type="success" size="mini" icon="el-icon-unlock">解锁</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="log"
                label="日志"
                min-width="120"
                >
                    <template slot-scope="{row}">
                        <el-link type="primary">查看</el-link>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                prop="see"
                label="查看"
                min-width="120"
                >
                    <template slot-scope="{row}">
                        <el-button type="primary" size="mini">查看地图</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                prop="upDate"
                label="更新经纬度"
                min-width="120"
                >
                     <template slot-scope="{row}">
                        <el-button type="primary" size="mini">更新经纬度</el-button>
                    </template>
                </el-table-column> -->
            </el-table>
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
            moduleInfo: [
                {
                    code: '000001',
                    CCID: '89860433161871471648',
                    IMEI: '868994034714761',
                    hwVerson: '04',
                    hwVersonNum: '00',
                    sfVerson: '03',
                    single: 31
                }
            ],
            mapInfo: [{longitude: '116.4811810',latitude: '39.9897920'}],
            portStatus: [
                {
                port: '01',
                status: 1,
                time: 320,
                power: 137.6,
                surEle: 1.53,
                recMoney: 2.36,
                },
                {
                port: '01',
                status: 2,
                time: 320,
                power: 137.6,
                surEle: 1.53,
                recMoney: 2.36,
                },
                 {
                port: '01',
                status: 3,
                time: 320,
                power: 137.6,
                surEle: 1.53,
                recMoney: 2.36,
                },
            ],
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