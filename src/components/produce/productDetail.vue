<template>
    <div>
      <van-nav-bar
        title="生产详情"
        left-text= "返回"
        @click-left="onClickLeft"
      />
      <div>
        <p>
          <span
            style="margin-left: 3%; display: inline-block; width: 40%;">
            产品：{{produceProductDetail.code}}
          </span>
          <span style="margin-left: 3%;margin-right: 3%; display: inline-block;">
            名称：{{produceProductDetail.productName}}
          </span>
        </p>
        <p>
          <span
            style="margin-left: 3%; display: inline-block; width: 40%;">
            数量/炉：{{produceProductDetail.numsPerStove}}
          </span>
          <span style="margin-left: 3%;margin-right: 3%; display: inline-block;">
            次品率：{{produceProductDetail.alertPercent ? produceProductDetail.alertPercent + '%' : ''}}
          </span>
        </p>
        <p>
          <span
            style="margin-left: 3%; display: inline-block; width: 40%;">
            创建人：{{produceProductDetail.createBy}}
          </span>
          <span style="margin-left: 3%;margin-right: 3%; display: inline-block;">
            计划数量：{{produceProductDetail.stove}}
          </span>
        </p>
        <p>
          <span
            style="margin-left: 3%; display: inline-block; width: 40%; ">
            当前流程：{{produceProductDetail.produceProcessName}}
          </span>
          <span style="margin-left: 3%;margin-right: 3%; display: inline-block;">
            负责人：{{produceProductDetail.processChargeUserName}}
          </span>
        </p>
      </div>
      <van-divider>流程</van-divider>
      <van-list>
        <div v-for="item in produceProcess">
          <p>
            <span
              style="margin-left: 3%; display: inline-block; width: 25%;"
            >
              名称：{{item.processName}}
            </span>
            <span style="margin-left: 3%;margin-right: 3%; display: inline-block; width: 35%">
              接收时间：{{item.startTime}}
            </span>
            <span style="margin-left: 3%;margin-right: 3%; display: inline-block; width: 20%">
              数量：{{item.startNum}}
            </span>
          </p>
          <p>
            <span
              style="margin-left: 3%; display: inline-block; width: 25%;"
            >
              负责人：{{item.chargeUserName}}
            </span>
            <span style="margin-left: 3%;margin-right: 3%; display: inline-block; width: 35%">
              完成时间：{{item.endTime}}
            </span>
            <span style="margin-left: 3%;margin-right: 3%; display: inline-block; width: 20%">
              数量：{{item.endNum}}
            </span>
          </p>
          <van-divider></van-divider>
        </div>
      </van-list>
      <van-divider>信息</van-divider>
      <van-list>
        <div
          v-for="item in produceMsg"
          style="border: 1px solid black;padding: 5px;margin-left: 3%;margin-right: 3%;margin-top: 5px">
          <span>{{item.createTime}}</span><br>
          <span style="margin-top: 3px">{{item.content}}</span>
        </div>
      </van-list>

      <div style="width: 100%;margin-top: 10px;margin-bottom: 10px">
        <van-button color="#1E38FA" size="small" style="margin-left: 5%" @click="addMsg">添加信息</van-button>
        <van-button color="#1E38FA" size="small" style="margin-left: 5%" :disabled="!isEnd" @click="acceptProcess">接受</van-button>
        <van-button color="#1E38FA" size="small" style="margin-left: 5%" :disabled="!isEnd" @click="rejectProcess">退回</van-button>
        <van-button color="#1E38FA" size="small" style="margin-left: 5%" :disabled="isEnd" @click="transmitProcess">转交</van-button>
      </div>

      <van-dialog
        v-model="showAddMsg" title="添加信息" show-cancel-button
        :before-close="beforeCloseMsg"
        @close="loadPage"
      >
        <div style="text-align: center">
          <textarea v-model="content" class="textarea-inherit" rows="5"/>
        </div>
      </van-dialog>

      <van-dialog
        v-model="showAccept" title="接收" show-cancel-button
        :before-close="beforeCloseAccept"
        @close="loadPage"
      >
        <div style="text-align: center">
          <p>来自：{{lastProcess.processName}}</p>
          <p>完成数量：{{lastProcess.endNum}}</p>
        </div>
      </van-dialog>

      <van-dialog
        v-model="showReject" title="退回" show-cancel-button
        :before-close="beforeCloseReject"
        @close="loadPage"
      >
        <div style="text-align: center">
          <p>来自：{{lastProcess.processName}}</p>
          <p>完成数量：{{lastProcess.endNum}}</p>
        </div>
      </van-dialog>

      <van-dialog
        v-model="showTransmit" title="转交" show-cancel-button
        :before-close="beforeCloseTransmit"
        @close="closeTransmit"
      >
        <div style="text-align: center">
          <div style="text-align: center">
            <p>转交至：{{nextProcess.processName}}</p>
            <p>完成数量：<input type="number" class="myInput" v-model="fulfillNum" ></p>
          </div>
        </div>
      </van-dialog>

    </div>
</template>

<script>
  import request from '../../api/request'
  import Toast from 'vant/lib/toast'
  import {role} from './../../constant'

  export default {
    name: 'detail',
    data () {
      return {
        userInfo: {},
        isCommonUser: true,
        showAddMsg: false,
        showAccept: false,
        showReject: false,
        showTransmit: false,
        produceProductId: '',
        produceProductDetail: {

        },
        produceProcess:[],
        produceMsg: [],
        lastProcess: {},
        currentProcess: {},
        nextProcess: {},
        fulfillNum: '',
        content: ''
      }
    },
    computed: {
      isEnd: function () {
        return this.lastProcess.status === 3
      }
    },
    methods: {
      initData () {
        this.produceProductId = ''
        this.produceDetail = {}
        this.produceProcess = []
        this.produceMsg = []
      },
      loadPage () {
        this.loadProduceProductDetail()
        this.loadLastProcess()
        this.loadCurrentProcess()
        this.loadNextProcess()
        this.loadProduceProcess()
        this.loadProduceMsg()
      },
      loadProduceProductDetail () {
        if (this.produceProductId !== null && this.produceProductId !== undefined) {
          request.detailProduceProduct(this.produceProductId)
            .then(res => {
              if(res.code === 0) {
                this.produceProductDetail = res.data
              } else {
                Toast(res.msg)
              }
            })
        } else {
          Toast.fail("数据异常，请返回重试！")
        }
      },
      loadProduceProcess () {
        if (this.produceId !== null && this.produceId !== undefined) {
          request.listProduceProcess(this.produceId)
            .then(res => {
              if(res.code === 0) {
                res.data.forEach(item => {
                  item.startTime = this.processDateFormat(item.startTime)
                  item.endTime = this.processDateFormat(item.endTime)
                })
                this.produceProcess = res.data
              } else {
                Toast(res.msg)
              }
            })
        } else {
          Toast.fail("数据异常，请返回重试！")
        }
      },
      loadProduceMsg () {
        if (this.produceProductId !== null && this.produceProductId !== undefined) {
          request.listProduceMsg(this.produceProductId)
            .then(res => {
              if(res.code === 0) {
                res.data.forEach(item => {
                  item.createTime = this.msgDateFormat(item.createTime)
                })
                this.produceMsg = res.data
              } else {
                Toast(res.msg)
              }
            })
        } else {
          Toast.fail("数据异常，请返回重试！")
        }
      },
      onClickLeft () {
        this.$router.back()
      },
      loadLastProcess () {
        request.getLastProduceProcess(this.produceProductId)
          .then(res => {
            if (res.code === 0) {
              this.lastProcess = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      loadCurrentProcess () {
        request.getCurrentProduceProcess(this.produceProductId)
          .then(res => {
            if (res.code === 0) {
              this.currentProcess = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      loadNextProcess () {
        request.getNextProduceProcess(this.produceProductId)
          .then(res => {
            if (res.code === 0) {
              this.nextProcess = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      addMsg () {
        this.showAddMsg = true
      },
      beforeCloseMsg (action, done) {
        if (action == 'confirm') {
          let produceMsg = {
            produceProductId: this.produceProductId,
            content: this.content,
            type: 1,
            processName: this.currentProcess.name
          }
          request.addProduceMsg(produceMsg)
            .then(res => {
              if (res.code === 0) {
                Toast("添加信息成功！")
                done(true)
              } else {
                Toast.fail(res.msg)
                done(false)
              }
            })
        } else {
          done(true)
        }
      },
      acceptProcess () {
        this.showAccept = true
      },
      beforeCloseAccept (action,done) {
        if (action == 'confirm') {
          let param = {
            produceMsgParam: {
              produceProductId: this.produceProductId,
              type: 2,
              processName: this.lastProcess.name
            },
            produceProcessParam: this.lastProcess
          }
          request.acceptProduce(param)
            .then(res => {
              if (res.code === 0) {
                Toast("接收成功！")
                done(true)
              } else {
                Toast.fail({
                  position: 'top',
                  message: res.msg
                })
                done(false)
              }
            })
        } else {
          done(true)
        }
      },
      rejectProcess () {
        this.showReject = true
      },
      beforeCloseReject (action,done) {
        if (action == 'confirm') {
          let param = {
            produceMsgParam: {
              produceId: this.produceId,
              type: 3,
              processName: this.lastProcess.name
            },
            produceProcessParam: this.lastProcess
          }
          request.rejectProduce(param)
            .then(res => {
              if (res.code === 0) {
                Toast("回退成功！")
                done(true)
              } else {
                Toast.fail({
                  position: 'top',
                  message: res.msg
                })
                done(false)
              }
            })
        } else {
          done(true)
        }
      },
      transmitProcess () {
        this.showTransmit = true
      },
      beforeCloseTransmit (action,done) {
        if (action == 'confirm') {
          let param = {
            produceMsgParam: {
              produceId: this.produceId,
              amount: this.fulfillNum,
              type: 4,
              processName: this.nextProcess.name
            },
            produceProcessParam: this.currentProcess
          }
          request.transmitProduce(param)
            .then(res => {
              if (res.code === 0) {
                done(true)
                Toast("转交成功！")
              } else {
                Toast.fail({
                  position: 'top',
                  message: res.msg
                })
                done(false)
              }
            })
        } else {
          done(true)
        }
      },
      closeTransmit () {
        this.fulfillNum = null
        this.loadPage()
      },
      msgDateFormat (timestamps) {
        let date = new Date(timestamps);
        let Y = date.getFullYear() + '年';
        let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
        let D = date.getDate() + '日 ';
        let h = date.getHours() + ':';
        let m = date.getMinutes();
        return (Y+M+D+h+m);
      },
      processDateFormat (timestamps) {
        if (timestamps) {
          let date = new Date(timestamps);
          let D = date.getDate() + '日 ';
          let h = date.getHours() + ':';
          let m = date.getMinutes();
          return (D+h+m);
        } else {
          return ''
        }
      }
    },
    created () {
      this.initData()
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.isCommonUser = this.userInfo.roleId == role.commonUser ? true : false
      this.produceProductId = this.$route.params.produceProductId
      this.loadPage()
    }
  }
</script>

<style scoped>
  .textarea-inherit {
    width: 80%;
    margin: 3px;
    padding: 3px;
    overflow: auto;
  }
  .myInput {
    background:#fafdfe;
    height:24px;
    width:140px;
    padding-left: 5px;;
    line-height:28px;
    border:1px solid #9bc0dd;
    -moz-border-radius:2px;
    -webkit-border-radius:2px;
    border-radius:2px;
  }
</style>
