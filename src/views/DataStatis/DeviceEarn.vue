<template>
   <div class="deviceEarn">
      <el-card class="box-card card_bottom0">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="订单数" class="form_right25">
                     <el-select v-model="value1" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="不排序" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总金额" class="form_right25">
                     <el-select v-model="value2" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="不排序" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="设备号">
                    <el-input v-model="deviceNum" placeholder="请输入设备号"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="商户名">
                    <el-input v-model="merName" placeholder="请输入商户名"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="开始时间" class="form_right25">
                      <el-date-picker
                        v-model="startTime"
                        size="small"
                        type="date"
                        placeholder="选择开始时间">
                      </el-date-picker>
                </el-form-item>

                  <el-form-item label="结束时间" class="form_right25">
                      <el-date-picker
                        size="small"
                        v-model="endTime"
                        type="date"
                        placeholder="选择结束时间">
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
                :summary-method="getSummaries" 
                :show-summary="true"
                >
                <el-table-column
                prop="date"
                label="时间"
                min-width="100"
                fixed
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="设备号"
                min-width="100"
                fixed
                >
                </el-table-column>
                <el-table-column
                prop="address"
                label="归属商户"
                min-width="100"
                >
                </el-table-column>

                 <el-table-column
                prop="date"
                label="归属小区"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="总收益"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="总订单"
                min-width="100">
                </el-table-column>

                 <el-table-column
                prop="date"
                label="微信收益"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="支付宝收益"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                label="支付宝订单"
                min-width="120"
                >
                </el-table-column>

                 <el-table-column
                prop="date"
                label="微信退费"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="date"
                label="微信退费订单"
                min-width="100">
                </el-table-column>

                 <el-table-column
                prop="date"
                label="支付宝退费"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="date"
                label="支付宝退费订单"
                min-width="100">
                </el-table-column>

                  <el-table-column
                prop="date"
                label="投币金额"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="date"
                label="投币订单"
                min-width="100">
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage"/>
   </div>
</template>

<script>
import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker,} from 'element-ui'
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
export default {
   data(){
       return {
           value1: '',
           value2: '',
           value3: '',
           deviceNum: '',
           startTime: '',
           endTime: '',
           merName: '',
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: 150
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: 150
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: 150
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: 150
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: 150
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: 150
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: 150
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: 150
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: 150
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: 150
            },],
            totalPage: 500, //共50条数据  
       }
   },
    components: {
       MyPagination 
    },
    methods: {
        getPage(page){ //分页发改变时，触发回调
            console.log('fu',page)
        },
        getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总计';
                    return;
                }
                const values = data.map(item => Number(item[column.property])); 
                if (!values.every(value => isNaN(value))) {
                    sums[index] = values.reduce((prev, curr) => {
                    const value = Number(curr);
                    if (!isNaN(value)) {
                        return prev + curr;
                    } else {
                        return prev;
                    }
                    }, 0);
                    sums[index] += '';
                } else {
                    sums[index] = 'N/A';
                }
                });
                return sums;
               
            }
    }
}
</script>

<style lang="less">
@import '../../../static/style/default.less';
@import '../../../static/style/common.less';
    // .deviceEarn {
       
    // }
</style>