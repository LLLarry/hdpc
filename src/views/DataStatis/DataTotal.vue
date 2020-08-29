<template>
   <div class="dataTotal">
       <!-- dataTotal -->
       <dv-full-screen-container class="screen-container">
           <header>
             <headerTitle />
             <section class="header-container">
               <dv-decoration-10 style="width:100%;height:5px;" :color="['#00b4ff']" />
               <div class="num-container">
                  <div class="num-box" v-for="(item,index) in totalList"  :key="index">
                   <monitorNunber :title="item.title" :count="item.count" />
                  </div>
               </div>
               <dv-decoration-10  style="width:100;height:5px;" :color="['#00b4ff']" class="rotate-d" />
             </section>
           </header>
           <main>
               <section class="main-section">
                    <div class="section-box">
                        <dv-border-box-1>
                          <!-- 每日收益排行 -->
                          <daylyEvenRank :screenWidth="screenWidth" />
                        </dv-border-box-1>
                    </div>
                    <div class="section-box">
                        <dv-border-box-1>
                          <!-- 设备收益排行 -->
                          <revenRank :deviceEvenRankData="deviceEvenRankData" />
                        </dv-border-box-1>
                    </div>
               </section>
               <section class="main-section">
                  <div class="map-mask">
                    <monitorMap />
                  </div>
                  <!-- 地图覆盖物 -->
                  <div class="map-mask">
                      <!-- <mapCover /> -->
                  </div>
               </section>
               <section class="main-section">
                   <div class="section-box">
                        <dv-border-box-1>
                          <payTypeRate :screenWidth="screenWidth" />  
                        </dv-border-box-1>
                    </div>
                    <div class="section-box">
                        <dv-border-box-1>
                          <!-- 轮播展示订单 -->
                            <orderautoplay />
                        </dv-border-box-1>
                    </div>
               </section>
           </main>
           
       </dv-full-screen-container>
   </div>
</template>

<script>
import monitorMap from '@/components/monitor/map' /*地图组件*/
import monitorNunber from '@/components/monitor/number' /*数据数字组件*/
import orderautoplay from '@/components/monitor/orderautoplay' /*订单收益展示*/
//import mapCover from '@/components/monitor/map-cover' /*地图覆盖物*/
import revenRank from '@/components/monitor/reven-rank' /*站点收益展示*/
import daylyEvenRank from '@/components/monitor/dayly-even-rank' /*每日收益排行*/
import payTypeRate from '@/components/monitor/pay-type-rate' /*支付占比*/
import headerTitle from '@/components/monitor/header-title' /*支付占比*/
import { deviceEvenRank } from '@/require/datastatis'
export default {
   data(){
       return {
           screenWidth: 1920,
           config: {
               data: [
                        {
                        name: '周口',
                        value: 55
                        },
                        {
                        name: '南阳',
                        value: 120
                        },
                        {
                        name: '西峡',
                        value: 78
                        },
                        {
                        name: '驻马店',
                        value: 66
                        },
                        {
                        name: '新乡',
                        value: 80
                        },
                        {
                        name: '信阳',
                        value: 45
                        },
                        {
                        name: '漯河',
                        value: 29
                        }
                ],

           },
            
          config3: {
             header: ['列1', '列2', '列3'],
              data: [
                ['<span style="color:#37a2da;">行1列1</span>', '行1列2', '行1列3'],
                ['行2列1', '<span style="color:#32c5e9;">行2列2</span>', '行2列3'],
                ['行3列1', '行3列2', '<span style="color:#67e0e3;">行3列3</span>'],
                ['行4列1', '<span style="color:#9fe6b8;">行4列2</span>', '行4列3'],
                ['<span style="color:#ffdb5c;">行5列1</span>', '行5列2', '行5列3'],
                ['行6列1', '<span style="color:#ff9f7f;">行6列2</span>', '行6列3'],
                ['行7列1', '行7列2', '<span style="color:#fb7293;">行7列3</span>'],
                ['行8列1', '<span style="color:#e062ae;">行8列2</span>', '行8列3'],
                ['<span style="color:#e690d1;">行9列1</span>', '行9列2', '行9列3'],
                ['行10列1', '<span style="color:#e7bcf3;">行10列2</span>', '行10列3']
              ],
              index: true,
              columnWidth: [50],
              align: ['center']
          },
         totalList: [ /* number顶部数据 */
           {
             title: '用户总数',
             count: 351256
           },
           {
             title: '本月新增用户',
             count: 15632
           },
           {
             title: '今日新增用户',
             count: 563
           },
           {
             title: '总营业额',
             count: 69631256
           },
           {
             title: '昨日营业额',
             count: 25634
           },
           {
             title: '设备总数',
             count: 12412
           },
         ],
         deviceEvenRankData: []
       }
   },
  mounted(){
    this.handleInit() //初始化获取屏幕高度
    this.handleFullScreen() //初始化时全屏显示
    this.handleGetData()
  },
  components: {
    monitorMap,
    monitorNunber,
    orderautoplay,
    // mapCover,
    revenRank,
    daylyEvenRank,
    payTypeRate,
    headerTitle
  },
  methods: {
    handleInit(){
       this.screenWidth= document.documentElement.offsetWidth || document.body.offsetWidth
    },
    handleFullScreen(){ //切换全屏
        if (!screenfull.isEnabled) { // 如果不允许进入全屏，发出不允许提示
            messageTip("warning","您的浏览器暂时不支持全屏模式"); 
            return 
        }else{
            if(screenfull && !screenfull.isFullscreen){ //判断页面是否全屏（仅支持js触发的全屏，f11触发的全屏检测不到）
               screenfull.toggle();
            }
        }
        
    },
    async handleGetData(){
      try {
        const derPromise= deviceEvenRank()
        const info= await Promise.all([derPromise])
        
      }catch(err){

      }
    }
  },
}
</script>

<style lang="less" scoped>
.screen-container {
    // background: url(../../assets/images/4.png);
    background-color: #000;
    header {
         height: 25vh;
         display: flex;
         flex-direction: column;
         justify-content: space-between;
         .dv-decoration-7 {
           width: 190px !important;
         }
        .header-container {
          width: 100%;
          margin-bottom: 3.2vh;
          // margin-bottom: 35px;
          .num-container {
            width: 100%;
            display: flex;
            justify-content: center;
            padding: 1vh 0;
            .num-box {
              margin: 0 0.5vw;
            }
          }
          .rotate-d {
              transform: rotate(180deg);
              -webkit-transform: rotate(180deg);
              -moz-transform: rotate(180deg);
              -o-transform: rotate(180deg);
              -ms-transform: rotate(180deg);
          }
        }
    }
    main {
        height: 72vh;
        width: 100%;
        display: flex;
        .main-section {
            display: flex;
            flex: 2;
            flex-direction: column;
            justify-content: space-between;
            &:nth-child(2){
                flex: 3;
                position: relative;
                .map-mask {
                  position: absolute;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  top: 0;
                }
            }
            .section-box {
                height: 35.158vh;
                overflow: hidden;
                // margin-bottom: 2.77777vh;
            }
        }
    }
}
@media screen and (max-width: 1400px) {
  .screen-container {
      header {
        height: 27vh;
      }
  }
}
</style>