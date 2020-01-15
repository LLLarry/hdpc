<template>
  <div class="agentManageDetailDetail">

         <el-card class="box-card">
            <span style="margin-bottom: 15px;"><span style="color: #67C23A;">{{username}}</span> 代理商详情</span>
            <el-button style="float: right; margin-bottom: 15px;" type="primary" size="small" icon="el-icon-plus">绑定商户</el-button>

            <el-table
                :data="tableData"
                border
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="serialNum"
                label="序号"
                min-width="70"
                fixed
                >
                <template slot-scope="scope">
                     {{scope.$index + 1}}
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="昵称"
                min-width="130"
                fixed
                >
                <template slot-scope="scope">
                     {{scope.row.username && scope.row.username.length >0 ? scope.row.username : '— —'}}
                </template>
                </el-table-column>
                <el-table-column
                prop="realname"
                label="姓名"
                min-width="100"
                >
                 <template slot-scope="scope">
                     {{scope.row.realname && scope.row.realname.length >0 ? scope.row.realname : '— —'}}
                </template>
                 </el-table-column>
                <el-table-column
                prop="phone_num"
                label="电话"
                min-width="120"
                >
                </el-table-column>

                <el-table-column
                prop="earntotal"
                label="总收益"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="earnings"
                label="未提现"
                min-width="120">
                </el-table-column>

                 <el-table-column
                prop="totalline"
                label="设备数量"
                min-width="100">
                    <template slot-scope="scope">
                        <router-link :to="`/deviceManage/deviceList?phone=${scope.row.phone_num}`">
                            <el-link type="primary">{{scope.row.totalline}}</el-link>
                        </router-link>
                    </template>
                </el-table-column>
                 <el-table-column
                prop="onlines"
                label="在线数量"
                min-width="100">
                    <template slot-scope="scope">
                        <router-link :to="`/deviceManage/deviceList?phone=${scope.row.phone_num}&line=1`">
                             <el-link type="primary">{{scope.row.onlines}}</el-link>
                        </router-link>
                    </template>
                </el-table-column>

                 <el-table-column
                prop="date"
                label="注册时间"
                min-width="170">
                <template slot-scope="scope">
                    {{ scope.row.create_time|fmtDate}}
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="120"
                >
                <template slot-scope="{row}">
                    <el-button type="danger" size="mini" plain icon="el-icon-delete">解绑商户</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-card>
  </div>
</template>

<script>
import { selectAgentUnderMer } from '@/require/userManage'
export default {
    data(){
        return {
            agentManageDetailInfo: {},
            loading: false,
            tableData: [], //每条数据
            agentId: '', //代理商ID
            username: '' //商户名称
        }
    },
    created(){
       let {id: agentId,username}= this.$route.query
       this.agentId= agentId
       this.username= username
       this.asyGetSelectAgentUnderMerUnderMer({agentId})
    },
     methods: {
        async asyGetSelectAgentUnderMerUnderMer(data){
            let _this= this
            try{
                _this.loading= true
                let handleInfo=  await selectAgentUnderMer(data)
                _this.loading= false
                if(handleInfo.code === 200){
                    _this.tableData= handleInfo.result
                }
                
            }catch(error){
                 if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                     _this.loading= false
            }
        },
        
    }
}
</script>