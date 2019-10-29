<template>
    <div class="onlineCardQuery">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="onlineCardQueryForm" size="mini">
                <el-form-item label="十六进制卡号" class="form_right25 w120">
                    <el-input v-model="onlineCardQueryForm.hexCard" placeholder="十六进制卡号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="原始卡号" class="form_right25 w120">
                    <el-input v-model="onlineCardQueryForm.originCard" placeholder="原始卡号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户名" class="form_right25 w120" >
                    <el-input v-model="onlineCardQueryForm.userName" placeholder="用户名"  size="small"></el-input>
                </el-form-item>
               <el-form-item label="所属商户 " class="form_right25 w120">
                    <el-input v-model="onlineCardQueryForm.merName" placeholder="所属商户"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="最大剩余时间 " class="form_right25 w120" >
                    <el-input v-model="onlineCardQueryForm.maxTime" placeholder="最大剩余时间"  size="small" ></el-input>
                </el-form-item>
                <el-form-item label="小区名 " class="form_right25 w120" >
                    <el-input v-model="onlineCardQueryForm.village" placeholder="小区名"  size="small" ></el-input>
                </el-form-item>
                <el-form-item label="状态" class="form_right25 w80">
                     <el-select v-model="onlineCardQueryForm.status"  placeholder="端口状态"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="未激活" value="1" ></el-option>
                        <el-option label="正常" value="2" ></el-option>
                        <el-option label="挂失" value="3" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="onlineCardQueryForm.startTime"
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
                        v-model="onlineCardQueryForm.endTime"
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
                prop="userName"
                label="用户名"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="hexCard"
                label="十六进制卡号"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-link type="primary">{{scope.row.hexCard}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="originCard"
                label="原始卡号"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="merName"
                label="所属商户"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="money"
                label="金额"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-link type="primary">{{scope.row.money}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态"
                min-width="100"
                >
                 <template slot-scope="scope">
                    <el-link type="default" v-if="scope.row.status ==0" :underline="false">未激活</el-link>
                    <el-link type="success" v-if="scope.row.status ==1" :underline="false">正常</el-link>
                    <el-link type="danger" v-if="scope.row.status ==2" :underline="false">挂失</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="isRelateWallet"
                label="关联钱包"
                min-width="80"
                >
                 <template slot-scope="scope">
                    <el-link type="success" v-if="scope.row.isRelateWallet ==1" :underline="false">是</el-link>
                    <el-link type="warning" v-if="scope.row.isRelateWallet ==2" :underline="false">否</el-link>
                 </template>
                </el-table-column>
                <el-table-column
                prop="village"
                label="归属小区"
                min-width="120"
                >
                 <template slot-scope="scope">
                    <span v-if="scope.row.village && scope.row.village.length >0">{{scope.row.village}}</span>
                    <span v-else>——</span>
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
                 <el-table-column
                prop="createTime"
                label="备注"
                min-width="150"
                >
                 <template slot-scope="scope">
                    <span v-if="scope.row.createTime && scope.row.createTime.length >0">{{scope.row.createTime}}</span>
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
            onlineCardQueryForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
                 {
                index: 1,
                userName: '永夜',
                hexCard: 'B296C649',
                originCard: 'B296C649',
                merName: 'Roar Wolf',
                money: 29.41,
                status: 1,
                isRelateWallet: 1,
                village: '测试小区',
                remarks: '',
                createTime: '2019-07-24 17:35:09'
            },
             {
                index: 2,
                userName: '永夜',
                hexCard: 'B296C649',
                originCard: 'B296C649',
                merName: 'Roar Wolf',
                money: 29.41,
                status: 2,
                isRelateWallet: 2,
                village: '测试小区',
                remarks: '',
                createTime: '2019-07-24 17:35:09'
            },
             {
                index: 3,
                userName: '永夜',
                hexCard: 'B296C649',
                originCard: 'B296C649',
                merName: 'Roar Wolf',
                money: 29.41,
                status: 0,
                isRelateWallet: 1,
                village: '测试小区',
                remarks: '',
                createTime: '2019-07-24 17:35:09'
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