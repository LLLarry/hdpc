<template>
  <el-card class="box-card" v-if="!['03','04'].includes(hwVerson)" id="port_card">
    <div slot="header" class="clearfix">
      <span>端口状态</span>
    </div>
    <el-table
      :data="portStatusList"
      border
      fit
      style="width: 100%"
      :header-cell-style="{background:'#f5f7fa',color:'#666'}"
    >
      <el-table-column prop="port" label="端口号" width="70"></el-table-column>
      <el-table-column prop="portStatus" label="端口状态" min-width="80">
        <template slot-scope="{row}">
          <el-link
            :type="row.portStatus== 1 ? 'success': row.portStatus== 2 ? 'danger': 'default' "
            size="mini"
            :underline="false"
          >
            {{row.portStatus== 1 ? '空闲': row.portStatus== 2 ? '使用': row.portStatus== 3 ? '锁定' : row.portStatus== 4 ? '故障' : row.portStatus== 5 ? '充满、浮充' : '— —'}}
            <!-- 自己设置的  portStatus 等于3时为锁定-->
          </el-link>
        </template>
      </el-table-column>

      <el-table-column prop="portV" label="电压 V" min-width="80" v-if="['07','11'].includes(hwVerson)"></el-table-column>
      <el-table-column prop="portA" label="电流 A" min-width="80" v-if="['07','11'].includes(hwVerson)"></el-table-column>

      <el-table-column prop="time" label="充电时间（分钟）" min-width="80"></el-table-column>
      <el-table-column prop="power" label="充电功率（W）" min-width="80"></el-table-column>
      <el-table-column prop="elec" label="剩余电量（度）" min-width="80">
        <template slot-scope="{row}">{{ row.elec/100 }}</template>
      </el-table-column>
      <el-table-column prop="surp" label="可回收余额" min-width="80">
        <template slot-scope="{row}">
          {{ (row.surp == null || typeof row.surp == 'undefined') ? 0 : row.surp }}
        </template>
      </el-table-column>
      <el-table-column prop="updateTime" label="更新时间" min-width="100">
        <template slot-scope="{row}">{{ row.updateTime | fmtDate }}</template>
      </el-table-column>
    
      <el-table-column prop="update" label="实时更新" min-width="100">
        <template slot-scope="{row,$index}">
          <el-button
            type="primary"
            size="mini"
            :icon="row.editLoading ? 'el-icon-loading' : 'el-icon-refresh-left'"
            @click="handleGetPortStatus($index,row)"
          >更新</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="lock" label="锁定" min-width="120">
        <template slot-scope="{$index,row}">
          <el-button
            type="danger"
            size="mini"
            plain
            :icon="row.lockLoading ? 'el-icon-loading' : 'el-icon-lock'"
            @click="handleLockPort($index,row)"
          >锁定</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="unLock" label="解锁" min-width="120">
        <template slot-scope="{$index,row}">
          <el-button
            type="success"
            size="mini"
            :icon="row.unlockLoading ? 'el-icon-loading' : 'el-icon-unlock'"
            @click="handleDebloack($index,row)"
          >解锁</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import { getDeviceStatus,lockDevicePort,queryPortStatus,lockOrUnlockPort } from '@/require/deviceManage'
import { Button} from 'element-ui'
import {messageTip} from '@/utils/ele'
export default {
    props: {
        portStatusList: {
          type: Array,
          default: ()=>[]
        }, //端口状态list
        hwVerson: String, //硬件版本号
        code: String, //设备号
        addr: String, //从几号
    },
    data(){
        return {
            loading: null,
        }
  },
    methods: {
        handleGetPortStatus(index,row){ //更新端口状态
          if(this.hwVerson == '11'){ //更新一拖二端口状态
            this.$set(row,'editLoading',true)
            queryPortStatus({code: this.code,addr:this.addr,port:row.port}).then(res=>{
              this.$delete(row,'editLoading')
              if(res.code == 200){
                this.$emit('handleGetPortStatusCallback',{addr: this.addr,index,copeRow:res.result})
              }else{
                messageTip('error',res.message)
              }
            }).catch(e=>{
              this.$delete(row,'editLoading')
            })
          }else { //非一拖二设备
            this.$set(row,'editLoading',true)
            getDeviceStatus({port: row.port,code: this.code}).then(res=>{
                this.$delete(row,'editLoading')
                if (res.wolfcode == "1001") {
                    messageTip('error','获取端口状态失败')
                    return
                }
                let copeRow= { ...row ,portStatus: res.portstatus,elec: res.elec,time:res.time,power:res.power,updateTime: parseInt(res.updatetime)}
                this.$emit('handleGetPortStatusCallback',{index,copeRow})
            }).catch(err=>{ 
                this.$delete(row,'editLoading')
            })
          } 
        },
        handleLockPort(index,row){ //锁定端口
            if(this.hwVerson == '11'){ //一推二设备
                this.$set(row,'lockLoading',true)
                lockOrUnlockPort({code: this.code,addr: this.addr,port: row.port,status: 0}).then(res=>{
                  this.$delete(row,'lockLoading')
                  if(res.code == 200){
                     this.$emit('handleGetPortStatusCallback',{addr: this.addr,index,copeRow:{...row,portStatus: 3}}) //更新数据
                     messageTip('success',`${this.addr}号从机${row.port}号端口锁定成功`)
                  }else{
                     messageTip('error',res.message)
                  }
                }).catch(e=>{
                  this.$delete(row,'lockLoading')
                })
            }else{ //非一拖二设备
                this.$set(row,'lockLoading',true)
                lockDevicePort({port: row.port,status: 0,code: this.code}).then(res=>{
                    this.$delete(row,'lockLoading')
                    if (res.err == "0") {
                        messageTip('error',res.errinfo)
                        return
                    }
                    if (res.err == "1") {
                        messageTip('error',res.errinfo)
                        return
                    }
                    let portStatus
                    if(res.status == 0){ //当返回的status为0时，portStatus改为3（锁定）
                        portStatus= 3
                    }else if(row.portStatus == 3){ //当portStatus为3（锁定）是，设置portStatus为1，为1是空闲
                        portStatus= 1
                    }
                    this.$emit('handleLockPortStatusCallback',{index,portStatus})
                }).catch(err=>{ 
                    this.$delete(row,'lockLoading')
                })
            }
        },
        handleDebloack(index,row){ //解锁
            if(this.hwVerson == '11'){ //一拖二端口解锁
              this.$set(row,'unlockLoading',true)
              lockOrUnlockPort({code: this.code,addr: this.addr,port: row.port,status: 1}).then(res=>{
                  this.$delete(row,'unlockLoading')
                  if(res.code == 200){
                     this.$emit('handleGetPortStatusCallback',{addr: this.addr,index,copeRow:{...row,portStatus: 1}}) //更新数据
                     messageTip('success',`${this.addr}号从机${row.port}号端口解锁成功`)
                  }else{
                     messageTip('error',res.message)
                  }
                }).catch(e=>{
                  this.$delete(row,'unlockLoading')
              })

            }else{ //非一推二端口解锁
                this.$set(row,'unlockLoading',true)
                lockDevicePort({port: row.port,status: 1,code: this.code}).then(res=>{
                    this.$delete(row,'unlockLoading')
                    if (res.err == "0") {
                        messageTip('error',res.errinfo)
                        return
                    }
                    if (res.err == "1") {
                        messageTip('error',res.errinfo)
                        return
                    }
                    let portStatus
                    if(res.status == 1){ //当返回的status为0时，portStatus改为3（锁定）
                        portStatus= 1
                    }else if(row.portStatus == 3){ //当portStatus为3（锁定）是，设置portStatus为1，为1是空闲
                        portStatus= 1
                    }
                    this.$emit('handleLockPortStatusCallback',{index,portStatus})
              
                }).catch(err=>{ 
                    this.$delete(row,'unlockLoading')
                })
            }
        },

    }
};
</script>

<style>
</style>