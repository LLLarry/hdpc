<template>
    <div class="handleLog">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="handleLogForm" size="mini">
                <el-form-item label="设备号" class="form_right25 w100">
                    <el-input v-model="handleLogForm.code" placeholder="设备号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25 w120">
                    <el-input v-model="handleLogForm.merName" placeholder="商户名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25 w120" >
                    <el-input v-model="handleLogForm.phone" placeholder="商户电话"  size="small"></el-input>
                </el-form-item>
               <el-form-item label="操作人" class="form_right25 w120">
                    <el-input v-model="handleLogForm.handlePerson" placeholder="操作人"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="类型 " class="form_right25 w120" >
                    <el-input v-model="handleLogForm.type" placeholder="类型"  size="small" ></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="handleLogForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="handleLogForm.endTime"
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
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="recordTime"
                label="记录时间"
                min-width="220"
                >
                </el-table-column>
                <el-table-column
                prop="code"
                label="设备号"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="merName"
                label="归属商户"
                min-width="140"
                >
                </el-table-column>
                <el-table-column
                prop="phone"
                label="商户电话"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="handlePerson"
                label="操作人"
                min-width="140"
                >
                </el-table-column>
                <el-table-column
                prop="type"
                label="类型"
                min-width="120"
                >
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
            handleLogForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
                {
                recordTime: '2019-10-29 14:37:53' ,
                code: '004518',
                merName: '翟新生',
                phone: '15003832065',
                handlePerson: '天天',
                type: 1
                },
                {
                recordTime: '2019-10-29 14:37:53' ,
                code: '004518',
                merName: '翟新生',
                phone: '15003832065',
                handlePerson: '天天',
                type: 1
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