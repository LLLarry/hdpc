<template>
    <div class="slideLink">
        <el-menu 
        :default-active="activeItem" 
        :default-openeds="openArr" 
        class="el-menu-vertical-demo" 
        @open="handleOpen" 
        @close="handleClose" 
        :collapse="isCollapse"
        :collapse-transition="false"
        background-color="#324057"
        text-color="rgba(255,255,255,0.6)"
        >
            <el-submenu :index="i+''" v-for="(item,i) in menuList" :key="i">
                <template slot="title">
                <i class="el-icon-location"></i>
                <span slot="title">{{item.title}}</span>
                </template>
                <el-menu-item 
                :index="i+'-'+j" 
                v-if="item.children && item.children.length>0" 
                v-for="(jtem,j) in item.children" 
                :key="j"
                @click="handleLink(jtem.link)"
                >{{jtem.title}}</el-menu-item>
            </el-submenu>
           
        </el-menu>
        <div class="toggleSlideLink" @click="handleToggleSlideLink"><span class="el-icon-s-fold"></span></div>
    </div>
</template>

<script>
import Vue from 'vue'
import {mapState,mapMutations} from 'vuex'
import {Menu,Submenu, MenuItem,MenuItemGroup,Button} from 'element-ui';
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Button)
export default {
    name: 'SlideLink',
    props: ['menuList'],
    data() {
      return {
        isCollapse: false, //控制是否折叠
        openArr: [],//当前打开的数组
        activeItem: '' //当前选择的哪一项
      };
    },
    created(){
        // 去除vuex中的nowMenuLink当前连接的名称，传进去
        this.activeItem= this.handleListToItemInfo(this.$store.state.nowMenuLink)
    },
    computed: {
       ...mapState({nowMenuLink:'nowMenuLink'}),
    },
    watch: {
        //监控获取到的nowMenuLink值改变调用
        nowMenuLink(newVal,oldVal){ 
            console.log(this.handleListToItemInfo(newVal))
            this.activeItem= this.handleListToItemInfo(newVal)
        }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
        this.openArr= [key]
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      handleToggleSlideLink(){ //处理点击切换菜单栏宽度变化
        let layout_col_slide= document.getElementsByClassName('layout_col_slide')[0]
        if(this.isCollapse){
            layout_col_slide.style.minWidth= '180px'
            layout_col_slide.style.width= '12.5%'
        }else{
            layout_col_slide.style.minWidth= '0'
            layout_col_slide.style.width= 'auto'
        }
        
        this.isCollapse= !this.isCollapse
      },
      //点击跳转连接,并传参。获取值的时候，使用this.$route.query来获取
      handleLink(path){
          console.time();
          console.log(path)
          this.$router.push({
              path: path,
              query: {
                  name: 'zs',
                  age: 18
              }
          })
      },
      //处理传过来的list,是数组扁平化，遍历出每一项
      handleListToItemInfo(name){ //name是vuex取出来的nowMenuLink
            let index
            this.menuList.forEach((item,i)=>{
                if(item.children && item.children.length>0){
                   item.children.forEach((jtem,j)=>{
                        if(jtem.title == name){
                            index= jtem.index
                        }
                   })
                }
            })
            return index
      },
    }
    
}
</script>

<style lang="less" scoped>
    .slideLink{
        &::-webkit-scrollbar-track-piece {
        background: #d3dce6;
        }

        &::-webkit-scrollbar {
        width: 6px;
        }

        &::-webkit-scrollbar-thumb {
        background: #99a9bf;
        border-radius: 20px;
        }
    }
   .el-menu {
       border: none;
   }
   .el-submenu .el-menu-item {
        height: 38px;
        line-height: 38px;
        margin: 5px 0;
   }
   .el-submenu .el-menu-item.is-active {
       background-color: #409EFF !important;
       color: #fff;
   }
    .slideLink {
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        position: relative;
        .toggleSlideLink {
            position: absolute;
            bottom: 20px;
            right: 20px;
            font-size: 20px;
            padding: 5px;
            z-index: 99;
        }
    }
    
</style>