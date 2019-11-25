<template>
    <div class="template">
        <el-card :class="['box-card','temTableTitle', (from==3 && item.pitchon==1 && ![1,2,3].includes(grade)) ? 'selectedTem' : '']" v-for="(item,i) in arr" :key="i">
            <h1 v-if="[1,2,3].includes(grade)" style="text-align: center; color: #666; padding-bottom: 10px;">{{grade == 1 ? "等级一" : grade == 2 ? "等级二" : grade == 3 ? "等级三" : ''  }}</h1>
            {{JSON.stringify(arr)}}
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
                        <strong>模板名称:</strong>
                        <span v-if="!item.edit" class="top_span">{{item.name}}</span>
                        <el-input v-else size="mini" v-model="temForm.name" style="width: 70%; display: inline-block" placeholder="请输入模板名称"></el-input>
                    </div>
                    <div style="margin-top: 15px">
                        <strong>是否支持退费:  </strong>
                        <span v-if="!item.edit" :class="['top_span', item.permit ==1 ? 'green' : 'red']">{{item.permit ==1 ? '是' : '否'}}</span><span v-if="!item.edit">
                            {{item.common2== 1 ? '(退费标准：时间和电量最小)' : item.common2== 2 ? '((退费标准：时间最小)' : item.common2== 3 ? '((退费标准：电量最小)': ''}}
                        </span>
                        <el-cascader
                        v-else
                        v-model="temForm.permit"
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
                        <span v-if="!item.edit" class="top_span">{{item.remark}}</span>
                        <el-input v-else size="mini" v-model="temForm.remark" style="width: 70%; display: inline-block" placeholder="请输入品牌名称"></el-input>
                    </div>
                    <div style="margin-top: 15px">
                        <strong>是否钱包强制支付:  </strong>
                        <span v-if="!item.edit" :class="['top_span', item.walletpay ==1 ? 'green' : 'red']">{{item.walletpay ==1 ? '是' : '否'}}</span>
                        <el-radio-group v-model="temForm.walletpay"  v-else >
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
                        <span v-if="!item.edit" class="top_span">{{item.common1}}</span>
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
                  <template>
                    <div>
                        <strong>操作</strong>
                    </div>
                    <div style="margin-top: 15px">
                        <el-button type="primary" size="mini" @click="handleEditTem(item)" v-if="!item.edit"  icon="el-icon-edit"
                        :disabled="from == 2 && (item.merchantid == 0 || item.merchantid == null)"  
                        >编辑</el-button>
                        <el-button type="danger" size="mini"  @click="handleDeleteTem(item,i)" v-if="!item.edit" 
                        :disabled="from == 1 || from == 2 || (from==3 && item.pitchon ==1) " 
                        :plain="from == 1 || from == 2 || (from==3 && item.pitchon ==1) || (from==3 && [2,3].includes(grade))"
                        icon="el-icon-delete"
                        >删除</el-button>
                        <el-button type="success" size="mini" @click="handleSaveEditTem(item)" v-if="item.edit" icon="el-icon-folder-checked">保存</el-button>
                        <el-button type="warning" size="mini" @click="handleCancelDeleteTem(item)"  v-if="item.edit" icon="el-icon-folder-delete">取消</el-button>
                    </div> 
                </template>
                </el-table-column>
           </el-table>
            <el-table
            :data="item.gather"
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
                <div v-if="scope.row.edit"> <el-input-number size="mini" v-model="childTemForm.money" :precision="1"  style="width: 85%;margin-right: 10px;" placeholder="请输入充电价格"></el-input-number>元</div>
                <span v-else> {{scope.row.money}}元</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="chargeTime"
            label="充电时间"
            min-width="200"
            >
            <template slot-scope="scope">
               <div v-if="scope.row.edit"> <el-input-number size="mini" v-model="childTemForm.chargeTime" :precision="0" :step="50" style="width: 85%;margin-right: 10px;" placeholder="请输入充电时间"></el-input-number>分钟</div>
                <span v-else> {{scope.row.chargeTime}}分钟</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="chargeQuantity"
            label="消耗电量"
            min-width="200"
            >
            <template slot-scope="scope">
                <div v-if="scope.row.edit"> <el-input-number size="mini" v-model="childTemForm.chargeQuantity" :precision="1" style="width: 85%;margin-right: 10px;" placeholder="请输入消耗电量"></el-input-number>度</div>
                <span v-else> {{scope.row.chargeQuantity/100}}度</span>
            </template>
            </el-table-column>
            <el-table-column
            prop="handle"
            label="操作"
            width="200"
            >
            <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="handleEditChildTem(item.id,scope.row.id,scope.row)" v-if="!scope.row.edit" icon="el-icon-edit" :disabled="from == 2 && (item.merchantid == 0 || item.merchantid == null)" >编辑</el-button>
                <el-button type="danger" size="mini" @click="handleDeleteChildTem(item.id,scope.row.id)"  v-if="!scope.row.edit" :disabled="item.pitchon ==1 || from== 2" :plain="item.pitchon ==1 || from== 2" icon="el-icon-delete">删除</el-button>
                <el-button type="success" size="mini" @click="handleSaveEditChildTem(scope.row.id,scope.row)" v-if="scope.row.edit" icon="el-icon-folder-checked">保存</el-button>
                <el-button type="warning" size="mini" @click="handleCancelDeleteChildTem(item.id,scope.row.id,scope.row)"  v-if="scope.row.edit" icon="el-icon-folder-delete">取消</el-button>
            </template>
            </el-table-column>
            </el-table>
             <div style="margin-top: 20px; text-align: center;" class="clearfix"  v-if="from==1">
                <el-button type="primary" size="mini" @click="handleAddChildTem(item)" icon="el-icon-plus">添加模板</el-button>
             </div>
              <div style="margin-top: 20px; text-align: center;display:flex; justify-content: space-around;" class="clearfix"  v-else-if="from==2">
                <el-button v-if="[1,2].includes(grade)" style="visibility: hidden;" icon="el-icon-view" size="mini">查看更多</el-button> <!--加这个标签的目的是为了让现实的“查看更多相对于其他的对齐” -->
                <el-button type="primary" size="mini" @click="$router.push({path: '/deviceManage/deviceList/templateDetail',query: {hw: '01',code: deviceInfo.code,merid: deviceInfo.merid }})" icon="el-icon-view" v-if="!([1,2].includes(grade))" 
                :disabled="deviceInfo.merid== 0 || deviceInfo.merid== undefined || deviceInfo.merid == null"
                >查看更多</el-button>
                <div v-if="!([1,2,3].includes(grade))"><TemMulDevice v-if="!(from == 2 && (item.merchantid == 0 || item.merchantid == null))" :deviceInfo="deviceInfo" :tempid="item.id"/></div>
                <el-button type="primary" size="mini" @click="handleAddChildTem(item)" icon="el-icon-plus" :disabled="from == 2 && (item.merchantid == 0 || item.merchantid == null)" >添加模板</el-button>
             </div>
             <div style="margin-top: 20px; text-align: center; " class="clearfix" v-else>
                <el-button type="primary" size="mini" style="float:left;margin-left: 30%;" icon="el-icon-plus" @click="handleAddChildTem(item)" >添加模板</el-button>
                <el-link type="success" :underline="false" v-if="(item.pitchon ==1 && ![1,2,3].includes(grade)) || (item.pitchon ==1 && grade== 3) || (gradePitchon == 1 && ![1,2].includes(grade))"> {{source == 0 ? '默认模板' : '选中模板'}}</el-link>
                
                <!-- <el-button type="primary" size="mini" style="float:right;margin-right: 30%;" v-if="source == 0 && ![1,2].includes(grade)" :disabled="item.pitchon ==1" :plain="item.pitchon ==1" @click="handleSetDefault(item,gradeId)" >设为默认</el-button> -->
                <el-button type="primary" size="mini" style="float:right;margin-right: 30%;" v-if="source != 0 && ![1,2].includes(grade)" :disabled="item.pitchon ==1 || gradePitchon == 1" :plain="item.pitchon ==1"   @click="handleSetSelect(item,gradeId)">选中模板</el-button>
             </div>
             
        </el-card>
    </div>
</template>

<script>
import Vue from 'vue'
import {confirDelete,messageTip} from '@/utils/ele'
import TemMulDevice from '@/components/common/TemMulDevice'
import { addTemplateChild,deleteTemplateChild,editTemplateChild,updateTemplate,setSelectTem,deleteTem} from '@/require/template'
export default {
    data(){
        return {
            //from: 2, //1是系统模板，2设备详情的模板，3模板详情里
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
                        // arr: this.list
            
        }
    },
    components:{
        TemMulDevice
    },
    props: ['from','list','grade','deviceInfo','source','arecode','gradeId','gradePitchon'], //grade是只有设备详情中的分等级模板才会传进来 ,source是from=3的时候传进来的，判断选中默认
    computed:{
        arr(){ //监听 传过来的list变化，如果变化则直接赋值给arr
            return this.list
        }
    },
    methods: {
        // 删除子模板
       handleDeleteChildTem(id,temChildId){  //主模板id,子模板id
        //发送请求，成功之后删除子模板
         confirDelete('确认删除子模板吗？',()=>{
             deleteTemplateChild({id: temChildId}).then(res=>{
                 if(res.code== 200){
                      this.arr.filter((item,i)=>{
                        let newgather
                        if(item.id == id){
                            newgather= item.gather.filter((jtem,j)=>{
                                return jtem.id != temChildId
                            })
                        item.gather= newgather
                        }
                        return item
                    })
                    messageTip('success','删除成功') //删除成功提示信息
                 }else{
                    messageTip('warning',res.message)
                 }
             })
        })
       },
        // 添加子模板
       handleAddChildTem(item){ //主模板id
            let { id }= item
        //发送请求，成功之后添加子模板
            let childTemData= { name: '1元1小时',
                                money:1.0,
                                chargeTime: 60,
                                chargeQuantity: 100,
                            }
            if(item.gather && item.gather.length > 0){
                        let childTemLastData= item.gather[item.gather.length-1] //点击的最后一个子元素
                        let rate1= childTemLastData.chargeTime/childTemLastData.money //利率是1元多少分钟
                        let rate2= childTemLastData.chargeTime / childTemLastData.chargeQuantity //得到的比例是消耗1度电充电多久
                        let nextMoney= childTemLastData.money+1 
                        let nextTime= (nextMoney * rate1) % 1 === 0 ? (nextMoney * rate1) : (nextMoney * rate1).toFixed(2)
                        let nextPower= (nextTime / rate2) % 1 === 0 ? (nextTime / rate2) : (nextTime / rate2).toFixed(2)
                        let houer= (nextTime / 60) % 1 === 0 ? (nextTime / 60) : (nextTime / 60).toFixed(2)
                        let nextName= nextMoney+'元'+houer+'小时'
                        childTemData= {
                        name: nextName,
                        money: nextMoney,
                        chargeTime: nextTime,
                        chargeQuantity: nextPower
                        
                        }
                    }
            addTemplateChild({tempid: id,...childTemData}).then(res=>{
                if(res.code == 200){
                    if(item.id == id){ //找到对应的主模板
                        let {id,money,chargeQuantity,name,chargeTime} = res.tempson
                        item.gather.push({id,money,chargeQuantity,name,chargeTime})
                    }
                    messageTip('success','添加成功')
                }else{
                    messageTip('warning',res.message)
                }
            }).catch(error=>{})
        },
       //编辑子模板
       handleEditChildTem(id,temChildId,row){
           if(this.isEditingChildTem){
               this.$message.warning('请先保存或取消其他的编辑操作！')
               return 
           }
            let {name,money,chargeTime,chargeQuantity}= row
            chargeQuantity= chargeQuantity/100
            this.childTemForm= {name,money,chargeTime,chargeQuantity}
            Vue.set(row,'edit',true)
            this.isEditingChildTem= true
       },
       //提交编辑的子模板
       handleSaveEditChildTem(temChildId,row){
           //校验，发送请求
           let {name,money,chargeTime,chargeQuantity}= this.childTemForm
            let newChargeQuantity= chargeQuantity*100 //newChargeQuantity是乘于100之后的电量
            editTemplateChild({id: temChildId,name,money,chargeTime,chargeQuantity: newChargeQuantity}).then(res=>{
                if(res.code == 200){
                    row.name= name
                    row.money= money
                    row.chargeTime= chargeTime
                    row.chargeQuantity= newChargeQuantity
                    Vue.set(row,'edit',false)
                    this.isEditingChildTem= false
                    messageTip('success','子模板修改成功')
                }else{
                    messageTip('warning',res.message)
                }
            })

           
       },
       //取消编辑的子模板
       handleCancelDeleteChildTem(id,temChildId,row){
           this.childTemForm= {}
           Vue.set(row,'edit',false)
           this.isEditingChildTem= false
       },
     //删除主模板   
      handleDeleteTem(item,i){
        //   发送请求，成功之后删除模板
        confirDelete('确认删除主模板吗？',()=>{
            deleteTem({id:item.id}).then(res=>{
                if(res.code == 200){
                     this.arr.splice(i,1)
                    messageTip('success','删除成功')
                }else{
                    messageTip('warning',res.message)
                }
            }).catch(error=>{})
        })
        
      },
       //点击编辑主模板
       handleEditTem(item){ //主模板对象
        if(this.isEditingTem){
            this.$message.warning('请先保存或取消其他的编辑操作！')
            return 
        }
        let {name,remark,common1,permit,walletpay,common2} = item
        if(common2== '' || typeof common2 == 'undefined'){
            permit=[permit.toString()]
        }else{
            permit=[permit.toString(),common2.toString()]
        }
        this.temForm= {name,remark,common1,walletpay,permit}
         Vue.set(item,'edit',true)
         this.isEditingTem= true
       },
       //保存编辑主模板
       handleSaveEditTem(item){
           //校验，发送请求
           let{name,remark,common1,walletpay}= this.temForm
           let [permit,common2='']= this.temForm.permit
           //注： 充电模板的status为0
           updateTemplate({id: item.id,status: 0, name,remark,common1,walletpay,permit,common2}).then(res=>{ 
               if(res.code === 200){
                    item.name= name
                    item.remark= remark
                    item.common1= common1
                    item.walletpay= walletpay
                    item.permit= permit
                    item.common2= common2
                    Vue.set(item,'edit',false)
                    this.isEditingTem= false
                    messageTip('success','主模板修改成功')
               }else{
                   messageTip('warning',res.message)
               }
           }).catch(error=>{})
          
       },
        //取消编辑的主模板
       handleCancelDeleteTem(item){
           this.temForm= {}
           Vue.set(item,'edit',false)
           this.isEditingTem= false
       },
        // type=3的时候的设为默认
       handleSetDefault(item,){
           
        //  发送请求，成功了执行下面的
        for (const iterator of this.arr) {
            if(iterator.id == item.id){
                iterator.pitchon= 1
            }else{
                iterator.pitchon= undefined
            }
        }
       },
       handleSetSelect(item,gradeId){ //设置选中模板
            let temid= item.id
            if(typeof gradeId != 'undefined'){ //说明点击的是普通模板，有值则点击的是分等级模板
                temid= gradeId
            }
           setSelectTem({source:this.source,obj: this.arecode,temid: temid}).then(res=>{
            if(res == 1){
                for (const iterator of this.arr) {
                    if(iterator.id == item.id){
                        iterator.pitchon= 1
                    }else{
                        iterator.pitchon= undefined
                    }
                }
                this.$store.dispatch('asyGetDeviceDetailTemInfo',{devicenum: this.$route.query.code,merid: this.$route.query.merid}) //添加之后重新请求数据
                if(typeof gradeId == 'undefined'){ //普通模板设置后，自动滚动到顶部
                    document.getElementsByClassName('main')[0].scrollTop= '0px'
                }
                messageTip('success','选中成功（注： 选中成功会自动至于第一位）')

            }else{
                messageTip('warning','选中失败')
            }
           }).catch(err=>{})
       
           
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