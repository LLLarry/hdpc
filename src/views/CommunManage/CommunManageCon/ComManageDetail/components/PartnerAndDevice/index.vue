<template>
  <div class="partnerAndDevice">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>小区合伙人、设备</span>
            </div>
            <el-row>
                <el-col :xs="24" :sm="12" class="col_right_p_10">
                    <el-table
                        border
                        :data="partList"
                        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                    >
                        <el-table-column 
                            label="姓名"
                            prop="name"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <div v-show="!row.edit">{{row.name}}</div>
                                <el-input v-show="row.edit" v-model="row.name" size="mini"  disabled/>
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="电话"
                            prop="phone"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <div v-show="!row.edit">{{row.phone}}</div>
                                <el-input v-show="row.edit" v-model="row.phone" size="mini" placeholder="请输入合伙人手机号" />
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="分成比"
                            prop="rate"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <el-input v-if="row.edit || row.modify" v-model="row.rate" size="mini" placeholder="请输入分成比" />
                                <el-button  v-else type="primary" icon="el-icon-edit" size="mini" plain @click="handleEditRate(row)">{{row.rate}}</el-button>
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="操作"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <el-button v-show="!row.edit && !row.modify" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                                <div v-show="row.edit">
                                    <el-button type="success" size="mini" @click="handleAddSave(1)">保存</el-button>
                                    <el-button type="warning" size="mini" @click="handleAddCancel(1)">取消</el-button>
                                </div>
                                <div v-show="row.modify">
                                    <el-button type="success" size="mini" @click="handleEditSave(row)">保存</el-button>
                                    <el-button type="warning" size="mini" @click="handleEditCancel(row)">取消</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="add_parAndDevice">
                        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addParOrDevice(1)" :disabled="partList[partList.length-1].edit">添加合伙人</el-button>
                    </div>
                </el-col>
                <el-col :xs="24" :sm="12" class="col_left_p_10">
                    <el-table
                        border
                        :data="deviceList"
                        :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                    >
                        <el-table-column 
                            label="设备号"
                            prop="code"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <div v-show="!row.edit">{{row.code}}</div>
                                <el-input v-show="row.edit" v-model="row.code" size="mini" placeholder="请输入设备号" />
                            </template>
                        </el-table-column>
                        <el-table-column 
                            label="设备名"
                            prop="remark"
                            min-width="80"
                        ></el-table-column>
                        <el-table-column 
                            label="状态"
                            prop="status"
                            min-width="80"
                        ></el-table-column>
                        <el-table-column 
                            label="操作"
                            min-width="80"
                        >
                            <template slot-scope="{row}">
                                <el-button v-show="!row.edit" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                                <div v-show="row.edit">
                                    <el-button type="success" size="mini">保存</el-button>
                                    <el-button type="warning" size="mini">取消</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <div class="add_parAndDevice">
                        <el-button type="primary" icon="el-icon-plus" size="mini" @click="addParOrDevice(2)" :disabled="deviceList[deviceList.length-1].edit">添加设备</el-button>
                    </div>
                </el-col>
            </el-row>
        </el-card>
  </div>
</template>

<script>
let copyPartList= []
let copeDeviceList= []
export default {
    data(){
        return {
            partList: [
                {
                    name: '测试张',
                    phone: '15532312336',
                    rate: '15%'
                },
                 {
                    name: '测试张',
                    phone: '15532312336',
                    rate: '15%'
                },
                {
                    name: '测试张',
                    phone: '15532312336',
                    rate: '15%'
                },
            ],
            deviceList: [
                {
                    code:'000001',
                    remark:'凤凰城01',
                    status:'在线',
                },
                {
                    code:'000001',
                    remark:'凤凰城01',
                    status:'在线',
                },
                {
                    code:'000001',
                    remark:'凤凰城01',
                    status:'在线',
                },
            ]
        }
    },
    methods: {
        addParOrDevice(from){ //点击添加合伙人/设备
            let list= from === 1 ?  this.partList : this.deviceList
            let type= from === 1 ?  'partList' : 'deviceList'
            // this.$set(this,type,[...list,{edit:true}])
            list.push({edit:true})
        },
        handleAddSave(from){ //点击保存合伙人/设备

        },
        handleAddCancel(from){ //点击取消保存合伙人/设备
            let list= from === 1 ?  this.partList : this.deviceList
            let type= from === 1 ?  'partList' : 'deviceList'
            list.splice(list.length-1,1)
        },
        handleEditRate(row){ //点击编辑合伙人分成
            this.$set(row,'modify',true)
        },
        handleEditSave(row){ //保存合伙人分成
            console.log(row.rate)
            this.$set(row,'modify',false)
        },
        handleEditCancel(row){ //取消修改合伙人分成
            //重新像后台获取 
            this.$set(row,'modify',false)
        }
    },
    watch:{
       partList: {
           handler(list){
               let lastRow= list[list.length-1]
               if(lastRow.edit){ //最后一行为正在编辑
                    let { phone,rate }= lastRow
                    console.log(phone,rate )
               }
           },
           deep: true
       },
       deviceList: {
           handler(list){
               let lastRow= list[list.length-1]
               if(lastRow.edit){ //最后一行为正在编辑
                    let { code }= lastRow
                    console.log(code)
               }
           },
           deep: true
       }
    }
};
</script>

<style lang="less">
.partnerAndDevice {
    .col_right_p_10 {
        padding-right: 10px;
    }
    .col_left_p_10 {
        padding-left: 10px;
    }
    .add_parAndDevice {
        text-align: center;
        padding-top: 15px;
        button {
            min-width: 120px;
        }
    }
}

</style>