<template>
  <div class="chargeRecord">
    <el-card class="box-card card_bottom0 cardForm">
            <el-form :inline="true"  class="demo-form-inline" :model="chargeRecordForm" size="mini">
                <el-form-item label="订单号" class="form_right25 w220">
                    <el-input v-model="chargeRecordForm.ordernum" placeholder="订单号" clearable size="small"></el-input>
                </el-form-item>

                <el-form-item label="用户昵称" class="form_right25">
                    <el-input v-model="chargeRecordForm.usernick" placeholder="用户姓名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户昵称" class="form_right25">
                    <el-input v-model="chargeRecordForm.dealer" placeholder="商户昵称" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户姓名" class="form_right25">
                    <el-input v-model="chargeRecordForm.realname" placeholder="商户姓名" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="商户手机号" class="form_right25">
                    <el-input v-model="chargeRecordForm.mobile" placeholder="商户手机号" clearable size="small"></el-input>
                </el-form-item>
                <el-form-item label="设备号" class="form_right25">
                    <el-input v-model="chargeRecordForm.devicenum" placeholder="设备号" clearable size="small"></el-input>
                </el-form-item>

                <el-form-item label="订单状态" class="form_right25">
                     <el-select v-model="chargeRecordForm.orderstatus"  placeholder="订单状态" clearable size="small">
                        <el-option label="正常" value="0" ></el-option>
                        <el-option label="全额退款" value="1" ></el-option>
                        <el-option label="部分退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="支付方式" class="form_right25">
                     <el-select v-model="chargeRecordForm.paytype"  placeholder="支付方式" clearable size="small">
                        <el-option label="钱包" value="1" ></el-option>
                        <el-option label="微信" value="2" ></el-option>
                        <el-option label="支付宝" value="3" ></el-option>
                        <el-option label="包月" value="4" ></el-option>
                        <el-option label="银联" value="12" ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="结束原因" class="form_right25">
                     <el-select v-model="chargeRecordForm.resultinfo"  placeholder="结束原因" clearable size="small">
                        <el-option label="时间或者电量用完" value="0" ></el-option>
                        <el-option label="手动停止" value="1" ></el-option>
                        <el-option label="满电自停" value="2" ></el-option>
                        <el-option label="超功率自停" value="3" ></el-option>
                        <el-option label="远程断电" value="4" ></el-option>
                        <el-option label="刷卡断电" value="5" ></el-option>
                        <el-option label="设备离线" value="6" ></el-option>
                        <el-option label="余额不足" value="7" ></el-option>
                        <el-option label="被迫停止" value="11" ></el-option>
                        <el-option label="日志结束" value="255" ></el-option>
                        <el-option label="无" value="-1" ></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="开始时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="chargeRecordForm.startTime"
                        size="small"
                        type="datetime"
                        placeholder="选择开始时间"
                         :picker-options="pickerOptions"
                         value-format="yyyy-MM-dd HH:mm:ss"
                         clearable
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25 w200">
                     <el-date-picker
                        v-model="chargeRecordForm.endTime"
                        size="small"
                        type="datetime"
                        placeholder="选择结束时间"
                         :picker-options="pickerOptions"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        clearable
                        >
                      </el-date-picker>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn w260">
                    <el-button type="primary" size="small" @click="handleSearch" icon="el-icon-search">查询</el-button>
                    <el-button @click="export2Excel" size="small" type="primary">导出Excel</el-button>
                </el-form-item>
            </el-form>
         </el-card>

         <el-card class="box-card">
            <el-table
                :data="tableData"
                border
                fit
                v-loading="loading"
                style="width: 100%"
                :header-cell-style="{background:'#f5f7fa',color:'#666'}"
                >
                <el-table-column
                prop="index"
                label="序号"
                min-width="70"
                >
                 <template slot-scope="scope">
                     {{ (nowPage-1)*10+scope.$index+1 }}
                </template>
                </el-table-column>
                <el-table-column
                prop="ordernum"
                label="订单号"
                min-width="220"
                >
                <template slot-scope="scope">
                    <router-link :to="`/tradeRecord/tradeRecordCon/orderDetail?paysource=1&orderId=${scope.row.id}&status=${scope.row.status}&orderNum=${scope.row.ordernum}`">
                            <el-link type="primary">{{scope.row.ordernum}}</el-link>
                    </router-link>
                </template>
                </el-table-column>
                <el-table-column
                prop="username"
                label="用户名"
                min-width="80"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/userInfo?condition=0&memberId=${('00000000'+row.uid).substr(-8)}`" v-if="row.uid !== 0 && row.uid !== null">
                        <el-link type="primary">
                            {{row.username && row.username.length > 0 ? row.username : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.username && row.username.length > 0 ? row.username : '— —'}}</span>
                </template>
                </el-table-column>

                 <el-table-column
                prop="dealer"
                label="商户名"
                min-width="80"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/usermanage/merInfo?merid=${row.merchantid}`" v-if="row.merchantid !== 0 && row.merchantid !== null">
                        <el-link type="primary">
                            {{row.dealer && row.dealer.length > 0 ? row.dealer : '— —'}}
                        </el-link>  
                    </router-link>
                    <span v-else>{{row.dealer && row.dealer.length > 0 ? row.dealer : '— —'}}</span>
                </template>
                </el-table-column>

                 <el-table-column
                prop="equipmentnum"
                label="设备号-从机地址"
                min-width="100"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/deviceManage/deviceList?devicenum=${row.equipmentnum}`">
                        <el-link type="primary">{{row.equipmentnum}}</el-link>
                        <div v-if="row.addr"><el-link type="primary">({{row.addr}})</el-link></div>
                    </router-link>
                </template>
                </el-table-column>
                 <el-table-column
                prop="port"
                label="端口号"
                min-width="60"
                >
                </el-table-column>
                 <el-table-column
                prop="expenditure"
                label="消费额"
                min-width="60"
                >
                <template slot-scope="{row}">
                    {{row.expenditure != null ? row.expenditure.toFixed(2) : '— —'}}
                </template>
                </el-table-column>
                
                <el-table-column
                prop="status"
                label="订单状态"
                width="100"
                >
                 <template slot-scope="scope">
                    <el-link type="danger" :underline="false" v-if="scope.row.number==1">全额退款</el-link>
                    <div  v-else-if="scope.row.number==2">
                        <el-link type="warning" :underline="false">
                            部分退款 
                            <el-popover
                                placement="right"
                                width="260"
                                trigger="hover"
                                content="该退款已退到平台用户的充电钱包，查看方法 登陆公众号->充电中心->个人中心">
                                <span  slot="reference" class="el-icon-warning-outline" style="font-size: 18px;"></span>
                            </el-popover>
                        </el-link>
                        （<el-link type="danger" :underline="false">{{ typeof (scope.row.refund_money) == 'number' ? scope.row.refund_money.toFixed(2) : '0.00'}}</el-link>）
                    </div>
                    <el-link type="success" :underline="false" v-else>正常</el-link>
                    
                </template>
                </el-table-column>
                <el-table-column
                prop="payType"
                label="支付方式"
                min-width="85"
                >
                <template slot-scope="{row}">
                    {{row.paytype == 1 ? "钱包" : row.paytype == 2 ? "微信" : row.paytype == 3 ? "支付宝": row.paytype == 4 ? "包月下发数据" : row.paytype == 5 ? "投币" : row.paytype == 6 ? "刷卡" : row.paytype == 7 ? "刷卡" : row.paytype == 8 ? "支付宝小程序" : row.paytype == 12 ? "银联" : "— —"}}
                    <el-popover
                        v-if="row.paytype == 6 || row.paytype == 7"
                        placement="right"
                        width="200"
                        trigger="hover"
                        @show="handleGetInfo(row)"
                        @hode="handleHide"
                        >
                        <div>
                            <div v-show="!cardShowInfo">刷卡包含在线卡和离线卡</div>
                            <div v-show="cardShowInfo">
                                <div>卡号： {{cardShowInfo && cardShowInfo.cardid}}</div>
                                <div>充电类型：{{cardShowInfo && cardShowInfo.typeStr}}</div>
                            </div>
                        </div>
                        <span  slot="reference" class="el-icon-warning-outline" style="font-size: 18px;"></span>
                    </el-popover>
                </template>
                </el-table-column>
                <el-table-column
                prop="chargeInfo"
                label="充电信息"
                min-width="80"
                >
                <template slot-scope="scope">
                    <div>{{scope.row.consume_quantity/100}}度</div>
                    <div>{{scope.row.consume_time}}分钟</div>
                </template>
                </el-table-column>
                 <el-table-column
                prop="isConCharge"
                label="是否续充"
                min-width="65"
                >
                <template slot-scope="scope">
                    <router-link v-if="scope.row.ifcontinue != null" to="/tradeRecord/chargeRecord">
                         <el-link type="primary">是</el-link>
                    </router-link>
                    <span v-else>否</span>
                </template>
                </el-table-column>
                <el-table-column
                prop="begintime"
                label="开始时间"
                min-width="100"
                >
                <template slot-scope="scope">
                    <div>{{ scope.row.begintime | fmtDate}}</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="endtime"
                label="结束时间"
                min-width="100"
                >
                <template slot-scope="scope">
                    <div>{{ scope.row.endtime | fmtDate}}</div>
                </template>
                </el-table-column>

                <el-table-column
                prop="endFrom"
                label="结束原因"
                min-width="100"
                >
                <template slot-scope="{row}">
                   {{row.resultinfo==0?" 充电完成":row.resultinfo==1?"空载断电":row.resultinfo==2?"充满":
					    row.resultinfo==3?"超功率自停":row.resultinfo==4?"远程断电" :row.resultinfo==5?"刷卡断电" :row.resultinfo==6?"设备离线" :row.resultinfo==7?"余额不足" :row.resultinfo==11?"被迫停止":row.resultinfo==255?"日志结束":"无"}}
                </template>
                </el-table-column>

                <el-table-column
                prop="refDate"
                label="退款时间"
                min-width="100"
                >
                <template slot-scope="scope">
                   <div>{{ scope.row.refund_time | fmtDate}}</div>
                </template>
                </el-table-column>
                <el-table-column
                prop="handle"
                label="操作"
                min-width="148"
                fixed="right"
                >
                <template slot-scope="{row}">
                    <router-link :to="`/tradeRecord/chargeRecord/chargeRecordDetail?orderid=${row.id}`"  style="color: #fff;margin-right: 10px;">
                        <el-button type="primary" size="mini">详情</el-button>
                    </router-link>
                    <el-button type="danger" size="mini" v-if="row.number==0 && row.paytype != 7" @click="handleRef(row)">退款</el-button>
                    <el-button type="warning" size="mini" v-else-if="row.number==2 && row.paytype != 7"  @click="handleRef(row)">撤回</el-button>
                    <el-button type="danger" size="mini" plain disabled v-else >退款</el-button>
                </template>
                </el-table-column>  
            </el-table>
         </el-card>
          <MyPagination :totalPage="totalPage" @getPage="getPage" :nowPage="nowPage" />

           <el-dialog
            title="请输入右边的验证码"
            :visible.sync="dialogVisible"
            width="400px"
            :before-close="handleClose">
            <el-row>
                <el-col :span="16">
                     <el-input placeholder="请输入验证码" v-model="userVerifiCode"></el-input>
                </el-col>
                <el-col :span="7" :offset="1" >
                    <VerifiCode @backCode= "backCode" ref="verifi"/>
                </el-col>
            </el-row>
            <p style="color: red; margin-top: 5px;" v-show="tipText">验证码不正确</p>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false;userVerifiCode= '';tipText= false; $refs.verifi.initCode()" size="small">取 消</el-button>
                <el-button type="primary" @click="confirmVerifiCode" size="small">确 定</el-button>
            </span>
        </el-dialog>
  </div>
</template>

<script>
import MyPagination from '@/components/common/MyPagination'
import dateTimeJS from '@/utils/dateTime'
import configDisabledDate from '@/utils/configDisabledDate'
import { getChargeRecord,withdrawEntrance,tradeRefEntrance,getWolfchargeInfo } from '@/require/tradeRecord'
import Util from '@/utils/util'
import VerifiCode from '@/components/common/VerifiCode'
import { alertPassword,messageTip,confirDelete} from '@/utils/ele'
import { mapState } from 'vuex'
import Excel from '@/utils/excel'
export default {
    data(){
        return{
            pickerOptions: dateTimeJS, //配置日期快捷项
            chargeRecordForm:{},
            tableData: [],
            totalPage: 1,
            nowPage: 1,
            loading: false,
            dialogVisible: false,
            verifiCode: '', //验证码
            userVerifiCode: '', //用户输入的验证码
            tipText: false,
            row: {}, //这里是点击退费/撤回所存的订单一列信息，为了退费的时候使用他
            loading_obj: null, //全局loading实例
            cardShowInfo: null //刷卡提示信息
        }
    },
    components: {
        MyPagination,
        VerifiCode
    },
    computed: {
        ...mapState(['userInfo'])
    },
    created(){
        let {VNK,...routerKey}=  this.$route.query
        if(JSON.stringify(routerKey) != "{}"){
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',0.5)
            this.chargeRecordForm= {...this.$route.query,endTime} //将endTime放在这里是查询实时的订单
            this.nowPage= parseInt(this.chargeRecordForm.currentPage) || 1
        }else{ //直接点击进来的
            let [startTime,endTime]= Util.formatTimeArr('YYYY-MM-DD HH:mm:ss',0.5)
            this.chargeRecordForm= {startTime,endTime}
        }
       this.asyGetChargeRecord(this.chargeRecordForm)
    },
    beforeDestroy(){
        // 销毁之前，有this.loading_obj的时候关闭
        this.loading_obj && this.loading_obj.close()
    },
    deactivated(){
        this.loading_obj && this.loading_obj.close()
    },
    methods: {
        getPage(page){
            let VNK= this.$route.query.VNK
            this.chargeRecordForm= {...this.chargeRecordForm,currentPage:page,VNK}
            this.$router.push({query: this.chargeRecordForm,VNK})
            this.asyGetChargeRecord(this.chargeRecordForm)
            this.nowPage = page
        },
        async asyGetChargeRecord(data){
            let _this= this
            try{
                 _this.loading= true
                let chargeInfo= await getChargeRecord(data)
                 _this.loading= false
                 if(chargeInfo.code === 200){
                    _this.tableData = chargeInfo.listdata
                    _this.totalPage = chargeInfo.totalRows
                 }
            }catch(error){
                if(error == '拦截请求'){ 
                    _this.loading= true
                    return 
                   }
                    _this.loading= false
            }
        },
        handleRef(row){ //处理退费
            this.row= row
            if(this.userInfo.classify === 'superAdmin' ){ //超级管理员
                alertPassword(()=>{
                    this.handleRefAndWidth(3)
                })
            }else{ //普通管理员
                let utype= 2 //普通管理员
                 this.dialogVisible = true
            }

            
        },
        handleClose(){ //点击管理验证码框
            this.userVerifiCode= ''
            this.dialogVisible = false
            this.$refs.verifi.initCode()
        },
        backCode(verifiCode){ //普通管理员验证码回调
            this.verifiCode= verifiCode
        },
        confirmVerifiCode(){ //点击提交，验证验证码
            let userVerifiCode=  this.userVerifiCode.toLowerCase()
            let verifiCode=  this.verifiCode.toLowerCase()
            if(userVerifiCode != verifiCode){
                this.tipText= true
            }else{
                this.tipText= false
                this.dialogVisible= false
                // 发送请求请求
                this.handleRefAndWidth(2)
                this.userVerifiCode= ''
            }
            this.$refs.verifi.initCode()
        },
        handleRefAndWidth(utype){ //处理退费或 撤回 逻辑
            //utype= 3超级管理员  2普通管理员
                    if(this.row.number == 0){ //全额退款
                        let url =  this.row.paytype == 1 ? '/wxpay/doWalletReturn' : this.row.paytype == 2 ? '/wxpay/doRefund' : [3,8].includes(this.row.paytype) ? '/alipay/aliDoRefund' : [12].includes(this.row.paytype) ? '/unionpay/doRefund' : ''
                        let data= {
                            id: this.row.id,
                            refundState : 1,
                            pwd: '',
                            utype: utype
                        }
                        tradeRefEntrance({url,data}).then(res=>{
                            if(res.ok== 'ok'){
                                messageTip('success','退款成功')
                                this.asyGetChargeRecord(this.chargeRecordForm)
                            }else{
                                res.message= res.message || '退款失败'
                                messageTip('error',res.message)
                            }
                        }).catch(error=>{})
                    
                    }else if(this.row.number == 2){ //撤回退款
                        withdrawEntrance({id: this.row.id}).then(res=>{
                            if(res.ok === 'ok'){
                                messageTip('success','撤回成功')
                                this.asyGetChargeRecord(this.chargeRecordForm)
                            }else{
                                res.message= res.message || '撤回失败'
                                messageTip('error',res.message)
                            }
                        }).catch(error=>{})
                    
                    }
        },
        handleSearch(){
            let VNK= this.$route.query.VNK
            this.$router.push({query:{... this.chargeRecordForm,currentPage: 1,VNK}})
            this.asyGetChargeRecord({... this.chargeRecordForm,currentPage: 1})
            this.nowPage= 1 //搜索完之后将nowPage置为1
        },
        async handleGetInfo(row){ //鼠标移动到刷卡上面时显示刷卡数据
        console.log(row)
            try{
                let info= await getWolfchargeInfo({ordernum: row.ordernum})
                if(info.wolfcode == 1000){
                    let { cardid,type }= info
                    let typeStr= type == 1 ? '充满自停' : '正常'
                    this.cardShowInfo= {
                        cardid,
                        typeStr
                    }
                }else{

                }
            }catch(e){

            }
        },
        handleHide(){//隐藏刷卡提示
            this.cardShowInfo= null
        },
        export2Excel() {
             let {startTime,endTime}= this.chargeRecordForm
             startTime= !startTime ? "20190101000001" : moment(startTime).format('YYYYMMDDHHmmss')
             endTime= !endTime ? moment(new Date()).format('YYYYMMDDHHmmss') : moment(endTime).format('YYYYMMDDHHmmss')
         confirDelete('确认导出充电记录吗？',()=>{
                 // 当导出条数大于10000之后就不请求
                if(this.totalPage > 10000) return messageTip('warning',`当前条数为 ${this.totalPage}条，超过最大导出条数（10000条），请缩短查询时间`)

                this.loading_obj = this.$loading({
                lock: true,
                text: '正在导出',
                spinner: 'el-icon-loading',
                background: 'rgba(255, 255, 255, 0.8)'
                })
             getChargeRecord({... this.chargeRecordForm,isAlllData: 1}).then(res=>{
                    this.loading_obj.close()
                    if(res.code == 200){
                            const list=res.listdata
                            const tHeader= ['序号','订单号','用户名','商户名','设备号','端口号','消费额','订单状态','支付方式','消耗电量(度)','充电时间(分钟)','是否续充','开始时间','结束时间','结束原因','退款时间']
                            const filterVal= ['index','ordernum','username','dealer','equipmentnum','port','expenditure','status','payType','consume_quantity','consume_time','isConCharge','begintime','endtime','endFrom','refDate']
                            Excel({
                                tHeader: tHeader,
                                filterVal:  filterVal,
                                list: list,
                                filename: `充电记录${startTime}-${endTime}`,
                                formatJson: this.formatJson
                            })
                    }else if(res.code == 201){
                        messageTip('warning',res.message || '导出数量超过最大限制')
                    }else{
                        messageTip('error','导出失败，请稍后重试') 
                    }
              }).catch(err=>{
                this.loading_obj.close()
                messageTip('error','导出失败，请稍后重试')
              })
         })
        },
        formatJson(filterVal, list){
            return list.map((item,i)=> filterVal.map((jtem)=>{
                    let val= ''
                    if(jtem == 'index'){
                        val= i+1
                    }else if(['username','dealer'].includes(jtem)){
                        val= item[jtem] && item[jtem].length > 0 ? item[jtem] : '— —'
                    }else if(jtem == 'expenditure'){
                        val=  item[jtem] != null ? item[jtem]: 0
                    }else if(jtem == 'status'){
                        if(item.number == 1){
                            val = '全额退款'
                        }else if(item.number == 2){
                            let refund_money= typeof item.refund_money == 'number' ? item.refund_money : 0
                            val = '部分退款'+refund_money+')'
                        }else{
                            val = '正常'
                        }
                    }else if(jtem =='payType'){
                        val= item.paytype == 1 ? "钱包" : item.paytype == 2 ? "微信" : item.paytype == 3 ? "支付宝": item.paytype == 4 ? "包月下发数据" : item.paytype == 5 ? "投币" : item.paytype == 6 ? "刷卡" : item.paytype == 7 ? "刷卡" : "— —"
                    }else if(jtem == 'consume_quantity'){
                        val= item.consume_quantity / 100
                    }else if(jtem == 'isConCharge'){
                        val= item.ifcontinue != null ? '是' : '否'
                    }else if(['begintime','endtime'].includes(jtem)){
                        val= item[jtem] == null ? '' : moment(item[jtem]).format('YYYY-MM-DD HH:mm:ss')
                    }else if(jtem == 'refDate'){
                        val= item[jtem] == null ? '' : moment(item.refund_time).format('YYYY-MM-DD HH:mm:ss')
                    }else if(jtem == 'endFrom'){
                        val= item.resultinfo==0?"充电完成":item.resultinfo==1?"空载断电":item.resultinfo==2?"充满":
                    	    item.resultinfo==3?"超功率自停":item.resultinfo==4?"远程断电" :item.resultinfo==5?"刷卡断电" : item.resultinfo==11?"被迫停止": item.resultinfo==255?"日志结束":"— —"
                    }else{
                        val= item[jtem]
                    }
                    return val
                }
            ))
        }
    }
}
</script>

