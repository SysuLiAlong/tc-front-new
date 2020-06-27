<template>
  <div>
    <van-nav-bar
      title="生产计划"
      left-text= "返回"
      right-text= "新建计划"
      @click-left="onClickLeft"
      @click-right="createProduce"
    />
    <van-search
      v-model="orderNum"
      show-action
      label="订单号"
      placeholder="请输入订单号"
      @search="loadProduce"
    >
      <template #action>
        <div style="width: 120px">
          <select name="order" class="orderSelect">
            <option>默认排序</option>
            <option>单号</option>
            <option>订单号</option>
          </select>
          <span @click="loadProduce">搜索</span>
        </div>
      </template>
    </van-search>
    <van-list>
      <div v-for="item in produceList">
        <p>
          <span
            style="margin-left: 3%; display: inline-block; width: 40%; color: #1989fa; text-decoration:underline"
            @click="produceDetail(item)"
          >
            {{item.produceNum}}
          </span>
          <span style="margin-left: 3%;margin-right: 3%; display: inline-block; width: 40%">
            {{item.orderNum}}
          </span>
        </p>
        <p>
          <span style="margin-left: 3%; display: inline-block; width: 40%">
            {{item.productNum}}
          </span>
          <span style="margin-left: 3%; display: inline-block; width: 25%">
            {{item.stove}}
          </span>
          <span style="margin-left: 3%; display: inline-block; width: 22%">{{item.process}}</span>
        </p>
        <van-divider></van-divider>
      </div>
    </van-list>

    <div style="width: 100%;margin-top: 10px">
      <van-button color="#1E38FA" size="small" style="float: left; margin-left: 15%" @click="lastPage">上一页</van-button>
      <van-button color="#1E38FA" size="small" style="float: right; margin-right: 15%" @click="nextPage">下一页</van-button>
    </div>
  </div>
</template>

<script>
  import Toast from 'vant/lib/toast'

  export default {
    name: 'list',
    data () {
      return {
        produceList: [],
        page: {
          pageNo: 1,
          pageSize: 5,
          total: 0,
        },
        orderNum: '',
        option1: [
          { text: '全部商品', value: 0 },
          { text: '新款商品', value: 1 },
          { text: '活动商品', value: 2 },
        ],
        value1: 0
      }
    },
    methods: {
      initData () {
        this.produceList = []
        this.page = {
          pageNo: 1,
          pageSize: 5,
          total: 0,
        }
      },
      loadProduce () {
        this.produceList = []
        for (let i = 0; i< 5; i++) {
          let produce = {
            produceNum: 'produceNum' + i,
            orderNum: 'orderNum' + i,
            productNum: 'productNum' + i,
            stove: 'stove' + i,
            process: '流程' + i
          }
          this.produceList.push(produce)
        }
      },
      produceDetail (item) {
        this.$router.push({name: 'produceDetail',params: {produceNum: item.produceNum}})
      },
      onClickLeft () {
        this.$router.back()
      },
      createProduce () {
        this.$router.push({name: 'produceAdd'})
      },
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
    },
    created () {
      this.initData()
      this.loadProduce()
    }
  }
</script>

<style scoped>
  .orderSelect {
    background:#fafdfe;
    height:28px;
    width:80px;
    line-height:28px;
    border:1px solid #9bc0dd;
    -moz-border-radius:2px;
    -webkit-border-radius:2px;
    margin-top: 2px;
    margin-bottom: 2px;
  }
</style>
