<template>
  <div style="width: 100%;margin-top: 10px">
    <van-button color="#1E38FA" size="small" style="float: left; margin-left: 15%" @click="lastPage">上一页</van-button>
    <van-button color="#1E38FA" size="small" style="float: right; margin-right: 15%" @click="nextPage">下一页</van-button>
  </div>
</template>

<script>
  import Toast from 'vant/lib/toast'

  export default {
    name: 'Page',
    props: {

    },
    data () {
      return {
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0,
        },
      }
    },
    methods: {
      lastPage () {
        if (this.page.pageNo <= 1) {
          Toast("已经是第一页了！")
        } else {
          this.page.pageNo = this.page.pageNo - 1
          this.loadProduct()
        }
      },
      nextPage () {
        if (this.page.pageNo * this.page.pageSize + this.page.pageSize > this.page.total) {
          Toast("已经是最后一页了！")
        } else {
          this.page.pageSize = this.page.pageSize + 1
          this.loadProduct()
        }
      }
    }
  }
</script>

<style scoped>

</style>
