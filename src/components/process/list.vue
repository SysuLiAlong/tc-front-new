<template>
  <div>
    <van-nav-bar
      title="流程"
      left-text= "返回"
      right-text= "新建流程"
      @click-left="onClickLeft"
      @click-right="createProcess"
    />
    <van-cell v-for="(item,index) in processList">
      <span style="display: inline-block;width: 35%;color: #1989fa; text-decoration:underline"
            @click="detailProcess(item.id)">{{item.name}}</span>
      <span style="display: inline-block;margin-left: 3%;width: 30%">{{item.chargeUserName}}</span>
      <van-icon name="arrow-up" style="float: right;margin-left: 2%" :disabled="index !== 0" @click="upPriority(item.id,index)"/>
      <van-icon name="arrow-down" style="float: right;margin-right: 8%" :disabled="index !== processList.length -1" @click="downPriority(item.id,index)"/>
    </van-cell>
  </div>
</template>

<script>
  import request from '../../api/request'
  import Toast from 'vant/lib/toast'

  export default {
    name: 'Process',
    data() {
      return {
        processList: [],
      }
    },
    methods: {
      getProcessList( ){
        request.listProcess()
          .then(res => {
            if(res.code === 0) {
              this.processList = res.data
            }
          })
      },
      detailProcess (processId) {
        this.$router.push({name: 'processDetail',params: {processId: processId}})
      },
      onClickLeft() {
        this.$router.back()
      },
      createProcess () {
        this.$router.push({name: 'processDetail'})
      },
      upPriority (id,index) {
        let lastProcess = this.processList[index - 1]
        request.exChangePriority(lastProcess.id,id)
          .then(res => {
            if (res.code === 0) {
              this.getProcessList()
            } else {
              Toast({
                duration: 3000,
                message: res.msg
              })
            }
          })
      },
      downPriority (id,index) {
        let nextProcess = this.processList[index + 1]
        request.exChangePriority(nextProcess.id,id)
          .then(res => {
            if (res.code === 0) {
              this.getProcessList()
            } else {
              Toast({
                duration: 3000,
                message: res.msg
              })
            }
          })
      }
    },
    created () {
      this.getProcessList()
    },
  }
</script>

<style scoped>
  .name {
    float: left;
    width: 50px;
  }
  .chargeUser {
    margin-left: 80px;
    width: 50px;
    text-align: center;
  }
  .delete {
    margin-left: 5px;
    float: right;
  }
  .edit {
    float : right;
  }
</style>
