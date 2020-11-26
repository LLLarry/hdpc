<template>
    <div class="communManageCon">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="communManageConForm" size="mini">
               <el-form-item label="小区名称" class="form_right25 w120" >
                    <el-input v-model="communManageConForm.areaname" placeholder="小区名称"  clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="地址" class="form_right25 w220" >
                    <el-input v-model="communManageConForm.address" placeholder="地址" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25 w120">
                    <el-input v-model="communManageConForm.realname" placeholder="商户名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户电话" class="form_right25 w120" >
                    <el-input v-model="communManageConForm.phone" placeholder="商户电话" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="所属省份" class="form_right25 w120" >
                    <el-select v-model="communManageConForm.province" placeholder="请选择省份" size="small" clearable>
                        <el-option
                        v-for="item in this.cityContent.lv1"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="所属市" class="form_right25 w120" >
                    <el-select v-model="communManageConForm.city" placeholder="请选择市" size="small" clearable>
                        <el-option
                        v-for="item in this.cityContent.lv2"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="所属区/县" class="form_right25 w120" >
                    <el-select v-model="communManageConForm.county" placeholder="请选择区/县" size="small" clearable>
                        <el-option
                        v-for="item in this.cityContent.lv3"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="合伙人" class="form_right25 w120" >
                    <el-input v-model="communManageConForm.partent" placeholder="设备号"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="合伙人电话" class="form_right25 w120" >
                    <el-input v-model="communManageConForm.partentPhone" placeholder="合伙人电话"  size="small"></el-input>
                </el-form-item> -->
                <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="communManageConForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="communManageConForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="选择结束时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn w80">
                    <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>
          <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                width="80"
                >
                <template slot-scope="{$index}">
                    {{ (nowPage-1)*10+$index+1 }}
                </template>
                </el-table-column>

                <el-table-column
                prop="name"
                label="小区名称"
                min-width="120"
                >
                <template slot-scope="{row}">
                   {{ row.name && row.name.length > 0 ?  row.name : '— —'}}
                </template>
                </el-table-column>

                <el-table-column
                prop="dealer"
                label="商户名"
                min-width="120"
                >
                <template slot-scope="{row}">
                   {{ row.dealer && row.dealer.length > 0 ?  row.dealer : '— —'}}
                </template>
                </el-table-column>

                <el-table-column
                prop="uphonenum"
                label="商户电话"
                min-width="120"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.uphonenum == null">— —</span>
                    <router-link :to="`/usermanage/merInfo?phone=${scope.row.uphonenum}`"  v-else>
                        <el-link type="primary">{{scope.row.uphonenum}}</el-link>
                    </router-link>
                    
                </template>
                </el-table-column>

                <el-table-column
                label="设备数"
                min-width="80"
                >
                <template slot-scope="scope">
                    <router-link :to="`/deviceManage/deviceList?phone=${scope.row.uphonenum}&areaname=${scope.row.name}`">
                        <el-link type="primary" :underline="true">{{scope.row.devicenum== null ? 0 : scope.row.devicenum}}</el-link>
                    </router-link>
                </template>
                </el-table-column>

                <el-table-column
                label="会员数"
                min-width="80"
                >
                <template slot-scope="scope">
                    <router-link :to="`/usermanage/userInfo?condition=0&areaname=${scope.row.name}&mobile=${scope.row.uphonenum}`">
                        <el-link type="primary" :underline="true">{{scope.row.areausernum == null ? 0 : scope.row.areausernum}}</el-link>
                    </router-link>
                </template>
                </el-table-column>

                <el-table-column
                label="在线卡数"
                min-width="80"
                >
                <template slot-scope="scope">
                    <router-link :to="`/iccardManage/onlineCardQuery?phone=${scope.row.uphonenum}&areaname=${scope.row.name}`" >
                        <el-link type="primary" :underline="true">{{ scope.row.onlinenum == null ? 0 : scope.row.onlinenum}}</el-link>
                    </router-link>
                </template>
                </el-table-column>

                <el-table-column
                label="在线卡余额"
                min-width="140"
                >
                <template slot-scope="scope">
                    <div>充值余额：<el-link type="success" :underline="true">{{ typeof scope.row.ctopupbalance === 'number' ? scope.row.ctopupbalance.toFixed(2) : 0.00 }}</el-link></div>
                    <div>赠送余额：<el-link type="success" :underline="true">{{ typeof scope.row.csendmoney === 'number' ? scope.row.csendmoney.toFixed(2) : 0.00 }}</el-link></div>
                </template>
                </el-table-column>

                <el-table-column
                label="钱包余额"
                min-width="140"
                >
                <template slot-scope="scope">
                    <div>充值余额：<el-link type="success" :underline="true">{{ typeof scope.row.utopupbalance === 'number' ? scope.row.utopupbalance.toFixed(2) : 0.00 }}</el-link></div>
                    <div>赠送余额：<el-link type="success" :underline="true">{{ typeof scope.row.usendmoney === 'number' ? scope.row.usendmoney.toFixed(2) : 0.00 }}</el-link></div>
                </template>
                </el-table-column>

                <el-table-column
                label="合伙人数"
                min-width="80"
                >
                <template slot-scope="scope">
                   <el-button 
                        type="primary"
                        size="mini" 
                        plain 
                        :disabled="scope.row.partnersize===0"
                        @click="handleShowPartner(scope.row.partner)"
                    >{{scope.row.partnersize}}人</el-button>
                </template>
                </el-table-column>

                <el-table-column
                    prop="create_time"
                    label="创建时间"
                    min-width="150"
                >
                 <template slot-scope="scope">
                    {{scope.row.create_time | fmtDate}}
                 </template>
                </el-table-column>

                <el-table-column
                    prop="address"
                    label="地址"
                    min-width="220"
                >
                <template slot-scope="{row}">

                    <!-- <el-tooltip class="item" effect="dark" :content="row.address" placement="left-start" v-if="row.address && row.address.length >= 14">
                        <div class="text-eclipe" v-text="row.address"></div>
                    </el-tooltip> -->
                    <div>{{ row.addresspath }}{{ row.address }}</div>
                </template>
                </el-table-column>

                <el-table-column
                label="详情"
                min-width="90"
                fixed="right"
                >
                 <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="goTo(scope.row)">详情</el-button>
                 </template>
                </el-table-column>
                
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />
        <DialogWrapper 
            title="合伙人信息" 
            width="500px" 
            :dialogVisible="partnerInfo.dialogVisible"
            :handleClose="handleClose"
            :handleSubmit="handleClose"
            :handleCancen="handleClose"
        >
            <el-table 
                :data="partnerInfo.partnerList"
                border
                style="width: 100%;"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
            >
                 <el-table-column
                    prop="realname"
                    label="合伙人姓名"
                    min-width="120">
                    <template slot-scope="{row}">
                        {{ row.realname ? row.realname : '— —' }}
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="phone"
                    label="合伙人电话"
                    min-width="120">
                    <template slot-scope="{row}">
                        {{ row.phone ? row.phone : '— —' }}
                    </template>
                </el-table-column>
                 <el-table-column
                    prop="percent"
                    label="分成比"
                    min-width="120">
                    <template slot-scope="{row}">
                        {{ row.percent*100 }}%
                    </template>
                </el-table-column>
            </el-table>
        </DialogWrapper>
    </div>
</template>

<script>
 import MyPagination from '@/components/common/MyPagination'
 import DialogWrapper from '@/components/DialogWrapper'
 import dateTimeJS from '@/utils/dateTime'
 import { getCommunInfo } from '@/require/communManage'
 // 引入城市选择器构造函数
import { SelectCity } from '@/vendor/selectCity'
const selectCity= new SelectCity()
export default {
    data(){
        return {
            communManageConForm: {},
            pickerOptions: dateTimeJS,
            tableData: [],
            totalPage: 1,
            loading: false,
            nowPage: 1,
            partnerInfo: {
                dialogVisible: false,
                partnerList: [] //合伙人列表
            },
            cityContent:{
                lv1: [], //省级
                lv2: [], //市级
                lv3: [] //县/区级
            }
        }
    },
    components: {
        MyPagination,
        DialogWrapper
    },
     created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            this.communManageConForm= {...this.$route.query} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.communManageConForm.currentPage) || 1
        }
       this.asyGetCommunInfo(this.communManageConForm)
        //获取省级列表
       this.handleGetCityListById(1,0)
    },
    watch: {
        'communManageConForm.province': {
            handler(id,oldId){
                // 当id没有改变
                if(oldId === id) return
                // 只有id存在时，才进行请求，获取列表
                if(id !== void 0){
                    // 请求市级列表
                    this.handleGetCityListById(2,id)
                }
                this.$delete(this.communManageConForm,'city')
                this.$delete(this.communManageConForm,'county')
            }
        },
        'communManageConForm.city': {
            handler(id,oldId){
                if(oldId === id) return
                // 只有id存在时，才进行请求，获取列表
                if(id !== void 0){
                    // 请求县/区的列表
                    this.handleGetCityListById(3,id)
                }
                this.$delete(this.communManageConForm,'county')
            }
        }
    },
    methods: {
       getPage(page){
            this.communManageConForm= {...this.communManageConForm,currentPage:page}
            this.$router.push({query: this.communManageConForm})
            this.asyGetCommunInfo(this.communManageConForm)
            this.nowPage = page
        },
         async asyGetCommunInfo(data){
            let _this= this
            try{
                 _this.loading= true
                let communInfo= await getCommunInfo(data)
                 _this.loading= false
                 if(communInfo.code === 200){
                    _this.tableData = communInfo.listdata
                    _this.totalPage = communInfo.totalRows
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleSearch(){
            this.$router.push({query:{... this.communManageConForm,currentPage: 1}})
            this.asyGetCommunInfo({... this.communManageConForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        },
        goTo({id,merid}){ //跳转小区详情
            this.$router.push({path: '/communManage/communManageCon/comManageDetail',query: {aid: id} }) 
        },
        handleShowPartner(partner){
            this.partnerInfo.partnerList= partner
            this.partnerInfo.dialogVisible= true
        },
        handleClose(){
           this.partnerInfo.dialogVisible= false,
           this.partnerInfo.partnerList= []
        },
        // 通过id获取城市列表 获取的城市level等级，父id
        handleGetCityListById(level,pid){   
            pid= pid === "" ? "-1" : pid
            const {list}= selectCity.selectMenu({ level, pid })
            this.cityContent['lv'+level]= list
            for(let i=level+1;i<=3;i++ ){
                 this.cityContent['lv'+i]= [] //每次设置之后都要清空下一项数据
            }
        }
    }
}
</script>

<style lang="less">
    .text-eclipe {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
</style>