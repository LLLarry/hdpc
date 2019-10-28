<template>
    <div class="userOnlineCardInfo">
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
                prop="cardNum"
                label="卡号"
                min-width="100"
                >
                <template slot-scope="scope">
                    <router-link to="/datastatis/index">
                        <el-link type="primary" :underline="false">{{scope.row.cardNum}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="money"
                label="金额"
                min-width="100"
                >
                </el-table-column>
                <el-table-column
                prop="status"
                label="状态"
                min-width="100"
                >
                <template slot-scope="scope">
                     <el-link v-if="scope.row.status === 0" type="info" :underline="false">未激活</el-link>
                     <el-link v-if="scope.row.status === 1" type="success" :underline="false">正常</el-link>
                     <el-link v-if="scope.row.status === 2" type="danger" :underline="false">挂失</el-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="date"
                label="创建时间"
                min-width="150"
                >
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
// import {Card,Table,TableColumn,Link} from 'element-ui'
// import Vue from 'vue'
import MyPagination from '@/components/common/MyPagination'
// Vue.use(Card)
// Vue.use(Table)
// Vue.use(TableColumn)
// Vue.use(Link)
export default {
    data(){
        return{
            tableData: [
                {
                    index: 1,
                    cardNum: '42061111',
                    money: 13.74,
                    status: 0,
                    date: '2019-06-21 18:40:20'
                },
                {
                    index: 2,
                    cardNum: '42061111',
                    money: 13.74,
                    status: 1,
                    date: '2019-06-21 18:40:20'
                },
                {
                    index: 3,
                    cardNum: '42061111',
                    money: 13.74,
                    status: 2,
                    date: '2019-06-21 18:40:20'
                },
            ]
        }
    }
}
</script>

<style lang="less">
    .userOnlineCardInfo{
        .el-link {
            text-decoration: none;
        } 
    }
</style>