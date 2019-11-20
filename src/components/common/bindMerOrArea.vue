<template>
  <div class="bindMerOrArea">
    <el-dialog title="绑定商户" :visible.sync="bindInfo.show" width="700px" custom-class="bindDialog" :modal="false" v-if="bindInfo.from == 1" >
        <el-form :inline="true"  class="demo-form-inline" :model="bindMerOrAreaForm" size="mini">
                <el-form-item label="昵称" class="form_right25" style="width: 210px;">
                    <el-input v-model="bindMerOrAreaForm.nick" clearable placeholder="商户昵称"  size="small" style="width: 150px;"></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25" style="width: 210px;">
                    <el-input v-model="bindMerOrAreaForm.phone" clearable placeholder="手机号"  size="small" style="width: 150px;"></el-input>
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
        <el-table :data="gridData" height="70vh"  v-loading="loading">
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
import { getMerOrAreaList,userBindMer,userBindArea,bindDevice } from '@/require'
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
    props: ['bindInfo'], //{ show: true/false, from: 1/2, id }  1、商户，2来自设备
    /* 设备绑定商户信息框 用户页面传的信息{show: true,from: 1,page: {id: 125}}  page里是用户的信息，包含id等，设备详情传的信息{show: true,from: 1,page: {code: '000001'}}*/
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
        let _this= this
            try{
                let info
                _this.loading= true
                if(newVal.from == 1){
                    info= await getMerOrAreaList({source: 1}) //获取商户
                }else if(newVal.from == 2){
                    info= await getMerOrAreaList({source: 2,merid: newVal.page.merid}) //获取小区
                }
                _this.loading= false
                if(info.code === 200){
                    _this.list= info.listdata 
                    _this.gridData= this.list 
                } 
            }
            catch(error){
                this.loading= false
            }
        },
        handleSearch(){
            let {phone='',nick=''} = this.bindMerOrAreaForm
            console.log(phone,nick)
            let newList= this.list.filter((item,i)=>{
                item.phoneNum= item.phoneNum== null ? '' : item.phoneNum
    
                if(phone){
                    if(nick){
                        if(item.phoneNum.includes(phone.trim()) && item.username.includes(nick.trim())){
                            return item
                        }
                    }else{
                        if(item.phoneNum.includes(phone.trim())){
                            return item
                        }    
                    }
                }else{
                    if(nick){
                        if(item.username.includes(nick.trim())){
                            return item
                        }
                    }else{
                        return item  
                    }
                }
                    
            })
            this.gridData= newList
        },
        handleBindMer(merid){ //绑定商户
            this.bindInfo.show= false
            if(this.bindInfo.page && this.bindInfo.page.id){ //来自用户页面的绑定
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
            }else if(this.bindInfo.page && this.bindInfo.page.code){ //设备绑定页面
                let data= bindDevice({dealid: merid, devicenum: this.bindInfo.page.code})
                data.then(res=>{
                    if(res.code== 200){
                        messageTip('success','绑定成功')
                        this.$emit('backFn',{from: 1,merid})
                    }else{
                        messageTip('success','绑定失败')
                    }
                }).catch(err=>{})
                
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