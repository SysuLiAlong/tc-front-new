<template>
    <div>
        <van-nav-bar
            title="主页"
            :left-text= "this.userInfo.realName"
            @click-left="toUserInfo"

        />
        <div v-if="this.userInfo.role === role.commonUser">
          <van-grid clickable :column-num="1">
            <van-grid-item icon="todo-list-o" text="代办" to="/produce" />
          </van-grid>
        </div>
        <div v-if="this.userInfo.role === role.admin">
          <van-grid clickable :column-num="2">
            <van-grid-item icon="bag-o" text="材料" to="/material" />
            <van-grid-item icon="goods-collect-o" text="产品" to="/product" />
          </van-grid>
          <van-grid clickable :column-num="2">
            <van-grid-item icon="peer-pay" text="流程" to="/process" />
            <van-grid-item icon="aim" text="生产计划" to="/produce" />
          </van-grid>
        </div>
        <div v-if="this.userInfo.role === role.superAdmin">
          <van-grid clickable :column-num="2">
            <van-grid-item icon="bag-o" text="材料" to="/material" />
            <van-grid-item icon="goods-collect-o" text="产品" to="/product" />
          </van-grid>
          <van-grid clickable :column-num="2">
            <van-grid-item icon="peer-pay" text="流程" to="/process" />
            <van-grid-item icon="aim" text="生产计划" to="/produce" />
          </van-grid>
          <van-grid clickable :column-num="1">
            <van-grid-item icon="manager-o" text="账号" to="/account" />
          </van-grid>
        </div>
    </div>
</template>

<script>
  import {role} from './../constant'

  export default {
    name: "Main",
    data() {
      return {
        userInfo: null,
        role: role
      }
    },
    methods : {
        jump() {
            this.$router.push({name: 'button'})
        },
      toUserInfo() {
            this.$router.push({name: 'userInfo'})
        }
    },
    created() {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
    }
    }
</script>

<style scoped>

</style>
