<template>
    <div class="chargeRecordDetail">
        <el-row>
            <el-col :xs="24" :sm="14" :md="15" :lg="17" :xl="18" style="
            
            height: 0;
            padding-top: 40%;
            position: relative;
            float: left">
            <div id="echartCon" style="position: absolute; left: 0;top:20px;right:0;bottom: 0;">
                
            </div>
            </el-col>
            <el-col :xs="24" :sm="10" :md="9" :lg="7" :xl="6">
                 <el-card class="box-card">
                    <div slot="header" class="clearfix">
                        <span>已使用信息</span>
                    </div>
                    <el-table
                        :data="chargeInfo"
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
                        prop="content"
                        label="类型"
                        min-width="220"
                        >
                        </el-table-column>
                    </el-table>
                 </el-card>
            </el-col>
        </el-row>
        <el-card>
             <div slot="header" class="clearfix" style="text-align: center;">
                <span>充电日志</span>
             </div>
             <el-table
                :data="tableData"
                :max-height="clientHeight"
                border
                style="width: 100%">
                <el-table-column
                prop="index"
                label="序号"
                min-width="100">
                <template slot-scope="scope">
                   {{ scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="code"
                label="设备号"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="port"
                label="端口号"
                 min-width="100"
                >
                </el-table-column>

                 <el-table-column
                prop="chargetime"
                label="剩余时间(min)"
                 min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="surpluselec"
                label="剩余电量(kW·h)"
                 min-width="120"
                >
                <template slot-scope="{row}">
                    {{ row.surpluselec/100}}
                </template>
                </el-table-column>

                <el-table-column
                prop="power"
                label="实时功率(W)"
                 min-width="120"
                >
                </el-table-column>

                 <el-table-column
                prop="createtime"
                label="记录时间"
                 min-width="150"
                >
                <template slot-scope="{row}">
                   <div v-html="row.createtime && row.createtime.length > 0 ? ($fmtDate(row.createtime).replace('</br>',' ')) : '— —'"></div>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
// const echarts= require('echarts/lib/echarts')
// require("echarts/lib/chart/line");
// require('echarts/lib/component/tooltip');
// require('echarts/lib/component/title');
import { getpowerLineInfo } from '@/require/tradeRecord'
export default {
    data(){
        return {
            clientHeight: 700,//屏幕高度
            chargeInfo: [
                {type: '订单号',content:'' },
                {type: '付款金额',content: ''},
                {type: '使用时间',content: ''},
                {type: '使用电量',content: ''},
                {type: '最大功率',content: ''},
                {type: '设备号',content: ''},
                {type: '端口号',content: ''},
                {type: '开始时间',content: ''},
                {type: '结束时间',content: ''},
            ],
             tableData: [],
             orderid: 0, //请求的订单id
             myChart: null,
        }
    },
    created(){
         this.orderid= this.$route.query.orderid || 0
        this.asyGetpowerLineInfo({orderid: this.orderid})
    },
    beforeMount(){
        // 获取屏幕高度
        let h= document.documentElement.clientHeight || document.body.clientHeight
        this.clientHeight= (h-180)*0.85

    },
    mounted(){
        var myChart = echarts.init(document.getElementById('echartCon'));
        myChart.setOption({
                         xAxis: {
                                type: 'category',
                                name: '分钟',
                                nameGap: 5,
                                axisLabel:{color:'#666'},   // x轴字体颜色 
                                axisLine:{
                                        lineStyle:{color:'#666'}    // x轴坐标轴颜色
                                        },
                                axisTick:{
                                        lineStyle:{color:'#666'}    // x轴刻度的颜色
                                        },
                                //  data:_this.timeList
                            },
                            yAxis: {
                                name: '功率（W）',
                                type: 'value',
                                axisLabel:{color:'#666'},   
                                axisLine:{
                                        lineStyle:{color:'#666'}    
                                        },
                                axisTick:{
                                        lineStyle:{color:'#666'}    
                                        },
                            },
                            title: {
                                text: '充电功率曲线',
                                textStyle : {
                                fontSize: 18,
                                color: '#333',
                                fontWeight: 'bold',
                                fontFamily: 'monospace'
                                },
                                left: '3%'
                            },
                        grid: {
                            left: '7%',
                            bottom: 30,
                            right: '5%'
                        },
                        series: [{
                            name: '销量',
                            type: 'line',
                            smooth: true, //曲线平滑
                            itemStyle: {
                                color:  "#22B14C"
                            },
                            lineStyle: {
                                 normal: {
                                    color: "#22B14C",
                                    lineStyle: {
                                        color: "#22B14C",
                                        width:1
                                    }
                                },
                            }, 
                            // data: _this.powerList
                        }]
            });
        this.myChart= myChart
    },
    methods: {
        async asyGetpowerLineInfo(data){
            let _this=  this
            try{
                let powerInfo= await getpowerLineInfo(data)
                if(powerInfo.code === 200){
                    let timeList= []
                    let powerList= []
                    for (const iterator of powerInfo.listpower) {
                        timeList.push(iterator.minuteTime)
                        powerList.push(iterator.power)
                    }
                    this.timeList= timeList
                    this.powerList= powerList
                    this.myChart.setOption({
                            xAxis: {
                                data: timeList
                            },
                            series: [
                                {
                                    name: '功率',
                                    type:'line',
                                    data: powerList
                                    
                                }
                            ]
                        });
                    this.chargeInfo= [
                        {type: '订单号',content: powerInfo.ordernum},
                        {type: '付款金额',content: `${powerInfo.paymoney}元`},
                        {type: '使用时间',content: `${powerInfo.usetime}分钟`},
                        {type: '使用电量',content: `${powerInfo.useelec/100}度`},
                        {type: '最大功率',content: `${powerInfo.mapdata.maxpower}瓦`},
                        {type: '设备号',content:  powerInfo.devicenum},
                        {type: '端口号',content: powerInfo.port},
                        {type: '开始时间',content: this.$fmtDate(powerInfo.begintime).replace('</br>',' ')},
                        {type: '结束时间',content: this.$fmtDate(powerInfo.endtime).replace('</br>',' ')},
                    ]
                    this.tableData= powerInfo.listdata
                    
                }
            }catch(error){
                
            }
        }
    }
}
</script>

<style lang="less">

</style>