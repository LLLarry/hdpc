<template>
    <div class="deviceList">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="deviceListForm" size="mini">
                <el-form-item label="设备号" class="form_right25 w100">
                    <el-input v-model="deviceListForm.devicenum" placeholder="设备号" clearable size="small" @keyup.enter.native="handleSearch"></el-input>
                </el-form-item>
                <el-form-item label="所属人" class="form_right25 w120">
                    <el-input v-model="deviceListForm.nick" placeholder="所属人" clearable size="small"  @keyup.enter.native="handleSearch"></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25 w150" >
                    <el-input v-model="deviceListForm.phone" placeholder="手机号" clearable size="small"  @keyup.enter.native="handleSearch"></el-input>
                </el-form-item>
               <el-form-item label="IMEI " class="form_right25 ">
                    <el-input v-model="deviceListForm.imei" placeholder="请输入IMEI" clearable size="small"  @keyup.enter.native="handleSearch"></el-input>
                </el-form-item>
                 <el-form-item label="CCID " class="form_right25 w200" >
                    <el-input v-model="deviceListForm.ccid" placeholder="请输入CCID" clearable size="small"  @keyup.enter.native="handleSearch"></el-input>
                </el-form-item>
                <el-form-item label="小区名称 " class="form_right25 w200" >
                    <el-input v-model="deviceListForm.areaname" placeholder="所属小区" clearable size="small"  @keyup.enter.native="handleSearch"></el-input>
                </el-form-item>
                <el-form-item label="硬件版本" class="form_right25 w150">
                     <el-select v-model="deviceListForm.hardversion"  placeholder="硬件版本" clearable size="small"  @keyup.enter.native="handleSearch">
                        <el-option label="00出厂默认设置" value="00" ></el-option>
                        <el-option label="01十路智慧款" value="01" ></el-option>
                        <el-option label="02电轿款" value="02" ></el-option>
                        <el-option label="03脉冲板子" value="03" ></el-option>
                        <el-option label="04离线充值机" value="04" ></el-option>
                        <el-option label="05十六路智慧款" value="05" ></el-option>
                        <el-option label="06二十路智慧款" value="06" ></el-option>
                        <el-option label="07单路交流桩" value="07" ></el-option>
                        <el-option label="08新版10路智慧款V3" value="08" ></el-option>
                        <el-option label="09新版2路智慧款V3" value="09" ></el-option>
                        <el-option label="10新版20路智慧款V3" value="10" ></el-option>
                        <el-option label="11版1拖2" value="11" ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="软件版本" class="form_right25 w100">
                     <el-input v-model="deviceListForm.softversion" placeholder="软件版本" clearable size="small"  @keyup.enter.native="handleSearch"></el-input>
                </el-form-item>

                <el-form-item label="模块版本" class="form_right25 w100">
                    <el-input v-model="deviceListForm.hardversionnum" placeholder="模块版本" clearable size="small"  @keyup.enter.native="handleSearch"></el-input>
                </el-form-item>
               
                <el-form-item label="状态" class="form_right25 w100">
                     <el-select v-model="deviceListForm.line"  placeholder="设备状态" clearable size="small" @keyup.enter.native="handleSearch">
                        <el-option label="在线" value="1" ></el-option>
                        <el-option label="离线" value="0" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="信号强度" class="form_right25 w120">
                     <el-select v-model="deviceListForm.signalsort"  placeholder="信号强度" clearable size="small"  @keyup.enter.native="handleSearch">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="测试状态" class="form_right25 w120">
                    <el-select v-model="deviceListForm.payType"  placeholder="测试状态" clearable  size="small"  @keyup.enter.native="handleSearch">
                        <el-option label="不可测" value="1" ></el-option>
                        <el-option label="可测试" value="2" ></el-option>
                        <el-option label="达限制" value="3" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="到期排序" class="form_right25 w120">
                    <el-select v-model="deviceListForm.expiretime"  placeholder="到期时间" clearable  size="small"  @keyup.enter.native="handleSearch">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn" :class="{w220: (userInfo.classify== 'superAdmin')}">
                    <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                    <el-button type="primary" size="small" @click="handleExportExcel" v-if="userInfo.classify== 'superAdmin'" >导出Excel</el-button>
                </el-form-item>
            </el-form>
         </el-card>
          <el-card class="box-card">
            
            <el-table
                :data="tableData"
                v-loading="loading"
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
                    <router-link :to="`/deviceManage/handleLog?devicenum=${scope.row.code}`">
                         <el-link type="primary">{{scope.row.code}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="remark"
                label="设备名"
                min-width="90"
                >
                <template slot-scope="{row}">
                    <span v-if="row.remark && row.remark.length > 0">{{row.remark}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="name"
                label="归属小区"
                min-width="100"
                >
                <template slot-scope="{row}">
                    <span v-if="row.name && row.name.length > 0">{{row.name}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="perName"
                label="所属人"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <span v-if="row.username && row.username.length > 0">{{row.username}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>

                <el-table-column
                prop="expiration_time"
                label="到期日期"
                min-width="125"
                v-if="userInfo.classify== 'superAdmin'" 
                >
                <template slot-scope="{row}">
                    <el-link :type="contrastData(row.expiration_time)" :underline="false" >
                        <span v-if="row.expiration_time == null">&nbsp;&nbsp;&nbsp;&nbsp;{{ '— —' }}&nbsp;&nbsp;&nbsp;&nbsp;</span>
                        <span v-else>{{ row.expiration_time | fmtDate('YYYY-MM-DD') }}</span>
                    </el-link>
                </template>
                </el-table-column>
                
                <el-table-column
                prop="create_time"
                label="IMEI创建日期"
                min-width="125"
                v-if="userInfo.classify== 'superAdmin'" 
                >
                <template slot-scope="{row}">
                    {{ row.create_time | fmtDate('YYYY-MM-DD') }}
                </template>
                </el-table-column>

                <el-table-column
                prop="phone"
                label="电话"
                width="120"
                >
                    <template slot-scope="scope">
                        <router-link :to="`/usermanage/merInfo?phone=${scope.row.phone_num}`" v-if="scope.row.phone_num && scope.row.phone_num.length > 0">
                            <el-link  type="primary" >{{scope.row.phone_num}}</el-link>
                        </router-link>
                       <span v-else>— —</span>
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
                min-width="160"
                >
                </el-table-column>
                <el-table-column
                prop="hwVersion"
                label="硬件版本"
                min-width="80"
                >
                <template slot-scope="scope">
                    <el-button icon="el-icon-edit" size="mini" @click="handleHwVerBtn(scope.row)" plain type="primary" >{{scope.row.hardversion}}</el-button>
                </template>
                </el-table-column>

                <el-table-column
                prop="softversionnum"
                label="软件版本"
                min-width="80"
                >
                </el-table-column>
                <el-table-column
                prop="hardversionnum"
                label="模块版本"
                min-width="80"
                >
                </el-table-column>

                <el-table-column
                prop="csq"
                label="信号强度"
                width="80"
                >
                </el-table-column>

                <el-table-column
                prop="state"
                label="状态"
                min-width="60"
                >
                 <template slot-scope="scope">
                    <el-link :type="scope.row.state === 1 ? 'success' : 'danger'">{{scope.row.state === 1 ? '在线' : '离线'}}</el-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="bindtype"
                label="测试状态"
                min-width="80"
                v-if="userInfo.classify== 'superAdmin'"
                >
                <template slot-scope="scope">
                   <el-button type="success" size="mini" :disabled="scope.row.bindtype == 0" :plain="scope.row.bindtype == 0">
                       <div style="min-width: 37px;" @click="resetHandle(scope.row)">重置{{10-scope.row.several}}</div>
                   </el-button>
                </template>
                </el-table-column>

                <el-table-column
                prop="qrCode"
                label="端口二维码"
                min-width="80"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button 
                        type="primary" 
                        size="mini" 
                        @click="handleScanPortQrcode(scope.row)" 
                        :disabled="['03','04','11'].indexOf(scope.row.hardversion) !== -1"
                    >查看</el-button>
                </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="操作"
                min-width="90"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-setting" @click="$router.push({path:'/deviceManage/deviceList/deviceDetail',query:{code: scope.row.code}})">详情</el-button>
                </template>
                </el-table-column>
                <el-table-column
                prop="qrCode"
                label="二维码"
                min-width="80"
                fixed="right"
                >
                <template slot-scope="scope">
                    <el-button 
                        type="primary" 
                        size="mini" 
                        @click="handleCreateQrCode(scope.row.code)"
                        :disabled="['11'].indexOf(scope.row.hardversion) !== -1"
                    >生成</el-button>
                </template>
                </el-table-column>
                
            </el-table>
        </el-card>
         <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

        <!-- 显示二维码 -->
        <el-dialog
        :show-close="false"
        :visible.sync="dialogVisible"
        width="300px"
        :modal="false"
        custom-class="dialog"
        :destroy-on-close="true"
       >
        <div class="qeCodeContent">
            <QRCode :alertDeviceCode="alertDeviceCode" v-if="dialogVisible" />
        </div>
        </el-dialog>

        <el-dialog
        :show-close="false"
        :visible.sync="modifyHversonVisable"
        width="400px"
        :modal="false"
        title="修改硬件版本号"
        custom-class="dialogHverson"
       >    
        <el-form label-position="top" :model="modifyHversonForm">
            <el-form-item label="设备号" class="form_right25">
                <el-input v-model="modifyHversonForm.code" placeholder="设备号" disabled clearable ></el-input>
            </el-form-item>
            <el-form-item label="硬件版本" class="form_right25" style="width: 100%;">
                <el-select v-model="modifyHversonForm.hardversion"  placeholder="硬件版本"  style="width: 100%;">
                    <el-option label="00出厂默认设置" value="00" ></el-option>
                    <el-option label="01十路智慧款" value="01" ></el-option>
                    <el-option label="02电轿款" value="02" ></el-option>
                    <el-option label="03脉冲板子" value="03" ></el-option>
                    <el-option label="04离线充值机" value="04" ></el-option>
                    <el-option label="05十六路智慧款" value="05" ></el-option>
                    <el-option label="06二十路智慧款" value="06" ></el-option>
                    <el-option label="07单路交流桩" value="07" ></el-option>
                    <el-option label="08新版10路智慧款V3" value="08" ></el-option>
                    <el-option label="09新版2路智慧款V3" value="09" ></el-option>
                    <el-option label="10新版20路智慧款V3" value="10" ></el-option>
                    <el-option label="11版1拖2" value="11" ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="modifyHversonVisable = false" size="middle">取 消</el-button>
            <el-button type="primary" @click="setHardversionBtn" size="middle">确 定</el-button>
        </span>
        </el-dialog>
        <!-- 端口二维码 -->
         <el-dialog
            :show-close="false"
            :visible.sync="dialogQRCodePortVisible"
            width="1260px"
            :modal="false"
            custom-class="dialog_port"
            :destroy-on-close="true"
        >
        <div class="qeCodeContent">
            <QRCodeForPort :selectPortCode="selectPortCodeObj.code" :portNum="selectPortCodeObj.portNum" v-if="dialogQRCodePortVisible" />
        </div>
        </el-dialog>
    </div>
</template>

<script>
 import MyPagination from '@/components/common/MyPagination'
 import dateTimeJS from '@/utils/dateTime'
 import {alertPassword,messageTip,confirDelete} from '@/utils/ele'
 import QRCode from '@/components/common/QRCode'
 import QRCodeForPort from '@/components/common/QRCodeForPort'
 import exportExcel from '@/utils/excel'
 import { getDeviceList,setHardversion,resetDeviceTestTime,exportDeviceData } from '@/require/deviceManage'
 import { mapState } from 'vuex'
 const MAX_EXPORT_COUNT= 2000
 const tableTitle= { //导出配置
	code: '设备号',
	remark: '设备名',
	name: '归属小区',
	username: '所属人',
	expiration_time: '到期日期',
	create_time: '创建时间',
	phone_num: '电话',
	imei: 'IMEI',
	ccid: 'CCID',
	hardversion: '硬件版本号',
	softversionnum: '软件版本号',
	hardversionnum: '模块版本',
}
export default {
    data(){
        return {
            deviceListForm: {},
            modifyHversonForm: {}, //修改硬件版本号的容器
            pickerOptions: dateTimeJS,
            dialogVisible: false,
            modifyHversonVisable: false,
            loading: false,
            tableData: [],
             totalPage: 1,
             nowPage: 1,
             alertDeviceCode: 0 ,//设备二维码的设备号
             dialogQRCodePortVisible:false, //端口号二维码是否显示
             selectPortCodeObj: {
                 code: 0,
                 portNum: 10
             }, //选择查看设备端口二维码的设备号
             
        }
    },
    components: {
        MyPagination,
        QRCode,
        QRCodeForPort
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            this.deviceListForm= {...this.$route.query}
            this.nowPage= parseInt(this.deviceListForm.currentPage) || 1
        }
       this.asyGetDeviceList(this.deviceListForm)
    },
    methods: {
        getPage(page){
            this.deviceListForm= {...this.deviceListForm,currentPage:page}
            this.$router.push({query: this.deviceListForm})
            this.asyGetDeviceList(this.deviceListForm)
            this.nowPage = page
        },
        contrastData(data){
            const dataTime= new Date(moment(data).format('YYYY-MM-DD')).getTime()
            const nowTime= new Date(moment(new Date()).format('YYYY-MM-DD')).getTime()
            if(dataTime- nowTime <= 0){
                return 'danger'
            }else if((dataTime- nowTime) > 0 && (dataTime- nowTime) <= 15*1000*60*60*24){
                return 'warning'
            }else{
                return 'primary'
            }
        },
        handleHwVerBtn(row){
            alertPassword(()=>{
               this.modifyHversonVisable= true
               let {code,hardversion}= row
               this.modifyHversonForm= {code,hardversion}
            })
        },
        handleCreateQrCode(code){ //生成二维码
            this.alertDeviceCode= code
            this.dialogVisible= true
        },
        handleScanPortQrcode({code,hardversion}){ //查看端口二维码
            const  hvToRort=  { /* key:对应端口数量，val[]:对应硬件版本号 */
                1: ['07'],
                2: ['02','09'],
                10: ['00','01','08'],
                16: ['05'],
                20: ['06','10']
            }
            const keyArr= Object.keys(hvToRort)
            const valArr= Object.values(hvToRort)
            let portNum= 10
            valArr.forEach((item,i)=>{
                if(item.includes(hardversion)){
                    portNum= parseInt(keyArr[i])
                }
            })
            this.selectPortCodeObj= {code,portNum}
            this.dialogQRCodePortVisible= true
        },
        async asyGetDeviceList(data){
            let _this= this
            try{
                 _this.loading= true
                let deviceInfo= await getDeviceList(data)
                 _this.loading= false
                 if(deviceInfo.code === 200){
                    _this.tableData = deviceInfo.listdata
                    _this.totalPage = deviceInfo.totalRows
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        setHardversionBtn(){ //设置硬件版本号
            setHardversion(this.modifyHversonForm).then(res=>{
                if(res.code === 200){
                    this.modifyHversonVisable= false
                    messageTip('success','修改成功')
                    for(const item of this.tableData){
                        if(item.code === this.modifyHversonForm.code){
                            item.hardversion= this.modifyHversonForm.hardversion
                            return
                        }
                    }
                }else{
                    messageTip('danger','修改失败')
                    this.modifyHversonVisable= false
                }
               
                console.log(this.modifyHversonVisable)
            }).catch(error=>{
                this.modifyHversonVisable= false
            })
        },
        resetHandle(row){ //点击重置
            resetDeviceTestTime({code: row.code,testTime: 0}).then(res=>{
               if(res.code === 200){
                   row.several= 0
               }
            }).catch(error=>{
                
            })
        },
        handleSearch(){
            this.$router.push({query:{... this.deviceListForm,currentPage: 1}})
            this.asyGetDeviceList({... this.deviceListForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        },
        handleExportExcel(){ //导出excel
            confirDelete('确定导出设备列表吗？',async ()=>{
                try{
                    const listPromise= []
                    const times= Math.ceil(this.totalPage / MAX_EXPORT_COUNT) //请求次数
                    for(let i=0; i< times; i++){
                        listPromise.push(exportDeviceData({...this.deviceListForm,typeIndex: i}))
                    }
                    let info= await Promise.all(listPromise)
                    if(info && info.length > 0){
                        const list= Array.prototype.concat.apply([],info)
                        exportExcel({
                            tHeader: Object.values(tableTitle),
                            filterVal: Object.keys(tableTitle),
                            list: list,
                            filename: `设备列表`,
                            formatJson: this.formatJson
                        })
                    }else{
                        messageTip('error','导出失败')
                    }
                }catch(e){
                     messageTip('error','导出错误！')
                }
            })
        },
        formatJson(filterVal, list){
             return list.map((item,i)=> filterVal.map((jtem)=>{
                 let val= ''
                 if(['remark','name','username','phone_num'].includes(jtem)){
                     val= item[jtem] === '' || item[jtem] === null || item[jtem] === undefined ? '— —' : item[jtem]
                 }else if(['expiration_time','create_time'].includes(jtem)){
                     val= item[jtem] === '' || item[jtem] === null || item[jtem] === undefined ? '— —' : this.$fmtDate(item[jtem],'YYYY-MM-DD')
                 }else if(['hardversion'].includes(jtem)){
                    //  let dName= item[jtem] == '00' ? '出厂默认设置' : item[jtem] == '01' ? '十路智慧款': item[jtem] == '02' ? '电轿款' : item[jtem] == '03' ? '脉冲板子' : item[jtem] == '04' ? '离线充值机' : item[jtem] == '05' ? '十六路智慧款' : item[jtem] == '06' ? '二十路智慧款' : item[jtem] == '07' ? '单路交流桩' : ''
                     val= item[jtem]
                 }else{
                     val= item[jtem]
                 }
                 return val
             }))
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
    .dialogHverson {
        box-shadow: 0 5px 15px rgba(0, 0, 0, .7);
    }
    .dialog_port {
        margin-top: 10vh !important;
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
.el-scrollbar,
.el-select-dropdown__wrap ,
.el-scrollbar__wrap {
    height: 100% !important;
}
.el-select-dropdown__wrap {
    max-height: 400px !important;
}
</style>