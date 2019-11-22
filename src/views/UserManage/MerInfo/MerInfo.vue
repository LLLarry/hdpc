<template>
   <div class="merInfo">
      <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" v-model="merInfoForm" size="mini">
                <el-form-item label="昵称" class="form_right25">
                    <el-input v-model="merInfoForm.nick" placeholder="商户昵称" clearable  size="small"></el-input>
                </el-form-item>

                <el-form-item label="姓名" class="form_right25">
                    <el-input v-model="merInfoForm.name" placeholder="商户姓名" clearable  size="small"></el-input>
                </el-form-item>

                 <el-form-item label="电话" class="form_right25">
                    <el-input v-model="merInfoForm.phone" placeholder="商户电话" clearable size="small"></el-input>
                </el-form-item>

                <el-form-item label="收益" class="form_right25">
                     <el-select v-model="merInfoForm.income"  placeholder="请选择排序方式"  clearable size="small">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户类型" class="form_right25">
                     <el-select v-model="merInfoForm.type"  placeholder="所有商户" clearable size="small">
                        <el-option label="有效商户" value="1" ></el-option>
                        <el-option label="无效商户" value="2" ></el-option>
                    </el-select>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn">
                     <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>

         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="serialNum"
                label="序号"
                min-width="70"
                fixed
                >
                <template slot-scope="scope">
                     {{(nowPage-1)*10+scope.$index + 1}}
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="昵称"
                min-width="130"
                fixed
                >
                <template slot-scope="scope">
                     {{scope.row.username && scope.row.username.length >0 ? scope.row.username : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="realname"
                label="姓名"
                min-width="100"
                >
                 <template slot-scope="scope">
                     {{scope.row.realname && scope.row.realname.length >0 ? scope.row.realname : '— —'}}
                </template>
                 </el-table-column>
                <el-table-column
                prop="phone_num"
                label="电话"
                min-width="120"
                >
                </el-table-column>

                 <el-table-column
                prop="earntotal"
                label="总收益"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="earnings"
                label="未提现"
                min-width="120">
                 <template slot-scope="scope">
                     <router-link :to="`/usermanage/merInfo/merEarnDetail?dealer=${scope.row.id}`" tag="li">
                         <el-link type="primary">{{scope.row.earnings}}</el-link>
                     </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="feeMoney"
                label="欠款金额"
                v-if="userInfo.classify && userInfo.classify === 'superAdmin'"
                min-width="100">
                    <template slot-scope="scope">
                        <router-link :to="`/usermanage/userInfo?dealer=${scope.row.realname || ''}&mobile=${scope.row.phone_num || ''}`">
                            <el-link type="primary" >查看详情</el-link>
                        </router-link>
                    </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="操作"
                v-if="userInfo.classify && userInfo.classify === 'superAdmin'"
                min-width="100">
                  <template slot-scope="scope">
                      <el-button size="mini" icon="el-icon-setting" @click="handleSetButton(scope.row.id)">设置</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                prop="feerate"
                label="费率"
                v-if="userInfo.classify && userInfo.classify === 'superAdmin'"
                min-width="100">
                  <template slot-scope="scope">
                      <el-button size="mini" icon="el-icon-edit" @click="handleRateBtn({row: scope.row,type:1})">{{scope.row.feerate}} ‰</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                prop="rate"
                label="对公费率"
                v-if="userInfo.classify && userInfo.classify === 'superAdmin'"
                min-width="120"
                >
                 <template slot-scope="scope">
                     <el-button size="mini" icon="el-icon-edit" @click="handleRateBtn({row: scope.row,type:2})"> {{scope.row.rate}} ‰</el-button>
                  </template>
                </el-table-column>

                 <el-table-column
                prop="totalline"
                label="设备数量"
                min-width="100">
                    <template slot-scope="scope">
                        <router-link :to="`/deviceManage/deviceList?phone=${scope.row.phone_num}`">
                            <el-link type="primary">{{scope.row.totalline}}</el-link>
                        </router-link>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="onlines"
                label="在线数量"
                min-width="100">
                    <template slot-scope="scope">
                        <router-link :to="`/deviceManage/deviceList?phone=${scope.row.phone_num}&line=1`">
                             <el-link type="primary">{{scope.row.onlines}}</el-link>
                        </router-link>
                    </template>
                </el-table-column>

                 <el-table-column
                prop="bankNum"
                label="银行卡"
                min-width="100">
                     <template slot-scope="scope">
                         <router-link :to="`/usermanage/merInfo/merBinkInfo?id=${scope.row.id}`">
                            <el-link type="primary">查看银行卡</el-link>
                         </router-link>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="date"
                label="注册时间"
                min-width="170">
                <template slot-scope="scope">
                    {{ scope.row.create_time|fmtDate}}
                </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage"/>
        <!-- 模态框，点击操作中的设置 -->
        <el-dialog
            title="设置"
            :visible.sync="dialogSetVisible"
            width="390px"
            :before-close="handleSetClose">
            <el-form :model="ruleSetForm" class="setForm" label-position="center" label-width="160px">
                <el-form-item label="提现通知" prop="withmess">
                     <el-radio-group v-model="ruleSetForm.withmess">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="2">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="订单通知" prop="ordermess">
                    <el-radio-group v-model="ruleSetForm.ordermess">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="2">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="设备上下线通知" prop="equipmess">
                    <el-radio-group v-model="ruleSetForm.equipmess">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="2">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="脉冲模块自动退费" prop="incoinrefund">
                    <el-radio-group v-model="ruleSetForm.incoinrefund">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="2">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogSetVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitSetInfo">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 这个框是修改费率的对话框 -->
        <el-dialog  
            :title="formLabelWidthRate.type == 1 ? '设置费率': '设置对公费率'"
            :visible.sync="dialogRateVisible"
             width="390px"
            :modal="false"
            custom-class="dialogStyle"
            :close-on-click-modal="false"
            :before-close="handleRateClose">
            <el-form :model="formLabelWidthRate" :rules="rules" ref="ruleForm" >
                <el-form-item label="昵称" prop="username">
                    <el-input v-model="formLabelWidthRate.username" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="realname">
                    <el-input v-model="formLabelWidthRate.realname" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="费率" prop="rate">
                    <el-input v-model="formLabelWidthRate.rate" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRateVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitModifyRate">确 定</el-button>
            </div>
            </el-dialog>
   </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import { handleMerInfo,handleMerInfoSet,setMerInfoSetInfo,updataFeerate,updataRate } from '@/require/userManage'
import { messageTip , alertPassword } from '@/utils/ele'
import { mapState } from 'vuex'
export default {
   data(){
       var checkRate= (rule,value,callback)=>{ //核对修改费率的费率是否正确
            if(value >=0 && value <= 100){
                callback()
            }else{
                callback(new Error('输入费率范围在0-100之间'))
            }
        };
       return {
            merInfoForm: {},
            loading: false,
            tableData: [], //每条数据
            totalPage: 1, //共1条数据
            nowPage: 1, //当前页数   
            dialogSetVisible: false, //set模态框显示隐藏
            ruleSetForm: { //设置弹框
              
            },
            dialogRateVisible: false,
            formLabelWidthRate: {
                username: '',
                realname: '',
                rate: 6
            },
            rules: {
                rate: [{ required: true, trigger: 'blur', validator: checkRate }],
            }
       }
   },
    components: {
       MyPagination 
    },
    beforeCreate(){

    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            this.merInfoForm= {...this.$route.query}
        }
        this.handleMerInfoData(this.merInfoForm)
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        getPage(page){ //分页发改变时，触发回调
            let obj= {...this.merInfoForm,currentPage:page}
            this.handleMerInfoData(obj)
            this.nowPage = page
        },
        handleSetClose(){ //set模态框关闭之前
            this.dialogSetVisible = false
        },
        async handleSetButton(merid){ //获取设置框信息
            try{
                let setInfo= await handleMerInfoSet({merid})
                setInfo.withmess= setInfo.withmess ? setInfo.withmess : 2
				setInfo.ordermess= setInfo.ordermess ? setInfo.ordermess : 2
				setInfo.equipmess= setInfo.equipmess ? setInfo.equipmess : 2
                setInfo.incoinrefund= setInfo.incoinrefund ? setInfo.incoinrefund : 1
                let {withmess,ordermess,equipmess,incoinrefund} = setInfo
                this.ruleSetForm= {withmess,ordermess,equipmess,incoinrefund,merid}
                this.dialogSetVisible= true
            }catch(error){

            }
        },
        async submitSetInfo(){ //设置设置框信息
            const {merid, withmess,ordermess: order, equipmess: equip,incoinrefund}= this.ruleSetForm
            try{
                let info= await setMerInfoSetInfo({merid,withmess,order,equip,incoinrefund})
                if(info.code === 200){
                    messageTip(undefined,'设置成功')
                }
                this.dialogSetVisible= false
            }catch(error){

            }
        },
        handleRateClose(){ //处理修改费率关闭界面
            this.dialogRateVisible= false
        },
        async handleMerInfoData(data){ //请求商户信息
            let _this= this
            try{
                _this.loading= true
                let merInfoData= await handleMerInfo(data)
                this.tableData= merInfoData.listdata
                this.totalPage= merInfoData.totalRows
                 _this.loading= false
            }catch(error){
                 if(error == '拦截请求'){ //当访问出错时会error为字符串，当拦截器拦截时error为undefined,当拦截器拦截时继续加载
                    _this.loading= true
                    return 
                   }
                     _this.loading= false
            } 
        },
        handleRateBtn(data){ //点击修改费率
        console.log(data)
        let {username="— —",realname="— —",feerate,rate,id,bankid} = data.row
        let { type }= data
             alertPassword(()=>{
                 if(type==1){
                     this.formLabelWidthRate= {username,realname,rate:feerate,type,id}
                 }else{
                     this.formLabelWidthRate= {username,realname,rate,type,id,bankid}
                 }
                 this.dialogRateVisible=true
             })
        },
        submitModifyRate(){ //提交修改费率
           this.$refs['ruleForm'].validate((valid)=>{
               if(valid){ //发送请求
        
                    if(this.formLabelWidthRate.type ===1){ //普通费率
                       let params= {id: this.formLabelWidthRate.id,rate: this.formLabelWidthRate.rate}
                        updataFeerate(params).then(res=>{ //发送请求，修改费率
                        // 修改页面的信息
                            if(res.code === 200){
                                this.tableData.forEach((item,i)=>{
                                    if(item.id== this.formLabelWidthRate.id){
                                        item.feerate= this.formLabelWidthRate.rate
                                    }
                                    return item
                                })
                                messageTip('success','修改成功')
                            }else {
                                messageTip('warning',res.message)
                            }

                        this.dialogRateVisible=false
                        }).catch(error=>{
                            this.dialogRateVisible=false
                        })
                    }else{ //对公费率
                        let params= {bankid : this.formLabelWidthRate.bankid, rate: this.formLabelWidthRate.rate}
                        updataRate(params).then(res=>{
                        // 修改页面的信息
                                if(res.code === 200){
                                     this.tableData.forEach((item,i)=>{
                                        if(item.id== this.formLabelWidthRate.id){
                                            item.rate= this.formLabelWidthRate.rate
                                        }
                                        return item
                                     })
                                     messageTip('success','修改成功')
                                }else {
                                    messageTip('warning',res.message)
                                }
                               
                            this.dialogRateVisible=false
                        }).catch(error=>{
                            this.dialogRateVisible=false
                        })
                    }
                    
               }
           })
        },
        handleSearch(){ //点击搜索查询
            this.$router.push({query: this.merInfoForm})
            this.handleMerInfoData(this.merInfoForm)
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>

<style lang="less">
.merInfo {
    .dialogStyle {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
}
</style>
