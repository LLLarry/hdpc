<template>
    <div class="systemTem">
        <el-card class="box-card temTableTitle" v-for="(item,i) in arr" :key="i">
           <el-table
                :data="[{}]"
                border
                fit
                style="width: 100%"
                :show-header="false"
                :cell-style="{'background-color': 'rgba(0,211,255,0.06)', 'font-size': '13px',color: '#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="300"
                >
                <template>
                    <div>
                        <strong>模板名称: </strong><span>{{item.temName1}}</span>
                    </div>
                    <div style="margin-top: 15px">
                        <strong>是否支持退费:  </strong><span>{{item.isRef}}</span> <span>(退费标准：时间和电量最小)</span>
                    </div> 
                </template>
                </el-table-column>

                <el-table-column
                prop="communName"
                label="小区名称"
                min-width="300"
                >   
                 <template>
                    <div>
                        <strong>品牌名称:  </strong><span>{{item.temName2}}</span>
                    </div>
                    <div style="margin-top: 15px">
                        <strong>是否钱包强制支付:  </strong><span>{{item.isWalletPay}}</span>
                    </div> 
                </template>
                </el-table-column>
                <el-table-column
                prop="communName"
                label="小区名称"
                min-width="300"
                >
                  <template>
                    <div>
                        <strong>售后电话:</strong><span>{{item.phone}}</span>
                    </div>
                    <div style="margin-top: 15px">&nbsp;
                    </div> 
                </template>
                </el-table-column>
           </el-table>
            <el-table
            :data="item.tableData"
            border
            fit
            style="width: 100%"
            :header-cell-style="{background:'#f5f7fa',color:'#666','font-size': '13px'}"
            :cell-style="{'font-size': '13px',color: '#666'}"
            :span-method="arraySpanMethod"
            >
            <el-table-column
            prop="name"
            label="显示名称"
            min-width="150"
            >
            </el-table-column>
             <el-table-column
            prop="money"
            label="充电价格"
            min-width="200"
            >
            <template slot-scope="scope">
                {{scope.row.money}}元
            </template>
            </el-table-column>
            <el-table-column
            prop="time"
            label="充电时间"
            min-width="200"
            >
            <template slot-scope="scope">
                {{scope.row.time}}分钟
            </template>
            </el-table-column>
            <el-table-column
            prop="power"
            label="消耗电量"
            min-width="200"
            >
            <template slot-scope="scope">
                {{scope.row.power}}度
            </template>
            </el-table-column>
            <el-table-column
            prop="handle"
            label="操作"
            min-width="150"
            >
            <template slot-scope="scope">
                <el-button type="primary" size="mini">编辑</el-button>
                <el-button type="danger" size="mini">删除</el-button>
            </template>
            </el-table-column>
            </el-table>
             <div style="margin-top: 20px; text-align: center">
                <el-button type="primary" size="mini">添加模板</el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            arr: [
                    {
                        temName1: '充电系统默认模板',
                        temName2: '和动充电站',
                        phone: '1569365326',
                        isRef: 1,
                        isWalletPay: 2,
                        tableData: [
                                {
                                    name: '1元 4小时',
                                    money:1.0,
                                    time: 240,
                                    power: 1,
                                },
                                {
                                    name: '8元 8小时',
                                    money:2.0,
                                    time: 480,
                                    power: 2,
                                }
                            ]
                    },
                    {
                        temName1: '充电系统默认模板',
                        temName2: '和动充电站',
                        phone: '1569365326',
                        isRef: 1,
                        isWalletPay: 2,
                        tableData: [
                                {
                                    name: '1元 4小时',
                                    money:1.0,
                                    time: 240,
                                    power: 1,
                                },
                                {
                                    name: '8元 8小时',
                                    money:2.0,
                                    time: 480,
                                    power: 2,
                                }
                            ]
                    }
            ],
            
        }
    },
    methods: {
        arraySpanMethod({ row, column, rowIndex, columnIndex }){
            console.log(row, column, rowIndex, columnIndex )
            if(row.last){
                return[rowIndex,5]
            }
        }
    }
}
</script>

<style lang="less" scope>
.systemTem {
    .temTableTitle {
        // tbody {
        //     td {
        //         padding: 0;
        //     }
        // }
    }
}
</style>