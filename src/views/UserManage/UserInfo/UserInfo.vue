<template>
    <div class="userInfo">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="userInfoDetailForm" size="mini">
                <el-form-item label="ID" class="form_right25">
                    <el-input v-model="userInfoDetailForm.id" placeholder="ID"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="排序" class="form_right25">
                     <el-select v-model="userInfoDetailForm.wallet"  placeholder="不排序"  size="small">
                        <el-option label="不排序" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="昵称" class="form_right25">
                    <el-input v-model="userInfoDetailForm.nickName" placeholder="用户昵称"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="姓名" class="form_right25">
                    <el-input v-model="userInfoDetailForm.name" placeholder="用户姓名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="用户电话" class="form_right25">
                    <el-input v-model="userInfoDetailForm.phone" placeholder="用户电话"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25">
                    <el-input v-model="userInfoDetailForm.merName" placeholder="商户名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25">
                    <el-input v-model="userInfoDetailForm.merPhone" placeholder="商户电话"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="归属小区" class="form_right25">
                    <el-input v-model="userInfoDetailForm.village" placeholder="归属小区"  size="small"></el-input>
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
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="50"
                >
                </el-table-column>
                <el-table-column
                prop="id"
                label="ID"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="nickName"
                label="昵称"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="姓名"
                min-width="120"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.name">{{scope.row.name}}</span>
                     <span v-else>— —</span>
                </template>
                </el-table-column>
                 <el-table-column
                prop="phone"
                label="电话"
                min-width="120"
                >
            
                </el-table-column>
                 <el-table-column
                prop="wallet"
                label="钱包"
                min-width="120"
                >
                <template slot-scope="scope">
                    <router-link tag="li" to="/usermanage/userInfo/userWalletDetail"><el-link type="primary" >{{scope.row.wallet}}</el-link></router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="onlineCard"
                label="在线卡"
                min-width="120"
                >
                <template slot-scope="scope">
                    <router-link tag="li" to="/usermanage/userInfo/userOnlineCardInfo">
                        <el-link type="primary" >查看在线卡</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="isMonthly"
                label="是否包月"
                width="80"
                >
                <template slot-scope="scope">
                     <el-button v-if="scope.row.isMonthly" size="mini" type="primary" @click="handleMonthly(scope.row)">是</el-button>
                     <el-button v-else size="mini" disabled>否</el-button>
                </template>
                </el-table-column>
                <el-table-column
                prop="merName"
                label="所属商户"
                min-width="120"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.merName">{{scope.row.merName}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>
            
                <el-table-column
                prop="merPhone"
                label="商户电话"
                min-width="120"
                >
                <template slot-scope="scope">
                    <el-link type="primary" >{{scope.row.merPhone}}</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="village"
                label="归属小区"
                min-width="120"
                >
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                width="200"
                >
                <template slot-scope="scope">
                    <el-button v-if="scope.row.handle.bindMer == 1" type="primary" size="mini" @click="handleIsBind(1,scope.row.handle.bindMer)">解绑商户</el-button>
                    <el-button v-else type="success" size="mini" @click="handleIsBind(1,scope.row.handle.bindMer)">绑定商户</el-button>
                    <el-button v-if="scope.row.handle.bindVill == 1" type="primary" size="mini" @click="handleIsBind(2,scope.row.handle.bindVill)">解绑小区</el-button>
                    <el-button v-else type="success" size="mini" @click="handleIsBind(2,scope.row.handle.bindVill)">绑定小区</el-button>
                </template>
                </el-table-column>
             </el-table>    
         </el-card>  

        <el-dialog title="包月信息" :visible.sync="dialogMonthly"  width="390px">
            <div class="titleMon">用户名：小清新</div>
            <ul class="dialogMon">
                <li><div class="left">总剩余次数</div><div class="right">119次</div></li>
                <li><div class="left">今日剩余次数</div><div class="right">5次</div></li>
                <li><div class="left">每日指定总次数</div><div class="right">5次</div></li>
                <li><div class="left">每月限制次数</div><div class="right">0次</div></li>
                <li><div class="left">充电时间</div><div class="right">480分钟</div></li>
                <li><div class="left">消耗电量</div><div class="right">2.5度</div></li>
                <li><div class="left">到期时间</div><div class="right">2019-09-17 16:32:01</div></li>
            </ul>
        </el-dialog>
    </div>
</template>

<script>
// import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link,Dialog} from 'element-ui'
// import Vue from 'vue'
import MyPagination from '@/components/common/MyPagination'
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
            userInfoDetailForm: {
                    id: '',
                    wallet: '0',
                    nickName: '',
                    name: '',
                    phone:'',
                    merName: '',
                    merPhone: '',
                    village: ''
                },
                tableData: [
                    {
                        index: 1,
                        id: '00079277',
                        nickName: '贴样板杜师傅13849183939',
                        name: '',
                        phone: '15778404198',
                        wallet: 99957.0,
                        isMonthly: 0,
                        merName: '',
                        merPhone: '15778404198',
                        village: '凤凰城7号楼',
                        handle: {bindMer: 0,bindVill: 1} //bindMer 0未绑定商户，1绑定了商户  bindVill  0未绑定小区，1绑定了小区
                    },
                    {
                        index: 1,
                        id: '00079277',
                        nickName: '贴样板杜师傅13849183939',
                        name: '',
                        phone: '15778404198',
                        wallet: 99957.5,
                        isMonthly: 2,
                        merName: '',
                        merPhone: '15778404198',
                        village: '凤凰城7号楼',
                        handle: {bindMer: 1,bindVill: 0} //bindMer 0未绑定商户，1绑定了商户  bindVill  0未绑定小区，1绑定了小区
                    }
                ],
                dialogMonthly: false, //包月弹框
                gridData: []
        }
    },
    methods: {
      handleMonthly(row){
        console.log(row)
        this.dialogMonthly= true
      },
      handleIsBind(from,status){ //点击修改用户的绑定解绑...
        console.log(from,status)
             this.$prompt('请输入密码', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPlaceholder: '请输入密码',
                lockScroll: true
            }).then(({ value }) => {
            this.$message({
                type: 'success',
                message: '你的密码是: ' + value
            });
            this.handleBindDetail(from,status)
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                });       
            });
        },
        handleBindDetail(from,status){ //输入密码点击确定之后执行解绑/绑定操作
           if(from == 1){
               if(status == 1){
                   console.log('解绑商户')
                    //解绑商户    
               }else{
                    //绑定商户   
                    console.log('绑定商户') 
               }
           }else{
              if(status == 1){
                    //解绑小区
                console.log('解绑小区')    
               }else{
                    //绑定小区 
                 console.log('绑定小区')      
               } 
           }
        }
    }
}
</script>

<style lang="less">
// @import '../../../../static/style/default.less';
// @import '../../../../static/style/common.less';
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