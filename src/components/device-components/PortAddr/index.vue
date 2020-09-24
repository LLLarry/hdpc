<template>
  <div class="portaddr">
      <el-card>
          <div slot="header" class="clearfix">
            <span>从机地址</span>
            <el-button style="float: right;" type="primary" size="mini" @click="handleQueryAllAddr">获取从机地址</el-button>
        </div>
        <div class="addrBox">
            <el-row class="thead">
                <el-col :span="16" class="thead-cell">地址</el-col>
                <el-col :span="4"  class="thead-cell">删除</el-col>
                <el-col :span="4"  class="thead-cell">查看详情</el-col>
            </el-row>
            <el-collapse v-model="activeNames" >
                <el-collapse-item 
                    title="一致性" 
                    :name="item.addr" 
                    disabled v-for="(item,index) in tableData"
                    :key="item.addr"
                >
                    <template slot="title">
                        <el-row class="tbody">
                            <el-col :span="16" class="tbody-cell">{{item.addr}}</el-col>
                            <el-col :span="4"  class="tbody-cell">
                                <el-button type="danger" size="mini" icon="el-icon-delete-solid" @click="handleDelete(item,index)">删除此地址</el-button>
                            </el-col>
                            <el-col :span="4"  class="tbody-cell" >
                                <el-button type="primary" size="mini" @click="handleScan(item)">查看详情</el-button>
                            </el-col>
                        </el-row>
                    </template>
                    <div class="addrBox-sub">
                        <PortStatus  
                            :portStatusList="portStatusList" 
                            :hwVerson="'11'" 
                            :code="code" 
                            @handleGetPortStatusCallback="()=>{}"
                            @handleLockPortStatusCallback="()=>{}"
                        />
                    </div>
                    
                    <div class="addrBox-sub">
                       <RemotoCharge 
                            :remoteCharge="portStatusList" 
                            :hwVerson="'01'" 
                            :code="code"
                        />
                    </div>

                    <!-- <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div> -->
                </el-collapse-item>
                
            </el-collapse>
        </div>
         <!-- <el-table
            :data="tableData"
            border
            fit
            v-loading="loading"
            :header-cell-style="{background:'#f5f7fa',color:'#666'}"
            :max-height="height*.65"
            style="width: 100%">
            <el-table-column
                prop="addr"
                label="地址"
                min-width="180"
                >
            </el-table-column>
            <el-table-column
                label="删除"
                width="200">
                <template slot-scope="{row,$index}">
                    <el-button type="danger" size="mini" icon="el-icon-delete-solid" @click="handleDelete(row,$index)">删除此地址</el-button>
                </template> 
            </el-table-column>
            <el-table-column
                label="查看详情"
                width="200">
                <template slot-scope="{row}">
                    <el-link type="primary" :underline="false">查看详情</el-link>
                </template> 
            </el-table-column>
        </el-table> -->
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
                <el-input type="code" v-model.number="addrFrom.code" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item
                label="从机地址"
                prop="addr"
            >
                <el-input type="addr" v-model.number="addrFrom.addr" autocomplete="off" ></el-input>
            </el-form-item>
        </el-form>
        </DialogWrapper>
      <!-- 添加从机地址 -->
  </div>
</template>

<script>
import { queryAllAddress,addOrRemoveAddr} from '@/require/deviceManage'
import DialogWrapper from '@/components/DialogWrapper'
import PortStatus from '@/components/device-components/PortStatus' 
import RemotoCharge from '@/components/device-components/RemoteCharge' 
import {messageTip,confirDelete} from '@/utils/ele'
let height=document.documentElement.clientHeight
export default {
    props:{
        code: String
    },
    data(){
        return {
            loading: false,
            tableData: [{addr: '000001'},{addr:'000002'},{addr:'000003'},{addr: '000004'}],
            dialogVisible: false, //弹出层是否显示
            height: height, //浏览器高度
            activeNames: [],
            portStatusList: [
                {elec: "0",port: "1",portStatus: "1",power: "0",time: "0",updateTime: "2020-09-19 11:47:05"},
                {elec: "0",port: "1",portStatus: "1",power: "0",time: "0",updateTime: "2020-09-19 11:47:05"},
            ],
            addrFrom: { 
                code: this.code
            }
        }
    },
    components: {
        DialogWrapper,
        PortStatus,
        RemotoCharge
    },
    methods: {
        async handleQueryAllAddr(){ //查询所有的从机地址
            try{
                this.loading= true
                let info= await queryAllAddress({code:this.code})
                if(info.code == 200){
                    this.tableData= info.addrlist.map(item=> {addr: item})
                }else{
                    messageTip('error',info.message)
                }
            }catch(e){
                console.log(e)
            }
            this.loading= false
        },
        async asyAddOrRemoveAddr(data,index){ //添加或移除端口地址 data请求参数  index删除的元素的索引
            try{
                this.loading= true
                let info= await addOrRemoveAddr(data)
                if(info.code == 200){
                    if(data.type == 1){ //添加
                        this.tableData.push({addr: data.addr})
                        messageTip('success','添加成功')
                    }else if(data.type == 2){ //删除
                         this.tableData.splice(index,1)
                         messageTip('success','删除成功')
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
                this.asyAddOrRemoveAddr({code: this.code,addr:row,type:2},index)
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
        handleScan({addr}){
            addr= this.activeNames[0] === addr ? '' : addr
            this.activeNames= [addr]
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
}
</style>