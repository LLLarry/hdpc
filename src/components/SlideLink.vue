<template>
    <div class="slideLink">
        <!-- <ul class="slideLinkFi">
            <li>商户信息</li>
            <ul class="slideLinkFi">
                <ul class="slideLinkSe">
                    <li>商户收益</li>
                    <li>商户收入</li>
                </ul>
            </ul>
        </ul> -->
        <ul :class="[item.grade == 1 ? 'slideLinkFi': 'slideLinkSe']" v-for="(item,i) in list" :key="i">
            <li 
                @click.stop="handleTapLink(item,i,item.grade == 1 ? 'slideLinkFi'+i: 'slideLinkSe'+i)" 
                :class="[item.isActive ? 'active' : '']" 
                :ref="[item.grade == 1 ? 'slideLinkFi'+i: 'slideLinkSe'+i]"
                >
                <i class="el-icon-user iconLeft" v-if="item.grade == 1"></i>
                {{item.title}}
                <i class="el-icon-arrow-right arrowRight" 
                :style="{'transform': (item.isShow ? 'rotate(90deg)':'rotate(0deg)')}"
                v-if="item.grade == 1"
                ></i>
            </li>
            
            <el-collapse-transition name="el-zoom-in-top">
                <div v-show="item.isShow" class="transition-box" v-if="item.children && item.children.length > 0">
                    <SlideLink :list="item.children" />
                </div>
            </el-collapse-transition>
        </ul>
    </div>
</template>

<script>
import Vue from 'vue'
import { Button, Select } from 'element-ui'
export default {
    name: 'SlideLink',
    props: ['list'],
    data(){
        return {
        
        }
    },
    methods: {
        renderSlide(){

        },
        handleTapLink(item,index,ref){
            console.log(item,index,ref)
            let slideLinkFiList= document.querySelectorAll('.slideLinkFi>li')
            let slideLinkSeList= document.querySelectorAll('.slideLinkSe>li')
            console.log(slideLinkFiList,slideLinkSeList)
            if(item.grade===1){ //当时1级菜单的时候折叠
                //设置props穿过来的属性值
                this.list.forEach((ktem,k)=>{
                    if(k == index){
                         slideLinkFiList[k].classList.add('active')
                         Vue.set(ktem,'isShow',!item.isShow)
                         //ktem
                    }else{
                        Vue.set(ktem,'isShow',false)
                         slideLinkFiList[k].classList.remove('active')
                    }
                })
               
            }else{ //二级菜单的时候加active
                let that= this
                Array.from(slideLinkSeList).forEach((jtem,j)=>{
                   jtem.classList.remove('active')
                })
                that.$refs[ref][0].classList.add('active')
                //Vue.set(item,'isActive',true) 
            }
           
        }
    }
    
}
</script>

<style lang="less" scoped>
    .slideLink {
        font-size: 14px;
        .slideLinkFi {
             margin-bottom: 5px;
            &>li{
                height: 45px;
                // background-color: rgba(255,255,255,.1);
                line-height: 45px;
                padding: 0 24px 0 24px;
                cursor: pointer;
                user-select: none;
                transition: 0.5s;
                position: relative;
                &:hover {
                    color: #fff;
                }
                &.active {
                    color: #fff;
                }
                .arrowRight {
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    margin-top: -7px;
                    transition: 0.5s;
                }
                .iconLeft {
                    margin-right: 8px;
                }
            }
            .slideLinkSe {
                &>li{
                    height: 38px;
                    margin: 4px 0;
                   // background-color: rgba(255,255,255,.1);
                    line-height: 38px;
                    padding: 0 24px 0 45px;
                    cursor: pointer;
                    user-select: none;
                    transition: 0.5s;
                    &:hover {
                        color: #fff;
                    }
                    &.active {
                        color: #fff;
                        background-color: #1890ff;
                    }
                }
            }
        }
    }
    
</style>