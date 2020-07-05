<template>
  <div>
    <van-nav-bar
      title="流程"
      left-text= "返回"
      right-text= "保存"
      @click-left="onClickLeft"
      @click-right="saveProcess"
    />
    <p>
      <span style="display: inline-block;margin-left: 3%;width: 20%">流程名称：</span>
      <input type="text" v-model="process.name">
    </p>
    <p>
      <span style="display: inline-block;margin-left: 3%;width: 20%">负责人：</span>
      <select v-model="process.chargeUserId" style="padding: 1px 2px;width: 166px">
        <option v-for="item in userList" :value="item.value">{{item.label}}</option>
      </select>
    </p>

    <div style="margin: 20px 80px 20px 80px;" v-show="!isAdd">
      <van-button block type="danger" size="normal" @click="deleteProcess">
        删除
      </van-button>
    </div>
  </div>
</template>

<script>
  import request from '../../api/request'
  import Toast from 'vant/lib/toast'

  export default {
    name: 'detail',
    data () {
      return {
        userList: [],
        process: {
          id: '',
          name: '',
          chargeUserId: '',
          chargeUserName: ''
        },
        processId: '',
        isAdd: true
      }
    },
    methods: {
      initData () {
        this.userList = []
        this.process = {}
      },
      loadUserList () {
        request.userOptions()
          .then(res => {
            if (res.code === 0) {
              this.userList = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      loadProcessDetail () {
        request.processDetail(this.processId)
          .then(res => {
            if (res.code === 0) {
              this.process = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      onClickLeft() {
        this.$router.back()
      },
      saveProcess () {
        if (this.isAdd) {
          request.addProcess(this.process)
            .then(res => {
              if (res.code === 0) {
                Toast("新增成功！")
                this.$router.back()
              } else {
                Toast.fail(res.msg)
              }
            })
        } else {
          request.updateProcess(this.process)
            .then(res => {
              if (res.code === 0) {
                Toast("修改成功！")
                this.$router.back()
              } else {
                Toast.fail(res.msg)
              }
            })
        }
      },
      deleteProcess () {
        request.deleteProcess(this.processId)
          .then(res => {
            if(res.code === 0) {
              Toast.success("删除成功")
              this.$router.back()
            } else {
              Toast.fail(res.msg)
            }
          })
      },
    },
    created () {
      this.initData()
      let processId = this.$route.params.processId
      if (processId !== null && processId !== undefined) {
        this.processId = processId
        this.isAdd = false
        this.loadProcessDetail()
      }
      this.loadUserList()
    },
    watch: {
      'process.chargeUserId': {
        handler (newValue) {
          this.userList.forEach(user => {
            if (user.value === newValue) {
              this.process.chargeUserName = user.label
              return
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
