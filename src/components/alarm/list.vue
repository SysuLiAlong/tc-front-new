<template>
  <div>
    <van-nav-bar
      title="告警"
      left-text= "返回"
      @click-left="onClickLeft"
    />
    <van-dropdown-menu>
      <van-dropdown-item v-model="type" :options="typeList" />
    </van-dropdown-menu>

    <van-cell v-for="(item,index) in alarmList" :title="item.produceCode" :value="item.content"></van-cell>
    <div style="width: 100%;margin-top: 10px">
      <van-button color="#1E38FA" size="small" style="float: left; margin-left: 15%" @click="lastPage">上一页</van-button>
      <van-button color="#1E38FA" size="small" style="float: right; margin-right: 15%" @click="nextPage">下一页</van-button>
    </div>
  </div>
</template>

<script>
  import Toast from 'vant/lib/toast'
  import request from '../../api/request'
  export default {
    name: 'list.vue',
    data() {
      return {
        alarmList: [],
        typeList: [
          { text: '全部告警', value: null },
          { text: '超时告警', value: 1 },
          { text: '次品率告警', value: 2 },
        ],
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0,
        },
        type: '',
      }
    },
    methods: {
      initData () {
        this.alarmList = []
        this.type = null
        this.page = {
          pageNo: 1,
          pageSize: 10,
          total: 0,
        }
      },
      lastPage () {
        if (this.page.pageNo <= 1) {
          Toast("已经是第一页了！")
        } else {
          this.page.pageNo = this.page.pageNo - 1
          this.loadProduce()
        }
      },
      nextPage () {
        if (this.page.pageNo * this.page.pageSize + this.page.pageSize > this.page.total) {
          Toast("已经是最后一页了！")
        } else {
          this.page.pageSize = this.page.pageSize + 1
          this.loadProduce()
        }
      },
      loadAlarmList() {
        let queryParam = {
          pageNo: this.page.pageNo,
          pageSize: this.page.pageSize,
          type: this.type
        }
        request.pageQryAlarm(queryParam)
          .then(res => {
            if (res.code === 0) {
              this.alarmList = res.data.data
              this.page = {
                pageNo: res.data.pageNo,
                pageSize: res.data.pageSize,
                total: res.data.total
              }
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      onClickLeft () {
        this.$router.back()
      },
    },
    created () {
      this.initData();
      this.loadAlarmList();
    }
  }
</script>

<style scoped>

</style>
