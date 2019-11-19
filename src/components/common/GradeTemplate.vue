<template>
    <div class="gradeTemplate">
        <div v-for="(item,i) in list" :key="i">
            <Template :from="2" :list="[item]" :grade="item.rank" />
        </div>
    </div>
</template>

<script>
import Template from './Template'
export default {
    data(){
        return{
            gradeList: [
                {
                    id: 1,
                    name: '充电系统默认模板',
                    remark: '和动充电站',
                    common1: '1569365326',
                    permit: 1, //是否支持退费 1是 2否
                    walletpay: 2, //是否钱包支付 1是 2否
                    common2: 1, //退费标准  1时间电量， 2时间，3电量
                    rank: 1,
                    gather: [
                            {
                                name: '1元 4小时',
                                money:1.0,
                                chargeTime: 240,
                                chargeQuantity: 1,
                                temChildId: 11,
                            },
                            {
                                name: '8元 8小时',
                                money:2.0,
                                chargeTime: 480,
                                chargeQuantity: 2,
                                temChildId: 12,
                            }
                        ]
                },
                {
                    id: 1,
                    name: '充电系统默认模板',
                    remark: '和动充电站',
                    common1: '1569365326',
                    permit: 1, //是否支持退费 1是 2否
                    walletpay: 2, //是否钱包支付 1是 2否
                    common2: 1, //退费标准  1时间电量， 2时间，3电量
                    rank: 2,
                    gather: [
                            {
                                name: '1元 4小时',
                                money:1.0,
                                chargeTime: 240,
                                chargeQuantity: 1,
                                temChildId: 11,
                            },
                            {
                                name: '8元 8小时',
                                money:2.0,
                                chargeTime: 480,
                                chargeQuantity: 2,
                                temChildId: 12,
                            }
                        ]
                },
                {
                    id: 1,
                    name: '充电系统默认模板',
                    remark: '和动充电站',
                    common1: '1569365326',
                    permit: 1, //是否支持退费 1是 2否
                    walletpay: 2, //是否钱包支付 1是 2否
                    common2: 1, //退费标准  1时间电量， 2时间，3电量
                    rank: 3,
                    gather: [
                            {
                                name: '1元 4小时',
                                money:1.0,
                                chargeTime: 240,
                                chargeQuantity: 1,
                                temChildId: 11,
                            },
                            {
                                name: '8元 8小时',
                                money:2.0,
                                chargeTime: 480,
                                chargeQuantity: 2,
                                temChildId: 12,
                            }
                        ]
                }
            ]
        }
    },
    components: {
        Template
    },
    props: ['list']
}
</script>

<style>

</style>