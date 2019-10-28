<template>
  <div class="userHandleInfo">
      <el-card class="box-card card_bottom0 cardForm">
          <el-form :inline="true"  class="demo-form-inline" :model="userHandleInfo" size="mini">
              <el-form-item label="操作人" class="form_right25">
                  <el-input v-model="userHandleInfo.name1" placeholder="请输入操作人"  size="small"></el-input>
              </el-form-item>
              <el-form-item label="操作对象" class="form_right25">
                  <el-input v-model="userHandleInfo.name2" placeholder="请输入操作对象"  size="small"></el-input>
              </el-form-item>
              <el-form-item label="操作内容" class="form_right25">
                  <el-input v-model="userHandleInfo.content" placeholder="请输入操作内容"  size="small"></el-input>
              </el-form-item>
             
              <el-form-item label="开始时间" class="form_right25 w200">
                    <el-date-picker
                      v-model="userHandleInfo.startTime"
                      size="small"
                      type="datetime"
                      placeholder="选择开始时间"
                      :picker-options="pickerOptions"
                      >
                    </el-date-picker>
              </el-form-item>
                <el-form-item label="结束时间" class="form_right25 w200">
                    <el-date-picker
                      v-model="userHandleInfo.endTime"
                      size="small"
                      type="datetime"
                      placeholder="选择结束时间"
                      :picker-options="pickerOptions"
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
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="time"
                label="操作时间"
                min-width="180"
                >
                </el-table-column>
                <el-table-column
                prop="content"
                label="操作内容"
                min-width="140"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.content===1">解绑商户</span>
                    <span v-if="scope.row.content===2">虚拟充值钱包</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="name1"
                label="操作人"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="name2"
                label="操作对象"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="remark"
                label="备注"
                min-width="220"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.remark===''">无</span>
                    <span v-if="scope.row.remark !=''">{{scope.row.remark}}</span>
                </template>
                </el-table-column>
            </el-table>
         </el-card>
  </div>
</template>

<script>
// import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link} from 'element-ui'
// import Vue from 'vue'
import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
// Vue.use(Card)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Form)
// Vue.use(FormItem)
// Vue.use(Input)
// Vue.use(Select)
// Vue.use(Option)
// Vue.use(OptionGroup)
// Vue.use(DatePicker)
// Vue.use(TimeSelect)
// Vue.use(TimePicker)
// Vue.use(Link)
export default {
    data(){
        return {
            userHandleInfo: {
                name1: '',
                name2: '',
                content: '',
                startTime: '',
                endTime: ''
            },
             pickerOptions: dateTimeJS,
             tableData: [
                 {
                     index: 1,
                     time: '2019-10-22 00:00:00',
                     content: 1,
                     name1: 'Roar Wolf',
                     name2: '沛公',
                     remark: ''
                 },
                 {
                     index: 2,
                     time: '2019-10-22 00:00:00',
                     content: 1,
                     name1: 'Roar Wolf',
                     name2: '沛公',
                     remark: '20190821164559028342452'
                 }
             ]
        }
    }
}
</script>

<style>

</style>