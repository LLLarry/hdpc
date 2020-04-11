<template>
    <div class="templateV3">
         <el-card :class="['box-card','temTableTitle', (from==3 && item.pitchon==1) ? 'selectedTem' : '']" v-for="(item,i) in arr" :key="item.id">
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
                            <el-button 
                                type="primary" 
                                size="mini" 
                                icon="el-icon-edit" 
                                @click="handleEdit(item)" 
                            >编辑</el-button>
                            <el-button 
                                type="danger" 
                                size="mini" 
                                icon="el-icon-delete"
                                :plain="from === 1"
                                :disabled="from === 1"
                            >删除</el-button>
                        </div>
                        <div style="margin-top: 15px" v-else>
                            <el-button type="success" size="mini" icon="el-icon-folder-checked" @click="handleSave(i)" >保存</el-button>
                            <el-button type="warning" size="mini" icon="el-icon-folder-delete" @click="handleCancel(item)" >取消</el-button>
                        </div> 
                    </template>
                </el-table-column>
            </el-table>
            <el-row>
                <el-col :span="8">
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
                                min-width="150"
                            >
                                <template slot-scope="scope">
                                    <div v-if="isEditingTem"> 
                                        <el-input-number 
                                            size="mini" 
                                            v-model="temForm.gather1[scope.$index].money" 
                                            style="width: 80%;margin-right: 10px;" 
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
                                :min-width="isEditingTem ? 190 : 150"
                            >
                                <template slot-scope="scope">
                                    <div v-if="isEditingTem"> 
                                        <el-input
                                            size="mini" 
                                            v-model="temForm.gather1[scope.$index].common1" 
                                            style="min-width: 58px; width: 30%;margin-right: 10px;" 
                                            placeholder="请输入起始功率"
                                        ></el-input>
                                        ~
                                        <el-input
                                            size="mini" 
                                            v-model="temForm.gather1[scope.$index].common2" 
                                            style="min-width: 58px; width: 30%;margin-right: 10px;" 
                                            placeholder="请输入结束功率"
                                        ></el-input>W
                                    </div>
                                    <span v-else> {{scope.row.common1}}W ~ {{scope.row.common2}}W</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="handle"
                                label="操作"
                                min-width="90"
                                v-if="!isEditingTem"
                            >
                                <template slot-scope="scope">
                                    <el-button 
                                        type="danger" 
                                        size="mini" 
                                        @click="handleDeleteItem(item,i,'gather1',scope.row.id)" 
                                        icon="el-icon-delete"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table-column>    
                    </el-table>
                    <div class="addItem">
                        <el-button type="primary" size="mini" @click="handleAddItem(item,'gather1')">添加子模板</el-button>
                    </div>
                </el-col>
                <el-col :span="8">
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
                                min-width="120"
                            >
                                <template slot-scope="scope">
                                    <div v-if="isEditingTem"> 
                                        <el-input 
                                            size="mini" 
                                            v-model="temForm.gather2[scope.$index].name" 
                                            style="width: 85%;margin-right: 10px;" 
                                            placeholder="请输入显示名称"
                                        ></el-input></div>
                                    <span v-else> {{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="chargeTime"
                                label="充电时间"
                                min-width="170"
                            >
                                <template slot-scope="scope">
                                    <div v-if="isEditingTem"> 
                                        <el-input-number 
                                            size="mini"
                                            :step="10"
                                            :min="0"
                                            :precision="0"
                                            v-model="temForm.gather2[scope.$index].chargeTime" 
                                            style="width: 75%;margin-right: 10px;" 
                                            placeholder="请输入充电时间"
                                        ></el-input-number>分钟
                                    </div>
                                    <span v-else> {{scope.row.chargeTime}}分钟</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="handle"
                                label="操作"
                                min-width="90"
                                 v-if="!isEditingTem"
                            >
                                <template slot-scope="scope">
                                    <el-button 
                                        type="danger" 
                                        size="mini"
                                        @click="handleDeleteItem(item,i,'gather2',scope.row.id)"  
                                        icon="el-icon-delete"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table-column>    
                    </el-table>
                    <div class="addItem">
                        <el-button type="primary" size="mini" @click="handleAddItem(item,'gather2')">添加子模板</el-button>
                    </div>
                </el-col>
                <el-col :span="8">
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
                                min-width="120"
                            >
                                <template slot-scope="scope">
                                    <div v-if="isEditingTem"> 
                                        <el-input 
                                            size="mini" 
                                            v-model="temForm.gather3[scope.$index].name" 
                                            style="width: 85%;margin-right: 10px;" 
                                            placeholder="请输入显示名称"
                                        ></el-input></div>
                                    <span v-else> {{scope.row.name}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="money"
                                label="付款金额"
                                min-width="170"
                            >
                                <template slot-scope="scope">
                                    <div v-if="isEditingTem"> 
                                        <el-input-number 
                                            size="mini"
                                            :step="1"
                                            :min="0"
                                            :precision="1" 
                                            v-model="temForm.gather3[scope.$index].money" 
                                            style="width: 75%;margin-right: 10px;" 
                                            placeholder="请输入付款金额"
                                        ></el-input-number>元
                                    </div>
                                    <span v-else> {{scope.row.money}}元</span>
                                </template>
                            </el-table-column>
                            <el-table-column
                                prop="handle"
                                label="操作"
                                min-width="90"
                                v-if="!isEditingTem"
                            >
                                <template slot-scope="scope">
                                    <el-button 
                                        type="danger" 
                                        size="mini" 
                                        @click="handleDeleteItem(item,i,'gather3',scope.row.id)"  
                                        v-if="!scope.row.edit" 
                                        icon="el-icon-delete"
                                    >删除</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="addItem">
                            <el-button type="primary" size="mini" @click="handleAddItem(item,'gather3')">添加子模板</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <div class="bottomMenu" v-if="from === 2">
               <el-button type="primary" style="width: 160px;" icon="el-icon-view" size="mini">查看更多</el-button>
               <el-button type="primary" style="width: 160px;" size="mini">此模板复用更多设备</el-button>
            </div>
         </el-card>
    </div>
</template>

<script>
import { confirDelete,messageTip } from '@/utils/ele'
import { deleteTemplateChild,addTemplateChild,changeV3ChargeTem } from '@/require/template'
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
        handleSave(index){ //点击保存按钮
            changeV3ChargeTem({paratem: this.temForm}).then(res=>{
                if(res.code === 200){
                    this.$emit('handleReLoad',()=>{
                        messageTip('success','模板编辑成功！')
                        this.isEditingTem= false
                    }) 
                }else{
                    messageTip('error','模板编辑失败！')
                    this.isEditingTem= false
                }
            })
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
                    let rate1= parseFloat(lastItem.common2)-parseFloat(lastItem.common1) //这个是获取功率间隔
                    let newPowerEnd= parseFloat(lastItem.common2)+rate1
                    let rate2= lastItem.money/parseFloat(lastItem.common2) //这个是1W多少钱
                    let newMoney= rate1*rate2+lastItem.money//这个新收费钱数
                    newItem= { name: new Date().getTime(), money:newMoney,common1: lastItem.common2,common2: newPowerEnd ,type: 1 }
                }else{ //使用默默人的
                    newItem= {  name: new Date().getTime(), money:1,common1: 0,common2: 200 ,type: 1}
                }  
            }else if(from === 'gather2'){
                if(item['gather2'].length > 0){ //根据最后一项数据计算
                    let lastItem= item['gather2'][item['gather2'].length-1]
                    let newChargeTime= lastItem.chargeTime+60
                    let newName= `${newChargeTime/60}小时`
                    newItem= { name: newName, chargeTime: newChargeTime,type: 2 }
                    console.log(newItem)
                }else{ //使用默默人的
                    newItem= newItem= { name: 1, chargeTime: 60,type: 2 }
                }  
            }else if(from === 'gather3'){
                if(item['gather3'].length > 0){ //根据最后一项数据计算
                    let lastItem= item['gather3'][item['gather3'].length-1]
                    let newMoney= lastItem.money+1
                    let newName= newMoney+'元'
                    newItem= { name: newName, money: newMoney,type: 3 }
                    console.log(newItem)
                }else{ //使用默默人的
                    newItem= newItem= { name: '1元', money: 1,type: 3 }
                }  
            }
            addTemplateChild({...newItem,tempid: item.id}).then(res=>{
                if(res.code === 200){
                    let itemCopy= JSON.parse(JSON.stringify(item))
                    itemCopy[from].push(res.tempson)
                    this.temForm= itemCopy
                    this.$set(item,from,itemCopy[from])
                    messageTip('success','子模板添加成功！')
                }else{
                    messageTip('error','子模板添加失败！')
                }
            })
        },
        /**
         * @param item 父元素对象
         * @param index 父元素索引
         * @param from 是哪个子元素gather1，gather2，gather3
         * @param cid 子元素id
         */
        handleDeleteItem(item,index,from,cid){
            confirDelete('确认删除子模板吗？',()=>{
                deleteTemplateChild({id:cid}).then(res=>{
                    if(res.code === 200){
                        let itemCopy= JSON.parse(JSON.stringify(item))
                        let newGather= itemCopy[from].filter((val)=> val.id !== cid )
                        // 深度设置值的，需要使用vue实例提供的方法来修改 this.$set || Vue.set
                        this.$set(this.arr[index],from,newGather)
                        messageTip('success','子模板删除成功！')
                    }else{
                        messageTip('error','子模板删除失败！')
                    }
                })
                
            })
        }
    }
}
</script>

<style lang="less">
.templateV3{
    .chargeType {
        text-align: center;
    }
    .addItem {
        text-align: center;
        border-left: 1px solid #EBEEF5;
        border-right: 1px solid #EBEEF5;
        border-bottom: 1px solid #EBEEF5;
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
            top: 50px;
            bottom: 1px;
            background: rgba(255,255,255,.8);
            z-index: 5;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 16px;
            color: #409eff;
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
    .bottomMenu {
        display: flex; 
        justify-content: space-around; 
        padding-top: 20px; 
        border-top: 1px solid #EBEEF5;
    }
}
</style>