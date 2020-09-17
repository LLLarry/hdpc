<template>
  <div class="temperHistory">
      <el-row class="echartCon_c">
          <el-col :md="12" :lg="15">
              <div id="echartCon"></div>
          </el-col>
          
          <el-col :md="12" :lg="9">
            <el-card shadow="hover" class="history-table">
                <div slot="header" class="clearfix">
                    <span>历史记录</span>
                </div>
                <el-table
                    :data="tableData"
                    max-height="70vh"
                    border
                    :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                    style="width: 100%">
                    <el-table-column
                    prop="time"
                    label="日期">
                    </el-table-column>
                    <el-table-column
                    prop="value"
                    :label="this.type == 1 ? '温度（℃）' : this.type == 4 ? '电量（KW·h）' : ''">
                    </el-table-column>
                </el-table>
            </el-card>              
          </el-col>
      </el-row>
      
    </div>
</template>

<script>
import { inquireWebWarnData } from '@/require/deviceManage'
import { messageTip } from '@/utils/ele'
import Utils from '@/utils/util'
let loading //loading实例
export default {
    data(){
        return {
            myChart: null, // myChart实例
            listtime: [],
            listvalue: [],
            tableData: [],
            type: 1,
            merid: -1,
            code: '',
        }
    },
    created(){
        const { code,merid,type}= this.$route.query
        this.code= code
        this.merid= merid
        this.type= type
    },
    mounted(){
        loading= new Utils.Hd_Loading()
        const myChart = echarts.init(document.getElementById('echartCon'));
        this.myChart= myChart
        this.asyInquireWebWarnData({code: this.code,merid: this.merid,type: this.type})
    },
    beforeDestroy(){ //关闭前销毁
        loading && loading.hide()
    },
    deactivated(){ //关闭前销毁 （keep-alive销毁回调）
        loading && loading.hide()
    },
    methods:{
        async asyInquireWebWarnData(data){
            try{
                loading && loading.show()
                let info= await inquireWebWarnData(data)
                if(info.code){
                    this.listtime= info.listtime
                    this.listvalue= info.listvalue
                    this.tableData= this.listtime.map((item,index)=>({time: item,value:info.listvalue[index] }))
                    this.myChart.setOption(this.getOptions())
                }
            }catch(e){
                messageTip('error',`获取历史${this.type == 1 ? '温度' : this.type == 4 ? '电量' : ''}失败`)
            }finally{
                loading && loading.hide()
            }
        },
        getOptions(){
            return {
                    xAxis: {
                        type: 'category',
                        name: '日期',
                        nameGap: 5,
                        axisLabel:{
                            color:'#666',
                            fontSize : 15
                        },   // x轴字体颜色 
                        axisLine:{
                                lineStyle:{color:'#666'}    // x轴坐标轴颜色
                                },
                        axisTick:{
                                lineStyle:{color:'#666'}    // x轴刻度的颜色
                                },
                        data:this.listtime
                    },
                    yAxis: {
                        name: this.type == 1 ? '温度（℃）' : this.type == 4 ? '电量（KW·h）' : '',
                        type: 'value',
                        axisLabel:{
                            color:'#666',
                            fontSize : 15
                        },   
                        axisLine:{
                                lineStyle:{color:'#666'}    
                                },
                        axisTick:{
                                lineStyle:{color:'#666'}    
                                },
                    },
                    title: {
                        text: this.type == 1 ? `${this.code}设备历史温度` : this.type == 4 ? `${this.code}设备历史电量` : '',
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
                    series: [
                        {
                        name: '功率',
                        type: 'line',
                        smooth: true, //曲线平滑
                        itemStyle: {
                            color:  "#22B14C",
                            // normal: {label : {show: true}}
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
                        markLine: { //基准线
                            silent: true,
                            lineStyle: {
                                normal: {
                                    color: '#D43C33',                   // 这儿设置安全基线颜色
                                    opacity: this.type == 1 ? 1 : 0
                                },
                            },
                            data: [{
                                yAxis: 62
                            }],
                            label: {
                                show: this.type == 1,
                                formatter: '报警温度',           // 这儿设置安全基线
                                // normal: {
                                //     formatter: '报警温度',           // 这儿设置安全基线
                                // }
                            },
                        },
                        data: this.listvalue
                    }]
                }
        }
    }
}
</script>

<style lang="less">
    .temperHistory {
        .echartCon_c {
            width: 100%;
            padding-top: 20px;
            #echartCon {
                width: 95%;
                height: 70vh;
            }
        }
        
    }

</style>