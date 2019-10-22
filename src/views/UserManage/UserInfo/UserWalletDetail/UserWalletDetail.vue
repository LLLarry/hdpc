<template>
  <div class="userWalletDetail">
      <el-card class="box-card card_bottom0 cardForm">
          <el-form :inline="true"  class="demo-form-inline" :model="userWalletDetail" size="mini">
              <el-form-item label="订单号" class="form_right25">
                  <el-input v-model="userWalletDetail.orderNum" placeholder="请输入订单号"  size="small"></el-input>
              </el-form-item>

              <el-form-item label="类型" class="form_right25">
                    <el-select v-model="userWalletDetail.type"  placeholder="请选择"  size="small">
                      <el-option label="全部" value="0" ></el-option>
                      <el-option label="充值" value="1" ></el-option>
                      <el-option label="消费" value="2" ></el-option>
                      <el-option label="退款到钱包" value="3" ></el-option>
                      <el-option label="钱包退款" value="4" ></el-option>
                  </el-select>
              </el-form-item>
              <el-form-item label="开始时间" class="form_right25 w200">
                    <el-date-picker
                      v-model="userWalletDetail.startTime"
                      size="small"
                      type="datetime"
                      placeholder="选择开始时间"
                      :picker-options="pickerOptions"
                      >
                    </el-date-picker>
              </el-form-item>
                <el-form-item label="结束时间" class="form_right25 w200">
                    <el-date-picker
                      v-model="userWalletDetail.endTime"
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
                min-width="220"
                >
                  <template slot-scope="scope">
                    <router-link tag="li" to="/"><el-link type="primary" >{{scope.row.orderNum}}</el-link></router-link>
                  </template>
                </el-table-column>
                 <el-table-column
                prop="money"
                label="金额"
                min-width="120"
                >
                 <template slot-scope="scope">
                    <el-link type="success" :underline="false">{{scope.row.money}}</el-link>
                    <!-- <el-link type="danger" :underline="false">{{scope.row.money}}</el-link> -->
                  </template>
                </el-table-column>
                 <el-table-column
                prop="balance"
                label="余额"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="type"
                label="操作类型"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="date"
                label="时间"
                min-width="200"
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
import dateTimeJS from '@/utils/dateTime'
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
      userWalletDetail: {
        orderNum:'',
        type: '',
        startTime:'',
        endTime: ''
      },
      pickerOptions: dateTimeJS,
      tableData: [
        {
          index: 1,
          orderNum: '20190713193252509165474',
          money: 77.0,
          balance: 1176.0,
          type: 2,
          date: '2019-07-13 19:32:53'
        },
        {
          index: 2,
          orderNum: '20190713193252509165474',
          money: 77.0,
          balance: 1176.0,
          type: 1,
          date: '2019-07-13 19:32:53'
        },
      ],
      totalPage: 12
    }
  },
  methods: {
    getPage(){

    }
  },
  components: {
    MyPagination
  }
}
</script>

<style lang="less">
.userWalletDetail {
    .el-link.el-link--success,.el-link.el-link--danger {
        text-decoration: none;
    }   
}
</style>