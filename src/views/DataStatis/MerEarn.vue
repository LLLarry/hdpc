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
                     <el-select v-model="merEarnForm.sort" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="总金额" class="form_right25">
                     <el-select v-model="merEarnForm.rank" clearable placeholder="请选择排序方式"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="从大到小" value="1" ></el-option>
                        <el-option label="从小到大" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="商户名" class="form_right25" >
                    <el-input v-model="merEarnForm.username" placeholder="请输入商户名"  size="small"></el-input>
                </el-form-item>
                 <el-form-item label="开始时间" class="form_right25">
                      <el-date-picker
                        v-model="merEarnForm.startTime"
                        size="small"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择开始时间">
                      </el-date-picker>
                </el-form-item>

                  <el-form-item label="结束时间" class="form_right25">
                      <el-date-picker
                        size="small"
                        v-model="merEarnForm.endTime"
                        type="date"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        placeholder="选择结束时间">
                      </el-date-picker>
                 </el-form-item>

                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" size="small" @click="handleSearch">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>

         <el-card class="box-card">
            <el-table
                :data="tableData"
                 v-loading="loading"
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
import { async } from 'q'

export default {
   data(){
       return {
           merEarnForm: {
               sort: '0',
               rank: '0',
               username: '',
               startTime: '',
               endTime: '',
           },
           loading: false,
           tableData: [], //每条数据
           gatherData: {},//汇总数据
           totalPage: 500, //共500条数据
           nowPage: 1 //当前页数  
       }
   },
    components: {
       MyPagination 
    },
    created(){
        if(JSON.stringify(this.$route.query) != "{}"){
            this.merEarnForm= {...this.$route.query}
        }
        this.getMerEarnData(this.merEarnForm)
        console.log(this.$route.query)
        console.log(this.merEarnForm)
    },
    // activated(){ //keep alive时进入页面触发
    //     console.log(this.merEarnForm)
    //      this.getMerEarnData()
    // },
    methods: {
        getPage(page){ //分页发改变时，触发回调
            console.log('fu',page)
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
                            2: 'moneytotal',
                            3: 'ordertotal',
                            4: 'wechatmoney',
                            5: 'wechatorder',
                            6: 'alipaymoney',
                            7: 'alipayorder',
                            8: 'wechatretmoney',
                            9: 'wechatretord',
                            10: 'alipayretmoney',
                            11: 'alipayretord'
                        }
                    sums[index]= this.gatherData[keyVal[index]]
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
                    _this.tableData= merEarnData.listMap
                    _this.gatherData= merEarnData.map
                    _this.totalPage= merEarnData.totalRows
                }
                catch(err){
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