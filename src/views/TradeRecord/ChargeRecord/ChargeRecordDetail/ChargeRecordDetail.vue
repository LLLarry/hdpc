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
             <div slot="header" class="clearfix">
                <span>充电日志</span>
             </div>
             <el-table
                :data="tableData"
                :height="clientHeight"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="180">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="180">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
const echarts= require('echarts/lib/echarts')
require("echarts/lib/chart/line");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
export default {
    data(){
        return {
            clientHeight: 700,//屏幕高度
            chargeInfo: [
                {type: '订单号',content: '201910291727353820000013'},
                {type: '付款金额',content: '2.0元'},
                {type: '使用时间',content: '360分钟'},
                {type: '使用电量',content: '2.0度'},
                {type: '最大功率',content: '0瓦'},
                {type: '设备号',content: '000001'},
                {type: '端口号',content: '3'},
                {type: '开始时间',content: '2019-10-29 17:27:43'},
                {type: '结束时间',content: '2019-10-30 11:11:29'},
            ],
             tableData: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                },
                {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
                },
                ]
            }
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
                                data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
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
                            lineStyle: {
                                color: "#22B14C",
                                width: 1
                            }, 
                            areaStyle: {
                                normal: {
                                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    { offset: 0.5, color: "#98E0AD" },
                                    { offset: 0.75, color: "pink" },
                                    { offset: 1, color: "transparent" }
                                    ])
                                }
                            }, 
                            data: [5, 20, 36, 10, 10, 20]
                        }]
            });
        
    }
}
</script>

<style lang="less">

</style>