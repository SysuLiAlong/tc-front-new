<template>
    <div>
        <div style="text-align: center">
          <van-image
            width="100"
            height="100"
            src="https://img.yzcdn.cn/vant/cat.jpeg"
          />
        </div>
        <van-form @submit="onSubmit" id="form">
            <van-field
                    v-model="username"
                    name="用户名"
                    label="用户名"
                    placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]"
            />
            <van-field
                    v-model="password"
                    type="password"
                    name="密码"
                    label="密码"
                    placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]"
            />
            <van-checkbox v-model="checked" style="margin-top: 20px;margin-left: 20px">记住密码</van-checkbox>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
import Toast from 'vant/lib/toast'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      checked: true
    }
  },
  methods: {
    onSubmit () {
      this.$Api.login(this.username, this.password)
        .then(res => {
          if (res.code === 0) {
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            this.$router.push({name: 'main'})
          } else {
            Toast(res.msg)
          }
        })
    }
  }
}
</script>

<style scoped>
    #form {
        margin-top: 20px;
    }
</style>
