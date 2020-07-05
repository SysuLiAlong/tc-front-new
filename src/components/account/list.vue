<template>
    <div>
      <van-nav-bar
        title="账号管理"
        left-text= "返回"
        right-text= "新建账号"
        @click-left="onClickLeft"
        @click-right="createAccount"
      />
      <van-list>
        <p v-for="item in accountList" @click="userDetail(item.id)">
          <span style="margin-left: 3%;width: 25%;display: inline-block">
            {{item.userName}}
          </span>
          <span style="margin-left: 3%;display: inline-block;width: 25%">
            {{item.realName}}
          </span>
          <span>{{item.roleName}}</span>
          <van-icon style="margin-right: 3%;float: right" name="arrow" />
          <van-divider></van-divider>
        </p>
      </van-list>
    </div>
</template>

<script>
  import Toast from 'vant/lib/toast'
  import request from '../../api/request'

  export default {
    name: 'Account',
    data() {
      return {
        accountList: [],
        userName: null
      }
    },
    methods: {
      initData () {

      },
      loadUser () {
        request.getAllUser()
          .then(res => {
            if (res.code === 0) {
              this.accountList = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      userDetail (accountId) {
        this.$router.push({name: 'accountDetail',params: {accountId: accountId}})
      },
      onClickLeft () {
        this.$router.back()
      },
      createAccount () {
        this.$router.push({name: 'addAccount'})
      },
    },
    created () {
      this.initData()
      this.loadUser()
    }
  }
</script>

<style scoped>

</style>
