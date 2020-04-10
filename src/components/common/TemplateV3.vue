<template>
    <div class="templateV3">
         <el-card :class="['box-card','temTableTitle', (from==3 && item.pitchon==1) ? 'selectedTem' : '']" v-for="(item,i) in arr" :key="i">
            <el-table
                :data="[{}]"
                border
                fit
                style="width: 100%"
                :show-header="false"
                :cell-style="{'background-color': 'rgba(0,211,255,0.06)', 'font-size': '13px',color: '#666'}"
            >
                <el-table-column
                    min-width="300"
                >
                    <template slot-scope="scope">
                        <div>
                            <strong>模板名称: </strong>
                            <span v-if="!isEditingTem" class="top_span">{{item.name}}</span>
                            <el-input v-else size="mini" v-model="temForm.name" style="width: 70%; display: inline-block" placeholder="请输入模板名称"></el-input>
                        </div>
                        <div style="margin-top: 15px">&nbsp;</div> 
                    </template>
                </el-table-column>
                 <el-table-column
                    min-width="300"
                >
                     <template slot-scope="scope">
                        <div>
                            <strong>品牌名称:  </strong>
                            <span v-if="!isEditingTem" class="top_span">{{item.remark}}</span>
                            <el-input v-else size="mini" v-model="temForm.remark" style="width: 70%; display: inline-block" placeholder="请输入品牌名称"></el-input>
                        </div>
                        <div style="margin-top: 15px">&nbsp;</div> 
                    </template>
                </el-table-column>
                <el-table-column
                    min-width="200"
                >
                    <template slot-scope="scope">
                        <div>
                            <strong>售后电话:</strong>
                            <span v-if="!isEditingTem" class="top_span">{{item.common1}}</span>
                            <el-input v-else size="mini" v-model="temForm.common1" style="width: 70%; display: inline-block" placeholder="请输入售后电话"></el-input>
                        </div>
                        <div style="margin-top: 15px">&nbsp;
                        </div> 
                    </template>
                </el-table-column>
                <el-table-column
                    prop="communName"
                    label="小区名称"
                    width="200"
                >
                    <template slot-scope="scope">
                        <div>
                            <strong>操作</strong>
                        </div>
                        <div style="margin-top: 15px" v-if="!isEditingTem">
                            <el-button type="primary" size="mini" @click="handleEdit(item)" >编辑</el-button>
                            <el-button type="danger" size="mini" >删除</el-button>
                        </div>
                        <div style="margin-top: 15px" v-else>
                            <el-button type="success" size="mini" @click="handleSave" >保存</el-button>
                            <el-button type="warning" size="mini" @click="handleCancel(item)" >取消</el-button>
                        </div> 
                    </template>
                </el-table-column>
            </el-table>
            <el-table
                :data="item.gather1"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'rgba(245, 247, 250, 0.49)',color:'#666','font-size': '13px'}"
                :cell-style="{'font-size': '13px',color: '#666'}"
            >
                <el-table-column
                    prop="province"
                    label="收费标准"
                    width="120"
                    label-class-name="chargeType"
                >
                    <el-table-column
                        prop="money"
                        label="每小时收费"
                        min-width="200"
                    >
                        <template slot-scope="scope">
                            <div v-if="isEditingTem"> 
                                <el-input-number 
                                    size="mini" 
                                    v-model="temForm.gather1[scope.$index].money" 
                                    style="width: 50%;margin-right: 10px;" 
                                    placeholder="请输入每小时收费金额"
                                    :step="1"
                                    :precision="1"
                                    :min="0"
                                ></el-input-number>元</div>
                            <span v-else> {{scope.row.money}}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="power"
                        label="功率区间"
                        min-width="200"
                    >
                        <template slot-scope="scope">
                             
                            <div v-if="isEditingTem"> 
                                <el-input-number 
                                    size="mini" 
                                    :step="10" 
                                    :precision="0" 
                                    :min="0" 
                                    v-model="temForm.gather1[scope.$index].common1" 
                                    style="width: 30%;margin-right: 10px;" 
                                    placeholder="请输入起始功率"
                                ></el-input-number>
                                ~
                                <el-input-number 
                                    size="mini" 
                                    :step="10" 
                                    :precision="0" 
                                    :min="0"
                                    v-model="temForm.gather1[scope.$index].common2" 
                                    style="width: 30%;margin-right: 10px;" 
                                    placeholder="请输入结束功率"
                                ></el-input-number>W
                            </div>
                            <span v-else> {{scope.row.common1}}W ~ {{scope.row.common2}}W</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="handle"
                        label="操作"
                        min-width="60"
                    >
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="handleDeleteChildTem(item.id,scope.row.id)"  v-if="!scope.row.edit" :disabled="item.pitchon ==1 || from== 2" :plain="item.pitchon ==1 || from== 2" icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>    
            </el-table>
            <div class="addItem">
                <el-button type="primary" size="mini" @click="handleAddItem(item,'gather1')">添加一行</el-button>
            </div>
            <el-table
                :data="item.gather2"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'rgba(245, 247, 250, 0.49)',color:'#666','font-size': '13px'}"
                :cell-style="{'font-size': '13px',color: '#666'}"
            >
                <el-table-column
                    prop="province"
                    label="按照时间充电"
                    width="120"
                    label-class-name="chargeType"
                >
                    <el-table-column
                        prop="name"
                        label="显示名称"
                        min-width="200"
                    >
                        <template slot-scope="scope">
                            <div v-if="isEditingTem"> 
                                <el-input 
                                    size="mini" 
                                    v-model="temForm.gather2[scope.$index].name" 
                                    style="width: 50%;margin-right: 10px;" 
                                    placeholder="请输入显示名称"
                                ></el-input></div>
                            <span v-else> {{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="chargeTime"
                        label="充电时间"
                        min-width="200"
                    >
                        <template slot-scope="scope">
                            <div v-if="isEditingTem"> 
                                <el-input-number 
                                    size="mini"
                                    :step="10"
                                    :min="0"
                                    :precision="0"
                                    v-model="temForm.gather2[scope.$index].chargeTime" 
                                    style="width: 50%;margin-right: 10px;" 
                                    placeholder="请输入充电时间"
                                ></el-input-number>分钟
                            </div>
                            <span v-else> {{scope.row.chargeTime}}分钟</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="handle"
                        label="操作"
                        min-width="60"
                    >
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="handleDeleteChildTem(item.id,scope.row.id)"  v-if="!scope.row.edit" :disabled="item.pitchon ==1 || from== 2" :plain="item.pitchon ==1 || from== 2" icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table-column>    
            </el-table>
            <div class="addItem">
                <el-button type="primary" size="mini" @click="handleAddItem(item,'gather2')">添加一行</el-button>
            </div>
            <div class="v3MaskWrapper">
                <div class="v3Mask" v-show="isEditingTem ? (temForm.permit === 1 ? false : true) : (item.permit === 1 ? false : true)">
                    暂未开启临时充电
                </div>
                <div class="v3Child3header">
                   <el-row>
                       <el-col :span="8">
                            <strong>是否支持临时充电:  </strong>&nbsp;&nbsp;
                            <span v-if="!isEditingTem" :class="[item.permit === 1  ? 'green': 'red']">{{item.permit === 1 ? '是': '否'}}</span>
                            <el-radio-group v-model="temForm.permit" v-else>
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
                       </el-col>
                       <el-col :span="8">按照金额充电（临时充电）</el-col>
                       <el-col :span="8">
                            <strong>是否支持退费:  </strong>&nbsp;&nbsp;
                            <span v-if="!isEditingTem" :class="[item.walletpay === 1  ? 'green': 'red']">{{item.walletpay === 1 ? '是': '否'}}</span>
                            <el-radio-group v-model="temForm.walletpay" v-else>
                                <el-radio :label="1">是</el-radio>
                                <el-radio :label="2">否</el-radio>
                            </el-radio-group>
                       </el-col>
                   </el-row>
                </div>
                <el-table
                    :data="item.gather3"
                    border
                    fit
                    style="width: 100%"
                    :header-cell-style="{background:'rgba(245, 247, 250, 0.49)',color:'#666','font-size': '13px'}"
                    :cell-style="{'font-size': '13px',color: '#666'}"
                >
                    <el-table-column
                        prop="name"
                        label="显示名称"
                        min-width="200"
                    >
                        <template slot-scope="scope">
                            <div v-if="isEditingTem"> 
                                <el-input 
                                    size="mini" 
                                    v-model="temForm.gather3[scope.$index].name" 
                                    style="width: 50%;margin-right: 10px;" 
                                    placeholder="请输入显示名称"
                                ></el-input></div>
                            <span v-else> {{scope.row.name}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="money"
                        label="付款金额"
                        min-width="200"
                    >
                        <template slot-scope="scope">
                            <div v-if="isEditingTem"> 
                                <el-input-number 
                                    size="mini"
                                    :step="1"
                                    :min="0"
                                    :precision="1" 
                                    v-model="temForm.gather3[scope.$index].money" 
                                    style="width: 50%;margin-right: 10px;" 
                                    placeholder="请输入付款金额"
                                ></el-input-number>元
                            </div>
                            <span v-else> {{scope.row.money}}元</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="handle"
                        label="操作"
                        min-width="60"
                    >
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="handleDeleteChildTem(item.id,scope.row.id)"  v-if="!scope.row.edit" :disabled="item.pitchon ==1 || from== 2" :plain="item.pitchon ==1 || from== 2" icon="el-icon-delete">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                <div class="addItem">
                    <el-button type="primary" size="mini" @click="handleAddItem(item,'gather3')">添加一行</el-button>
                </div>
            </div>
            <!-- <div style="text-align: center; padding-top: 15px;">
               <el-button type="success" style="width: 200px;" size="mini">保存模板</el-button>
            </div> -->
         </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return{
            temForm: {},//存放编辑主模板的容器
            isEditingTem: false, //是都正在编辑
        }
    },
    props: ['from','list'],
    computed: {
        arr(){
            return this.list
        }
    },
    methods: {
        handleEdit(item){ //点击编辑模板
            this.temForm = JSON.parse(JSON.stringify(item))
            this.isEditingTem= true
        },
        handleSave(){ //点击保存按钮

        },
        handleCancel(item){ //点击取消保存
            this.temForm = JSON.parse(JSON.stringify(item))
            this.isEditingTem= false
        }, 
        handleAddItem(item,from){
            let newItem
            if(from === 'gather1'){
                if(item['gather1'].length > 0){ //根据最后一项数据计算
                    let lastItem= item['gather1'][item['gather1'].length-1]
                    let rate1= lastItem.common2-lastItem.common1 //这个是获取功率间隔
                    let newPowerEnd= lastItem.common2+rate1
                    let rate2= lastItem.money/lastItem.common2 //这个是1W多少钱
                    let newMoney= rate1*rate2+lastItem.money//这个新收费钱数
                    newItem= { money:newMoney,common1: lastItem.common2,common2: newPowerEnd }
                }else{ //使用默默人的
                    newItem= { money:1,common1: 0,common2: 200 }
                }  
            }else if(from === 'gather2'){
                if(item['gather2'].length > 0){ //根据最后一项数据计算
                    let lastItem= item['gather2'][item['gather2'].length-1]
                    let newChargeTime= lastItem.chargeTime+60
                    let newName= `${newChargeTime/60}小时`
                    newItem= { name: newName, chargeTime: newChargeTime }
                    console.log(newItem)
                }else{ //使用默默人的
                    newItem= newItem= { name: 1, chargeTime: 60 }
                }  
            }else if(from === 'gather3'){
                if(item['gather3'].length > 0){ //根据最后一项数据计算
                    let lastItem= item['gather3'][item['gather3'].length-1]
                    let newMoney= lastItem.money+1
                    let newName= newMoney+'元'
                    newItem= { name: newName, money: newMoney }
                    console.log(newItem)
                }else{ //使用默默人的
                    newItem= newItem= { name: 1, money: 1 }
                }  
            }
        }
    }
}
</script>

<style lang="less">
    .chargeType {
        text-align: center;
    }
    .addItem {
        text-align: center;
        border-left: 1px solid #EBEEF5;
        border-right: 1px solid #EBEEF5;
        padding: 8px 0;
        button {
            width: 200px;
        }
    }
    .v3MaskWrapper {
        position: relative;
        .v3Mask {
            position: absolute;
            left: 1px;
            right: 1px;
            top: 49px;
            bottom: 1px;
            background: rgba(255,255,255,.8);
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            color: #000;
        }
        .v3Child3header {
            height: 48px;
            padding: 12px 0;
            box-sizing: border-box;
            background: rgba(245, 247, 250, 0.49);
            color: rgb(102, 102, 102);
            font-size: 13px;
            border: 1px solid #EBEEF5;
            border-bottom: none;
            .el-col {
                text-align: center;
                &:nth-child(2){
                    font-weight: bold;
                }
            }
        }
    }
    .green {
        color: #6BD089;
    }
    .red {
        color: #F47378;
    }
</style>