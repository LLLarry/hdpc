<template>
  <div class="portaddr">
      <el-card>
          <div slot="header" class="clearfix">
            <span>从机地址</span>
            <div style="float: right;">
                <el-button type="primary" size="mini" @click="handleSycnAllAddr" :icon="updateAllLoading ? 'el-icon-loading': 'el-icon-refresh'">同步所有从机地址</el-button>
                <el-button type="primary" size="mini" @click="handleQueryAllAddr" :icon="updateLoading ? 'el-icon-loading': 'el-icon-refresh'">读取从机地址</el-button>
            </div>
            
        </div>
        <div class="addrBox">
            <el-row class="thead">
                <el-col :span="12" class="thead-cell">地址</el-col>
                <el-col :span="4"  class="thead-cell">删除</el-col>
                <el-col :span="4"  class="thead-cell">查看详情</el-col>
                <el-col :span="4"  class="thead-cell">二维码</el-col>
            </el-row>
            <el-collapse v-model="activeNames" >
                <el-collapse-item 
                    :name="item.addr" 
                    disabled v-for="(item,index) in addrlist"
                    :key="item.addr"
                >
                    <template slot="title">
                        <el-row class="tbody">
                            <el-col :span="12" class="tbody-cell">{{item.addr}}</el-col>
                            <el-col :span="4"  class="tbody-cell">
                                <el-button 
                                    type="danger" 
                                    size="mini" 
                                    icon="el-icon-delete-solid" 
                                    @click="handleDelete(item,index)"
                                >删除此地址</el-button>
                            </el-col>
                            <el-col :span="4"  class="tbody-cell" >
                                <el-button 
                                    type="primary" 
                                    size="mini" 
                                    @click="handleScan(item)"
                                    :icon="item.loading ? 'el-icon-loading' : 'el-icon-menu'"
                                    :plain="!activeNames.includes(item.addr)"
                                >查看详情</el-button>
                            </el-col>
                            <el-col :span="4"  class="tbody-cell" >
                                <el-button 
                                    type="primary" 
                                    size="mini" 
                                    @click="handleShowQrCode(item)"
                                    icon="el-icon-menu"
                                >二维码</el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <div class="addrBox-sub">
                        <PortStatus  
                            :portStatusList="item.portStatusList" 
                            :hwVerson="'11'" 
                            :code="code" 
                            :addr="item.addr"
                            @handleGetPortStatusCallback="handleGetPortStatusCallback"
                            @handleLockPortStatusCallback="()=>{}"
                        />
                    </div>
                    
                    <div class="addrBox-sub">
                       <RemotoCharge 
                            :remoteCharge="item.portStatusList" 
                            :hwVerson="'11'" 
                            :code="code"
                            :addr="item.addr"
                            @handleUpDatePortStatus="handleUpDatePortStatus"
                        />
                    </div>
                </el-collapse-item>
                
            </el-collapse>
        </div>
        <div class="bottom-add">
            <el-button type="primary" size="mini" icon="el-icon-plus" @click="handleAddAddr">添加从机地址</el-button>
        </div>
      </el-card>

      <!-- 添加从机地址 -->
        <DialogWrapper 
            title="添加从机地址" 
            width="500px" 
            :handleSubmit="handleSubmit"
            :dialogVisible="dialogVisible"
            :handleClose="handleClose"
            :handleCancen="handleClose"
        >   
        <el-form :model="addrFrom" label-width="100px" class="demo-ruleForm">
            <el-form-item
                label="设备号"
                prop="code"
            >
                <el-input type="code" v-model="addrFrom.code"  disabled></el-input>
            </el-form-item>
            <el-form-item
                label="从机地址"
                prop="addr"
            >
                <el-input type="addr" v-model="addrFrom.addr"  ></el-input>
            </el-form-item>
        </el-form>
        </DialogWrapper>
      <!-- 添加从机地址 -->

      <!-- 显示二维码 -->
        <el-dialog
            :show-close="false"
            :visible.sync="qrCodeDialogVisible"
            width="300px"
            :modal="false"
            custom-class="dialog"
            :destroy-on-close="true"
        >
        <div class="qeCodeContent">
            <!-- from 3 代表一拖二设备 -->
            <QRCode :alertDeviceCode="alertDeviceCode" :from="3" v-if="qrCodeDialogVisible" /> 
        </div>
        </el-dialog>
  </div>
</template>

<script>
import { queryAllAddress,addOrRemoveAddr,queryRedisPort,sycnAllAddr} from '@/require/deviceManage'
import DialogWrapper from '@/components/DialogWrapper'
import PortStatus from '@/components/device-components/PortStatus' 
import RemotoCharge from '@/components/device-components/RemoteCharge'
import QRCode from '@/components/common/QRCode' 
import {messageTip,confirDelete} from '@/utils/ele'
// let height=document.documentElement.clientHeight
export default {
    props:{
        code: String,
        addrlist: { //端口地址list
            type: Array,
            default: ()=>[]
        },
        hwVerson: String //硬件版本号
    },
    data(){
        return {
            loading: false,
            dialogVisible: false, //弹出层是否显示
            // height: height, //浏览器高度
            updateLoading: false, //是否正在更新从机地址
            updateAllLoading: false, //同步所有从机端口地址
            activeNames: [],
            addrFrom: { 
                code: this.code
            },
            qrCodeDialogVisible: false, //二维码是否显示
            alertDeviceCode: "", //从机地址
        }
    },
    components: {
        DialogWrapper,
        PortStatus,
        RemotoCharge,
        QRCode
    },
    methods: {
        async handleQueryAllAddr(){ //查询所有的从机地址
            try{
                this.updateLoading= true
                let info= await queryAllAddress({code:this.code})
                if(info.code == 200){
                    const addrlist= info.addrlist.map(item=> ({addr: item}))
                    this.$emit('upDateAddrList',addrlist)
                }else{
                    messageTip('error',info.message)
                }
            }catch(e){
                console.log(e)
            }
            this.updateLoading= false
        },
        async asyAddOrRemoveAddr(data,index){ //添加或移除端口地址 data请求参数  index删除的元素的索引
            try{
                this.loading= true
                let info= await addOrRemoveAddr(data)
                if(info.code == 200){
                    if(data.type == 1){ //添加
                        if(info.res == 0){
                            this.addrlist.push({addr: data.addr})
                            this.$emit('upDateAddrList',this.addrlist)
                            messageTip('success','添加成功')
                        }else if(info.res == 1){
                            messageTip('danger',`新增已达到最大数`)
                        }else if(info.res == 2){
                            messageTip('danger',`${data.addr}从机地址已存在`)
                        }
                        
                    }else if(data.type == 2){ //删除
                        if(info.res == 0){
                           this.addrlist.splice(index,1)
                           this.$emit('upDateAddrList',this.addrlist)
                            messageTip('success','删除成功')
                        }else if(info.res == 1){
                            messageTip('danger',`从机数为0，删除失败`)
                        }else if(info.res == 2){
                            messageTip('danger',`该从机地址不存在，删除失败`)
                        }
 
                    }
                }else{
                    messageTip('error',info.message)
                }
            }catch(e){
                console.log(e)
            }
            this.loading= false
        },
        handleAddAddr(){ //添加从机地址
            this.addrFrom={ code: this.code}
            this.dialogVisible= true
        },
        handleDelete(row,index){
            confirDelete("确认删除此从机地址吗？",()=>{
                this.asyAddOrRemoveAddr({code: this.code,addr:row.addr,type:2},index)
            })
        },
        handleSubmit(){ //添加从机端口，点击确认按钮
            const { addr }= this.addrFrom
            if(addr){
                this.asyAddOrRemoveAddr({code: this.code,addr,type: 1})
                this.dialogVisible= false
            }else{
                messageTip("warning","从机地址不能为空")
            }
        },
        handleClose(){ //关闭弹框
            this.dialogVisible= false
        },
        async handleScan(item){
            if(this.activeNames[0] == item.addr) return this.activeNames= [] //如果点击的元素正在展开，那么将不再请求，直接关闭
            try{
                this.$set(item,'loading',true)
                let info= await queryRedisPort({code: this.code,addr: item.addr})
                this.$delete(item,'loading')
                if(info.code == 200){
                    this.$set(item,'portStatusList',info.portlist)
                    this.activeNames= [item.addr]
                }else{
                    messageTip('error',info.message)

                }
            }catch(e){
               this.$delete(item,'loading')
            }
        },
        handleGetPortStatusCallback({addr,index,copeRow}){ //更新端口状态 callback
            const i= this.tableData.findIndex(item=> item.addr == addr)
            if(i >= 0){
                this.$set(this.tableData[i].portStatusList,index,copeRow) //从新修改更新过来的值
            }
        },
        async handleSycnAllAddr(){  //同步所有从机地址
          try{
            this.updateAllLoading= true
            let info= await sycnAllAddr({code: this.code})
            if(info.code == 200){
              if(info.res == 0){
                messageTip('success',"同步所有从机地址成功")
              }else if(info.res == 1){
                messageTip('error',"同步所有从机地址失败")
              }else if(info.res == 2){
                messageTip('warning',"写入个数NUM为零")
              }else if(info.res == 3){
                messageTip('warning',"写入个数NUM超过设定最大值(MAX=50)")
              }
            }else{
              messageTip('error',res.message)
            }
          }catch(e){
            console.log(e)
          }
          this.updateAllLoading= false
        },
        handleUpDatePortStatus({addr,portlist}){ //远程充电返回指定从机端口状态
            for(let i=0; i<this.addrlist.length;i++){
                if(this.addrlist[i].addr == addr){
                    let portStatusList= this.addrlist[i].portStatusList
                    const newPortStatusList= portStatusList.map((item)=>{
                        if(portlist && portlist[item.port] !== void 0){ //说明portlist找到返回的端口信息
                            item.portStatus= portlist[item.port]
                        }
                        return item
                    })
                    this.$set(this.addrlist[i],'portStatusList',newPortStatusList)
                    break
                }
            }
        },
        /**
         * 点击展示从机二维码
         */
        handleShowQrCode({addr}){
           this.alertDeviceCode= addr //设置展示的从机地址
           this.qrCodeDialogVisible= true //展示二维码
        }   
    }
}
</script>

<style lang="less">
.portaddr {
    .addrBox {
        border-left: 1px solid #EBEEF5;
        border-top: 1px solid #EBEEF5;
        .thead,.tbody {
            border-bottom: 1px solid #EBEEF5;
            min-width: 0;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            text-overflow: ellipsis;
            vertical-align: middle;
            position: relative;
            text-align: left;
            color: rgb(102, 102, 102);
            font-size: 14px;
            .tbody-cell,.thead-cell {
                box-sizing: border-box;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: normal;
                word-break: break-all;
                line-height: 23px;
                padding: 10px;
                border-right: 1px solid #EBEEF5;
            }
        }
        .thead {
            background-color: rgb(245, 247, 250);
            color: #606266;
            font-weight: 600;
        }
        .tbody {
            width: 100%;
        }
        .el-collapse-item__arrow {
            display: none;
        }
        .el-collapse-item__content {
            border: 1px solid #EBEEF5;
            border-top: none;
            background: #f9f9f9;
            padding-top: 15px;
        }
    }
    .bottom-add {
        display: flex;
        justify-content: center;
        margin-top: 10px;
    }
    .addrBox-sub {
        .el-card {
            box-shadow: none !important;
        }
    }
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