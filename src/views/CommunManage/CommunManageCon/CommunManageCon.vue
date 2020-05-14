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
                prop="address"
                label="地址"
                min-width="220"
                >
                <template slot-scope="{row}">
                   {{ row.address && row.address.length > 0 ?  row.address : '— —'}}
                </template>
                </el-table-column>

                <el-table-column
                prop="countdevice"
                label="设备数量"
                min-width="100"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.countonlin == null">0</span>
                    <router-link :to="`/deviceManage/deviceList?phone=${scope.row.uphonenum}`">
                        <el-link type="primary" :underline="true">{{scope.row.countdevice}}</el-link>
                    </router-link>
                </template>
                </el-table-column>

                <el-table-column
                prop="countonlin"
                label="在线卡数量"
                min-width="100"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.countonlin == null">0</span>
                    <router-link :to="`/iccardManage/onlineCardQuery?phone=${scope.row.uphonenum}`" v-else>
                        <el-link type="primary" :underline="true">{{scope.row.countonlin}}</el-link>
                    </router-link>
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
                prop="manarealname"
                label="合伙人"
                min-width="120"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.manarealname && scope.row.manarealname.length > 0">{{scope.row.manarealname}}</span>
                    <span v-else>— —</span>
                </template>
                </el-table-column>

                <el-table-column
                prop="manaphonenum"
                label="合伙人电话"
                min-width="120"
                >
                <template slot-scope="scope">
                    <span v-if="scope.row.manaphonenum == null">— —</span>
                    <el-link v-else>{{scope.row.manaphonenum}}</el-link>
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
    </div>
</template>

<script>
 import MyPagination from '@/components/common/MyPagination'
 import dateTimeJS from '@/utils/dateTime'
 import { getCommunInfo } from '@/require/communManage'
export default {
    data(){
        return {
            communManageConForm: {},
            pickerOptions: dateTimeJS,
            tableData: [
               {
                  index: 1,
                  communName: '测试小区',
                  communAddress: '小区地址',
                  deviceNum : 6,
                  onlineCardNum: 5,
                  merName: '任志超',
                  merPhone: '15538065633',
                  partent: '任志超',
                  partentPhone: '15538065633',
                  createTime: '2019-08-07 14:06:00'
              }
            ],
            totalPage: 1,
            loading: false,
            nowPage: 1
        }
    },
    components: {
        MyPagination
    },
     created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            this.communManageConForm= {...this.$route.query} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.communManageConForm.currentPage) || 1
        }
       this.asyGetCommunInfo(this.communManageConForm)
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
            this.$router.push({path: '/communManage/communManageCon/comManageDetail',query: {id,merid} }) 
        }
    }
}
</script>

<style lang="less">

</style>