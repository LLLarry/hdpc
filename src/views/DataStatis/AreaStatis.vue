<template>
    <div class="areaStatis">
        <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" v-model="areaStatisForm" size="mini">
                <el-form-item label="小区名称" class="form_right25">
                    <el-input 
                        v-model="areaStatisForm.areaname" 
                        placeholder="小区名称" 
                        clearable  
                        size="small"
                        @keyup.enter.native="onBtnSearch"
                    ></el-input>
                </el-form-item>
                
                <el-form-item label="商户电话" class="form_right25">
                    <el-input 
                        v-model="areaStatisForm.phone" 
                        placeholder="商户电话" 
                        clearable  
                        size="small"
                        @keyup.enter.native="onBtnSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="姓名" class="form_right25">
                    <el-input 
                        v-model="areaStatisForm.name" 
                        placeholder="商户姓名" 
                        clearable  
                        size="small"
                        @keyup.enter.native="onBtnSearch"
                    ></el-input>
                </el-form-item>
                <el-form-item label="开始时间" class="form_right25">
                      <el-date-picker
                        v-model="areaStatisForm.startTime"
                        size="small"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择开始时间"
                        @keyup.enter.native="onBtnSearch"
                    >
                      </el-date-picker>
                </el-form-item>

                  <el-form-item label="结束时间" class="form_right25">
                      <el-date-picker
                        v-model="areaStatisForm.endTime"
                        size="small"
                        type="date"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        placeholder="选择结束时间"
                        @keyup.enter.native="onBtnSearch"
                     >
                      </el-date-picker>
                 </el-form-item>

                <el-form-item class="form_margin0 content_btn">
                     <el-button type="primary" size="small" @click="onBtnSearch" icon="el-icon-search">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>

        <el-card class="box-card">
            <el-table
                :data="tableData"
                :summary-method="getSummaries" 
                :show-summary="true"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
            >
                

                <el-table-column
                    prop="createTime"
                    label="时间"
                    min-width="130"
                >
                </el-table-column>

                <el-table-column
                    prop="areaname"
                    label="小区名称"
                    min-width="130"
                >
                    <template slot-scope="scope">
                        {{scope.row.areaname && scope.row.areaname.length >0 ? scope.row.areaname : '— —'}}
                    </template>
                </el-table-column>

                <el-table-column
                    label="小区地址"
                    min-width="240"
                >
                    <template slot-scope="scope">
                        {{ (scope.row.addresspath || '') + (scope.row.address || '')  }}
                    </template>
                </el-table-column>

                <el-table-column
                    prop="username"
                    label="所属商户"
                    min-width="100"
                >
                    <template slot-scope="scope">
                        {{scope.row.username && scope.row.username.length >0 ? scope.row.username : '— —'}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="phone"
                    label="商户电话"
                    min-width="120"
                >
                    <template slot-scope="scope">
                        {{scope.row.phone && scope.row.phone.length >0 ? scope.row.phone : '— —'}}
                    </template>
                </el-table-column>

                <el-table-column
                    prop="onlineIncome"
                    label="在线收益"
                    min-width="120"
                >
                </el-table-column>

                <el-table-column
                    prop="walletIncome"
                    label="钱包收益"
                    min-width="120"
                >
                </el-table-column>

                <el-table-column
                    prop="equIncome"
                    label="设备收益"
                    min-width="120"
                >
                </el-table-column>

                <el-table-column
                    prop="cardIncome"
                    label="卡收益"
                    min-width="120"
                >
                </el-table-column>

                <el-table-column
                    prop="consumemoney"
                    label="消费金额"
                    min-width="120"
                >
                </el-table-column>
            </el-table>
        </el-card>
        <my-pagination 
            :totalPage="totalPage" 
            @getPage="getPage" 
            :nowPage="areaStatisForm.currentPage" 
        />
    </div>
</template>

<script>
import { reactive,onMounted,ref, defineComponent, computed } from '@vue/composition-api'
import useRequestData from '@/hooks/use-request-data'
import { areaIncomeData } from '@/require/datastatis'
import MyPagination from '@/components/common/MyPagination'
import Util from '@/utils/util'
const columsMapData = {
    '在线收益':  'onlineIncome',
    '钱包收益':  'walletIncome',
    '设备收益':  'equIncome',
    '卡收益':  'cardIncome',
    '消费金额':  'consumemoney'
}
export default defineComponent({
    components: {
        MyPagination
    },
    setup (props, {root}) {
        // 初始化数据
        const [startTime, endTime] = Util.formatTimeArr('YYYY-MM-DD')
        const initParam = { usage: 1, currentPage: 1, startTime, endTime, ...root._route.query }
        const { 
            formModel: areaStatisForm, // 搜索form
            loading, // 是否显示加载动画
            info, // 请求的结果
            onBtnSearch, // 搜索回调函数
            getPage // page页面改变的回调函数
        } = useRequestData(areaIncomeData, initParam, root._router)
        const tableData = computed(() => {
            return info.value ? info.value.result : []
        })
        const totalPage = computed(() => {
            return info.value ? info.value.tatolcount : 1
        })

        // 汇总数据
        const getSummaries = (params) => {
            if (!info.value) return []
            return params.columns.map(({ label }, index) => {
                if (index === 0) {
                    return '汇总'
                }
                const key = columsMapData[label]
                if (key !== void 0) {
                    return info.value.resultTotal[key]
                } else {
                    return 'N/A'
                }
                
            })
        }

        return {
            areaStatisForm,
            onBtnSearch,
            tableData,
            loading,
            totalPage, // 总页数
            getPage,
            getSummaries
        }
    }
})
</script>