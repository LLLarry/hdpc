<template>
    <div class="topInfo">
        <el-card>
            <div class="clearfix item_c">
                <div class="item">
                    小区名称：
                    <el-button v-show="!editAreaName" type="primary" size="mini" icon="el-icon-edit" @click="handleEditName(1)">测试小区</el-button>
                    <div v-show="editAreaName" class="editCon">
                        <el-input placeholder="请输入小区名称" size="mini" v-model="topInfoForm.name" style="width: 50%;" ></el-input>
                        <el-button type="success" size="mini">保存</el-button>
                        <el-button type="warning" size="mini" @click="handleCloseEditName(1)">取消</el-button>
                    </div>
                </div>
                <div class="item">
                    所属商户：
                    <router-link to="">
                        <el-link type="primary">测试商户</el-link>
                    </router-link>
                </div>
                <div class="item">
                    商户电话：
                    <router-link to="">
                        <el-link type="primary">1553623236</el-link>
                    </router-link>
                </div>
                <div class="item">
                    会员数：
                    <router-link to="">
                        <el-link type="primary">50</el-link>
                    </router-link>
                </div>
                <div class="item">
                    在线卡数：
                    <router-link to="">
                        <el-link type="primary">50</el-link>
                    </router-link>
                </div>
                 <div class="item">
                    设备数：
                    <router-link to="">
                        <el-link type="primary">50</el-link>
                    </router-link>
                </div>
                <div class="item">
                    小区地址:
                    <div class="editCon" v-show="!editAreaAddr">
                        <div class="testAddress">
                            <span>测试地址测试地址测试地址测试地址测试地址测试地址测试地址测试地址测试地址测试地址测试地址测试地址</span>
                        </div>
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEditName(2)"></el-button>
                    </div>
                    <div class="editCon" v-show="editAreaAddr">
                        <el-input placeholder="请输入小区地址" size="mini" v-model="topInfoForm.name" style="width: 50%;" ></el-input>
                        <el-button type="success" size="mini">保存</el-button>
                        <el-button type="warning" size="mini" @click="handleCloseEditName(2)">取消</el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    data(){
        return {
            editAreaName: false, //编辑小区名称
            editAreaAddr: false, //编辑小区名称
            topInfoForm: {}
        }
    },
    methods: {
        handleEditName(from){ //from 1名称 2地址 编辑名称
            switch(from){
                case 1 : 
                    this.editAreaName= true 
                break
                case 2 : 
                    this.editAreaAddr= true 
                break
            }
            
        },
        handleCloseEditName(from){ //关闭修改
            switch(from){
                case 1 : 
                    this.editAreaName= false 
                break
                case 2 : 
                    this.editAreaAddr= false 
                break
            }
        }
    }
}
</script>

<style lang="less">
.topInfo {
    .editCon {
        display: inline-block;
    }
    .item_c {
        display: flex;
        align-items: center;
        margin-right: -20px;
        flex-wrap: wrap;
        margin-bottom: -10px;
        .item {
            font-size: 14px !important;
            margin-right: 20px;
            height: 100%;
            margin-bottom: 10px;
        }
    }
   .testAddress {
       display: inline-block;
       max-width: 300px;
       overflow: hidden;
       white-space: nowrap;
       text-overflow: ellipsis;
       vertical-align: text-bottom;
       span {
           font-size: 14px;
       }
   }
}
</style>