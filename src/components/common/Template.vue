<template>
    <div class="template">
        <el-card :class="['box-card','temTableTitle', item.isSelected==1 ? 'selectedTem' : '']" v-for="(item,i) in arr" :key="i">
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
                        <strong>模板名称: </strong>
                        <span v-if="!item.edit" class="top_span">{{item.temName1}}</span>
                        <el-input v-else size="mini" v-model="temForm.temName1" style="width: 70%; display: inline-block" placeholder="请输入模板名称"></el-input>
                    </div>
                    <div style="margin-top: 15px">
                        <strong>是否支持退费:  </strong>
                        <span v-if="!item.edit" :class="['top_span', item.isRef ==1 ? 'green' : 'red']">{{item.isRef ==1 ? '是' : '否'}}</span><span v-if="!item.edit">
                            {{item.status== 1 ? '(退费标准：时间和电量最小)' : item.status== 2 ? '((退费标准：时间最小)' : item.status== 3 ? '((退费标准：电量最小)': ''}}
                        </span>
                        <el-cascader
                        v-else
                        v-model="temForm.isRef"
                        :options="options"
                        :props="{ expandTrigger: 'hover' }"
                         size="mini"></el-cascader>
                       
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
                        <strong>品牌名称:  </strong>
                        <span v-if="!item.edit" class="top_span">{{item.temName2}}</span>
                        <el-input v-else size="mini" v-model="temForm.temName2" style="width: 70%; display: inline-block" placeholder="请输入品牌名称"></el-input>
                    </div>
                    <div style="margin-top: 15px">
                        <strong>是否钱包强制支付:  </strong>
                        <span v-if="!item.edit" :class="['top_span', item.isWalletPay ==1 ? 'green' : 'red']">{{item.isWalletPay ==1 ? '是' : '否'}}</span>
                        <el-radio-group v-model="temForm.isWalletPay"  v-else >
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="2">否</el-radio>
                        </el-radio-group>
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
                        <strong>售后电话:</strong>
                        <span v-if="!item.edit" class="top_span">{{item.phone}}</span>
                        <el-input v-else size="mini" v-model="temForm.phone" style="width: 70%; display: inline-block" placeholder="请输入售后电话"></el-input>
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
                  <template>
                    <div>
                        <strong>操作</strong>
                    </div>
                    <div style="margin-top: 15px">
                        <el-button type="primary" size="mini" @click="handleEditTem(item)" v-if="!item.edit">编辑</el-button>
                        <el-button type="danger" size="mini"  @click="handleDeleteTem(item)" v-if="!item.edit" :disabled="item.isSelected ==1" :plain="item.isSelected ==1">删除</el-button>
                        <el-button type="success" size="mini" @click="handleSaveEditTem(item)" v-if="item.edit">保存</el-button>
                        <el-button type="warning" size="mini" @click="handleCancelDeleteTem(item)"  v-if="item.edit">取消</el-button>
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
            >
            <el-table-column
            prop="name"
            label="显示名称"
            min-width="150"
            >
             <template slot-scope="scope">
               <div v-if="scope.row.edit"> <el-input size="mini" v-model="childTemForm.name" style="width: 85%;margin-right: 10px;" placeholder="请输入显示名称"></el-input></div>
                <span v-else> {{scope.row.name}}</span>
            </template>
            </el-table-column>
             <el-table-column
            prop="money"
            label="充电价格"
            min-width="200"
            >
            <template slot-scope="scope">
                <div v-if="scope.row.edit"> <el-input size="mini" v-model="childTemForm.money" style="width: 85%;margin-right: 10px;" placeholder="请输入充电价格"></el-input>元</div>
                <span v-else> {{scope.row.money}}元</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="time"
            label="充电时间"
            min-width="200"
            >
            <template slot-scope="scope">
               <div v-if="scope.row.edit"> <el-input size="mini" v-model="childTemForm.time" style="width: 85%;margin-right: 10px;" placeholder="请输入充电时间"></el-input>分钟</div>
                <span v-else> {{scope.row.time}}分钟</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="power"
            label="消耗电量"
            min-width="200"
            >
            <template slot-scope="scope">
                <div v-if="scope.row.edit"> <el-input size="mini" v-model="childTemForm.power" style="width: 85%;margin-right: 10px;" placeholder="请输入消耗电量"></el-input>度</div>
                <span v-else> {{scope.row.power}}度</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="handle"
            label="操作"
            width="200"
            >
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEditChildTem(item.temId,scope.row.temChildId,scope.row)" v-if="!scope.row.edit">编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDeleteChildTem(item.temId,scope.row.temChildId)"  v-if="!scope.row.edit" :disabled="item.isSelected ==1" :plain="item.isSelected ==1">删除</el-button>
                <el-button type="success" size="mini" @click="handleSaveEditChildTem(item.temId,scope.row.temChildId,scope.row)" v-if="scope.row.edit">保存</el-button>
                <el-button type="warning" size="mini" @click="handleCancelDeleteChildTem(item.temId,scope.row.temChildId,scope.row)"  v-if="scope.row.edit">取消</el-button>
            </template>
            </el-table-column>
            </el-table>
             <div style="margin-top: 20px; text-align: center" class="clearfix"  v-if="from==1">
                <el-button type="primary" size="mini" @click="handleAddChildTem(item.temId)">添加模板</el-button>
             </div>
              <div style="margin-top: 20px; text-align: center" class="clearfix"  v-else-if="from==2">
                <el-button type="primary" size="mini" @click="handleAddChildTem(item.temId)" style="float:left;margin-left: 30%;">查看更多</el-button>
               <el-button type="primary" size="mini" >此模板复用更多设备</el-button>
                <el-button type="primary" size="mini" @click="handleAddChildTem(item.temId)" style="float:right;margin-right: 30%;">添加模板</el-button>
             </div>
             <div style="margin-top: 20px; text-align: center;" class="clearfix" v-else>
                <el-button type="primary" size="mini" @click="handleAddChildTem(item.temId)" style="float:left;margin-left: 30%;">添加模板</el-button>
                <el-link type="success" :underline="false" v-if="item.isSelected ==1"> 默认模板</el-link>
                <el-button type="primary" size="mini" style="float:right;margin-right: 30%;" v-if="item.isSelected !=1" @click="handleSetDefault(item)">设为默认</el-button>
                <el-button type="primary" size="mini" style="float:right;margin-right: 30%;" v-if="item.isSelected ==1" disabled plain>设为默认</el-button>
             </div>
             
        </el-card>
    </div>
</template>

<script>
import Vue from 'vue'
import {confirDelete,messageTip} from '@/utils/ele'
export default {
    data(){
        return {
            from: 2, //1是系统模板，2设备详情的模板，3模板详情里
            isEditingTem: false,//是否已存在正在编辑的主模板
            isEditingChildTem: false, //是否已存在正在编辑的子模板
            temForm: {},//存放编辑主模板的容器
            childTemForm: {}, //存放编辑子模板的容器
            options: [{
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
                        }],
            arr: [
                    {   
                        isSelected: 1,//被选中的模板
                        temId: 1,
                        temName1: '充电系统默认模板',
                        temName2: '和动充电站',
                        phone: '1569365326',
                        isRef: 1,
                        isWalletPay: 2,
                        status: 1, //退费标准
                        tableData: [
                                {
                                    name: '1元 4小时',
                                    money:1.0,
                                    time: 240,
                                    power: 1,
                                    temChildId: 11,
                                },
                                {
                                    name: '8元 8小时',
                                    money:2.0,
                                    time: 480,
                                    power: 2,
                                    temChildId: 12,
                                }
                            ]
                    },
                    {   
                        temId: 2,
                        temName1: '充电系统默认模板',
                        temName2: '和动充电站',
                        phone: '1569365326',
                        isRef: 1,
                        isWalletPay: 2,
                        status: 2, //退费标准
                        tableData: [
                                {   
                                    name: '1元 4小时',
                                    money:1.0,
                                    time: 240,
                                    power: 1,
                                    temChildId: 21,
                                },
                                {
                                    name: '8元 8小时',
                                    money:2.0,
                                    time: 480,
                                    power: 2,
                                    temChildId: 22,
                                }
                            ]
                    }
            ],
            
        }
    },
    methods: {
        // 删除子模板
       handleDeleteChildTem(temId,temChildId){  //主模板id,子模板id
        //发送请求，成功之后删除子模板
         confirDelete('确认删除主模板吗？',function(){
            this.arr.filter((item,i)=>{
                let newTableData
                if(item.temId == temId){
                    newTableData= item.tableData.filter((jtem,j)=>{
                        return jtem.temChildId != temChildId
                    })
                item.tableData= newTableData
                }
                return item
            })
            messageTip() //删除成功提示信息
        }.bind(this))
       },
        // 添加子模板
       handleAddChildTem(temId){ //主模板id
        //发送请求，成功之后添加子模板
        this.arr.filter((item,i)=>{
            let newTableData
            if(item.temId == temId){
                let childTemData= {   
                                name: '1元1小时',
                                money:1.0,
                                time: 60,
                                power: 1,
                                temChildId: 25
                                }
                if(item.tableData.length > 0){
                    let childTemLastData= item.tableData[item.tableData.length-1] //点击的最后一个子元素
                    let rate1= Math.round(childTemLastData.time/childTemLastData.money) //利率是1元多少分钟
                    let rate2= Math.round(childTemLastData.time / childTemLastData.power)  //得到的比例是消耗1度电充电多久
                    let nextMoney= childTemLastData.money+1 
                    let nextTime= (nextMoney * rate1) % 1 === 0 ? (nextMoney * rate1) : (nextMoney * rate1).toFixed(2)
                    let nextPower= (nextTime / rate2) % 1 === 0 ? (nextTime / rate2) : (nextTime / rate2).toFixed(2)
                    let houer= (nextTime / 60) % 1 === 0 ? (nextTime / 60) : (nextTime / 60).toFixed(2)
                    let nextName= nextMoney+'元'+houer+'小时'
                    childTemData= {
                       name: nextName,
                       money: nextMoney,
                       time: nextTime,
                       power: nextPower,
                       temChildId: 23
                    }
                }
               item.tableData.push(childTemData)
            }
            return item
        })
       },
       //编辑子模板
       handleEditChildTem(temId,temChildId,row){
           if(this.isEditingChildTem){
               this.$message.warning('请先保存或取消其他的编辑操作！')
               return 
           }
            let {name,money,time,power}= row
            this.childTemForm= {name,money,time,power}
            Vue.set(row,'edit',true)
            this.isEditingChildTem= true
       },
       //提交编辑的子模板
       handleSaveEditChildTem(temId,temChildId,row){
           //校验，发送请求

           let {name,money,time,power}= this.childTemForm
           row.name= name
           row.money= money
           row.time= time
           row.power= power
           Vue.set(row,'edit',false)
           this.isEditingChildTem= false
       },
       //取消编辑的子模板
       handleCancelDeleteChildTem(temId,temChildId,row){
           this.childTemForm= {}
           Vue.set(row,'edit',false)
           this.isEditingChildTem= false
       },
     //删除主模板   
      handleDeleteTem(item){
        //   发送请求，成功之后删除模板
        confirDelete('确认删除主模板吗？',function(){
            let newArr= this.arr.filter((ktem,k)=>{
            return ktem.temId != item.temId
            })
            this.arr= newArr
            messageTip() //删除成功提示信息
        }.bind(this))
        
      },
       //点击编辑主模板
       handleEditTem(item){ //主模板对象
        if(this.isEditingTem){
            this.$message.warning('请先保存或取消其他的编辑操作！')
            return 
        }
        let {temName1,temName2,phone,isRef,isWalletPay,status} = item
        if(status== '' || typeof status == 'undefined'){
            isRef=[isRef.toString()]
        }else{
            isRef=[isRef.toString(),status.toString()]
        }
        this.temForm= {temName1,temName2,phone,isWalletPay,isRef}
         Vue.set(item,'edit',true)
         this.isEditingTem= true
       },
       //保存编辑主模板
       handleSaveEditTem(item){
           //校验，发送请求
           item.temName1=  this.temForm.temName1
           item.temName2=  this.temForm.temName2
           item.phone=  this.temForm.phone

           item.isWalletPay=  this.temForm.isWalletPay
           item.isRef=  this.temForm.isRef[0]
           item.status= this.temForm.isRef.length >= 2 ? this.temForm.isRef[1] : ''
           Vue.set(item,'edit',false)
           this.isEditingTem= false
       },
        //取消编辑的主模板
       handleCancelDeleteTem(item){
           this.temForm= {}
           Vue.set(item,'edit',false)
           this.isEditingTem= false
       },
        // type=3的时候的设为默认
       handleSetDefault(item){
        //  发送请求，成功了执行下面的
        let newArr= this.arr.filter((jtem,j)=>{
                        if(jtem.temId == item.temId){
                            jtem.isSelected= 1
                        }else{
                            jtem.isSelected= undefined
                        }
                        return jtem
                    })
        this.arr= newArr
       }   
    }
}
</script>

<style lang="less" scope>
.template {
    .temTableTitle {
       .top_span {
           margin:0 10px;
           &.red {
               color: #F47378;
           }
           &.green {
               color: #6BD089;
           }
       }
    }
}
</style>