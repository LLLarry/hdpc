<template>
    <div class="merEarnDetail">
        <el-card class="box-card card_bottom0">
            <el-form :inline="true"  class="demo-form-inline" :model="merEarnDetailForm">
                <el-form-item label="订单号" class="form_right25">
                    <el-input v-model="merEarnDetailForm.orderNum" placeholder="请输入订单号"  size="small"></el-input>
                </el-form-item>

                <el-form-item label="支付方式" class="form_right25">
                     <el-select v-model="merEarnDetailForm.payType"  placeholder="请选择支付方式"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="钱包" value="1" ></el-option>
                        <el-option label="微信" value="2" ></el-option>
                        <el-option label="支付宝" value="3" ></el-option>
                    </el-select>
                </el-form-item>
                 <el-form-item label="类型" class="form_right25">
                     <el-select v-model="merEarnDetailForm.type"  placeholder="请选择支付方式"  size="small">
                        <el-option label="全部" value="0" ></el-option>
                        <el-option label="收入" value="1" ></el-option>
                        <el-option label="退款" value="2" ></el-option>
                    </el-select>
                </el-form-item>

                 <el-form-item label="开始时间" class="form_right25">
                     <el-date-picker
                        v-model="merEarnDetailForm.startTime"
                        size="small"
                        type="date"
                        placeholder="选择开始时间"
                        >
                      </el-date-picker>
                </el-form-item>
                 <el-form-item label="结束时间" class="form_right25">
                     <el-date-picker
                        v-model="merEarnDetailForm.endTime"
                        size="small"
                        type="date"
                        placeholder="选择结束时间"
                        >
                      </el-date-picker>
                </el-form-item>
            
                <el-form-item class="form_margin0 content_btn">
                    <el-button type="primary" size="small">查询</el-button>
                </el-form-item>
            </el-form>
         </el-card>

        <el-card class="box-card">
            <!-- <el-table
                :data="tableData"
                border
                style="width: 100%"
               
                >
                <el-table-column
                prop="serialNum"
                label="序号"
                min-width="100"
                fixed
                >
                </el-table-column>

                <el-table-column
                prop="serialNum"
                label="订单号"
                min-width="100"
                fixed
                >
                <el-table-column
                prop="serialNum"
                label="金额"
                min-width="100"
                fixed
                >
                </el-table-column>
            </el-table> -->
        </el-card>
    </div>
</template>
<script>
import {Card,Table,Input,TableColumn,Form, FormItem, Select,Option,OptionGroup,DatePicker,TimeSelect,TimePicker, Link,Dialog,Radio,RadioGroup,} from 'element-ui'
import Vue from 'vue'
import MyPagination from '@/components/common/MyPagination'
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(OptionGroup)
Vue.use(DatePicker)
Vue.use(TimeSelect)
Vue.use(TimePicker)
Vue.use(Link)
Vue.use(Dialog)
Vue.use(Radio)
Vue.use(RadioGroup)
export default {
    data(){
        return {
                merEarnDetailForm: {
                orderNum: '',
                payType: '',
                type: '',
                startTime: '',
                endTime: ''
            }
        }
    }
}
</script>

<style lang="less">
@import '../../../../../static/style/default.less';
@import '../../../../../static/style/common.less';

</style>