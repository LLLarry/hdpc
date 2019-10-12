<template>
    <div class="slideLink">
        <!-- <v-for (item,i) in list>
            <div>{{item.title}}</div>
        </v-for> -->
    <div>
</template>

<script>
export default {
    data(){
        return {
            list: [
                {
                    title: '商户管理',
                    link: '/admin'
                },
                {
                    title: '用户管理',
                    children: [
                        {
                            title: '用户账号',
                            link: '/user/num'
                        },
                        {
                            title: '用户收益',
                            link: '/user/money'
                        },
                    ]
                },
            ]
        }
    },
    methods: {
        renderSlide(){

        }
    }
    
}
</script>

<style lang="less" scoped>

</style>