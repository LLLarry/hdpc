<template>
    <div class="dataStatis">
        dataStatis
        <h1>{{count}}</h1>
        <button @click="handleCount">点我加1</button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            count: 0
        }
    },
    created(){
        console.log(this.$route.query)
    },
    methods:{
        handleCount(){
            this.count++
        }
    }
}
</script>

<style lang="less" scoped>
    
</style>