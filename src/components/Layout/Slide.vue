<template>
    <div class="slide">
        <SlideLink :menuList="menuList" />
    </div>
</template>

<script>
import SlideLink from './SlideLink'
import {superAdminMenuList,adminMenuList} from '../../menuConfig'
import {mapState} from 'vuex'
    export default {
        data(){
            return {
               
            }
        },
        computed:{
            ...mapState(['menuList','userInfo'])
        },
        created(){
           if(this.userInfo){  //只要用户登陆了，重新加载slide就会请求新的菜单进行渲染
            //用户登录
                if(this.userInfo.classify === 'admin'){
                    this.$store.commit('hadnleMenuList',adminMenuList) //更新菜单列表
                }else if(this.userInfo.classify === 'superAdmin'){
                    this.$store.commit('hadnleMenuList',superAdminMenuList)
                } 
         }
        },
        components: {
            SlideLink
        }
    }
</script>

<style lang="less" scoped>
    .slide {
        background-color: #324057;
        // background-color: #001529;
        //background-color: #f5f7fa;
        height: inherit;
        color: rgba(255,255,255,0.65);
        overflow-x: hidden;
    }
</style>