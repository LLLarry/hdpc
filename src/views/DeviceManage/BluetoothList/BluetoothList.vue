<template>
  <div class="bluetoothList">
      <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" size="mini" :model="bluetoothListForm">
                <el-form-item label="设备号" class="form_right25 w100">
                    <el-input v-model="bluetoothListForm.deviceNum" placeholder="设备号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="所有人" class="form_right25 w120">
                    <el-input v-model="bluetoothListForm.perName" placeholder="所有人"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="电话" class="form_right25 w120">
                    <el-input v-model="bluetoothListForm.phone" placeholder="电话"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="小区名称" class="form_right25 w120">
                    <el-input v-model="bluetoothListForm.village" placeholder="小区名称"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="硬件版本" class="form_right25 w100">
                     <el-select v-model="bluetoothListForm.hwVersion"  placeholder="硬件版本"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="01" value="01" ></el-option>
                        <el-option label="02" value="02" ></el-option>
                        <el-option label="03" value="03" ></el-option>
                        <el-option label="04" value="04" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="软件版本" class="form_right25 w100">
                     <el-select v-model="bluetoothListForm.swVersion"  placeholder="软件版本"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="01" value="01" ></el-option>
                        <el-option label="02" value="02" ></el-option>
                        <el-option label="03" value="03" ></el-option>
                        <el-option label="04" value="04" ></el-option>
                    </el-select>
                </el-form-item>


                <el-form-item label="绑定" class="form_right25 w120">
                     <el-select v-model="bluetoothListForm.bind"  placeholder="是否绑定"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="已绑定" value="1" ></el-option>
                        <el-option label="未绑定" value="2" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="测试状态" class="form_right25 w180">
                     <el-select v-model="bluetoothListForm.testStatus"  placeholder="测试状态"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="设备不可测式" value="1" ></el-option>
                        <el-option label="设备可测试" value="2" ></el-option>
                        <el-option label="设备测试达限" value="3" ></el-option>
                    </el-select>
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
                prop="code"
                label="设备号"
                width="80"
                >
                <template slot-scope="scope">
                    <el-link type="primary">{{scope.row.code}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                label="设备名"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="perName"
                label="所有人"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="phone"
                label="电话"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-link type="primary">{{scope.row.phone}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="androidId"
                label="android设备id"
                min-width="150"
                >
               </el-table-column>
               <el-table-column
                prop="iosId"
                label="IOS设备id"
                min-width="320"
                >
               </el-table-column>
               <el-table-column
                prop="hwVersion"
                label="硬件版本"
                min-width="80"
                >
                 <template slot-scope="scope">
                    <el-button icon="el-icon-edit" size="mini" @click="handleHwVerBtn">{{scope.row.hwVersion}}</el-button>
                </template>
               </el-table-column>
               <el-table-column
                prop="hwVersionNum"
                label="硬件版本号"
                min-width="80"
                >
               </el-table-column>
               <el-table-column
                prop="swVersion"
                label="软件版本号"
                min-width="80"
                >
               </el-table-column>
               <el-table-column
                prop="testStatus"
                label="测试状态"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" :disabled="scope.row.testStatus.status == 1" :plain="scope.row.testStatus.status == 1">重置{{scope.row.testStatus.num}}</el-button>
                </template>
               </el-table-column>
               <el-table-column
                prop="qrCode"
                label="二维码	"
                min-width="100"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleCreateQrCode(scope.row.code)">生成</el-button>
                </template>
               </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage"/>
         <!-- 显示二维码 -->
        <el-dialog
        :show-close="false"
        :visible.sync="dialogVisible"
        width="300px"
        :modal="false"
        custom-class="dialog"
       >
        <div class="qeCodeContent">
            <QRCode :alertDeviceCode="alertDeviceCode" />
        </div>
        </el-dialog>
  </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import QRCode from '@/components/common/QRCode'
import {alertPassword} from '@/utils/ele'
export default {
    data(){
        return {
            bluetoothListForm: {},
            tableData: [
                {
                    code: '000011',
                    remark: '蓝牙设备',
                    perName: 'Roar Wolf',
                    phone: '15235571294',
                    androidId: 'D8:A9:8B:CF:CC:13',
                    iosId: '7FC2F7EB-A10B-5EEC-A581-59CC28B76219',
                    hwVersion: '03',
                    hwVersionNum: '02',
                    swVersion: '00',
                    testStatus: {
                        status: 1,
                        num: 5
                    },
                },
                 {
                    code: '000012',
                    remark: '蓝牙设备',
                    perName: 'Roar Wolf',
                    phone: '15235571294',
                    androidId: 'D8:A9:8B:CF:CC:13',
                    iosId: '7FC2F7EB-A10B-5EEC-A581-59CC28B76219',
                    hwVersion: '03',
                    hwVersionNum: '02',
                    swVersion: '00',
                    testStatus: {
                        status: 0,
                        num: 6
                    },
                },
            ],
            totalPage: 12,
            dialogVisible: false,
            alertDeviceCode: 0 //当前选中的二维码
        }
    },
    methods: {
        getPage(){

        },
        handleHwVerBtn(){
            alertPassword(function(){
                console.log(1)
            })
        },
         handleCreateQrCode(code){ //生成二维码
            this.alertDeviceCode= code
            this.dialogVisible= true
        }
    },
    components: {
        MyPagination,
        QRCode
    }
}
</script>

<style lang="less">
.bluetoothList{
    .dialog {
        border-radius: 5px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, .5);
        .el-dialog__header {
            padding: 0;
        }
        .el-dialog__body {
            padding: 15px 20px;
        }
    }
}
</style>