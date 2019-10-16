<template>
    <div class="slide">
        <SlideLink :list="list" />
    </div>
</template>

<script>
import SlideLink from './SlideLink'
import {mapState} from 'vuex'
    export default {
        data(){
            return {

            }
        },
        computed:{
            ...mapState(['list'])
        },
        components: {
            SlideLink
        }
    }
</script>

<style lang="less" scoped>
    .slide {
        background-color: #001529;
        //background-color: #f5f7fa;
        height: inherit;
        color: rgba(255,255,255,0.65);
        overflow-x: hidden;
    }
</style>