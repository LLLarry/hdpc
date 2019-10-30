<template>
    <div class="communManageCon">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="communManageConForm" size="mini">
               <el-form-item label="小区名称" class="form_right25 w120" >
                    <el-input v-model="communManageConForm.communName" placeholder="小区名称"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="地址" class="form_right25 w220" >
                    <el-input v-model="communManageConForm.communAddress" placeholder="地址"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25 w120">
                    <el-input v-model="communManageConForm.merName" placeholder="商户名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25 w120" >
                    <el-input v-model="communManageConForm.merPhone" placeholder="商户电话"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="合伙人" class="form_right25 w120" >
                    <el-input v-model="communManageConForm.partent" placeholder="设备号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="合伙人电话" class="form_right25 w120" >
                    <el-input v-model="communManageConForm.partentPhone" placeholder="合伙人电话"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="communManageConForm.startTime"
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
                        v-model="communManageConForm.endTime"
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
                prop="communName"
                label="小区名称"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="communAddress"
                label="地址"
                min-width="220"
                >
                </el-table-column>

                <el-table-column
                prop="deviceNum"
                label="设备数量"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-link :type="scope.row.deviceNum>0 ? 'primary': 'default'" :underline="scope.row.deviceNum>0">{{scope.row.deviceNum}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="onlineCardNum"
                label="在线卡数量"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-link :type="scope.row.onlineCardNum>0 ? 'primary': 'default'" :underline="scope.row.onlineCardNum>0">{{scope.row.onlineCardNum}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="merName"
                label="商户名"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="merPhone"
                label="商户电话"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-link type="primary" >{{scope.row.merPhone}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="partent"
                label="合伙人"
                min-width="120"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.partent && scope.row.partent.length > 0">{{scope.row.partent}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>

                <el-table-column
                prop="partentPhone"
                label="合伙人电话"
                min-width="120"
                >
                <template slot-scope="scope">
                     <el-link type="primary" v-if="scope.row.partentPhone && scope.row.partentPhone.length>0">{{scope.row.partentPhone}}</el-link>
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
            communManageConForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
               {
                  index: 1,
                  communName: '测试小区',
                  communAddress: '小区地址',
                  deviceNum : 6,
                  onlineCardNum: 5,
                  merName: '任志超',
                  merPhone: '15538065633',
                  partent: '任志超',
                  partentPhone: '15538065633',
                  createTime: '2019-08-07 14:06:00'
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