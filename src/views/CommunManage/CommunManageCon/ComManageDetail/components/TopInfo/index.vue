<template>
    <div class="topInfo">
        <el-card>
            <div class="clearfix item_c">
                <div class="item">
                    小区名称：
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEditNameAndAddress">{{name ? name : '— —'}}</el-button>
                    
                </div>
                <div class="item">
                    所属商户：
                    <router-link :to="`/usermanage/merInfo?phone=${dealphon}`">
                        <el-link type="primary">{{dealnick}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    商户电话：
                    <router-link :to="`/usermanage/merInfo?phone=${dealphon}`">
                        <el-link type="primary">{{dealphon}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    设备数：
                    <router-link :to="`/deviceManage/deviceList?phone=${dealphon}&areaname=${name}`">
                        <el-link type="primary">{{devicenum}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    会员数：
                    <router-link :to="`/usermanage/userInfo?mobile=${dealphon}&areaname=${name}&condition=2`">
                        <el-link type="primary">{{areausernum}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    在线卡数：
                    <router-link :to="`/iccardManage/onlineCardQuery?areaname=${name}&phone=${dealphon}`">
                        <el-link type="primary">{{onlinenum}}</el-link>
                    </router-link>
                </div>
                <div class="item">
                    钱包¥（充/赠）：
                    <el-link type="success" :underline="false" >{{utopupbalance.toFixed(2)}}</el-link> / <el-link type="success" :underline="false" >{{usendmoney.toFixed(2)}}</el-link>
                </div>
                <div class="item">
                    在线卡¥（充/赠）：
                    <el-link type="success" :underline="false" >{{ctopupbalance.toFixed(2)}}</el-link> / <el-link type="success" :underline="false" >{{csendmoney.toFixed(2)}}</el-link>
                </div>
                <div class="item">
                    小区地址:
                    <div class="editCon">
                        <div class="testAddress">
                            <span>{{areaAddress}}</span>
                        </div>
                        <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleEditNameAndAddress"></el-button>
                    </div>
                </div>
            </div>
        </el-card>

        <!-- 修改小区地址弹框开始 -->
        <!-- :handleClose="handleClose" -->
        <DialogWrapper 
                title="修改小区信息"
                :dialogVisible="dialogVisible"
                width="500px"
                :handleSubmit="handleSubmit"
                :handleCancen="handleCancen"
                :handleClose="handleClose"
            >
             <el-form label-position="left" label-width="150px" :model="areaInfoForm" :rules="rules" ref="areaInfoForm">
                <el-form-item label="小区名称" prop="name">
                    <el-input v-model="areaInfoForm.name"></el-input>
                </el-form-item>
                <el-form-item label="省份" prop="province">
                    <el-select v-model="areaInfoForm.province" placeholder="请选择省份" clearable style="width: 100%;">
                        <el-option
                        v-for="item in this.cityContent.lv1"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="市" prop="city">
                    <el-select v-model="areaInfoForm.city" placeholder="请选择市" clearable style="width: 100%;">
                        <el-option
                        v-for="item in this.cityContent.lv2"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区/县" prop="county">
                    <el-select v-model="areaInfoForm.county" placeholder="请选择区/县" clearable style="width: 100%;">
                        <el-option
                        v-for="item in this.cityContent.lv3"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <!-- <el-form-item label="省份/市/县（区）" prop="address">
                    <el-cascader
                        v-model="areaInfoForm.selectCity"
                        :options="options"
                        style="width: 100%;"
                        @change="selectChange"
                        ref="cascaderEle"
                       >
                    </el-cascader>
                </el-form-item> -->
                <el-form-item label="详细地址">
                    <el-input v-model="areaInfoForm.street"></el-input>
                </el-form-item>
            </el-form>
        </DialogWrapper>
        <!-- 修改小区地址弹框结束 -->
    </div>
</template>

<script>
import DialogWrapper from '@/components/DialogWrapper'
import { editAreaInfo,editAreaInfoAndName } from '@/require/communManage'
import { messageTip } from '@/utils/ele'
 // 引入城市选择器构造函数
import { SelectCity } from '@/vendor/selectCity'
const selectCity= new SelectCity()
export default {
    props: {
        aid: {
            type: [String,Number]
        },
        name:{
            type: String,
            default: ''
        },
        address: {
            type: Object
        },
        dealnick: {
            type: String,
            default: '— —'
        },
        dealphon:{
            type: String,
            default: '— —'
        },
        areausernum: {
            type: Number,
            default: 0
        },
        onlinenum: {
            type: Number,
            default: 0
        },
        devicenum: {
            type: Number,
            default: 0
        },
        csendmoney: {
            type: Number,
            default: 0
        },
         ctopupbalance: {
            type: Number,
            default: 0
        },
         usendmoney: {
            type: Number,
            default: 0
        },
         utopupbalance: {
            type: Number,
            default: 0
        }
    },
    data(){
        // 校验地址
        var checkAddress= (rule, value, callback)=>{
            if(!this.areaInfoForm.selectCity[0]){
                return  callback(new Error('请选择省'))
            }
            if(!this.areaInfoForm.selectCity[1]){
                return  callback(new Error('请选择市'))
            }
            if(!this.areaInfoForm.selectCity[2]){
                return  callback(new Error('请选择县/区'))
            }
            callback();
        }
        return {
            editAreaName: false, //编辑小区名称
            editAreaAddr: false, //编辑小区名称
            dialogVisible:  false, //修改小区信息弹框
            areaAddress: "",//省市区字符串拼接地址
            // options: data,
            areaInfoForm: {
                name: "",
                street: ""
            }, //小区信息容器
            cityContent:{
                lv1: [], //省级
                lv2: [], //市级
                lv3: [] //县/区级
            },
            rules: {
                name: [
                    { required: true, message: '请输入小区名称', trigger: 'blur' },
                ],
                address: [
                    { required: true, message: '请输入小区地址', trigger: 'change',validator: checkAddress },
                ]
            },
            init: true
        }
    },
    created(){
        this.handleGetCityListById(1,-1)
    },
    watch:{
        'areaInfoForm.province': {
            handler(id,oldId){
                // 当id没有改变
                if(oldId === id || this.init) return
                // 只有id存在时，才进行请求，获取列表
                if(id !== void 0 && id !== null){
                    // 请求市级列表
                    this.handleGetCityListById(2,id)
                }
                this.$delete(this.areaInfoForm,'city')
                this.$delete(this.areaInfoForm,'county')
            }
        },
        'areaInfoForm.city': {
            handler(id,oldId){
                if(oldId === id || this.init) return
                // 只有id存在时，才进行请求，获取列表
                if(id !== void 0 && id !== null ){
                    // 请求县/区的列表
                    this.handleGetCityListById(3,id)
                }
                this.$delete(this.areaInfoForm,'county')
            }
        },
        'address': {
            handler(newAddress){
                
                let id= newAddress.county ? newAddress.county 
                : newAddress.city ? newAddress.city
                : newAddress.province ? newAddress.province
                : -1
                console.log(newAddress)
                const {lv1=[],lv2=[],lv3=[]}= selectCity.findChildCityById(id)
               
                this.areaAddress= this.fmtStr(lv1[1])+" "+this.fmtStr(lv2[1])+" "+this.fmtStr(lv3[1]) +" "+this.fmtStr(newAddress.street)
                this.areaInfoForm= {
                    name: this.name,
                    province: lv1[0],
                    city: lv2[0],
                    county: lv3[0],
                    street: newAddress.street
                }
               setTimeout(()=>{
                    const {list:list1} = selectCity.selectMenu({level:1})
                    this.cityContent.lv1= list1
                    if(newAddress.province){
                        const {list:list2} = selectCity.selectMenu({level:2,pid: newAddress.province })
                        this.cityContent.lv2= list2
                    }
                    if(newAddress.city){
                        const {list:list3} = selectCity.selectMenu({level:3,pid: newAddress.city})
                        this.cityContent.lv3= list3
                    }
                    this.init= false
               })
            }
        }
    },
    components:{
        DialogWrapper
    },
    methods: {
        handleEditNameAndAddress(){
            this.dialogVisible= true
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
        },
        selectChange(val){
            console.log(val)
        },
        handleSubmit(){
            this.$refs['areaInfoForm'].validate((valid) => {
                if (valid) {
                   if(!this.areaInfoForm.province || !this.areaInfoForm.city || !this.areaInfoForm.county){
                       return messageTip("warning","请填写完整信息")
                   }
                   this.asyncEditAreaInfoAndName({
                       aid:this.aid,
                       name: this.areaInfoForm.name,
                       province:  this.areaInfoForm.province,
                       city: this.areaInfoForm.city,
                       county: this.areaInfoForm.county,
                       street: this.areaInfoForm.street
                   })
                } else {
                    messageTip("warning","请填写完整信息")
                    return false;
                }
            });
        },
        handleCancen(){
            this.handleClose()
        },
        handleClose(){
            this.dialogVisible= false
        },
        async asyncEditAreaInfoAndName(data){
            try{
                let info=  await editAreaInfoAndName(data)
                if(info.code == 200){
                    this.$emit('handleEditAreaInfo',data)
                    messageTip("success","修改成功")
                }else{
                    messageTip("danger",info.message)
                }
            }catch(e){
                messageTip("danger","修改失败")
            }  
            this.handleClose()  
        },
        //格式化str
        fmtStr(str){
            return str == void 0 ? '' : str
        },
        // 通过id获取城市列表 获取的城市level等级，父id
        handleGetCityListById(level,pid){  
            pid= (pid === "" || pid === null) ? "-1" : pid
            const {list}= selectCity.selectMenu({ level, pid })
            this.cityContent['lv'+level]= list
            for(let i=level+1;i<=3;i++ ){
                 this.cityContent['lv'+i]= [] //每次设置之后都要清空下一项数据
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
        margin-right: -30px;
        flex-wrap: wrap;
        margin-bottom: -10px;
        .item {
            font-size: 14px !important;
            margin-right: 30px;
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