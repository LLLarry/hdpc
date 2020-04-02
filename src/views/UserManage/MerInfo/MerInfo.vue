<template>
   <div class="merInfo">
      <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" v-model="merInfoForm" size="mini">
                <el-form-item label="昵称" class="form_right25">
                    <el-input v-model="merInfoForm.nick" placeholder="商户昵称" clearable  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户ID" class="form_right25">
                    <el-input v-model="merInfoForm.merid" placeholder="商户ID" clearable  size="small"></el-input>
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
                :row-style="rowClass"
                >
                <el-table-column
                prop="serialNum"
                label="序号"
                min-width="70"
                :fixed="userInfo.classify === 'Agent' ? false :true"
                >
                <template slot-scope="scope">
                     {{(nowPage-1)*10+scope.$index + 1}}
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="昵称"
                min-width="130"
                :fixed="userInfo.classify === 'Agent' ? false :true"
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
                        <router-link :to="`/usermanage/userInfo?condition=0&dealer=${scope.row.realname || ''}&mobile=${scope.row.phone_num || ''}`">
                            <el-link type="primary" >查看详情</el-link>
                        </router-link>
                    </template>
                </el-table-column>

                <el-table-column
                prop="feeMoney"
                label="缴费模板"
                v-if="userInfo.classify && userInfo.classify === 'superAdmin'"
                min-width="100">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-setting" @click="handleScanPayTem(scope.row)">查看</el-button>
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
                prop="rank"
                label="授权"
                v-if="userInfo.classify && userInfo.classify === 'superAdmin'"
                width="130"
                >
                 <template slot-scope="scope">
                     <el-button size="mini" icon="el-icon-edit" type="primary" plain @click="handChargeRank(scope.row)" style="width: 113px; text-align:center;" :disabled="scope.row.rank == 0">
                         {{ scope.row.rank == 3 ? '代理商' : scope.row.rank == 2 ?  '商 户' : scope.row.rank == 0 ? '超级管理员' : '— —'}}
                     </el-button>
                  </template>
                </el-table-column>

                <el-table-column
                prop="agentname"
                label="绑定/解绑"
                v-if="userInfo.classify && userInfo.classify === 'superAdmin'"
                min-width="120">
                    <template slot-scope="scope">
                        <div v-if="scope.row.rank== 2">
                            <el-button type="danger" size="mini" v-if="scope.row.agent_id != 0" @click="handUnbindMer(scope.row)">解绑代理商</el-button>
                            <el-button type="primary" size="mini" v-else @click="handleBindAgent(scope.row)">绑定代理商</el-button>
                        </div>
                        <div v-else>
                            <el-button type="primary" size="mini" disabled plain>禁止操作</el-button>
                        </div>
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
                prop="agentname"
                label="所属代理商"
                min-width="100">
                     <template slot-scope="scope">
                        {{ scope.row.agentname == null ? '— —' : scope.row.agentname }}
                    </template>
                </el-table-column>

                <el-table-column
                prop="agentname"
                label="操作"
                min-width="100">
                     <template slot-scope="scope">
                        <router-link :to="`/usermanage/merInfo/MerInfoDetail?dealer=${scope.row.id}`">
                            <el-link type="primary">操作详情</el-link>
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
                <!-- 这个是代理商名下，查看商户详情的 -->
                <el-table-column
                    prop="bankNum"
                    label="查看商户"
                    min-width="120"
                    v-if="userInfo.classify && userInfo.classify === 'Agent'"
                    >
                        <template slot-scope="scope">
                            <!-- 当是代理商自己的时候，走上面的，否则走下面的 -->
                            <div v-if="userInfo.token == scope.row.id">
                                <el-button style="width: 100px;" type="primary" size="small" @click="selectScanMer(2,scope.row,scope.$index)" v-if="agentSelectMerInfo.id == '' || agentSelectMerInfo.id == scope.row.id" disabled>取消选择</el-button>
                                <el-button style="width: 100px;" type="primary" plain size="small" @click="selectScanMer(1,scope.row,scope.$index)" v-else>选中此商户</el-button>
                            </div>
                            <div v-else>
                                <el-button style="width: 100px;" type="primary" plain size="small" @click="selectScanMer(1,scope.row,scope.$index)" v-if="agentSelectMerInfo.id !== scope.row.id">选中此商户</el-button>
                                <el-button style="width: 100px;" type="primary" size="small" @click="selectScanMer(2,scope.row,scope.$index)" v-else >取消选择</el-button>
                            </div>
                        </template>
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage"/>
        <!-- 模态框，点击操作中的设置 -->
        <el-dialog
            title="设置"
            :visible.sync="dialogSetVisible"
            width="780px"
            :before-close="handleSetClose">
            <div class="clearfix">
                <div class="dialog_left">
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
                        <el-form-item label="是否显示投币收益" prop="showincoins">
                            <el-radio-group v-model="ruleSetForm.showincoins">
                                <el-radio :label="1">开启</el-radio>
                                <el-radio :label="2">关闭</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-form>
                </div>
                <div  class="dialog_right">
                    <el-form :model="ruleSetForm" class="setForm" label-position="center" label-width="100px">
                        <el-form-item label="客服电话">
                            <el-input v-model="ruleSetForm.servephone" placeholder="客服电话" size="small"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
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
        <!-- 商家缴费模板 -->
        <el-dialog  
            title="修改缴费模板"
            :visible.sync="payTemVisible"
             width="800px"
            :modal="false"
             custom-class="dialogStyle"
            >
            <el-row class="payTemRow">
                <el-col :span="12" class="netWork">
                    <div class="title">网络设备模板</div>
                     <el-row class="item">
                         <el-col :span="10">00出厂默认设置</el-col>
                         <el-col :span="14"><el-input-number v-model="payTemData['00']['00']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">01十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['01']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">02电轿款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['02']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">03脉冲板子</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['03']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">04离线充值机</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['04']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>

                     <el-row class="item">
                         <el-col :span="10">05十六路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['05']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                      <el-row class="item">
                         <el-col :span="10">06二十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['00']['06']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                </el-col>
                <el-col :span="12" class="blueBooth">
                    <div class="title">蓝牙设备模板</div>
                    <!-- <el-row class="item">
                         <el-col :span="10">00出厂默认设置</el-col>
                         <el-col :span="14"><el-input-number v-model="payTemData['01']['00']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">01十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['01']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">02电轿款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['02']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row> -->
                     <el-row class="item">
                         <el-col :span="10">03脉冲板子</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['03']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <!-- <el-row class="item">
                         <el-col :span="10">04离线充值机</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['04']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">05十六路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['05']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row>
                     <el-row class="item">
                         <el-col :span="10">06二十路智慧款</el-col>
                        <el-col :span="14"><el-input-number v-model="payTemData['01']['06']" size="small" :min="0" :step="10" :max="1000" ></el-input-number></el-col>
                     </el-row> -->
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="payTemVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitPayTem">确 定</el-button>
            </div>
            </el-dialog>

            <!-- 修改商户的授权信息 -->
             <el-dialog
                :show-close="false"
                :visible.sync="merRankVersion"
                width="400px"
                :modal="false"
                title="修改商户授权信息"
                custom-class="dialogHverson"
            >    
                <el-form label-position="top" :model="merRankVersionForm">
                    <el-form-item label="商户名" class="form_right25">
                        <el-input v-model="merRankVersionForm.username" placeholder="商户名" disabled clearable ></el-input>
                    </el-form-item>
                    <el-form-item label="商户电话" class="form_right25">
                        <el-input v-model="merRankVersionForm.phone_num" placeholder="手机号" disabled clearable ></el-input>
                    </el-form-item>
                    <el-form-item label="商户权限" class="form_right25" style="width: 100%;">
                        <el-select v-model="merRankVersionForm.rank"  placeholder="选择商户权限"  style="width: 100%;">
                            <el-option label="商户" :value="2" ></el-option>
                            <el-option label="代理商" :value="3" ></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="merRankVersion = false" size="middle">取 消</el-button>
                    <el-button type="primary" @click="HandlemerRankVersion" size="middle">确 定</el-button>
                </span>
                </el-dialog>
                
                <!-- 绑定代理商 -->
                <BindMerToAgent :bindInfo="bindInfo" @backFn="backFn" />     
   </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import { handleMerInfo,handleMerInfoSet,setMerInfoSetInfo,updataFeerate,updataRate,getMerPayTem,updateMerPayTem,updatesetAgent } from '@/require/userManage'
import { messageTip , alertPassword , confirDelete} from '@/utils/ele'
import { merUnbindAgent } from '@/require'
import { mapState, mapMutations } from 'vuex'
import BindMerToAgent from '@/components/common/bindMerToAgent'
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
            },
            payTemVisible: false, //商户模板显示/隐藏
            payTemRow: null, //选中缴费商户的row
            payTemData: {
                '00': {
                    // "00": 30,
                    // "01": 30,
                    // "02": 30,
                    // "03": 30,
                    // "04": 30,
                    // "05": 30,
                    // "06": 30,
                },
                '01': {
                    // "00": 30,
                    // "01": 30,
                    // "02": 30,
                    // "03": 30,
                    // "04": 30,
                    // "05": 30,
                    // "06": 30,
                }
            },
            merRankVersion: false, // 商户授权显示
            merRankVersionForm: {}, //商户授权容器
            changeMerRankRow: {}, //商户授权存储row的容器
            bindInfo: {show: false},
       }
   },
    components: {
       MyPagination,
       BindMerToAgent
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
        //agentSelectMerId 代理商选择名下的商户的id
        ...mapState(['userInfo','agentSelectMerInfo'])
    },
    methods: {
        ...mapMutations(['setAgentSelectMerInfo']),
        getPage(page){ //分页发改变时，触发回调
            this.merInfoForm= {...this.merInfoForm,currentPage:page}
            this.$router.push({query: this.merInfoForm})
            this.handleMerInfoData(this.merInfoForm)
            this.nowPage = page
        },
        handleSetClose(){ //set模态框关闭之前
            this.dialogSetVisible = false
        },
        async handleSetButton(merid){ //获取设置框信息
            try{
                let setInfo= await handleMerInfoSet({merid})
                let result= setInfo.result
                let setObj= {}
                setObj.withmess= result.withmess ? result.withmess : 2
				setObj.ordermess= result.ordermess ? result.ordermess : 2
				setObj.equipmess= result.equipmess ? result.equipmess : 2
                setObj.incoinrefund= result.incoinrefund ? result.incoinrefund : 1
                setObj.showincoins= result.showincoins !== 2 ? result.showincoins : 2
                let {withmess,ordermess,equipmess,incoinrefund,showincoins} = setObj
                let { servephone= ""}= setInfo.dealer
                this.ruleSetForm= {withmess,ordermess,equipmess,incoinrefund,merid,showincoins,servephone}
                this.dialogSetVisible= true
            }catch(error){

            }
        },
        async submitSetInfo(){ //设置设置框信息
            const {merid, withmess,ordermess: order, equipmess: equip,incoinrefund,showincoins,servephone}= this.ruleSetForm
            try{
                let info= await setMerInfoSetInfo({merid,withmess,order,equip,incoinrefund,showincoins,servephone})
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
        },
        handleScanPayTem(row){ //点击缴费模板
            this.payTemRow= row
            let {id:merId}= row
            getMerPayTem({merId}).then(res=>{
                console.log(res)
                this.payTemData= res
                this.payTemVisible= true
            }).catch(err=>{

            })
        },
        submitPayTem(){ //提交修改商户的缴费模板
            let {username=null,id}= this.payTemRow
            let {"00":netType,"01":equipmentType}= this.payTemData
            updateMerPayTem({
               id,
               username,     
               netType: {
                   "00": this.payTemData["00"]
               },
               equipmentType: {
                    "01": this.payTemData["01"]
               }
            }).then(res=>{
                this.payTemVisible= false
                if(res.code == 200){
                    messageTip('success','修改成功')
                }else{
                    messageTip('error','修改失败')
                }
            }).catch(err=>{
                this.payTemVisible= false
            })
        },
        handChargeRank(row){ //改变授权信息
            alertPassword(()=>{
              this.changeMerRankRow= row
              let { username,phone_num,rank,id }=  row
              this.merRankVersionForm= { username,phone_num,rank,id}
              this.merRankVersion= true
            })
        },
        HandlemerRankVersion(){ //点击提交商户权限修改
            let {id,rank}= this.merRankVersionForm
            updatesetAgent({merId: id,rank}).then(res=>{
                this.merRankVersion= false
                if(res.code == 200){
                    messageTip('success', '设置成功')
                    this.changeMerRankRow.rank= rank
                }else{
                    messageTip('error', res.result || '设置失败')
                }
            }).catch(err=>{
                this.merRankVersion= false
            })
        },
        handleBindAgent(row){
            this.bindInfo= {show: true,from: 2,page: {id: row.id}}
        },
        selectScanMer(from,row,selectRowIndex){ //选择/取消选择的商户
            if(from === 1){ //选择商户
                this.setAgentSelectMerInfo({
                    id:row.id,
                    name: row.username || row.realname || ''
                })
                this.selectRowIndex= selectRowIndex
                messageTip('success',`已成功选择 ${row.username || row.realname || ''} 为查看商户`)
            }else if(from === 2){ //取消商户
                this.setAgentSelectMerInfo({
                    id:'',
                    name:''
                })
                this.selectRowIndex= 0
                messageTip('success',`取消选择商户成功`)
            }
            
        },
        rowClass({row,rowIndex}){ //改变选中行的颜色
            // 当只有代理商时才返回背景颜色 
            if(this.userInfo.classify === 'Agent'){
                if(this.userInfo.token == row.id){ //当索引等于0时，判断 this.agentSelectMerInfo.id来让第一行为默认
                    if(row.id == this.agentSelectMerInfo.id || this.agentSelectMerInfo.id == ''){
                    return {"backgroundColor": 'rgba(255,0,0,.1)'}
                    }
                }else{
                    if(row.id == this.agentSelectMerInfo.id ){
                    return {"backgroundColor": 'rgba(255,0,0,.1)'}
                    }
                }
            }else{
                return {}
            }  
           
        },
        handUnbindMer(row){ //解绑商户
            confirDelete('确认解绑此商户吗？',()=>{
                merUnbindAgent({merId: row.id}).then(res=>{
                    if(res.code == 200){
                        messageTip('success','解绑成功')
                        this.handleMerInfoData(this.merInfoForm)
                    }else{
                        messageTip('danger','解绑失败')
                    }
                }).catch(err=>{

                })
            })
        },
        backFn(){
            this.handleMerInfoData(this.merInfoForm)
        }
    }
}
</script>

<style lang="less">
.merInfo {
    .dialogStyle {
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
    }
    .dialog_left {
        float: left;
        width: 50%;
    }
    .dialog_right {
        float: right;
        width: 50%;
    }
    .payTemRow {
        .title {
            font-size: 18px;
            text-align: center;
            padding-bottom: 25px;
        }
        .item {
            border-top: 1px solid #EBEEF5;
            border-left: 1px solid #EBEEF5;
            line-height: 32px;
            font-size: 13px;
            color: rgb(102, 102, 102);
            &>div {
                padding: 8px 15px;
            }
        }
        .netWork {
             border-bottom: 1px solid #EBEEF5;
             .item {
                  border-right: 1px solid #EBEEF5;
             }
        }
        .blueBooth {
             border-bottom: 1px solid #EBEEF5;
             .item {
                  border-right: 1px solid #EBEEF5;
                  border-left: none;
             }
        }
    }
    .el-table tbody tr:hover>td { 
        background-color:transparent !important;
    }
}
</style>
