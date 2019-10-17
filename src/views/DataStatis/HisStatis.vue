<template>
    <div class="hisStatis">
         <el-card class="box-card card_bottom0">
            <el-form :inline="true"  class="demo-form-inline">
                <el-form-item label="订单数" class="form_right25">
                     <el-select v-model="value1" clearable placeholder="请选择排序方式"  size="medium">
                        <el-option label="不排序" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总金额" class="form_right25">
                     <el-select v-model="value2" clearable placeholder="请选择排序方式"  size="medium">
                        <el-option label="不排序" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="开始时间" class="form_right25">
                      <el-date-picker
                        v-model="startTime"
                        size="medium"
                        type="datetime"
                        placeholder="选择开始时间">
                      </el-date-picker>
                </el-form-item>

                  <el-form-item label="结束时间" class="form_right25">
                      <el-date-picker
                        size="medium"
                        v-model="endTime"
                        type="datetime"
                        placeholder="选择结束时间">
                      </el-date-picker>
                 </el-form-item>

                <el-form-item class="form_right25">
                    <el-button type="primary" size="small">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>

        <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="date"
                label="日期"
                width="120">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>

                 <el-table-column
                prop="date"
                label="日期"
                width="120">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>

                 <el-table-column
                prop="date"
                label="日期"
                width="120">
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                width="120">
                </el-table-column>
                <el-table-column
                prop="address"
                label="地址">
                </el-table-column>

                 <el-table-column
                prop="date"
                label="日期"
                width="120">
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" />
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
            startTime: '',
            endTime: '',
             tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: ' 1518 弄'
            }, {
            date: '2016-05-04',
            name: '王小虎',
            address: ' 1517 弄'
            }, {
            date: '2016-05-01',
            name: '王小虎',
            address: ' 1519 弄'
            }, {
            date: '2016-05-03',
            name: '王小虎',
            address: ' 1516 弄'
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: ' 1517 弄'
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: ' 1517 弄'
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: ' 1517 弄'
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: ' 1517 弄'
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: ' 1517 弄'
            },{
            date: '2016-05-04',
            name: '王小虎',
            address: ' 1517 弄'
            },],
            totalPage: 50 //共50页   
        }
    },
    components: {
        MyPagination
    }
}
</script>

<style lang="less" >
@import '../../../static/style/default.less';
@import '../../../static/style/common.less';
    .hisStatis {
       .box-card {
           margin-bottom: 20px;
       }
    }
    
</style>