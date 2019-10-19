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
                :summary-method="getSummaries" 
                :show-summary="true"
                >
                <el-table-column
                prop="date"
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
                prop="address"
                label="电话"
                min-width="100"
                >
                </el-table-column>

                 <el-table-column
                prop="date"
                label="总收益"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="未提现"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="欠款金额"
                min-width="100">
                </el-table-column>

                 <el-table-column
                prop="date"
                label="操作"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="name"
                label="费率"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                label="对公费率"
                min-width="120"
                >
                </el-table-column>

                 <el-table-column
                prop="date"
                label="设备数量"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="date"
                label="在线数量"
                min-width="100">
                </el-table-column>

                 <el-table-column
                prop="date"
                label="银行卡"
                min-width="100">
                </el-table-column>
                 <el-table-column
                prop="date"
                label="注册时间"
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
    created(){
        console.log(this.$route.matched)
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