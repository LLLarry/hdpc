<template>
   <div class="merEarn">
      <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" size="mini" v-model="merEarnForm">
                <!-- <el-form-item label="订单数" class="form_right25">
                     <el-select v-model="value1" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="不排序" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="订单数" class="form_right25">
                     <el-select v-model="merEarnForm.rankorder" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总金额" class="form_right25">
                     <el-select v-model="merEarnForm.rankmoney" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户名" class="form_right25" >
                    <el-input v-model="merEarnForm.realname" placeholder="请输入商户名"  size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25" >
                    <el-input v-model="merEarnForm.phone" placeholder="请输入手机号"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="开始时间" class="form_right25">
                      <el-date-picker
                        v-model="merEarnForm.startTime"
                        size="small"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择开始时间">
                      </el-date-picker>
                </el-form-item>

                  <el-form-item label="结束时间" class="form_right25">
                      <el-date-picker
                        size="small"
                        v-model="merEarnForm.endTime"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择结束时间">
                      </el-date-picker>
                 </el-form-item>

                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>

         <el-card class="box-card">
            <el-table
                :data="tableData"
                 v-loading="loading"
                 element-loading-text="加载中"
                border
                style="width: 100%"
                :summary-method="getSummaries" 
                :show-summary="true"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="count_time"
                label="时间"
                min-width="100"
                fixed
                >
                </el-table-column>
                <el-table-column
                prop="username"
                label="归属商户"
                min-width="120"
                fixed
                >
                <template slot-scope="{row}">
                    {{row.username && row.username.length > 0 ? row.username : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="phone"
                label="手机号"
                min-width="120"
                fixed
                >
                <template slot-scope="{row}">
                    {{row.phone && row.phone.length > 0 ? row.phone : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="moneytotal"
                label="总收益"
                min-width="80"
                >
                </el-table-column>

                 <el-table-column
                prop="ordertotal"
                label="总订单"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="wechatmoney"
                label="微信收益"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="wechatorder"
                label="微信订单"
                min-width="80">
                </el-table-column>

                 <el-table-column
                prop="alipaymoney"
                label="支付宝收益"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="alipayorder"
                label="支付宝订单"
                min-width="80">
                </el-table-column>
                <el-table-column
                prop="wechatretmoney"
                label="微信退费"
                min-width="80"
                >
                </el-table-column>

                 <el-table-column
                prop="wechatretord"
                label="微信退费订单"
                min-width="80">
                </el-table-column>
                 <el-table-column
                prop="alipayretmoney"
                label="支付宝退费"
                min-width="80">
                </el-table-column>

                 <el-table-column
                prop="alipayretord"
                label="支付宝退费订单"
                min-width="80">
                </el-table-column>
            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" :nowPage="nowPage" @getPage="getPage"/>
   </div>
</template>

<script>
import {handleGetMerEarn} from '@/require'
import MyPagination from '../../components/common/MyPagination'
import Util from '@/utils/util'

export default {
   data(){
       return {
           merEarnForm: {
               rankorder: '',
               rankmoney: '',
               realname: '',
               phone: '',
               startTime: '',
               endTime: '',
           },
           loading: false,
           tableData: [], //每条数据
           gatherData: {},//汇总数据
           totalPage: 1, //共1条数据
           nowPage: 1 //当前页数  
       }
   },
    components: {
       MyPagination 
    },
    created(){
        let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD',7)
            this.merEarnForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.merEarnForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD',7)
            this.merEarnForm= {startTime,endTime}
        }
        this.getMerEarnData(this.merEarnForm)
    },
    // activated(){ //keep alive时进入页面触发
    //     console.log(this.merEarnForm)
    //      this.getMerEarnData()
    // },
    methods: {
        getPage(page){ //分页发改变时，触发回调
            let obj= {...this.merEarnForm,currentPage:page}
            this.getMerEarnData(obj)
            this.nowPage = page
        },
        getSummaries(param){
                const { columns, data } = param;
                const sums = [];
                columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = '总计';
                    return;
                }
                const values = data.map(item => Number(item[column.property])); 
                if (!values.every(value => isNaN(value))) {
                    let keyVal={
                            3: 'moneytotal',
                            4: 'ordertotal',
                            5: 'wechatmoney',
                            6: 'wechatorder',
                            7: 'alipaymoney',
                            8: 'alipayorder',
                            9: 'wechatretmoney',
                            10: 'wechatretord',
                            11: 'alipayretmoney',
                            12: 'alipayretord'
                        }
                    sums[index]= this.gatherData[keyVal[index]]
                    sums[2]= 'N/A'
                } else {
                    sums[index] = 'N/A';
                }
                });
                return sums;
               
            },
            async getMerEarnData(data){ //发送请求获取信息
                let _this= this
                try{
                    _this.loading= true
                    let merEarnData= await handleGetMerEarn(data)
                    _this.loading= false
                    _this.tableData= merEarnData.listdata
                    _this.gatherData= merEarnData.totaldata
                    _this.totalPage= merEarnData.totalRows
                }
                catch(error){
                    if(error == '拦截请求'){ //当访问出错时会error为字符串，当拦截器拦截时error为undefined,当拦截器拦截时继续加载
                       _this.loading= true
                       return 
                   }
                       _this.loading= false
                }
            },
            handleSearch(){ //点击搜索查询
                this.$router.push({query: this.merEarnForm})
                this.getMerEarnData(this.merEarnForm)
                this.nowPage= 1 //搜索完之后将nowPage置为1
            }
    }
}
</script>

<style lang="less">
    // .deviceEarn {
       
    // }
</style>