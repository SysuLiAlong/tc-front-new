<template>
    <div>
      <van-checkbox-group v-model="result" direction="horizontal">
        <van-checkbox v-for="item in arr" :name="item.name">{{item.text}}</van-checkbox>

      </van-checkbox-group>
      <van-button @click="click1">点击</van-button>
    </div>
</template>

<script>
  export default {
    name: 'CheckBoxTest',
    data() {
      return {
        arr: [
          {name: 'a', text: 'a'},
          {name: 'b', text: 'b'},
          {name: 'c', text: 'c'},
          {name: 'd', text: 'd'},
          {name: 'e', text: 'e'},
        ],
        result: []
      }
    },
    methods: {
      click1 () {
        alert(this.result)
      }
    }
  }
</script>

<style scoped>

</style>
