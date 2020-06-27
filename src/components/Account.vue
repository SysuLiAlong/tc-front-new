<template>
    <div>
      <van-nav-bar
        title="账号"
        left-text= "返回"
        right-text= "新建账号"
        @click-left="onClickLeft"
        @click-right="createAccount"
      />
      <van-search
        v-model="userName"
        show-action
        label="用户名"
        placeholder="请输入搜索关键词"
        @search="loadAccount"
      >
        <template #action>
          <div @click="loadAccount">搜索</div>
        </template>
      </van-search>
      <van-list>
        <van-cell v-for="item in accountList" :title="item.userName" is-link :to="'account/detail/' + item.id" />
      </van-list>
      <div style="width: 100%;margin-top: 10px">
        <van-button color="#1E38FA" size="small" style="float: left; margin-left: 15%" @click="lastPage">上一页</van-button>
        <van-button color="#1E38FA" size="small" style="float: right; margin-right: 15%" @click="nextPage">下一页</van-button>
      </div>
    </div>
</template>

<script>
  import Toast from 'vant/lib/toast'
  import request from '../api/request'

  export default {
    name: 'Account',
    data() {
      return {
        accountList: [],
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0,
        },
        userName: null
      }
    },
    methods: {
      initData () {

      },
      loadAccount () {
        let pageParams = {
          pageNo: this.page.pageNo,
          pageSize: this.page.pageSize,
          queryParams: {
            userName: this.userName
          }
        }
        request.pageQryAccount(pageParams)
          .then(res => {
            if (res.code === 0) {
              this.accountList = res.data.data
              this.page.pageNo = res.data.pageNo
              this.page.pageSize = res.data.pageSize
              this.page.total = res.data.total
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      lastPage () {
        if (this.page.pageNo <= 1) {
          Toast("已经是第一页了！")
        } else {
          this.page.pageNo = this.page.pageNo - 1
          this.loadAccount()
        }
      },
      nextPage () {
        if (this.page.pageNo * this.page.pageSize + this.page.pageSize > this.page.total) {
          Toast("已经是最后一页了！")
        } else {
          this.page.pageSize = this.page.pageSize + 1
          this.loadAccount()
        }
      },
      onClickLeft () {
        this.$router.back()
      },
      createAccount () {
      },
    },
    created () {
      this.initData()
      this.loadAccount()
    }
  }
</script>

<style scoped>

</style>
