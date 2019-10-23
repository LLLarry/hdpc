<template>
    <div class="merEarnDetail">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="merEarnDetailForm" size="mini">
                <el-form-item label="订单号" class="form_right25">
                    <el-input v-model="merEarnDetailForm.orderNum" placeholder="请输入订单号"  size="small"></el-input>
                </el-form-item>

                <el-form-item label="支付方式" class="form_right25">
                     <el-select v-model="merEarnDetailForm.payType"  placeholder="请选择支付方式"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="钱包" value="1" ></el-option>
                        <el-option label="微信" value="2" ></el-option>
                        <el-option label="支付宝" value="3" ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="类型" class="form_right25">
                     <el-select v-model="merEarnDetailForm.type"  placeholder="请选择支付方式"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="收入" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="开始时间" class="form_right25">
                     <el-date-picker
                        v-model="merEarnDetailForm.startTime"
                        size="small"
                        type="date"
                        placeholder="选择开始时间"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25">
                     <el-date-picker
                        v-model="merEarnDetailForm.endTime"
                        size="small"
                        type="date"
                        placeholder="选择结束时间"
                        >
                      </el-date-picker>
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
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="orderNum"
                label="订单号"
                min-width="230"
                >
                </el-table-column>
                <el-table-column
                prop="money"
                label="金额"
                min-width="120"
                >
                    <template slot-scope="scope">
                        <el-link  type="success" :underline="false" v-if="scope.row.type==1">{{scope.row.money}}</el-link>
                        <el-link type="danger" :underline="false" v-else>{{scope.row.money}}</el-link>
                    </template>
                 </el-table-column>
                <el-table-column
                prop="balance"
                label="余额"
                min-width="120"
                >
                 </el-table-column>
                <el-table-column
                prop="payType"
                label="支付方式"
                min-width="120"
                >
                 </el-table-column>
                <el-table-column
                prop="tyle"
                label="类型"
                min-width="120"
                >
                    <template slot-scope="scope">
                       <el-link type="success" :underline="false" v-if="scope.row.type==1">收入</el-link>
                       <el-link type="danger" :underline="false" v-else>支出</el-link>
                    </template>
                 </el-table-column>
                <el-table-column
                prop="date"
                label="时间"
                min-width="180"
                >
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage"/>
    </div>
</template>
<script>
import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link} from 'element-ui'
import Vue from 'vue'
import MyPagination from '@/components/common/MyPagination'
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
export default {
    data(){
        return {
                merEarnDetailForm: {
                orderNum: '',
                payType: '',
                type: '',
                startTime: '',
                endTime: ''
            },
            tableData: [
                {
                    index: 1,
                    orderNum:'201910221056433970035789',
                    money: 5,
                    balance: 11970.0,
                    payType: '微信',
                    type: 1, //1收入，2支出
                    date: '2019-10-22 10:56:54'
                },
                {
                    index: 2,
                    orderNum:'201910221056433970035789',
                    money: 2,
                    balance: 11970.0,
                    payType: '支付宝',
                    type: 2, //1收入，2支出
                    date: '2019-10-22 10:56:54'
                }
            ],
            totalPage: 326,
        }
    },
    methods: {
        getPage(page){

        }
    },
    components: {
        MyPagination
    }
}
</script>

<style lang="less">
@import '../../../../../static/style/default.less';
@import '../../../../../static/style/common.less';
.merEarnDetail {
    .el-link.el-link--success {
        text-decoration: none;
    }   
}

</style>