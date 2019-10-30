<template>
    <div class="onlineCardHandle">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="onlineCardHandleForm" size="mini">
               <el-form-item label="用户名" class="form_right25 w120" >
                    <el-input v-model="onlineCardHandleForm.userName" placeholder="用户名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="原始卡号" class="form_right25 w120">
                    <el-input v-model="onlineCardHandleForm.cardNum" placeholder="卡号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="状态" class="form_right25 w80">
                     <el-select v-model="onlineCardHandleForm.status"  placeholder="端口状态"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="激活" value="1" ></el-option>
                        <el-option label="绑定" value="2" ></el-option>
                        <el-option label="删除" value="3" ></el-option>
                        <el-option label="挂失" value="4" ></el-option>
                        <el-option label="解挂" value="5" ></el-option>
                        <el-option label="卡号修改" value="6" ></el-option>
                        <el-option label="修改备注" value="7" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="onlineCardHandleForm.startTime"
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
                        v-model="onlineCardHandleForm.endTime"
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
                prop="handleTime"
                label="操作时间"
                width="180"
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
                prop="handlePer"
                label="操作人"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="balance"
                label="卡余额"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-link :type="scope.row.status === 1 ? 'success' : scope.row.status === 2 ? 'warning': 'danger'" :underline="false">{{
                        scope.row.status === 1 ? '激活' : scope.row.status === 2 ? '删除': '挂失'
                        }}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="remarks"
                label="备注"
                min-width="100"
                >
                 <template slot-scope="scope">
                    <span v-if="scope.row.remarks && scope.row.remarks.length >0">{{scope.row.remarks}}</span>
                    <span v-else>— —</span>
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
            onlineCardHandleForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
                {
                  index: 1,
                  handleTime: '2019-09-24 17:15:42',
                  order: '20190924171542410330525',
                  userName: '永夜',
                  cardNum: '4BEC2C24',
                  handlePer: '',
                  balance: 2.3,
                  status: 1,
                  remarks: ''
              },
                {
                  index: 1,
                  handleTime: '2019-09-24 17:15:42',
                  order: '20190924171542410330525',
                  userName: '永夜',
                  cardNum: '4BEC2C24',
                  handlePer: '',
                  balance: 2.3,
                  status: 2,
                  remarks: ''
              },
                {
                  index: 1,
                  handleTime: '2019-09-24 17:15:42',
                  order: '20190924171542410330525',
                  userName: '永夜',
                  cardNum: '4BEC2C24',
                  handlePer: '',
                  balance: 2.3,
                  status: 3,
                  remarks: ''
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