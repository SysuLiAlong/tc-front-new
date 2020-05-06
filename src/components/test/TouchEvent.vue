<template>
  <div>
    <div v-for="(item,index) in arr" :key="item.id" @touchstart.prevent="touchin(index)"  @touchend.prevent="cleartime(index)">
      <p>{{item.address}}</p>
      <p>备注：{{item.remarks}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TouchEvent',
    data () {
      return {
        arr: [{
          address: "0X21458151815165146156610561056-1",
          remarks: "imtoken"
        }, {
          address: "0X21458151815165146156610561056-2",
          remarks: "imtoken"
        },
          {
            address: "0X21458151815165146156610561056-3",
            remarks: "imtoken"
          },
        ]
      }
    },
    methods: {
      touchin(index) {
        console.log(index)
        clearInterval(this.Loop); //再次清空定时器，防止重复注册定时器
        this.Loop = setTimeout(function() {
          alert('hello')
        }.bind(this), 1000);
      },
      cleartime(index) {
        // 这个方法主要是用来将每次手指移出之后将计时器清零
        clearInterval(this.Loop);
      }
    }
  }
</script>

<style scoped>

</style>
