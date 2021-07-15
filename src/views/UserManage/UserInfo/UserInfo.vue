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
                <el-form-item label="归属小区" class="form_right25">
                    <el-input v-model="userInfoDetailForm.areaname" clearable placeholder="小区名称"  size="small"></el-input>
                </el-form-item>

                <el-form-item label="金额排序" class="form_right25">
                     <el-select v-model="userInfoDetailForm.moneySort"  placeholder="金额排序" clearable size="small">
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="起始ID" class="form_right25">
                    <el-input v-model="userInfoDetailForm.startID" clearable placeholder="起始ID"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="结束ID" class="form_right25">
                    <el-input v-model="userInfoDetailForm.endID" clearable placeholder="结束ID"  size="small"></el-input>
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
                prop="uid"
                label="ID"
                min-width="100"
                >
                <template slot-scope="{row}">
                    {{row.uid.toString().padStart(8, '0')}}
                </template>
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
                    {{row.username ? row.realname : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="cellphone"
                label="电话"
                min-width="120"
                >
                <template slot-scope="{row}">
                    {{row.cellphone ? row.cellphone : '— —'}}
                </template>
                </el-table-column>
                 <el-table-column
                prop="balance"
                label="钱包余额"
                min-width="150"
                >
                <template slot-scope="{row}">
                        <div>
                            充值余额：
                            <el-link type="primary" >
                                <router-link :to="`/usermanage/userInfo/userWalletDetail?uid=${row.uid}&aid=${row.aid}&merid=${row.merid}&bread=${row.username ? row.username : row.realname ? row.realname : ''}`" tag="span">
                                    {{ row.topupmoney != null ? row.topupmoney.toFixed(2)  :  '— —'}}
                                </router-link>
                            </el-link>
                        </div>
                        <div>
                            赠送余额：
                            <el-link type="primary" >
                                <router-link :to="`/usermanage/userInfo/userWalletDetail?uid=${row.id}&aid=${row.aid}&merid=${row.merid}&bread=${row.username ? row.username : row.realname ? row.realname : ''}`" tag="span">
                                    {{ row.sendmoney != null ? row.sendmoney.toFixed(2)  :  '— —'}}
                                </router-link>
                            </el-link>
                        </div>
                </template>
                </el-table-column>
                <el-table-column
                    prop="walletid"
                    label="钱包ID"
                    min-width="120"
                >
                    <template slot-scope="{row}">
                        <span v-fmtnum="row.walletid"></span>
                    </template>
                </el-table-column>
                <el-table-column
                prop="onlineCard"
                label="在线卡"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link tag="li" :to="`/usermanage/userInfo/userOnlineCardInfo?uid=${row.uid}`">
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
                prop="mernick"
                label="所属商户"
                min-width="120"
                >
                <template slot-scope="{row}">
                    {{row.mernick ? row.mernick : '— —'}}
                </template>
                </el-table-column>
            
                <el-table-column
                prop="merphone"
                label="商户电话"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/merInfo?phone=${row.merphone}`" v-if="row.merphone">
                        <el-link type="primary" >{{row.merphone}}</el-link>
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
                        {{row.areaname ? row.areaname : '— —'}}
                    </template>
                </el-table-column>

                 <el-table-column
                    prop="isplatform"
                    label="所属公众号"
                    min-width="120"
                    >
                    <template slot-scope="{row}">
                        <el-button :disabled="row.masteraccount != 1" type="primary" size="mini" :plain="true" @click="handleChangePlat(row)">
                            {{ row.isplatform == 1 ? '自助充电平台' :  row.isplatform == 2 ? '兴煌科技' :  row.isplatform == 3 ? '易安居物联' :  row.isplatform == 4 ? '驰加科技' : '— —'}}
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column
                prop="handle"
                label="操作"
                width="200"
                >
                <template slot-scope="{row}">
                    <!-- 注： handleIsBind(1,1,row.id)的三个参数 第一个参数，来源哪里 1、商户 2、小区 ，第二个参数：1绑定/ 2解绑，第三个参数是用户id -->
                    <el-button v-if="row.merid != null && row.merid != 0 " type="danger" size="mini" @click="handleIsBind(1,2,{id: row.uid,merid: row.merid})">解绑商户</el-button>
                    <el-button v-else type="primary" size="mini" @click="handleIsBind(1,1,{id: row.uid})">绑定商户</el-button>
                    <el-button v-if="row.aid != null && row.aid != 0" type="danger" size="mini" @click="handleIsBind(2,2,{id: row.uid,merid: row.merid})">解绑小区</el-button>
                    <el-button v-else type="primary" size="mini" @click="handleIsBind(2,1,{id: row.uid,merid: row.merid})" :disabled="row.merid == null">绑定小区</el-button>
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
        
        <!-- 修改用户所属的公众号 -->
        <DialogWrapper 
            title="修改用户所属公众号"
            width="450px"
            :dialogVisible="dialogPlat"
            :handleClose="handleClosePlat"
            :handleCancen="handleClosePlat"
            :handleSubmit="handleSubmitPlat"
        >
            <el-form :inline="true"  class="demo-form-inline platForm" :model="platForm" label-width="120px">
                <el-form-item label="用户名" class="form_right25">
                    <el-input v-model="platForm.username" disabled placeholder="用户名" ></el-input>
                </el-form-item>
                <el-form-item label="电话" class="form_right25">
                    <el-input v-model="platForm.phone_num" disabled placeholder="用户电话" ></el-input>
                </el-form-item>
                <el-form-item label="所属公众号" class="form_right25">
                    <el-select v-model="platForm.isplatform"  placeholder="金额排序">
                        <el-option label="自助充电平台" :value="1" ></el-option>
                        <el-option label="兴煌科技" :value="2" ></el-option>
                        <el-option label="易安居物联" :value="3" ></el-option>
                        <el-option label="驰加科技" :value="4" ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </DialogWrapper>
    </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import { getUserInfo } from '@/require/userManage'
import { alertPassword,messageTip } from '@/utils/ele'
import { userUnbindMer, userUnbindArea } from '@/require'
import { getUserMonthlyInfo,editUserIsplatform } from '@/require/userManage'
import bindMerOrArea from '@/components/common/bindMerOrArea'
import DialogWrapper from '@/components/DialogWrapper'
import { mapState } from 'vuex'
import Utils from '@/utils/util'

export default {
    data(){
        return {
                userInfoDetailForm: {},
                tableData: [],
                monthlyList: {}, //包月信息
                bindInfo: {show: false}, //绑定商户/小区弹框信息
                dialogMonthly: false, //包月弹框
                loading: false,
                platForm: {}, //用户所属公众号
                selectUserInfo: {}, //选择的用户信息
                dialogPlat: false, //用户所属公众号修改弹框是否显示
                totalPage: 1, //共1条数据
                nowPage: 1, //当前页数   
        }
    },
    computed: {
        ...mapState(['userInfo'])
    },
    components: {MyPagination,bindMerOrArea,DialogWrapper},
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            this.userInfoDetailForm= {...this.$route.query}
            this.nowPage= parseInt(this.userInfoDetailForm.currentPage) || 1
        }
        // 当 condition 为1的时候，超级管理元请求的数据为空，否则，则为正常请求
        this.userInfoDetailForm.condition= this.userInfoDetailForm.condition == void 0 ? 1 : this.userInfoDetailForm.condition
        this.asyGetUserInfo({...this.userInfoDetailForm})
    },
    methods: {
        getPage(page){ //分页发改变时，触发回调
            this.userInfoDetailForm= {...this.userInfoDetailForm,currentPage:page}
            this.$router.push({query: this.userInfoDetailForm})
            this.asyGetUserInfo(this.userInfoDetailForm)
            this.nowPage = page
        },
      handleMonthly(row){
        let {uid,montid}= row
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
        async asyGetUserInfo(data, isClickSearch){ //获取用户信息 isClickSearch 是否时点击搜索
            let _this= this
            if(isClickSearch){
                let {VNK,condition,currentPage, ...params}= data
                const fmtParams= Utils.fmtParams(params) //格式化之后的参数
                if(Object.keys(fmtParams).length <= 0 ){
                    return messageTip("warning","请先输入条件后再进行搜索！")
                }
            }
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
            this.$router.push({query:{... this.userInfoDetailForm,currentPage: 1,condition: 0}})
            this.userInfoDetailForm= this.$route.query
            this.asyGetUserInfo(this.userInfoDetailForm,true)
            this.nowPage= 1 //搜索完之后将nowPage置为1
        },
        backFn(data){ //绑定商户或小区回调，修改自己的值
           this.asyGetUserInfo(this.userInfoDetailForm)
        },
        // 点击修改用户所属公众号，显示弹框
        handleChangePlat(row){
            this.selectUserInfo= row
            this.platForm= {
                id: row.id,
                username: row.username,
                phone_num: row.phone_num,
                isplatform: row.isplatform
            }
            this.dialogPlat=true
        },
        // 管理用户所属公众号修改弹框
        handleClosePlat(){
            this.dialogPlat=false
        },
        // 提交修改用户所属公众号
        async handleSubmitPlat(){
            try {
                let info= await editUserIsplatform({id: this.platForm.id,isplatform: this.platForm.isplatform})
                if(info.code === 200){
                    messageTip("success","修改成功")
                    this.$set(this.selectUserInfo,"isplatform",this.platForm.isplatform)
                }else{
                    messageTip("error",info.message)
                }
            } catch (error) {
                messageTip("error","修改失败")
            }
            this.dialogPlat=false
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

.el-form--inline .el-form-item__content {
    width: 217px;
}

</style>