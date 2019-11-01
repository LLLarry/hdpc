<template>
    <span class="temMulDevice">
        <el-button type="primary" size="mini" @click="handleMulMoreDevice">此模板复用更多设备</el-button>
        <el-dialog title="选中设备使用此模板" :visible.sync="dialogTableVisible" width="40%" center custom-class="temMulDialog">
            <div class="tableContent">
                <el-table :data="gridData" @selection-change="handleSelectionChange">
                    <el-table-column type="selection"  width="55"> </el-table-column>
                    <el-table-column property="code" label="设备号" min-width="130"></el-table-column>
                    <el-table-column property="remark" label="设备名称" min-width="150">
                        <template slot-scope="{row}">
                            <span v-if="row.remark && row.remark.length > 0">{{row.remark}}</span>
                            <span v-else>— —</span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogTableVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="handleCommitdevice" size="small">确 定</el-button>
            </div>
         </el-dialog>
    </span>
</template>

<script>
export default {
    data(){
        return {
            dialogTableVisible: false,
            selectList: [], //选中的数组
             gridData: [
                    {
                    code: '000001',
                    remark: '十路智慧款0001'
                    }, {
                    code: '000002',
                    remark: ''
                    }, {
                    code: '000003',
                    remark: '回忆小区设备'
                    }, {
                    code: '000004',
                    remark: '测试设备'
                    },
                    {
                    code: '000004',
                    remark: '测试设备'
                    },
                    {
                    code: '000001',
                    remark: '十路智慧款0001'
                    }, {
                    code: '000002',
                    remark: ''
                    }, {
                    code: '000003',
                    remark: '回忆小区设备'
                    }, {
                    code: '000004',
                    remark: '测试设备'
                    },
                    {
                    code: '000004',
                    remark: '测试设备'
                    },
                    {
                    code: '000001',
                    remark: '十路智慧款0001'
                    }, {
                    code: '000002',
                    remark: ''
                    }, {
                    code: '000003',
                    remark: '回忆小区设备'
                    }, {
                    code: '000004',
                    remark: '测试设备'
                    },
                    {
                    code: '000004',
                    remark: '测试设备'
                    },
                ],
            
        }
    },
    methods: {
        handleMulMoreDevice(){
            this.dialogTableVisible= true
        },
        handleSelectionChange(val){
            let arr=[]
            val.forEach((item,i)=>{
                arr.push(item.code)
            })
            console.log(arr)
             this.selectList = arr;
        },
        handleCommitdevice(){
            // 发送ajax
            this.dialogTableVisible= false
        }
    }
}
</script>

<style lang="less">
.temMulDevice {
    .temMulDialog {
         min-width: 400px;
        .tableContent {
            max-height: 60vh;
            overflow: auto;
            &::-webkit-scrollbar-track-piece {
            background: #f7f7f7;
            }

            &::-webkit-scrollbar {
            width: 6px;
            }

            &::-webkit-scrollbar-thumb {
            background: #D9DCE1;
            border-radius: 20px;
            }
        }
    }
}
    
</style>