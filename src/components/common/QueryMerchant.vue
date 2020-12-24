<template>
  <DialogWrapper
    :title="'查询商户信息'"
    :dialogVisible="dialogVisible"
    width="900px"
    :footerHide="true"
    :handleClose="handleClose"
  >
        <el-form 
            :inline="true"  
            class="demo-form-inline" 
            :model="searchFrom" 
            size="mini"
        >   
            <el-row>
                <el-col :span="7">
                    <el-form-item label="昵称" class="form_right25" style="width: 220px;" @keyup.enter.native="handleSearch">
                        <el-input v-model="searchFrom.nick" clearable placeholder="商户昵称"  size="small" style="width: 150px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="商户名" class="form_right25" style="width: 220px;" @keyup.enter.native="handleSearch">
                        <el-input v-model="searchFrom.realName" clearable placeholder="商户姓名"  size="small" style="width: 150px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="7">
                    <el-form-item label="手机号" class="form_right25" style="width: 220px;" @keyup.enter.native="handleSearch">
                        <el-input v-model="searchFrom.phone" clearable placeholder="手机号"  size="small" style="width: 150px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label class="form_right25" style="width: 80px;">
                        <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table 
            :data="gridData" 
            :max-height="warpHeight" 
            v-loading="loading" 
            border
        >
            <el-table-column 
                property="username" 
                label="昵称" min-width="150"
            >
                <template slot-scope="{row}">
                    {{row.username ? row.username : '— —'}}
                </template>
            </el-table-column>
            <el-table-column 
                property="realname" 
                label="商户名" 
                min-width="120"
            >
                <template slot-scope="{row}">
                    {{row.realname ? row.realname : '— —'}}
                </template>
            </el-table-column>
            <el-table-column 
                property="phone_num" 
                label="手机号" 
                min-width="120"
            >
                <template slot-scope="{row}">
                    {{row.phone_num ? row.phone_num : '— —'}}
                </template>
            </el-table-column>

            <el-table-column 
                property="phone_num" 
                label="权限" min-width="120"
            >
                <template slot-scope="{row}">
                    {{row.rank == 0 ? '超级管理员' : row.rank == 1 ? '用户' : row.rank == 2 ? '商户' : row.rank == 3 ? '代理商' : '— —'}}
                </template>
            </el-table-column>
            
            <el-table-column 
                label="操作" 
                min-width="120"
            >
                <template slot-scope="{row}">
                    <el-button type="primary" size="small" plain @click="handleSelectMerchant(row)">选择商户</el-button>
                </template>
            </el-table-column>
        </el-table>
  </DialogWrapper>
</template>

<script>
import DialogWrapper from '@/components/DialogWrapper'
import { getMerOrAreaList } from '@/require'
import { messageTip } from "@/utils/ele";
export default {
    data(){
        return {
            searchFrom: {}, // 搜索信息
            warpHeight: 500,
            loading: false,
            gridData: [], // 查询到的商户信息，并展示
            dialogVisible: false, //展示框是否显示
            
        }
    },
    components:{
        DialogWrapper
    },
    mounted(){
        this.warpHeight= (document.documentElement.clientHeight - 80)*0.75
    },
    methods:{
        /* 通过条件【用户名】【真实姓名】【用户电话】查询商户 */
        handleSearch(){
            this.asyGetMerOrAreaList({
                source: 1, // 1代表查询商户 
                phone: this.searchFrom.phone,
                realName: this.searchFrom.realName,
                nick: this.searchFrom.nick
            })
        },
        /* 接口-查询商户信息 */
        async asyGetMerOrAreaList(data){
            try{
                this.loading= true
                const info= await getMerOrAreaList(data)
                if(info.code === 200){
                    this.gridData= info.listdata
                }else{
                   messageTip("error","查询失败") 
                }
            }catch(e){

            }finally{
                this.loading= false
            }
        },
        /* 关闭查询商户弹框 */
        handleClose(){
            this.dialogVisible= false
        },
        /* 处理选中商户的操作 */
        handleSelectMerchant(row){
            this.$emit("handleSelectMerchant",row.id)
            this.handleClose()
        }
    }
}
</script>
