<template>
  <div class="orderautoplay">
      <div class="tb-box">
          <div class="section-title">实时订单交易数据</div>
          <div class="tb-header" ref="tbheader">
              <div class="tb-col-first">#</div>
              <div class="tb-col">金额</div>
              <div class="tb-col">支付方式</div>
              <div class="tb-col">订单尾号</div>
              <div class="tb-col">来源</div>
          </div>
          <div class="tb-body">
              <!-- <div class="tb-row">
                    <div class="tb-col-first">000001</div>
                    <div class="tb-col">2元</div>
                    <div class="tb-col">微信</div>
                    <div class="tb-col">4563</div>
                    <div class="tb-col">充电</div>
              </div> -->

              <div class="tb-row" v-for="(item,index) in list" 
                :key="index" 
                :style="'height:'+(index== 0 ? dynamicHieght : height)+'px' "
                :class="[hasAnimation? 'ani' : '',item.num == 1 ? 'odd' : 'even']"
              >
                    <div class="tb-col-first">{{item.code}}</div>
                    <div class="tb-col">{{item.money}}元</div>
                    <div class="tb-col">{{item.paytype == 1 ? '微信' : '支付宝'}}</div>
                    <div class="tb-col">{{item.order}}</div>
                    <div class="tb-col">{{item.type == 1 ? '充电':'充值'}}</div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
let timer= null
let timeoutEnd= false
const ws = new WebSocket("ws://47.93.203.50:8081/wolfwebsocket");
export default {
    data(){
        return {
            height: 35, //默认行高
            dynamicHieght: 35, //动态行高
            rowClass: '',
            hasAnimation: true, //是否有动画
            list: [
                {code: '000001',money: 1,paytype: 1,order: 4563,type: 1,num:1},
                {code: '000001',money: 2,paytype: 1,order: 4563,type: 1,num:2},
                {code: '000001',money: 3,paytype: 1,order: 4563,type: 1,num:1},
                {code: '000001',money: 4,paytype: 1,order: 4563,type: 1,num:2},
                {code: '000001',money: 5,paytype: 1,order: 4563,type: 1,num:1},
                {code: '000001',money: 6,paytype: 1,order: 4563,type: 1,num:2},
                {code: '000001',money: 7,paytype: 1,order: 4563,type: 1,num:1},
                {code: '000001',money: 8,paytype: 1,order: 4563,type: 1,num:2},
                {code: '000001',money: 2,paytype: 1,order: 4563,type: 1,num:1},
                {code: '000001',money: 2,paytype: 1,order: 4563,type: 1,num:2},
                {code: '000001',money: 2,paytype: 1,order: 4563,type: 1,num:1},
                {code: '000001',money: 2,paytype: 1,order: 4563,type: 1,num:2},
                {code: '000001',money: 2,paytype: 1,order: 4563,type: 1,num:1},
                {code: '000001',money: 2,paytype: 1,order: 4563,type: 1,num:2},
                {code: '000001',money: 2,paytype: 1,order: 4563,type: 1,num:1},
            ]
        }
    },
    mounted(){
        this.height= this.$refs.tbheader.offsetHeight
        this.dynamicHieght= this.height
        this.handinit()
        this.initWebSoket()
    },
    methods: {
        handinit(){
            setInterval(this.debounce(this.handleBumd,350),100)
        },
        handleBumd(){
            this.list.push({code: '000009',money: 2.5,paytype: 1,order: 4563,type: 1,num: this.list[this.list.length-1].num == 1 ? 2 : 1})
            this.hasAnimation= true
            this.dynamicHieght= 0
            setTimeout(()=>{
                this.$delete(this.list,0)
                this.hasAnimation= false
                this.dynamicHieght= this.height
            },250)
        },
        /*节流函数*/ 
        debounce(fn,wait){
            var endTime 
            return function(){
                var startTime= new Date()
                if(startTime- endTime > wait || endTime == void 0){
                    fn && fn()
                    endTime= startTime
                }
            }
        },
        initWebSoket(){
            ws.onopen= function(e){
                console.log(e)
            }
            ws.onmessage = function (e){ 
                  var received_msg = e.data;
                  console.log("数据已接收...");
            };
        }
        // handinit(){
        //     this.height= this.$refs.tbheader.offsetHeight //设置行高
        //     this.handleInterVal(this.handleCallBack)
        // },
        // handleInterVal(callBack){
        //     console.log(this.dynamicHieght)
        //     timer= setInterval(()=>{
        //         this.dynamicHieght= this.dynamicHieght-2
        //         if(this.dynamicHieght <= 0){
        //             console.log(123)
        //             clearInterval(timer)
        //             callBack && callBack()
        //         }
        //     },10)
        // },
        // handleCallBack(){ //设置第一个元素的高度为0
        //     this.$delete(this.list,0)
        //     console.log(this.height)
        //     this.dynamicHieght= this.height
        //     setTimeout(()=>{
        //         this.handleInterVal(this.handleCallBack)
        //     },2000)
        // }

    },
}
</script>

<style lang="less" scoped>
.orderautoplay {
    font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;
    -webkit-font-smoothing: antialiased;
    color: #ffffff;
    position: relative;
    width: 100%;
    height: 100%;
    .section-title {
        color: rgba(255,255,255,.9);
        font-size: 16px;
        margin-bottom: 15px;
    }
    .tb-box {
        position: absolute;
        left: 5%;
        top: 5%;
        right: 5%;
        bottom: 5%;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        .tb-col-first {
            width: 80px;
            text-align: center;
            overflow: hidden;
        }
        .tb-col {
            flex: 1;
            overflow: hidden;
        }
        .tb-header {
            height: 35px;
            line-height: 35px;
            background-color: rgb(0, 186, 255);
            color: #ffffff;
            display: flex;
        }
        .tb-body {
            height: 35px;
            line-height: 35px;
            color: #ffffff;
            flex: 1;
            overflow: hidden;
            .tb-row {
                width: 100%;
                display: flex;
                transform-origin: center;
                font-size: 14px;
                &.odd {
                    background-color: rgb(10,39,50);
                }
                &.even {
                    background-color: rgb(0,59,81);
                }
                &.ani {
                    transition: all .2s;
                }
            }
        }
    }
} 
@media screen and (max-width: 1400px){
    .orderautoplay {
        .tb-box {
            font-size: 12px;
            .tb-body {
                .tb-row {
                    font-size: 12px;
                }
            }
        }
    } 
}
</style>