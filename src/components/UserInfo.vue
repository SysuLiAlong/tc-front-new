<template>
  <div>
    <van-nav-bar
      title="用户信息"
      left-text= "返回"
      @click-left="onClickLeft"
    />
    <van-form>
      <van-field
        :value="userInfo.userName"
        label="用户名"
        readonly
      />
      <van-field
        :value="userInfo.realName"
        label="姓名"
        readonly
      />
      <van-field
        :value="userInfo.roleName"
        label="权限"
        readonly
      />
      <van-button @click="changeVisible = true" size="small" id="modifyButton">修改密码</van-button>
    </van-form>
    <van-dialog
      v-model="changeVisible" title="修改密码" show-cancel-button
      :beforeClose=beforeClose
    >
      <van-form @submit="onSubmit" ref="form">
        <van-field
          v-model="oldPassword"
          name="oldPassword"
          label="旧密码"
          type="password"
          :rules="[{ required: true, message: '请输入旧密码' }]"
        />
        <van-field
          v-model="newPassword"
          name="newPassword"
          label="新密码"
          type="password"
          :rules="[{ required: true, message: '请输入新密码' }]"
        />
        <van-field
          v-model="confirmNewPassword"
          name="confirmNewPassword"
          label="确认新密码"
          type="password"
          :rules="[{ required: true, message: '请输入确认密码'}]"
        />
      </van-form>
    </van-dialog>
  </div>
</template>

<script>
  import Toast from 'vant/lib/toast'
  import request from '@/api/request'

  export default {
    name: 'UserInfo',
    data() {
      return {
        userInfo: {},
        changeVisible: false,
        oldPassword: null,
        newPassword: null,
        confirmNewPassword: null
      }
    },
    methods: {
      initData () {
        this.userInfo = this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
        this.changeVisible = false
        this.oldPassword = null
        this.newPassword = null
        this.confirmNewPassword = null
      },
      onClickLeft () {
        this.$router.back()
      },
      onSubmit() {
        request.changePassword(this.oldPassword, this.newPassword)
          .then(res => {
            if(res.code === 0) {
              Toast.success("修改成功,请重新登录")
              localStorage.setItem("userInfo",null)
              this.$router.push({name: 'login'})
            } else {
              Toast.success(res.msg)
            }
          })
      },
      beforeClose(action, done) {
        if (action === 'confirm') {
          this.$refs.form.submit()
        } else {
          this.initData()
          done();
        }
  }
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>
#modifyButton {
  float: left;
  margin-top: 10px;
  margin-left: 10px
}
</style>
