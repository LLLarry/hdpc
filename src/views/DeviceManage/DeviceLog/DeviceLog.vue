<template>
    <div class="deviceLog">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="deviceLogForm" size="mini">
                <el-form-item label="设备号" class="form_right25 w100">
                    <el-input v-model="deviceLogForm.code" placeholder="设备号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="端口号" class="form_right25 w80">
                    <el-input v-model="deviceLogForm.port" placeholder="端口号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="最大实时功率" class="form_right25 w120" >
                    <el-input v-model="deviceLogForm.maxPower" placeholder="最大实时功率"  size="small"></el-input>
                </el-form-item>
               <el-form-item label="最大剩余电量 " class="form_right25 w120">
                    <el-input v-model="deviceLogForm.maxEle" placeholder="最大剩余电量"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="最大剩余时间 " class="form_right25 w120" >
                    <el-input v-model="deviceLogForm.maxTime" placeholder="最大剩余时间"  size="small" ></el-input>
                </el-form-item>
                <el-form-item label="端口状态" class="form_right25 w80">
                     <el-select v-model="deviceLogForm.portStatus"  placeholder="端口状态"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="空闲" value="1" ></el-option>
                        <el-option label="剩余" value="2" ></el-option>
                        <el-option label="禁用" value="3" ></el-option>
                        <el-option label="故障" value="4" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="deviceLogForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="deviceLogForm.endTime"
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
                width="220"
                >
                </el-table-column>
                <el-table-column
                prop="code"
                label="设备号"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="port"
                label="端口号"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="portStatus"
                label="端口状态"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="lastTime"
                label="剩余时间"
                min-width="220"
                >
                </el-table-column>
                <el-table-column
                prop="power"
                label="实时功率"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="ele"
                label="剩余电量"
                min-width="100"
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
            deviceLogForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],
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