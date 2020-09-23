<template>
  <div class="selectMachine">
      <div class="selectMachine-box" :style="{height: height+'px'}" v-if="addrlist.length>0">
            <i class="el-icon-caret-bottom" @click="show= !show"></i>
            <div ref="btnContext" :style="{transform: 'translateY('+btnContextTransY+'px)'}">
                <el-button-group >
                    <el-button  
                        class="btn-machine-list" 
                        :class="['btn-machine-list'+index]"
                        :type="index === selectIndex ? 'primary' : ''"  
                        size="small" 
                        v-for="(item,index) in addrlist" 
                        :key="index"
                        :ref="'btnSelectMachine'+index"
                        @click="handleSelect($event,item,index)"
                    >{{item}}</el-button>
                </el-button-group>
            </div>
      </div>
  </div>
</template>

<script>
let main= null // main对象
export default {
    data(){
        return {
            height: 41,
            show: false, //是否显示完全
            btnContext: 41,
            btnContextTransY: 0,
            btnContextTransYCopy: 0,
            addrlist: [],
            selectIndex: 0,
        }
    },
    watch: {
        show: {
            handler(flag){
                if(flag){ //显示
                    this.height= this.btnContext
                    this.btnContextTransY= 0
                    
                }else{
                    this.height= 41
                    this.btnContextTransY= this.btnContextTransYCopy
                }
            }
        },
        selectIndex: {
            handler(index){
                const btnList= document.querySelectorAll('.selectMachine .btn-machine-list'+index)
                for(let i=0; i< btnList.length; i++){
                    btnList[i].click()
                }
            }
        }
    },
    created(){
        // 接收触发的值
        this.$bus.$on('machine-data',({type,data})=>{
            this[type]= data 
        })
    },
    mounted(){
        this.bindEvent()
    },
    methods: {
        handleSelect($event,item,index){
            this.$bus.$emit('changeSelectIndex',index)
            const offsetTop= $event.currentTarget.offsetTop
            const moveY= 0- (offsetTop-5)
            if(!this.show){ //只有不显示的时候才向上移动
                 this.btnContextTransY= moveY //设置向上移动的距离
            }
            this.show= false
            this.btnContextTransYCopy= moveY //设置向上移动的距离
        },
        init(){
            if(this.$refs['btnContext']){
                const contextHeight= this.$refs['btnContext'].offsetHeight
                if(this.btnContext !== contextHeight){ //只有两个值不相等时，才进行赋值
                    this.btnContext= contextHeight
                }
            }
        },
        bindEvent(){
            main= document.querySelector('.main')
            main.addEventListener('scroll',this.scrollFn)
        },
        scrollFn(e){
            e= e || window.event
            const target= e.target || e.srcElement
            const scrollTop= target.scrollTop
            this.init() //获取按钮高度
            const selectMachineList= [...document.querySelectorAll('.selectMachine')]
            selectMachineList.forEach((selectMachine,index)=>{
                    const top= selectMachine.getBoundingClientRect().top //元素距离浏览器顶部的距离
                    const selectMachineBox=  selectMachine.children[0]
                    if(selectMachineBox){ //存在 selectMachineBox 才进行固定位置
                        if(top <= 80){
                            selectMachine.children[0].classList.add('fixed')
                        }else{
                            selectMachine.children[0].classList.remove('fixed')
                        }
                    }
            })
        },
    },
    beforeDestroy(){ //卸载之前
        main.removeEventListener('scroll',this.scrollFn)
        this.$bus.$off('machine-data')
    },
    deactivated(){ //缓存数据清除之前
         main.removeEventListener('scroll',this.scrollFn)
         this.$bus.$off('machine-data')
    },
}
</script>

<style lang="less">
.selectMachine {
    .selectMachine-box{
        margin-bottom: 10px;
        border-radius: 4px;
        border: 1px solid #DCDFE6;
        padding: 3px 40px 3px 10px;
        overflow: hidden;
        position: relative;
        .btn-machine-list {
            margin: 5px 0;
            width: 80px;
        }
        .el-icon-caret-bottom {
            position: absolute;
            right: 0px;
            top: 5px;
            padding: 10px;
        }
        &.fixed {
            position: fixed;
            left: 180px;
            right: 16px;
            top: 80px;
            z-index: 9;
            background-color: #fff;
            overflow: hidden;
            border:none;
            box-shadow: 3px 4px 9px rgba(0,0,0,.1);
            padding-bottom: 4px;
        }
    }
}

</style>