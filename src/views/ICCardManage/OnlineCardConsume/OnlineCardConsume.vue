<template>
    <div class="onlineCardConsume">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="onlineCardConsumeForm" size="mini">
               <el-form-item label="订单号" class="form_right25 w220" >
                    <el-input v-model="onlineCardConsumeForm.order" placeholder="订单号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="持卡人" class="form_right25 w120" >
                    <el-input v-model="onlineCardConsumeForm.userName" placeholder="持卡人"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="原始卡号" class="form_right25 w120">
                    <el-input v-model="onlineCardConsumeForm.cardNum" placeholder="卡号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25 w120" >
                    <el-input v-model="onlineCardConsumeForm.merName" placeholder="商户名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="设备号" class="form_right25 w120" >
                    <el-input v-model="onlineCardConsumeForm.code" placeholder="设备号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="类型" class="form_right25 w120">
                     <el-select v-model="onlineCardConsumeForm.type"  placeholder="类型"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="消费" value="1" ></el-option>
                        <el-option label="余额回收" value="2" ></el-option>
                        <el-option label="微信充值" value="3" ></el-option>
                        <el-option label="退费" value="4" ></el-option>
                        <el-option label="支付宝充值" value="5" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="onlineCardConsumeForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="onlineCardConsumeForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        >
                      </el-date-picker>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn w80">
                    <el-button type="primary" size="small">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>
          <el-card class="box-card">
              
            <el-table
                :data="tableData"
                border
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                width="80"
                >
                </el-table-column>

                <el-table-column
                prop="order"
                label="单号"
                width="220"
                >
                 <template slot-scope="scope">
                    <el-link type="primary">{{scope.row.order}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="userName"
                label="用户名"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="cardNum"
                label="卡号"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="merName"
                label="商户名"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="handleMoney"
                label="操作金额"
                min-width="100"
                >
                </el-table-column>

                <el-table-column
                prop="accMoney"
                label="到账金额"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-link :type="scope.row.accMoney>=0 ? 'success': 'danger'" :underline="false">{{scope.row.accMoney}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="balance"
                label="卡余额"
                min-width="100"
                >
                </el-table-column>

                <el-table-column
                prop="type"
                label="类型"
                min-width="120"
                >
                <template slot-scope="scope">
                     <el-link type="success"  :underline="false">{{scope.row.type}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="code"
                label="设备号"
                min-width="100"
                >
                 <template slot-scope="scope">
                    <span v-if="scope.row.code && scope.row.code.length >0">{{scope.row.code}}</span>
                    <span v-else>— —</span>
                 </template>
                </el-table-column>
                 <el-table-column
                prop="createTime"
                label="创建时间"
                min-width="150"
                >
                 <template slot-scope="scope">
                    <span>{{scope.row.createTime}}</span>
                 </template>
                </el-table-column>
                
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage"/>
    </div>
</template>

<script>
 import MyPagination from '@/components/common/MyPagination'
 import dateTimeJS from '@/utils/dateTime'
export default {
    data(){
        return {
            onlineCardConsumeForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
                {
                  index: 1,
                  order: '20190924182328750084670',
                  userName: '永夜',
                  cardNum: '4BEC2C24',
                  merName: '永夜',
                  handleMoney: '1.0',
                  accMoney: -2,
                  balance: 6.0,
                  type: 1,
                  code: '',
                  createTime: '2019-09-24 19:15:46' 
              }
            ],
             totalPage: 12,
        }
    },
    components: {
        MyPagination
    },
    methods: {
        getPage(){

        },
    }
}
</script>

<style lang="less">

</style>