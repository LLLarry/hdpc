<template>
   <div class="merInfo">
      <el-card class="box-card card_bottom0">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="昵称" class="form_right25">
                    <el-input v-model="merName" placeholder="请输入商户昵称"  size="small"></el-input>
                </el-form-item>

                <el-form-item label="姓名" class="form_right25">
                    <el-input v-model="merName" placeholder="请输入商户姓名"  size="small"></el-input>
                </el-form-item>

                 <el-form-item label="电话" class="form_right25">
                    <el-input v-model="merName" placeholder="请输入商户电话"  size="small"></el-input>
                </el-form-item>

                <el-form-item label="收益" class="form_right25">
                     <el-select v-model="value1"  placeholder="请选择排序方式"  size="small">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户类型" class="form_right25">
                     <el-select v-model="value2"  placeholder="请选择排序方式"  size="small">
                        <el-option label="有效商户" value="1" ></el-option>
                        <el-option label="所有商户" value="2" ></el-option>
                    </el-select>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" size="small">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>

         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                style="width: 100%"
               
                >
                <el-table-column
                prop="serialNum"
                label="序号"
                min-width="100"
                fixed
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="昵称"
                min-width="100"
                fixed
                >
                </el-table-column>
                <el-table-column
                prop="relName"
                label="姓名"
                min-width="100"
                >
                 </el-table-column>
                <el-table-column
                prop="phone"
                label="电话"
                min-width="120"
                >
                </el-table-column>

                 <el-table-column
                prop="totalEarn"
                label="总收益"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="noMention"
                label="未提现"
                min-width="120">
                 <template slot-scope="scope">
                    <el-link type="primary">{{scope.row.feeMoney}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="feeMoney"
                label="欠款金额"
                min-width="100">
                    <template slot-scope="scope">
                        <el-link type="primary">查看详情</el-link>
                    </template>
                </el-table-column>

                 <el-table-column
                prop="handle"
                label="操作"
                min-width="100">
                  <template slot-scope="scope">
                      <el-button size="mini" icon="el-icon-setting" @click="handleSetButton(scope.scope)">设置</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                prop="rate"
                label="费率"
                min-width="100">
                  <template slot-scope="scope">
                      <el-button size="mini" icon="el-icon-edit" @click="handleRateBtn(scope.row.rate)">{{scope.row.rate}} ‰</el-button>
                  </template>
                </el-table-column>
                <el-table-column
                prop="pubRate"
                label="对公费率"
                min-width="120"
                >
                 <template slot-scope="scope">
                     <el-button size="mini" icon="el-icon-edit" @click="handleRateBtn(scope.row.rate)"> {{scope.row.pubRate}} ‰</el-button>
                  </template>
                </el-table-column>

                 <el-table-column
                prop=""
                label="设备数量"
                min-width="100">
                    <template slot-scope="scope">
                        <el-link type="primary">{{scope.row.deviceNum}}</el-link>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="onlineNum"
                label="在线数量"
                min-width="100">
                    <template slot-scope="scope">
                        <el-link type="primary">{{scope.row.onlineNum}}</el-link>
                    </template>
                </el-table-column>

                 <el-table-column
                prop="bankNum"
                label="银行卡"
                min-width="100">
                     <template slot-scope="scope">
                        <el-link type="primary">查看银行卡</el-link>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="date"
                label="注册时间"
                min-width="170">
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage"/>
        <!-- 模态框，点击操作中的设置 -->
        <el-dialog
            title="设置"
            :visible.sync="dialogSetVisible"
            width="390px"
            :before-close="handleSetClose">
            <el-form :model="ruleSetForm" class="setForm" label-position="center" label-width="160px">
                <el-form-item label="提现通知" prop="a">
                     <el-radio-group v-model="ruleSetForm.a">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="2">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="订单通知" prop="b">
                    <el-radio-group v-model="ruleSetForm.b">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="2">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="设备上下线通知" prop="c">
                    <el-radio-group v-model="ruleSetForm.c">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="2">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="脉冲模块自动退费" prop="d">
                    <el-radio-group v-model="ruleSetForm.d">
                        <el-radio :label="1">开启</el-radio>
                        <el-radio :label="2">关闭</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogSetVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogSetVisible = false">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 这个框是修改费率的对话框 -->
        <el-dialog  
            title="设置费率"
            :visible.sync="dialogRateVisible"
            width="390px"
            :before-close="handleRateClose">
            <el-form :model="formLabelWidthRate" :rules="rules"
            >
                <el-form-item label="昵称" prop="nickName">
                    <el-input v-model="formLabelWidthRate.nickName" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="formLabelWidthRate.name" autocomplete="off" disabled></el-input>
                </el-form-item>
                <el-form-item label="费率" prop="rate">
                    <el-input v-model="formLabelWidthRate.rate" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogRateVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogRateVisible = false">确 定</el-button>
            </div>
            </el-dialog>
   </div>
</template>

<script>
import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link,Dialog,Radio,RadioGroup,} from 'element-ui'
import Vue from 'vue'
import MyPagination from '../../components/common/MyPagination'
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Link)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
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
           value1: '',
           value2: '',
           value3: '',
           deviceNum: '',
           startTime: '',
           endTime: '',
           merName: '',
            tableData: [{
            serialNum: 1,
            name: '王小虎',
            relName: '李想',
            phone: 15638451678,
            totalEarn: 35852.00,
            noMention: 11611.00,
            feeMoney: 43.23,
            handle: 0,
            rate: 6,
            pubRate:0,
            deviceNum: 29,
            onlineNum: 28,
            bankNum: '查看银行卡',
            date: '2019-07-07 08:59:23'
            },
            {
            serialNum: 1,
            name: '王小虎',
            relName: '李想',
            phone: 15638451678,
            totalEarn: 35852.00,
            noMention: 11611.00,
            feeMoney: 43.23,
            handle: 0,
            rate: 6,
            pubRate:0,
            deviceNum: 29,
            onlineNum: 28,
            bankNum: '查看银行卡',
            date: '2019-07-07 08:59:23'
            },
            {
            serialNum: 1,
            name: '王小虎',
            relName: '李想',
            phone: 15638451678,
            totalEarn: 35852.00,
            noMention: 11611.00,
            feeMoney: 43.23,
            handle: 0,
            rate: 6,
            pubRate:0,
            deviceNum: 29,
            onlineNum: 28,
            bankNum: '查看银行卡',
            date: '2019-07-07 08:59:23'
            },
            ],
            totalPage: 500, //共50条数据  
            dialogSetVisible: false, //set模态框显示隐藏
            ruleSetForm: {
                a: 1,
                b: 2,
                c: 1,
                d: 2
            },
            dialogRateVisible: false,
            formLabelWidthRate: {
                nickName: '一只小小鸟',
                name: '张三',
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
    created(){
        console.log(this.$route.matched)
    },
    methods: {
        getPage(page){ //分页发改变时，触发回调
            console.log('fu',page)
        },
        handleSetClose(){ //set模态框关闭之前
            this.dialogSetVisible = false
        },
        handleSetButton(){
            this.dialogSetVisible= true
        },
        handleRateClose(){ //处理修改费率关闭界面
            this.dialogRateVisible= false
        },
        
        handleRateBtn(){ //点击修改费率
             this.$prompt('请输入密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '请输入密码',
                lockScroll: true
            }).then(({ value }) => {
            this.$message({
                type: 'success',
                message: '你的密码是: ' + value
            });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        }
    }
}
</script>

<style lang="less">
@import '../../../static/style/default.less';
@import '../../../static/style/common.less';
    .deviceEarn {
       
    }
</style>