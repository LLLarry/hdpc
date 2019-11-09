<template>
  <div class="bindMerOrArea">
    <el-dialog title="绑定商户" :visible.sync="bindInfo.show" width="700px" custom-class="bindDialog" :modal="false" v-if="bindInfo.from == 1" >
        <el-form :inline="true"  class="demo-form-inline" :model="bindMerOrAreaForm" size="mini">
                <el-form-item label="手机号" class="form_right25" style="width: 210px;">
                    <el-input v-model="bindMerOrAreaForm.phone" clearable placeholder="手机号"  size="small" style="width: 150px;"></el-input>
                </el-form-item>
                <el-form-item label="昵称" class="form_right25" style="width: 210px;">
                    <el-input v-model="bindMerOrAreaForm.nick" clearable placeholder="商户昵称"  size="small" style="width: 150px;"></el-input>
                </el-form-item>
                <el-form-item label class="form_right25" style="width: 140px;">
                     <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
        </el-form>
        <el-table :data="gridData" height="70vh" v-loading="loading">
            <el-table-column property="username" label="昵称" min-width="150">
                <template slot-scope="{row}">
                    {{row.username ? row.username : '— —'}}
                </template>
            </el-table-column>
            <el-table-column property="realname" label="商户名" min-width="120">
                <template slot-scope="{row}">
                    {{row.realname ? row.realname : '— —'}}
                </template>
            </el-table-column>
            <el-table-column property="phoneNum" label="手机号" min-width="120">
                <template slot-scope="{row}">
                    {{row.phoneNum ? row.phoneNum : '— —'}}
                </template>
            </el-table-column>
            <el-table-column property="address" label="绑定" min-width="120">
                 <template slot-scope="{row}">
                   <el-button type="primary" size="small" @click="handleBindMer(row.id)">绑定商户</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>
    <!-- 绑定小区 -->
    <el-dialog title="绑定小区" :visible.sync="bindInfo.show" width="700px" custom-class="bindDialog" :modal="false" v-if="bindInfo.from == 2">
        <el-table :data="gridData" height="70vh">
            <el-table-column property="name" label="小区名称" min-width="150">
                <template slot-scope="{row}">
                    {{row.name ? row.name : '— —'}}
                </template>
            </el-table-column>
            <el-table-column property="address" label="小区地址" min-width="220">
                <template slot-scope="{row}">
                    {{row.address ? row.address : '— —'}}
                </template>
            </el-table-column>
            <el-table-column property="address" label="绑定" min-width="120">
                 <template slot-scope="{row}">
                   <el-button type="primary" size="small" @click="handleBindArea(row.id)">绑定小区</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-dialog>

  </div>
</template>

<script>
import { getMerOrAreaList,userBindMer,userBindArea } from '@/require'
import { messageTip } from '@/utils/ele'
export default {
    data(){
        return {
            gridData:[],
            list: [], //存放请求过来的数据的
            bindMerOrAreaForm: {},
            loading: false
        }
    },
    props: ['bindInfo'], //{ show: true/false, from: 1/2, id }  1、来自用户信息，2来自设备管理

    watch:{
        'bindInfo': {
            handler: function(newValue,oldValue){
                if(newValue.from == 1 || newValue.from ==2){ //避免加载就请求
                    this.asyGetMerOrAreaList(newValue)
                }
                
            },
             immediate: true,  
        }
    },
    methods: {
        async asyGetMerOrAreaList(newVal){ //获取需要展示的list
            try{
                let info
                this.loading= true
                if(newVal.from == 1){
                    info= await getMerOrAreaList({source: 1})
                }else if(newVal.from == 2){
                    info= await getMerOrAreaList({source: 2,merid: newVal.page.merid})
                }
                this.loading= false
                if(info.code === 200){
                    this.list= info.listdata 
                    this.gridData= this.list 
                } 
            }
            catch(error){
                this.loading= false
            }
        },
        handleSearch(){
            let {phone,nick} = this.bindMerOrAreaForm
            let newList= this.list.filter((item,i)=>{
                if(phone){
                    if(nick){
                        if(item.phoneNum == phone && item.username == nick){
                            return item
                        }
                    }else{
                        if(item.phoneNum == phone){
                            return item
                        }    
                    }
                }else{
                    if(nick){
                        if(item.username == nick){
                            return item
                        }
                    }else{
                        return item  
                    }
                }
                    
            })
            this.gridData= newList
            console.log(newList)
        },
        handleBindMer(merid){ //绑定商户
            this.bindInfo.show= false
            if(this.bindInfo.page.id){ //来自用户页面的绑定
                let data= userBindMer({id:this.bindInfo.page.id,merid})
                data.then(res=>{
                    if(res.code== 200){
                        messageTip('success','绑定成功')
                        this.$emit('backFn',{from: 1,merid,id:this.bindInfo.page.id })
                    }else{
                        messageTip('success','绑定失败')
                    }
                }).catch(error=>{
                    
                })
            }
        },
        handleBindArea(areaid){
            this.bindInfo.show= false
            if(this.bindInfo.page.id){ //来自用户页面的绑定
                let data= userBindArea({id:this.bindInfo.page.id,areaid})
                data.then(res=>{
                    if(res.code== 200){
                        messageTip('success','绑定成功')
                        this.$emit('backFn')
                    }else{
                        messageTip('success','绑定失败')
                    }
                }).catch(error=>{
                    
                })
            }
        }
    }
}
</script>

<style lang="less">
.bindMerOrArea{
    .bindDialog {
        min-width: 500px;
        margin-top: 5vh !important;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5) !important;
    }
}
</style>