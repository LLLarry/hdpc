<template>
  <div class="device-log">
        <div class="device-log-contral">
            <el-button-group class="scroll_group">
                <el-button type="primary" size="small" class="copytext" @click="copyText">复制文本</el-button>
                <el-button type="danger" size="small"  @click="sourcecode2=''">清空文本</el-button>
            </el-button-group>
            <el-button-group class="scroll_group">
                <el-button type="primary" size="small" @click="setSCrollfn(true)">开始滚动</el-button>
                <el-button type="danger" size="small"  @click="setSCrollfn(false)">停止滚动</el-button>
            </el-button-group>
            <el-button-group>
                <el-button type="primary" size="small" @click="setWebSocket(true)">开始打印</el-button>
                <el-button type="danger" size="small" @click="setWebSocket(false)" >停止打印</el-button>
            </el-button-group>
        </div>
        <pre v-myHighlightjs="sourcecode2" ref="perEle"><code class="javascript" ref="codeEle"></code></pre>
        <!-- 赋值按钮 -->
        <button 
            ref="copyBtn" 
            class="copyBtn" 
            data-clipboard-text=""
            style="display: none;"
        >复制</button>
        <!-- 赋值按钮 -->
  </div>
</template>

<script>
let perEleHeight= 0; // perEleHeight元素的高度
let clientHeight=  document.documentElement.offsetHeight
let timer= null
let ws = null; 
import {messageTip} from '@/utils/ele'
import ClipboardJS  from 'clipboard'
export default {
    props: {
        code: {
            type: String
        },
        deviceIp:{
            type: String,
            default: ''
        }
    },
    data(){
        return {
            sourcecode2: ``,
            isCanScroll: true, // 日志是否能够滚动
            autoScroll:false, //是否自动滚动
            isSetSCroll: true, //是否设置能滚动
        }
    },
    mounted(){
        console.log(this.deviceIp)
        let perEle=  this.$refs['perEle']
        perEle.addEventListener('scroll',this.scrollFn) //绑定滚动事件        

        this.initWebSoket(this.deviceIp)  /**初始化WebSoket*/

        this.$once("hook:beforeDestroy",()=>{
            perEle.removeEventListener('scroll',this.scrollFn.bind(this)) //关闭监听
            ws && ws.close() //关闭webSocket
        })
        var clipboard = new ClipboardJS('.copyBtn');
       
        clipboard.on('success', function(e) {
            e.clearSelection();
            messageTip("success","复制成功")
        });
        clipboard.on('error', function(e) {
           messageTip("error","复制失败")
        });
    },
    methods: {
        initWebSoket(ip){
            console.log(ip)
            let codeEle= this.$refs['codeEle'] 
            let perEle=  this.$refs['perEle']
            let perEleMaxHeight= clientHeight*0.75 //per元素最大高度
            //  ws= new WebSocket(`ws://140.143.36.205/devicewebsocket`)
             ws= new WebSocket(`ws://${ip}:8081/devicewebsocket`)
             ws.onopen= (e)=>{ /**连接成功回调*/
                console.log(e)
                ws.send(this.code) //发送设备号
            }
            ws.onerror = (e) => {
                console.log('error', e)
            }
             ws.onmessage = (e)=>{   /**接收WebSoket发送的信息*/
                let received_msg = e.data;
                console.log("received_msg",received_msg)
                this.sourcecode2 += received_msg+`\n`
                let codeEleHeight=  codeEle.offsetHeight //内容高度
                setTimeout(()=>{
                    if( (perEleMaxHeight < codeEleHeight) && this.isCanScroll && this.isSetSCroll){ 
                        perEle.scrollTop= codeEleHeight- perEleMaxHeight+100
                        this.autoScroll= true
                    }
                })
                
            };
           
        },
        scrollFn(event){
            if(this.autoScroll){
                this.autoScroll= false
                return  
            }
            clearTimeout(timer)
            timer= setTimeout(()=>{
                this.isCanScroll= true
            },5000)
            this.isCanScroll= false 
        },
        // 手动设置，是否可以滚动滚动条
        setSCrollfn(flag){
            this.isSetSCroll= flag
            messageTip("success",flag ? "已开启自动滚动" : "已关闭自动滚动")
        },
        // 开启关闭webSocket
        setWebSocket(flag){
            if(flag){ //开启打印
                if(ws.readyState == WebSocket.CLOSED){ //此时未连接
                    this.initWebSoket()
                    messageTip("success", "已成功开启打印") 
                }else{
                    messageTip("warning", "当前webSocket正在连接或已连接") 
                }
            }else{ //关闭打印
                if(ws.readyState ==WebSocket.OPEN || ws.readyState ==WebSocket.CONNECTING){ //此时已连接或正在连接
                    ws.close() //关闭webSocket
                    messageTip("success", "已成功关闭打印") 
                }else{
                    messageTip("warning", "当前webSocket已关闭或正在关闭") 
                }
            }
        },
        copyText(){
            const codeEle= this.$refs['codeEle']
            const text= codeEle.innerText
            this.$refs['copyBtn'].setAttribute("data-clipboard-text",text)
            this.$refs['copyBtn'].click()      
        }
        // copyText(){
        //     const codeEle= this.$refs['codeEle']
        //     const text= codeEle.innerText
        //     let oInput = document.querySelector('.oInput')
        //     console.log('oInput',oInput)
        //     if(!oInput){
        //         oInput = document.createElement('textarea');
        //         oInput.className = 'oInput';
        //         document.body.appendChild(oInput);
        //     }
        //     oInput.innerHTML = text;

        //     // window.getSelection().selectAllChildren(oInput);
        //     // console.log('oInput.value',oInput.value)
        //     // document.body.appendChild(oInput);
        //     oInput.focus();
        //     oInput.select(); // 选择对象
        //     oInput.setSelectionRange(0, oInput.value.length)
        //     document.execCommand("copy"); // 执行浏览器复制命令

        //     oInput.style.display='none';
        //     messageTip('success','复制成功');
            
        // },
        
    },
    directives: {
        myHighlightjs: {
            // 指令的定义
            update: function (el,binding) {
                const regObj= {
                    time:/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d/g, //匹配时间
                    device: /\d{6,8}/g, //匹配设备号
                    num: /(?<!\d|(\d\:)|(\d\-))\d{1,5}(?!\d|\:|\-)/g //匹配数据
                }
                console.log(el,binding.value)
                let content= binding.value
                for(let [key,reg] of Object.entries(regObj)){
                    content= content.replace(reg,(str)=>{
                        return `<span class="myhiggtligh-${key}">${str}</span>`
                    })
                }
                el.children[0].innerHTML=content
                console.log(content)
            }
        }
    }
}
</script>

<style lang="less">
.device-log{
    .device-log-contral {
        margin-bottom: 15px;
        margin-top: -25px;
        display: flex;
        justify-content: flex-end;
        .scroll_group {
            margin-right: 20px;
        }
        // .copytext {
        //     margin-right: 20px;
        // }
    }
    pre {
        overflow: auto;
        height: 75vh;
        background: #1d1f21;
        padding: 15px;
        .hljs {
            overflow: unset;
        }
        code {
            color: #ccc;
            
        }
        .myhiggtligh-time {
            color: #f08d49;
        }
        .myhiggtligh-device {
            color:  #7ec699;
        }
        .myhiggtligh-num {
            color: #cc99cd;
        }
    }   
}
</style>