<template>
  <div class="configMerInfo">
    <el-row>
        <el-col :md="{span: 11}" :lg="{span: 9, offset: 2}">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>配置微信特约商户信息</span>
                    
                    <el-button style="float: right; padding: 3px 0" type="text" @click="()=>{ this.isEdit1= true }" v-if="configList.length > 0">编辑配置</el-button>
                    <el-button style="float: right; padding: 3px 25px; color: #F56C6C;" type="text" v-if="configList.length > 0" @click="deleteTeyueInfo">删除配置</el-button>
                </div>
                <el-form ref="form" :model="configMerInfoForm1" :rules="rules" label-width="135px" v-if="configList.length > 0 || isEdit1">
                    <el-form-item label="特约商户号" prop="submchid">
                        <el-input v-model="configMerInfoForm1.submchid" v-if="isEdit1" :disabled="configList.length > 0 && isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.submchid}}</div>
                    </el-form-item>
                    <el-form-item label="特约商户平台号" prop="subappid">
                        <el-input v-model="configMerInfoForm1.subappid" v-if="isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.subappid}}</div>
                    </el-form-item>
                    <el-form-item label="秘钥" prop="keyword">
                        <el-input v-model="configMerInfoForm1.keyword" v-if="isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.keyword}}</div>
                    </el-form-item>
                    <el-form-item label="APP秘钥" prop="appsecret">
                        <el-input v-model="configMerInfoForm1.appsecret" v-if="isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.appsecret}}</div>
                    </el-form-item>
                     <el-form-item label="特约" prop="teyue">
                        <el-input v-model="configMerInfoForm1.teyue" v-if="isEdit1"></el-input>
                        <div v-else>{{configMerInfoForm1.teyue}}</div>
                    </el-form-item>
                    <div>
                        <!-- 修改按钮 -->
                        <transition name="el-zoom-in-top">
                            <div class="submitBtn transition-box" v-show="configList.length > 0 && this.isEdit1">
                                <el-button type="primary" @click="handleChangeVal" size="small">确认修改</el-button>
                                <el-button size="small" @click="cancelChange">取消修改</el-button>
                            </div>
                        </transition>
                        <!-- 新增按钮 -->
                        <transition name="el-zoom-in-top">
                            <div class="submitBtn transition-box" v-show="configList.length <= 0">
                                <el-button type="primary" size="small" @click="handleAddTeYue">确认新增</el-button>
                                <el-button size="small" @click="cancelAdd">取消新增</el-button>
                            </div>
                        </transition>
                    </div>
                </el-form>
                <div v-else style="text-align: center;" >
                    <div style="margin-bottom: 15px;">没有特约商户配置，请先添加配置！</div>
                    <el-button type="primary" size="small" @click="()=>{  this.isEdit1= true;}">添加配置</el-button>
                </div>
            </el-card>
        </el-col>
        <el-col :md="{span: 11,offset: 2}" :lg="{span: 9, offset: 2}">
            <el-card class="box-card" shadow="hover">
                <div slot="header" class="clearfix">
                    <span>配特约合伙人</span>
                    <el-button 
                        style="float: right; padding: 3px 0" 
                        type="text"
                        @click="handleAddSubPartner"
                        :disabled="subMerData.length <= 0"
                    >新增配置</el-button>
                </div>
                <el-table
                    :data="subPartnerData"
                    border
                    style="width: 100%"
                    max-height="303px"
                    height="303px"
                    >
                    <el-table-column
                        prop="username"
                        label="商户昵称"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        prop="realname"
                        label="真实姓名"
                        min-width="100">
                    </el-table-column>
                    <el-table-column
                        prop="phoneNum"
                        label="电话"
                        min-width="120"
                    >
                    </el-table-column>
                    <el-table-column min-width="80">
                        <template slot-scope="scope">
                            <el-button type="danger" size="mini" @click="handleDeletePartter(scope.row.id)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
                
            </el-card>
        </el-col>
    </el-row>

    <!-- 查询商户信息 弹框 -->
    <QueryMerchant 
        @handleSelectMerchant="handleSelectMerchant" 
        ref="QueryMerchant"
    />
  </div>
</template>

<script>
import { messageTip,alertConfim} from "@/utils/ele";
import { configMchidapi,configSubPartner } from "@/require/userManage";
import Template from '../../../../../components/common/Template.vue';
import QueryMerchant from '@/components/common/QueryMerchant'
export default {
  components: { Template,QueryMerchant },
  data() {
    return {
      configMerInfoForm1: {},
      isEdit1: false, //是否编辑
      isEdit2: false, //是否编辑
      dataType1: {}, //公众号
      dataType2: {}, //小程序数据
      rules: {
          submchid: [{ required: true, message: '特约商户号为必填内容！', trigger: 'blur' }],
          subappid: [{ required: true, message: '特约商户平台号为必填内容！', trigger: 'blur' }]
      },
    };
  },
  props: ['subMerData','subPartnerData','merid'],
  computed:{
      configList(){  //长度大于2的数组，取数组前两项
          if(this.subMerData.length > 2){
              let [a,b,,]= this.subMerData
              return [a,b]
          }
          return this.subMerData
      }
  },
  watch: {
      configList(val){
            for(let item of val){
                if(item.type === 1){
                    let { appsecret,keyword,subappid,submchid,teyue }= item
                    this.dataType1= { appsecret,keyword,subappid,submchid,teyue }
                    this.configMerInfoForm1= { appsecret,keyword,subappid,submchid,teyue }
                }else if(item.type === 2){
                    let { appsecret,keyword,smallappid,smallappsecret,teyue }= item
                    this.dataType2= { appsecret,keyword,smallappid,smallappsecret,teyue }
                    this.configMerInfoForm2= { appsecret,keyword,subappid,submchid,teyue }
                }
            }
      }
  },
  methods: {
    handleAddTeYue(){ //新增特约商户
        if(this.regExpMessage(this.configMerInfoForm1)){ //交验成功之后发送请求
            this.asyConfigMchidapi({type:1,merid: this.merid, ...this.configMerInfoForm1})
        }
    },
    async asyConfigMchidapi(data){
        let info= await configMchidapi(data)
        if(info.code === 200){
            messageTip('success',info.message)
            this.$emit('handleReReq')
            this.isEdit1= false
            if(data.type === 2){
                this.configMerInfoForm1= {}
            } 
        }else{
            messageTip('error',info.message)
        }
    },
    handleChangeVal(){ //修改特约商户
        if(this.regExpMessage(this.configMerInfoForm1)){ //交验成功之后发送请求
            this.asyConfigMchidapi({type:3,merid: this.merid, ...this.configMerInfoForm1})
        }
    },
    cancelChange(){ //取消修改
        this.configMerInfoForm1= {...this.dataType1}
        this.isEdit1= false
    },
    deleteTeyueInfo(){ //删除特约商户信息
        alertConfim('确认删除特约商户配置吗？',()=>{
            let { submchid,subappid }= this.configMerInfoForm1
            this.asyConfigMchidapi({type:2,merid: this.merid,submchid,subappid})
        })
    },
    cancelAdd(){ //取消新增
        this.configMerInfoForm1= {}
        this.isEdit1= false
    },
    regExpMessage(obj){ //校验特约商户号和特约商户平台号
        if(!obj.submchid){
            messageTip('warning','特约商户号不能为空！')
            return false
        }
        if(!obj.subappid){
            messageTip('warning','特约商户平台号不能为空！')
            return false
        }
        return true
    },
    /* 点击配置新增特约合伙人，弹出查询商户弹框 */ 
    handleAddSubPartner(){
        // 初始化数据
        const queryMerchantData= this.$refs['QueryMerchant'].$data 
        queryMerchantData.gridData= []
        queryMerchantData.searchFrom= {}
        queryMerchantData.dialogVisible=true
    },
    /* 处理选中商户的操作 id为商户的id*/
    handleSelectMerchant(id){
        // 特约商户添加配置合伙人
       this.handleAddAndDeletePartter(1,id,()=>{
           this.$parent.asySelectAgentUnderMer({ merid:this.merid }) //成功之后掉员工父组件的重新加载方法
       }) 
    },
    // 
    handleDeletePartter(id){
       alertConfim("确认删除配置的合伙人吗？",()=>{
           // 特约商户添加配置合伙人
           this.handleAddAndDeletePartter(2,id,()=>{
               this.$parent.asySelectAgentUnderMer({ merid:this.merid }) //成功之后掉员工父组件的重新加载方法
           }) 
       }) 
    },
    /* 添加或删除配置的he惠人 */
    async handleAddAndDeletePartter(type,id,callback){
        try{
            const info= await configSubPartner({
                type, // 1: 添加 2：删除
                subMerId: this.merid, // 特约商家ID
                subPartnerId: id    // 特约合伙人ID
            })
            if(info.code === 200){
                messageTip("success",type == 1 ?"配置成功" : type == 2 ? "删除成功" : "未知")
                callback && callback()
            }else{
                messageTip("error",info.message)
            }
        }catch(e){
            
        }
    }
  }
};
</script>

<style lang="less">
.configMerInfo {
  .submitBtn {
    text-align: center;
  }
}
</style>