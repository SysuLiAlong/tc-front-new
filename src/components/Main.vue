<template>
    <div>
        <van-nav-bar
            title="主页"
            :left-text= "this.userInfo.realName"
            @click-left="toUserInfo"

        />
        <van-grid clickable :column-num="2">
            <van-grid-item icon="home-o" text="材料" to="/material" />
            <van-grid-item icon="search" text="产品" to="/product" />
        </van-grid>
        <van-grid clickable :column-num="2">
            <van-grid-item icon="home-o" text="流程" to="/process" />
            <van-grid-item icon="search" text="生产计划" to="/plan" />
        </van-grid>
        <van-grid clickable :column-num="2">
            <van-grid-item icon="home-o" text="代办" to="/todo" />
        </van-grid>
    </div>
</template>

<script>
    export default {
        name: "Main",
        data() {
          return {
              userInfo: null,
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
            console.log("created")
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
        }
    }
</script>

<style scoped>

</style>
