<template>
    <div class="deviceList">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="deviceListForm" size="mini">
                <el-form-item label="设备号" class="form_right25 w80">
                    <el-input v-model="deviceListForm.code" placeholder="请输入编号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="所有人" class="form_right25 w120">
                    <el-input v-model="deviceListForm.perName" placeholder="请输入所有人"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25 w120" >
                    <el-input v-model="deviceListForm.phone" placeholder="请输入手机号"  size="small"></el-input>
                </el-form-item>
               <el-form-item label="IMEI " class="form_right25 ">
                    <el-input v-model="deviceListForm.iemi" placeholder="请输入IMEI"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="CCID " class="form_right25 w200" >
                    <el-input v-model="deviceListForm.ccid" placeholder="请输入CCID"  size="small" ></el-input>
                </el-form-item>
                <el-form-item label="硬件版本" class="form_right25 w80">
                     <el-select v-model="deviceListForm.hwVersion"  placeholder="请选择硬件版本"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="01" value="01" ></el-option>
                        <el-option label="02" value="02" ></el-option>
                        <el-option label="03" value="03" ></el-option>
                        <el-option label="04" value="04" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="软件版本" class="form_right25 w80">
                     <el-select v-model="deviceListForm.swVersion"  placeholder="请选择软件版本"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="01" value="01" ></el-option>
                        <el-option label="02" value="02" ></el-option>
                        <el-option label="03" value="03" ></el-option>
                        <el-option label="04" value="04" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="模块版本" class="form_right25 w80">
                     <el-select v-model="deviceListForm.mdVersion"  placeholder="请选择模块版本"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="01" value="01" ></el-option>
                        <el-option label="02" value="02" ></el-option>
                        <el-option label="03" value="03" ></el-option>
                        <el-option label="04" value="04" ></el-option>
                    </el-select>
                </el-form-item>
               
                <el-form-item label="订单状态" class="form_right25 w80">
                     <el-select v-model="deviceListForm.status"  placeholder="请选择订单状态"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="正常" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="交易来源" class="form_right25 w120">
                     <el-select v-model="deviceListForm.form"  placeholder="交易来源"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="充电" value="1" ></el-option>
                        <el-option label="脉冲" value="2" ></el-option>
                        <el-option label="离线充值机" value="3" ></el-option>
                        <el-option label="钱包" value="4" ></el-option>
                        <el-option label="在线卡" value="5" ></el-option>
                        <el-option label="虚拟充值" value="6" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="支付方式" class="form_right25 w80">
                    <el-select v-model="deviceListForm.payType"  placeholder="支付方式"  size="small">
                        <el-option label="全部" value="" ></el-option>
                        <el-option label="钱包" value="1" ></el-option>
                        <el-option label="微信" value="2" ></el-option>
                        <el-option label="支付宝" value="3" ></el-option>
                        <el-option label="微信小程序" value="4" ></el-option>
                        <el-option label="支付宝小程序" value="5" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="deviceListForm.startTime"
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
                        v-model="deviceListForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
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
                prop="code"
                label="设备号"
                width="80"
                >
                </el-table-column>
                <el-table-column
                prop="remark"
                label="设备名"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="village"
                label="归属小区"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="perName"
                label="所有人"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="phone"
                label="电话"
                width="120"
                >
                    <template slot-scope="scope">
                       <el-link  type="primary">{{scope.row.phone}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column
                prop="imei"
                label="IMEI"
                min-width="145"
                >
                </el-table-column>
                <el-table-column
                prop="ccid"
                label="CCID"
                min-width="150"
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
                prop="swVersion"
                label="软件版本"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="mdVersion"
                label="模块版本"
                min-width="80"
                >
                </el-table-column>

                <el-table-column
                prop="signalStr"
                label="信号强度"
                width="80"
                >
                </el-table-column>

                <el-table-column
                prop="status"
                label="状态"
                min-width="60"
                >
                 <template slot-scope="scope">
                    <el-link :type="scope.row.status === 1 ? 'success' : 'danger'">{{scope.row.status === 1 ? '在线' : '离线'}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="testStatus"
                label="测试状态"
                min-width="80"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" :disabled="scope.row.testStatus.status == 1" :plain="scope.row.testStatus.status == 1">重置{{scope.row.testStatus.num}}</el-button>
                </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="操作"
                min-width="80"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini">详情</el-button>
                </template>
                </el-table-column>
                <el-table-column
                prop="qrCode"
                label="二维码"
                min-width="80"
                fixed="right"
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
// import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link,Dialog} from 'element-ui'
// import Vue from 'vue'
 import MyPagination from '@/components/common/MyPagination'
 import dateTimeJS from '@/utils/dateTime'
 import {alertPassword} from '@/utils/ele'
 import QRCode from '@/components/common/QRCode'
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
// Vue.use(Dialog)
export default {
    data(){
        return {
            deviceListForm: {},
            pickerOptions: dateTimeJS,
            dialogVisible: false,
            tableData: [
                 {
                    code: "000001" ,
                    remark: '小不点设备',
                    village: '小不点小区',
                    perName: '测试名称01',
                    phone: '15635986231',
                    imei: '868994034714761',
                    ccid: '89860433161871471648',
                    hwVersion: '01',
                    swVersion: '02',
                    mdVersion: '03',
                    signalStr: 56,
                    status: 1,
                    testStatus: {
                        status:1,
                        num: 5
                    }, 
                },
                 {
                    code: "000003" ,
                    remark: '小不点设备',
                    village: '小不点小区',
                    perName: '测试名称01',
                    phone: '15635986231',
                    imei: '868994034714761',
                    ccid: '89860433161871471648',
                    hwVersion: '01',
                    swVersion: '02',
                    mdVersion: '03',
                    signalStr: 56,
                    status: 0,
                    testStatus: {
                        status:2,
                        num: 5
                    }, 
                }
            ],
             totalPage: 12,
             alertDeviceCode: 0 //设备二维码的设备号
        }
    },
    components: {
        MyPagination,
        QRCode
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
    }
}
</script>

<style lang="less">
.deviceList {
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