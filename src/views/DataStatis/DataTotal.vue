<template>
   <div class="dataTotal">
       <!-- dataTotal -->
       <dv-full-screen-container class="screen-container">content
           <header>
             <!-- <section class="header-container">
               <dv-decoration-10 style="width:100%;height:5px;" :color="['#00b4ff']" />
               <div class="num-container">
                 <div class="num-box" v-for="(item,index) in 9"  :key="index"><monitorNunber /></div>
               </div>
               <dv-decoration-10  style="width:100;height:5px;" :color="['#00b4ff']" class="rotate-d" />
             </section> -->
           </header>
           <main>
               <section class="main-section">
                    <div class="section-box">
                        <dv-border-box-1>dv-border-box-1</dv-border-box-1>
                    </div>
                    <div class="section-box">
                        <dv-border-box-1>
                            <!-- <dv-scroll-ranking-board :config="config" style="width:80%;height:300px;margin: 0 auto;" /> -->
                        </dv-border-box-1>
                    </div>
               </section>
               <section class="main-section">
                  <div class="map-mask">
                    <monitorMap />
                  </div>
                  <div class="map-mask">
                    <dv-flyline-chart-enhanced :config="config2" :dev="true" style="width: 100%; height: 100%;" />
                  </div>
               </section>
               <section class="main-section">
                   <div class="section-box">
                        <dv-border-box-1>dv-border-box-1</dv-border-box-1>
                    </div>
                    <div class="section-box">
                        <dv-border-box-1>
                            <!-- <dv-scroll-board :config="config3" style="width:500px;height:220px" /> -->
                        </dv-border-box-1>
                    </div>
               </section>
           </main>
           
       </dv-full-screen-container>
   </div>
</template>

<script>
import monitorMap from '@/components/monitor/map'
import monitorNunber from '@/components/monitor/number'
export default {
   
   data(){
       return {
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
            config2: {
                points: [
    {
      name: '郑州',
      coordinate: [0.64, 0.53],
      halo: {
        show: true,
      },
      icon: {
        src: '/img/flylineChart/mapCenterPoint.png',
        width: 30,
        height: 30
      },
      text: {
        show: false
      }
    },
    {
      name: '新乡',
      coordinate: [0.52, 0.23]
    },
    {
      name: '焦作',
      coordinate: [0.43, 0.29]
    },
    {
      name: '开封',
      coordinate: [0.59, 0.35]
    },
    {
      name: '许昌',
      coordinate: [0.53, 0.47]
    },
    {
      name: '平顶山',
      coordinate: [0.45, 0.54]
    },
    {
      name: '洛阳',
      coordinate: [0.36, 0.38]
    },
    {
      name: '周口',
      coordinate: [0.62, 0.55],
      halo: {
        show: true,
        color: '#8378ea'
      }
    },
    {
      name: '漯河',
      coordinate: [0.56, 0.56]
    },
    {
      name: '南阳',
      coordinate: [0.37, 0.66],
      halo: {
        show: true,
        color: '#37a2da'
      }
    },
    {
      name: '信阳',
      coordinate: [0.55, 0.81]
    },
    {
      name: '驻马店',
      coordinate: [0.55, 0.67]
    },
    {
      name: '济源',
      coordinate: [0.37, 0.29]
    },
    {
      name: '三门峡',
      coordinate: [0.20, 0.36]
    },
    {
      name: '商丘',
      coordinate: [0.76, 0.41]
    },
    {
      name: '鹤壁',
      coordinate: [0.59, 0.18]
    },
    {
      name: '濮阳',
      coordinate: [0.68, 0.17]
    },
    {
      name: '安阳',
      coordinate: [0.59, 0.10]
    }
  ],
  lines: [
    {
      source: '新乡',
      target: '郑州'
    },
    {
      source: '焦作',
      target: '郑州'
    },
    {
      source: '开封',
      target: '郑州'
    },
    {
      source: '周口',
      target: '郑州',
      color: '#fb7293',
      width: 2
    },
    {
      source: '南阳',
      target: '郑州',
      color: '#fb7293',
      width: 2
    },
    {
      source: '济源',
      target: '郑州'
    },
    {
      source: '三门峡',
      target: '郑州'
    },
    {
      source: '商丘',
      target: '郑州'
    },
    {
      source: '鹤壁',
      target: '郑州'
    },
    {
      source: '濮阳',
      target: '郑州'
    },
    {
      source: '安阳',
      target: '郑州'
    },
    {
      source: '许昌',
      target: '南阳',
      color: '#37a2da'
    },
    {
      source: '平顶山',
      target: '南阳',
      color: '#37a2da'
    },
    {
      source: '洛阳',
      target: '南阳',
      color: '#37a2da'
    },
    {
      source: '驻马店',
      target: '周口',
      color: '#8378ea'
    },
    {
      source: '信阳',
      target: '周口',
      color: '#8378ea'
    },
    {
      source: '漯河',
      target: '周口',
      color: '#8378ea'
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
              align: ['center'],
              updateRows(row,index){
                console.log(row)
              }
          }
       }
   },
  mounted(){
    let i= 0
    // setInterval(()=>{
    //   i++
    //   if(i>2) return
    //    this.config3={
    //          header: ['列1', '列2', '列3'],
    //           data: [
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //             [i+'-1', i+'-2', i+'-3'],
    //           ],
    //           index: true,
    //           columnWidth: [50],
    //           align: ['center']
    //       }
    // },2000)
  },
  components: {
    monitorMap,
    monitorNunber
  },
  methods: {
    
  }
}
</script>

<style lang="less" scoped>
.screen-container {
    // background: url(../../assets/images/4.png);
    background-color: #000;
    header {
        height: 240px;
         display: flex;
        .header-container {
          width: 100%;
          align-self: flex-end;
          margin-bottom: 35px;
          .num-container {
            width: 100%;
            display: flex;
            justify-content: space-around;
            padding: 20px 0;
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
        width: 100%;
        display: flex;
        .main-section {
            flex: 2;
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
                height: 380px;
                margin-bottom: 30px;
            }
        }
    }
}
    
</style>