<template>
    <div class="template">
        <el-card :class="['box-card','temTableTitle', (from==3 && item.pitchon==1 && ![1,2,3].includes(grade)) ? 'selectedTem' : '']" v-for="(item,i) in arr" :key="i">
            <h1 v-if="[1,2,3].includes(grade)" style="text-align: center; color: #666; padding-bottom: 10px;"></h1>
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
                min-width="960"
                >
                <template slot-scope="scope">
                   <div class="tem_p">
                       <div class="tem_parent clearfix">
                            <div class="temContent" style="width: 33%; float: left; min-width: 295px;">
                                <div>
                                    <strong>模板名称:</strong>
                                    <span v-if="item.id !== editId" class="top_span">{{item.name}}</span>
                                    <el-input v-else size="mini" v-model="temForm.name" style="width: 70%; display: inline-block" placeholder="请输入模板名称"></el-input>
                                </div>
                                <div style="margin-top: 15px">
                                    <strong>是否支持支付宝充电:  </strong>
                                    <span v-if="item.id !== editId" :class="['top_span', item.ifalipay ==1 ? 'green' : 'red']">{{item.ifalipay ==1 ? '是' : '否'}}</span>
                                    <el-radio-group v-model="temForm.ifalipay"  v-else >
                                        <el-radio :label="1">是</el-radio>
                                        <el-radio :label="2">否</el-radio>
                                    </el-radio-group>
                                </div>
                            </div>

                            <div class="temContent" style="width: 33%; float: left; min-width: 295px;">
                                <div>
                                    <strong>品牌名称:  </strong>
                                    <span v-if="item.id !== editId" class="top_span">{{item.remark}}</span>
                                    <el-input v-else size="mini" v-model="temForm.remark" style="width: 70%; display: inline-block" placeholder="请输入品牌名称"></el-input>
                                </div>

                                <div style="margin-top: 15px">
                                    <strong>收费标准:  </strong>
                                    <span 
                                        v-if="item.id !== editId" 
                                    >{{item.rank}}</span>
                                    <el-input 
                                        v-else size="mini" 
                                        v-model="temForm.rank" 
                                        style="width: 50%; display: inline-block" 
                                        placeholder="请输入收费标准"
                                    ></el-input>
                                    元 / 度电
                                </div>
                            </div>

                            <div>
                                <div class="temContent" style="width: 33%; float: left; min-width: 295px;">
                                    <div>
                                        <strong>售后电话:</strong>
                                        <span v-if="item.id !== editId" class="top_span">{{item.common1}}</span>
                                        <el-input v-else size="mini" v-model="temForm.common1" style="width: 70%; display: inline-block" placeholder="请输入售后电话"></el-input>
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div class="tem_text" style="margin-top: 15px">
                            <div>
                                <strong>收费说明:</strong>
                                <span v-if="item.id !== editId">{{item.chargeInfo}}</span>
                                <div v-else>
                                    <div style="width: calc(100% - 200px); float: left;" >
                                        <el-input
                                            type="textarea"
                                            :rows="4"
                                            placeholder="请输入收费说明"
                                            v-model="temForm.chargeInfo">
                                        </el-input>
                                    </div>
                                    <div style="width: 200px; float: right;">
                                        <el-popover
                                            placement="top-start"
                                            title="自动说明"
                                            width="200"
                                            trigger="click"
                                            ref="chargeBtn1"
                                            content="是根据设备的系统参数中设置的分档功率和设备所使用的充电模板自动生成的收费说明">
                                        </el-popover>
                                        <!-- <el-popover
                                            placement="bottom-start"
                                            title="默认说明"
                                            width="200"
                                            trigger="click"
                                            ref="chargeBtn2"
                                            content="此模板为通用的收费说明">
                                        </el-popover> -->
                                        <div class="tem_text_con">
                                            <el-button type="primary" size="mini" :icon="item.loading ? 'el-icon-loading' :'el-icon-setting'" @click="handleSetChargeInfo(1,item)">自动说明</el-button>
                                            <span class="el-icon-warning-outline icon_span"  v-popover:chargeBtn1></span>
                                        </div>
                                        <!-- <div class="tem_text_con">
                                            <el-button type="primary" size="mini" v-popover:chargeBtn2  icon="el-icon-menu"  @click="handleSetChargeInfo(2,item)">默认说明</el-button>
                                            <span class="el-icon-warning-outline icon_span"  v-popover:chargeBtn2></span>
                                        </div> -->
                                        
                                    </div>
                                </div>
    
                            </div>
                        </div>
                   </div>
                </template>
                </el-table-column>
                
                <el-table-column
                    prop="communName"
                    label="小区名称"
                    width="200"
                    v-if="from !== 4"
                >
                  <template slot-scope="scope">
                    <div>
                        <strong>操作</strong>
                    </div>
                    <div style="margin-top: 15px">
                        <el-button 
                            type="primary" 
                            size="mini" 
                            @click="handleEditTem(item)" 
                            v-if="item.id !== editId"  
                            icon="el-icon-edit"
                            :disabled="(from == 2 && (item.merchantid == 0 || item.merchantid == null)) || (from != 1 && item.merchantid== 0)"  
                        >编辑</el-button>

                        <el-button 
                            type="danger" 
                            size="mini"  
                            @click="handleDeleteTem(item,i)" 
                            v-if="item.id !== editId" 
                            :disabled="from == 1 || from == 2 || (from==3 && item.pitchon ==1) || (from==3 && [2,3].includes(grade)) || (from !=1 && item.merchantid== 0)" 
                            :plain="from == 1 || from == 2 || (from==3 && item.pitchon ==1) || (from==3 && [2,3].includes(grade)) || (from !=1 && item.merchantid== 0)"
                            icon="el-icon-delete"
                        >删除</el-button>

                        <el-button 
                            type="success" 
                            size="mini" 
                            @click="handleSaveEditTem(item)" 
                            v-if="item.id === editId" 
                            icon="el-icon-folder-checked"
                        >保存</el-button>

                        <el-button 
                            type="warning" 
                            size="mini" 
                            @click="handleCancelDeleteTem(item)" 
                            v-if="item.id === editId" 
                            icon="el-icon-folder-delete"
                        >取消</el-button>
                    </div> 
                </template>
                </el-table-column>
           </el-table>

            <el-table
                :data="item.id === editId ? temForm.gather : item.gather"
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
                    <div v-if="item.id === editId"> 
                        <el-input 
                            size="mini" 
                            v-model="scope.row.name" 
                            style="width: 85%;margin-right: 10px;" 
                            placeholder="请输入显示名称"
                        ></el-input>
                    </div>
                    <span v-else> {{scope.row.name}}</span>
                </template>
                </el-table-column>

                <el-table-column
                    prop="money"
                    label="充电价格"
                    min-width="200"
                >
                    <template slot-scope="scope">
                        <div v-if="item.id === editId"> 
                            <el-input-number 
                                size="mini" 
                                v-model="scope.row.money" 
                                :precision="1"  
                                style="width: 85%;margin-right: 10px;" 
                                placeholder="请输入充电价格"
                            ></el-input-number>元</div>
                        <span v-else> {{scope.row.money}}元</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="chargeQuantity"
                    label="消耗电量"
                    min-width="200"
                >
                    <template slot-scope="scope">
                        <div v-if="item.id === editId"> 
                            <el-input-number 
                                size="mini" 
                                v-model="scope.row.chargeQuantity" 
                                :precision="1" 
                                style="width: 85%;margin-right: 10px;" 
                                placeholder="请输入消耗电量"
                            ></el-input-number>度</div>
                        <span v-else> {{scope.row.chargeQuantity/100}}度</span>
                    </template>
                </el-table-column>

                <el-table-column
                    prop="handle"
                    label="操作"
                    width="100"
                    v-if="item.id === editId"
                >
                    <template slot-scope="scope">
                        <!-- <el-button type="primary" size="mini" @click="handleEditChildTem(item.id,scope.row.id,scope.row)" v-if="!scope.row.edit" icon="el-icon-edit" :disabled="(from == 2 && (item.merchantid == 0 || item.merchantid == null)) || (from !=1 && item.merchantid== 0)" >编辑</el-button> -->
                        <el-button 
                            type="danger" 
                            size="mini" 
                            @click="handleDeleteChildTem(item.id,scope.row.id)" 
                            :disabled="item.pitchon ==1 || from == 2 || (from !=1 && item.merchantid== 0)" 
                            icon="el-icon-delete"
                        >删除</el-button>
                        <!-- <el-button type="success" size="mini" @click="handleSaveEditChildTem(scope.row.id,scope.row)" v-if="scope.row.edit" icon="el-icon-folder-checked">保存</el-button>
                        <el-button type="warning" size="mini" @click="handleCancelDeleteChildTem(item.id,scope.row.id,scope.row)"  v-if="scope.row.edit" icon="el-icon-folder-delete">取消</el-button> -->
                    </template>
                </el-table-column>
            </el-table>

                <div style="margin-top: 20px; text-align: center;display:flex; justify-content: space-around;" class="clearfix">
                    <el-button 
                        type="primary" 
                        size="mini"
                        @click="handleAddChildTem(item)" 
                        icon="el-icon-plus"
                        v-if="item.id === editId"
                    >添加模板</el-button>
                    <!-- from == 2时展示 “查看更多” -->
                     <el-button 
                        type="primary" 
                        size="mini" 
                        @click="$router.push(
                            {
                                path: '/deviceManage/deviceList/templateDetail',
                                query: {hw: '07',code: deviceInfo.code,merid: deviceInfo.merid }
                            }
                        )" 
                        icon="el-icon-view" 
                        v-if="from == 2" 
                        :disabled="deviceInfo.merid== 0 || deviceInfo.merid== undefined || deviceInfo.merid == null"
                    >查看更多</el-button>

                    <el-button 
                        type="primary" 
                        size="mini" 
                        @click="handleSetSelect(item, $event)" 
                        v-if="from == 3" 
                        icon="el-icon-check"
                    >选中模板</el-button>
                </div>

             <!-- <div style="margin-top: 20px; text-align: center;" class="clearfix"  v-if="from==1">
                <el-button type="primary" size="mini" @click="handleAddChildTem(item)" icon="el-icon-plus">添加模板</el-button>
             </div>

              <div style="margin-top: 20px; text-align: center;display:flex; justify-content: space-around;" class="clearfix"  v-else-if="from==2">
                <el-button v-if="[1,2].includes(grade)" style="visibility: hidden;" icon="el-icon-view" size="mini">查看更多</el-button> 
                <el-button type="primary" size="mini" @click="$router.push({path: '/deviceManage/deviceList/templateDetail',query: {hw: '01',code: deviceInfo.code,merid: deviceInfo.merid }})" icon="el-icon-view" v-if="!([1,2].includes(grade))" 
                :disabled="deviceInfo.merid== 0 || deviceInfo.merid== undefined || deviceInfo.merid == null"
                >查看更多</el-button>
                <div v-if="!([1,2,3].includes(grade))"><TemMulDevice v-if="!(from == 2 && (item.merchantid == 0 || item.merchantid == null))" :deviceInfo="deviceInfo" :tempid="item.id"/></div>
                <el-button type="primary" size="mini" @click="handleAddChildTem(item)" icon="el-icon-plus" :disabled="(from == 2 && (item.merchantid == 0 || item.merchantid == null)) || (from !=1 && item.merchantid== 0)" >添加模板</el-button>
             </div>
             
             <div style="margin-top: 20px; text-align: center; " class="clearfix" v-else>
                <el-button type="primary" size="mini" style="float:left;margin-left: 30%;" icon="el-icon-plus" @click="handleAddChildTem(item)" :disabled="(from !=1 && item.merchantid== 0)">添加模板</el-button>
                <el-link type="danger" :underline="false" v-if="(item.pitchon ==1 && ![1,2,3].includes(grade)) || (item.pitchon ==1 && grade== 3) || (gradePitchon == 1 && ![1,2].includes(grade))"> {{source == 0 ? '默认模板' : '选中模板'}}</el-link>
                <el-button type="primary" icon="el-icon-check" size="mini" style="float:right;margin-right: 30%;" v-if="source != 0 && ![1,2].includes(grade)" :disabled="item.pitchon ==1 || gradePitchon == 1" :plain="item.pitchon ==1"   @click="handleSetSelect(item,gradeId)">选中模板</el-button>
             </div> -->
             
        </el-card>
    </div>
</template>

<script>
import Vue from 'vue'
import { mapState } from 'vuex'
import {confirDelete,messageTip} from '@/utils/ele'
import TemMulDevice from '@/components/common/TemMulDevice'
import { insertSubSyncTemp,deleteTemplateChild,editTemplateChild,updateTemplate,setSelectTem,deleteTem,getChargeInfo, 

disposeSyncTemplate} from '@/require/template'
export default {
    data(){
        return {
            //from: 2, //1是系统模板，2设备详情的模板，3模板详情里
            // isEditingTem: false,//是否已存在正在编辑的主模板
            // isEditingChildTem: false, //是否已存在正在编辑的子模板
            editId: '', // 正在编辑主模板的id
            temForm: {},//存放编辑主模板的容器
            childTemForm: {}, //存放编辑子模板的容器
            options: [
                {
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
                }
            ],            
        }
    },
    components:{
        TemMulDevice
    },
    props: ['from','list','grade','deviceInfo','source','arecode','gradeId','gradePitchon'], //grade是只有设备详情中的分等级模板才会传进来 ,source是from=3的时候传进来的，判断选中默认
    computed:{
        ...mapState(['userInfo']),
        arr(){ //监听 传过来的list变化，如果变化则直接赋值给arr
            if (this.from === 4) {
               return  [this.temForm]
            }
            return this.list.map(item => {
                if(item && item.rank !== void 0) {
                    item.rank /= 100
                }
                return item
            })
        }
    },
    created(){
        this.editId= this.from === 4 ? -1 : 0 //当添加模板时，editId设置为-1，否则默认为0
        this.temForm= this.from === 4 ? JSON.parse(JSON.stringify(this.list[0])) : {}
    },
    methods: {
        // 删除子模板
       handleDeleteChildTem(id,temChildId){  //主模板id,子模板id
        //发送请求，成功之后删除子模板
         confirDelete('确认删除子模板吗？',()=>{
             deleteTemplateChild({id: temChildId}).then(res=>{
                 if(res.code== 200){
                    this.temForm.gather= this.temForm.gather.filter((jtem,j)=>{
                        return jtem.id != temChildId
                    })
                    const index = this.arr.findIndex(item => item.id === id)
                    this.$set(this.arr, index, this.temForm)
                    if (this.from !== 4) {
                        messageTip('success','删除成功') //删除成功提示信息   
                    }
                 }else{
                    messageTip('warning',res.message)
                 }
             })
        })
       },
        // 添加子模板
       handleAddChildTem(item){ //主模板id
            let { id }= item
            let defaultTem = {
                id,
                name: '5元5度电',
                money: 5,
                chargeQuantity: 5
            }
            // 获取收费标准
            let rank = parseFloat(this.temForm.rank)
            // 获取最后一条子模板
            const lastChildTem = this.temForm.gather[this.temForm.gather.length - 1]
            if (lastChildTem) { 
                rank = (isNaN(rank) || rank <= 0) ? Math.round((lastChildTem.money / lastChildTem.chargeQuantity) * 100) /100 : rank
                const nextMoney = lastChildTem.money + 5 
                const nextChargeQuantity = Math.round((nextMoney /  rank) * 10) / 10
                defaultTem = {
                    id,
                    name: `${nextMoney}元${nextChargeQuantity}度电`,
                    money: nextMoney,
                    chargeQuantity: nextChargeQuantity
                }
            } else {
                if (!isNaN(rank) && rank > 0) {
                    const nextMoney = 5 
                    const nextChargeQuantity = Math.round((nextMoney /  rank) * 10) / 10
                    defaultTem = {
                        id,
                        name: `${nextMoney}元${nextChargeQuantity}度电`,
                        money: nextMoney,
                        chargeQuantity: nextChargeQuantity
                    }
                }
            }

            // 当没有收费标准 也没有子模板，使用默认生成的子模板
            insertSubSyncTemp({tempid: id,...defaultTem}).then(res=>{
                if(res.code == 200){
                    if (this.from !== 4) {
                        res.tempson.chargeQuantity /= 100
                        this.temForm.gather.push(res.tempson)
                    } else {
                        res.chargeQuantity = parseFloat(res.chargeQuantity)
                        res.money = parseFloat(res.money)
                        this.temForm.gather.push({
                            id: -1,
                            name: res.name,
                            money: res.money,
                            chargeQuantity: res.chargeQuantity
                        })
                    }
                    
                    const index = this.arr.findIndex(item => item.id == id)
                    this.$set(this.arr[index],'gather', this.temForm.gather)
                    if (this.from !== 4) {
                        messageTip('success','添加成功')
                    }
                }else{
                    messageTip('warning',res.message)
                }
            }).catch(error=>{
                console.log(error)
            })
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
        console.log(JSON.stringify(item, null, 2))
            this.temForm = JSON.parse(JSON.stringify(item))
            this.temForm.gather = this.temForm.gather.map(item=>{
                if (item && item.chargeQuantity) {
                    item.chargeQuantity /= 100
                }
                return item
            })
            this.editId = item.id
       },
       //保存编辑主模板
       async handleSaveEditTem(){
           try {
               const info = await disposeSyncTemplate({param: JSON.stringify(this.temForm)})
               if (info.code === 200) {
                   messageTip('success', '保存成功')
                   this.$emit('handleReLoad')
               } else {
                   messageTip('error', info.messageTip)
               }
           } catch (error) {
               
           }
            // 关闭编辑    
           this.handleCancelDeleteTem()
        
       },
        //取消编辑的主模板
       handleCancelDeleteTem(item){
           this.temForm = {}
           this.editId = ''
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
       handleSetSelect(item,$event){ //设置选中模板
           let temid= item.id
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
                    setTimeout(()=>{
                        const offsetTop = document.querySelector('.selectedTem').offsetTop - 30
                        document.getElementsByClassName('main')[0].scrollTop=  offsetTop 
                    },400)
                }
                messageTip('success','选中成功（注： 选中成功会自动至于第一位）')

            }else{
                messageTip('warning','选中失败')
            }
           }).catch(err=>{})
       },
       handleSetChargeInfo(info,item){ //点击设置默认模板或者功率模板 info 1分功率，2默认
       console.log(item.rank)
         if(info == 1){
             try {
                 Vue.set(item,'loading',true)
                let rank = parseFloat(item.rank)
                if (isNaN(rank) || rank <= 0)  {
                    const chargeQuantity = this.from !== 4 ? item.gather[0].chargeQuantity / 100 : item.gather[0].chargeQuantity
                    const money = item.gather[0].money
                    rank = Math.round((money / chargeQuantity) * 100) / 100
                }
                this.temForm.chargeInfo = `本设备收费标准为：  ${rank}元 / 度电`
             } catch (error) {
                 messageTip('info','请先设置收费标准')
             }
              Vue.set(item,'loading',false)
         }
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
    .tem_text {
        .tem_text_con {
            display: inline-block;
            margin: 10px 0 10px 40px;
            .icon_span {
                font-size: 20px;
                margin-left: 10px;
                color: #409EFF;
                margin-top: 5px;
            }
        }
        // button {
        //     margin: 15px auto;
        //     display: block;
        // }
    }
}
</style>