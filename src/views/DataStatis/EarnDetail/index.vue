<template>
  <div class="earnDetail">
      <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" size="mini" v-model="earnDetailForm">
                 <el-form-item label="商户名" class="form_right25">
                    <el-input v-model="earnDetailForm.realname" placeholder="请输入商户名"  size="small" clearable ></el-input>
                </el-form-item>
                <el-form-item label="手机号" class="form_right25" >
                    <el-input v-model="earnDetailForm.phone" placeholder="请输入手机号"  size="small" clearable ></el-input>
                </el-form-item>
                 <el-form-item label="开始时间" class="form_right25">
                      <el-date-picker
                        v-model="earnDetailForm.startTime"
                        size="small"
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择开始时间">
                      </el-date-picker>
                </el-form-item>

                  <el-form-item label="结束时间" class="form_right25">
                      <el-date-picker
                        size="small"
                        v-model="earnDetailForm.endTime"
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
                border
                style="width: 100%"
                v-loading="loading"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
            >
                <el-table-column
                    prop="createtime"
                    label="时间"
                    min-width="100"
                    fixed
                >
                </el-table-column>
                <el-table-column
                    prop="username"
                    label="商户昵称"
                    min-width="100"
                    fixed
                >
                    <template slot-scope="scope">
                            {{scope.row.username && scope.row.username.length > 0 ? scope.row.username : '— —'}}
                    </template>
                </el-table-column>

                <el-table-column
                    prop="phone_num"
                    label="商户电话"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        {{scope.row.phone_num && scope.row.phone_num.length > 0 ? scope.row.phone_num : '— —'}}
                    </template>
                </el-table-column>


                <el-table-column
                    prop="incomemoney"
                    label="收益金额"
                    min-width="100"
                >
                </el-table-column>

                <el-table-column
                    prop="returnmoney"
                    label="退费金额"
                    min-width="100"
                >
                </el-table-column>

                <el-table-column
                    prop="topupincome"
                    label="充值收益"
                    min-width="100"
                >
                </el-table-column>

                <el-table-column
                    prop="deviceincome"
                    label="设备收益"
                    min-width="100"
                >
                </el-table-column>

                <el-table-column
                    prop="consumetotalquantity"
                    label="消耗电量"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        {{ typeof scope.row.consumetotalquantity == "number" ? scope.row.consumetotalquantity / 100 : 0}}
                    </template>
                </el-table-column>

            </el-table>
        </el-card>
        <MyPagination :totalPage="totalPage" :nowPage="nowPage" @getPage="getPage"/>
   </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import { dealerIncomeDatainfo } from '@/require/datastatis'
import Util from '@/utils/util'
export default {
   data(){
       return {
           earnDetailForm: {},
           loading: false,
           tableData: [], //每条数据
           totalPage: 1, //共500条数据
           nowPage: 1 //当前页数   
       }
   },
    components: {
       MyPagination 
    },
    created(){
        let {VNK,...routerKey}=  this.$route.query
        if(Object.keys(routerKey).length > 0){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD',7)
            this.earnDetailForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.earnDetailForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD',7)
            this.earnDetailForm= {startTime,endTime}
        }
        this.asySealerIncomeDatainfo({...this.earnDetailForm,isFirst: true})
    },
    methods: {
        getPage(page){ //分页发改变时，触发回调
            this.nowPage = page
            this.$router.push({query: {...this.earnDetailForm,currentPage: page,VNK: this.$route.query.VNK}})
            this.asySealerIncomeDatainfo(this.earnDetailForm)
        },

        async asySealerIncomeDatainfo(data){
            try {
                this.loading= true
                let info= await dealerIncomeDatainfo({...data,usage:1,limit: 10,currentPage:this.nowPage })
                this.loading= false
                this.tableData= info.result
                if(data.isFirst){ //第一次请求的时候才会有总条数
                    this.totalPage= info.resultsize
                }
            } catch (error) {
                if(error == '拦截请求'){ //当访问出错时会error为字符串，当拦截器拦截时error为undefined,当拦截器拦截时继续加载
                    return this.loading= true
                }
                    this.loading= false
            }
        },
        handleSearch(){ //点击搜索查询
            this.$router.push({query: {...this.earnDetailForm,VNK: this.$route.query.VNK,currentPage: 1}})
            this.asySealerIncomeDatainfo({...this.earnDetailForm,isFirst: true})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        }
    }
}
</script>