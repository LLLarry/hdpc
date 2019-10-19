<template>
    <div class="slide">
        <SlideLink :menuList="menuList"/>
    </div>
</template>

<script>
import SlideLink from './SlideLink'
import {superAdminMenuList,adminMenuList} from '../../menuConfig'
import {mapState} from 'vuex'
    export default {
        data(){
            return {
            //    activeItem: ''
            }
        },
        computed:{
            ...mapState(['menuList','userInfo','nowMenuLink'])
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
            // 去除vuex中的nowMenuLink当前连接的名称，传进去
            // this.activeItem= this.handleListToItemInfo(this.$store.state.nowMenuLink)
        },
        watch:{
            //监控获取到的nowMenuLink值改变调用
            // nowMenuLink(newVal,oldVal){ 
            //     console.log(this.handleListToItemInfo(newVal))
            //     this.activeItem= this.handleListToItemInfo(newVal)
            // }
        },
        components: {
            SlideLink,
        },
        methods: {
             //处理传过来的list,是数组扁平化，遍历出每一项
            // handleListToItemInfo(name){ //name是vuex取出来的nowMenuLink
            //         let index
            //         this.menuList.forEach((item,i)=>{
            //             if(item.children && item.children.length>0){
            //             item.children.forEach((jtem,j)=>{
            //                     if(jtem.title == name){
            //                         index= jtem.index
            //                     }
            //             })
            //             }
            //         })
            //         return index
            // },
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