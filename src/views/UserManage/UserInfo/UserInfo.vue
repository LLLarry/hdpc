<template>
    <div class="userInfo">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="userInfoDetailForm" size="mini">
                <el-form-item label="ID" class="form_right25">
                    <el-input v-model="userInfoDetailForm.memberId" clearable placeholder="ID"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="昵称" class="form_right25">
                    <el-input v-model="userInfoDetailForm.nick" clearable placeholder="用户昵称"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="姓名" class="form_right25">
                    <el-input v-model="userInfoDetailForm.realname" clearable placeholder="用户姓名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" class="form_right25">
                    <el-input v-model="userInfoDetailForm.phone" clearable placeholder="用户电话"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25">
                    <el-input v-model="userInfoDetailForm.dealer" clearable placeholder="商户名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25">
                    <el-input v-model="userInfoDetailForm.mobile" clearable placeholder="商户电话"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="起始ID" class="form_right25">
                    <el-input v-model="userInfoDetailForm.startID" clearable placeholder="起始ID"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="结束ID" class="form_right25">
                    <el-input v-model="userInfoDetailForm.endID" clearable placeholder="结束ID"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="金额排序" class="form_right25">
                     <el-select v-model="userInfoDetailForm.moneySort"  placeholder="金额排序" clearable size="small">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card> 
         <el-card class="box-card">
             <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="85"
                >
                <template slot-scope="scope">
                   {{(nowPage-1)*10+scope.$index + 1}}
                </template>
                </el-table-column>
                <el-table-column
                prop="numerical"
                label="ID"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="username"
                label="昵称"
                min-width="120"
                >
                <template slot-scope="{row}">
                    {{row.username ? row.username : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="realname"
                label="姓名"
                min-width="120"
                >
                <template slot-scope="{row}">
                    {{row.realname ? row.realname : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="phone_num"
                label="电话"
                min-width="120"
                >
                <template slot-scope="{row}">
                    {{row.phone_num ? row.phone_num : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="balance"
                label="钱包"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link tag="li" :to="`/usermanage/userInfo/userWalletDetail?uid=${row.id}`"><el-link type="primary" >{{row.balance}}</el-link></router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="onlineCard"
                label="在线卡"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link tag="li" :to="`/usermanage/userInfo/userOnlineCardInfo?uid=${row.id}`">
                        <el-link type="primary" >查看在线卡</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="montuid"
                label="是否包月"
                width="80"
                >
                <template slot-scope="{row}">
                     <el-button v-if="row.montuid" size="mini" type="primary" @click="handleMonthly(row)">是</el-button>
                     <el-button v-else size="mini" type="primary" disabled plain>否</el-button>
                </template>
                </el-table-column>
                <el-table-column
                prop="murealname"
                label="所属商户"
                min-width="120"
                >
                <template slot-scope="{row}">
                    {{row.murealname ? row.murealname : '— —'}}
                </template>
                </el-table-column>
            
                <el-table-column
                prop="muphone_num"
                label="商户电话"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/merInfo?phone=${row.muphone_num}`" v-if="row.muphone_num">
                        <el-link type="primary" >{{row.muphone_num}}</el-link>
                    </router-link>
                    <span v-else>— —</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="arename"
                label="归属小区"
                min-width="120"
                >
                <template slot-scope="{row}">
                    {{row.arename ? row.arename : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                width="200"
                >
                <template slot-scope="{row}">
                    <!-- 注： handleIsBind(1,1,row.id)的三个参数 第一个参数，来源哪里 1、商户 2、小区 ，第二个参数：1绑定/ 2解绑，第三个参数是用户id -->
                    <el-button v-if="row.merid != null && row.merid != 0 " type="danger" size="mini" @click="handleIsBind(1,2,{id: row.id,merid: row.merid})">解绑商户</el-button>
                    <el-button v-else type="primary" size="mini" @click="handleIsBind(1,1,{id: row.id})">绑定商户</el-button>
                    <el-button v-if="row.aid != null && row.aid != 0" type="danger" size="mini" @click="handleIsBind(2,2,{id: row.id,merid: row.merid})">解绑小区</el-button>
                    <el-button v-else type="primary" size="mini" @click="handleIsBind(2,1,{id: row.id,merid: row.merid})" :disabled="row.merid == null">绑定小区</el-button>
                </template>
                </el-table-column>
             </el-table>    
         </el-card>  
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
        <!-- 绑定商户/小区弹框 -->
        <bindMerOrArea :bindInfo="bindInfo" @backFn="backFn" />

        <el-dialog title="包月信息" :visible.sync="dialogMonthly"  width="390px">
            <!-- <div class="titleMon">用户名：小清新</div> -->
            <ul class="dialogMon">
                <li><div class="left">总剩余次数</div><div class="right">{{monthlyList.surpnum ? monthlyList.surpnum : 0}}次</div></li>
                <li><div class="left">今日剩余次数</div><div class="right">{{monthlyList.todaysurpnum ? monthlyList.todaysurpnum : 0}}次</div></li>
                <li><div class="left">每日指定总次数</div><div class="right">{{monthlyList.everydaynum ? monthlyList.everydaynum : 0}}次</div></li>
                <li><div class="left">每月限制次数</div><div class="right">{{monthlyList.everymonthnum ? monthlyList.everymonthnum : 0}}次</div></li>
                <li><div class="left">充电时间</div><div class="right">{{monthlyList.time ? monthlyList.time : 0}}分钟</div></li>
                <li><div class="left">消耗电量</div><div class="right">{{monthlyList.elec ? monthlyList.elec : 0}}度</div></li>
                <li><div class="left">到期时间</div><div class="right">{{ monthlyList.endTime | fmtDate }}</div></li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import { getUserInfo } from '@/require/userManage'
import { alertPassword,messageTip } from '@/utils/ele'
import { userUnbindMer, userUnbindArea } from '@/require'
import { getUserMonthlyInfo } from '@/require/userManage'
import bindMerOrArea from '@/components/common/bindMerOrArea'
export default {
    data(){
        return {
                userInfoDetailForm: {},
                tableData: [],
                monthlyList: {}, //包月信息
                bindInfo: {show: false}, //绑定商户/小区弹框信息
                dialogMonthly: false, //包月弹框
                loading: false,
                totalPage: 1, //共1条数据
                nowPage: 1, //当前页数   
        }
    },
    components: {MyPagination,bindMerOrArea},
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            this.userInfoDetailForm= {...this.$route.query}
            this.nowPage= parseInt(this.userInfoDetailForm.currentPage) || 1
        }
        this.asyGetUserInfo(this.userInfoDetailForm)
    },
    methods: {
        getPage(page){ //分页发改变时，触发回调
            this.userInfoDetailForm= {...this.userInfoDetailForm,currentPage:page}
            this.$router.push({query: this.userInfoDetailForm})
            this.asyGetUserInfo(this.userInfoDetailForm)
            this.nowPage = page
        },
      handleMonthly(row){
        let {id:uid,montid}= row
        this.asyGetUserMonthlyInfo({uid,montid})
      },
      handleIsBind(from,type,page){ //点击修改用户的绑定解绑...
         alertPassword(()=>{
             if(type == 1){ //绑定
                 this.bindInfo= {show:true,from,page} //id 用户id
             }else{ //解绑
                if(from == 1){ //解绑商户
                    let {id}= page
                    this.handleUnBind(userUnbindMer,id)
                }else{ //解绑小区
                    let {id}= page
                    this.handleUnBind(userUnbindArea,id)
                }
             }
            
         })    
        },
        async handleUnBind(fn,id){ //解绑操作 fn请求函数 ，id用户id
            try{
                let data= await fn({id})
                if(data.code == 200){
                    messageTip('success','解绑成功')
                     this.asyGetUserInfo(this.userInfoDetailForm)
                    
                }else{
                    messageTip('success','解绑失败')
                }
            }
            catch(error){

            }
          
        },
        async asyGetUserInfo(data){ //获取用户信息
            let _this= this
            try{
                 _this.loading= true
                 let userInfo= await getUserInfo(data)
                 if(userInfo.code === 200){
                    _this.tableData= userInfo.touristinfo
                    _this.totalPage =userInfo.totalRows
                 }
                  _this.loading= false
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                     _this.loading= false
            }
         },
         async asyGetUserMonthlyInfo(data){
             try {
                 let monthlyInfo = await getUserMonthlyInfo(data)
                 if(monthlyInfo.code === 200){
                     this.monthlyList= monthlyInfo.listdata
                     this.dialogMonthly= true
                 }else{

                 }
             } catch (error) {
                 messageTip('error','获取包月信息失败') 
             }
         },
         handleSearch(){ //点击搜索查询
            this.$router.push({query:{... this.userInfoDetailForm,currentPage: 1}})
            this.asyGetUserInfo({... this.userInfoDetailForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        },
        backFn(data){ //绑定商户或小区回调，修改自己的值
           this.asyGetUserInfo(this.userInfoDetailForm)
        }
    }
}
</script>

<style lang="less">
.userInfo {
    .titleMon {
        padding-bottom: 15px;
        margin-bottom: 10px;
        border-bottom: 1px solid #f3f3f3;
        text-align: center;
    }
    .dialogMon {
        padding: 0 20px 20px 20px;
        li {
            height: 40px;
            line-height: 40px;
            .left {
                width: 120px;
                float: left;
                font-weight: 700;
            }
            .right {
                overflow: hidden;
                text-align: center;
                color: #999;
            }
        }
    }
}

</style>