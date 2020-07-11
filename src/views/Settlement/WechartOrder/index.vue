<template>
    <div class="wechartOrder">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline"  size="mini">
                <el-form-item label="选择时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="time"
                        size="small"
                        type="date"
                        placeholder="选择开始时间"
                        :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd"
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
                :data="totalContent"
                border
                v-loading="loading"
                fit
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="a"
                label="应结订单总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="b"
                label="退款总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="c"
                label="充值券退款总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="d"
                label="手续费总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="e"
                label="手续费总金额"
                min-width="80"
                >
                </el-table-column>
				<el-table-column
                prop="f"
                label="订单总金额"
                min-width="80"
                >
                </el-table-column>
				
            </el-table>
        </el-card>

         <!-- <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>丢失订单</span>
            </div>
            <div>
                {{ listlost.length > 0 ? listlost.join(',') : '无' }}
            </div>
         </el-card> -->

         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                v-loading="loading"
                fit
                style="width: 100%"
                :row-style="rowClass"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                width="80"
                >
                <template slot-scope="{$index}">
                    <!-- {{ (nowPage-1)*10+$index+1 }} -->
                    {{ $index+1 }}
                </template>
                </el-table-column>

				 <el-table-column
	                prop="WxOrderNo"
	                label="微信订单号"
	                min-width="200"
	                >
                </el-table-column>
	   		
				 <el-table-column
	                prop="BusinessOrderNo"
	                label="商户订单号"
	                min-width="200"
	                >
                </el-table-column>

				<el-table-column
	                prop="newBusinessName"
	                label="类型"
	                min-width="200"
	            >
                </el-table-column>
				
				<el-table-column
	                prop="WxRefundNo"
	                label="微信退款单号"
	                min-width="200"
	                >
                </el-table-column>

				 <el-table-column
	                prop="BusinessRefundNo"
	                label="商户退款单号"
	                min-width="200"
	                >
                </el-table-column>

				<el-table-column
	                prop="RefundAmount"
	                label="退款金额"
	                min-width="80"
	                >
                </el-table-column>

				<el-table-column
	                prop="RefundType"
	                label="退款类型"
	                min-width="80"
	            >
				<template slot-scope="{row}">
					{{ row.RefundType === 'ORIGINAL' ? '原路退款' : row.RefundType === 'BALANCE' ?  '转退到用户的微信支付零钱' : '— —'}}
				</template>
                </el-table-column>

				<el-table-column
	                prop="RefundStatus"
	                label="退款状态"
	                min-width="80"
	            >
				<template slot-scope="{row}">
					{{ row.RefundStatus === 'SUCCES' ? '退款成功' : row.RefundStatus === 'FAIL' ?  '退款失败' : row.RefundStatus === 'PROCESSING' ? '退款处理中'  : '— —'}}
				</template>
                </el-table-column>

				<el-table-column
	                prop="creattime"
	                label="交易时间"
	                min-width="150"
	                >
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
import { getWechartList } from '@/require/settlement'
import dateTimeJS from '@/utils/dateTime'
import {messageTip} from '@/utils/ele'
// const tabList= {
// 	   	creattime: "交易时间",
// 	   	commonId: "公众账号ID",
// 	   	businessnum: "商户号",
// 	   	childBusinessnum: "子商户号",
// 	   	equipmentnum: "设备号",
// 	   	WxOrderNo: "微信订单号",
// 	   	BusinessOrderNo: "商户订单号",
// 	   	UserIdentity: "用户标识",
// 	   	TransType: "交易类型",
		
// 		TransStatus: "交易状态",
// 	   	PaymentBank: "付款银行",
// 	   	Currency: "货币种类",
// 	   	TotalAmount: "总金额",
// 	   	RedEnvelopesAmount: "企业红包金额",

// 	   	WxRefundNo: "微信退款单号",
// 	   	BusinessRefundNo: "商户退款单号",
// 	   	RefundAmount: "退款金额",
// 	   	RedEnvelopesRefundAmount: "企业红包退款金额",
// 	   	RefundType: "退款类型",

// 	   	RefundStatus: "退款状态",
// 	   	BusinessName: "商品名称",
// 	   	BusinessData: "商户数据包",
// 	   	Fee: "手续费",
// 	   	Rate: "费率",
//        }
//     const keyList= Object.keys(tabList) 
//     const valueList= Object.values(tabList) 

const map= ['a','b','c','d','e','f','g']
const reg= /\((.+)\)/
export default {
    data(){
        return {
            pickerOptions: dateTimeJS,
            time: '',
            tableData: [],
			loading: false,
			totalHeader: [],
            totalContent: [],
            listlost: []
        }
	},
	created(){
		this.time= this.$fmtDate(new Date()-24*60*60*1000,'YYYY-MM-DD')
		// let sendTime= this.time.replace(/-/g,'')
		this.asyGetWechartList({time:this.time})
	},
    methods: {
		async asyGetWechartList(data){
			let _this= this
			this.loading= true
			try{
                let info= await getWechartList(data)
                let listLost= []
				if(info.code === 200){
                    _this.listlost= info.listlost || []
					let list= info.listcontent.filter(item=>{
                        item.newBusinessName= item.BusinessName.match(reg)[1]
                        if(!_this.listlost.includes(item.BusinessOrderNo)){
						    return item
                        }else{
                            item.isLost= true
                            listLost.push(item)
                        }
                    })
                    _this.tableData= [...listLost,...list]
					let content= info.totalcontent.split(',')
					let ContentList= {}
					
					content.forEach((item,i)=>{
						ContentList[map[i]]= content[i]
					})
					 _this.totalContent= [ContentList]
				}else{
					messageTip('error',info.message)
					_this.tableData= []
					_this.totalContent= []
				}
				
			}catch(e){
                console.log(e)
				_this.tableData= []
				_this.totalContent= []
			}finally{
				this.loading= false
			}
        },
        rowClass({row,rowIndex}){ //改变选中行的颜色
            if(row.isLost){
                return {"backgroundColor": 'rgba(255,0,0,.1)'}
            }
        },
        handleSearch(){
			this.time= this.time || ''
			// let sendTime= this.time.replace(/-/g,'')
			// if(!/^\d+$/.test(sendTime)){
			// 	sendTime= this.$fmtDate(new Date()-24*60*60*1000,'YYYY-MM-DD')
			// }
			this.asyGetWechartList({time:this.time})
        }
    }
}
</script>

<style lang="less">
.wechartOrder {
    .el-table tbody tr:hover>td { 
        background-color:transparent !important;
    }
}
</style>