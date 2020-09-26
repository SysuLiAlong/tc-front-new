<template>
  <div>
    <van-nav-bar
      title="生产计划"
      left-text= "返回"
      :right-text= "isCommonUser ? null : '新建计划'"
      @click-left="onClickLeft"
      @click-right="createProduce"
    />
    <van-search
      v-model="orderCode"
      show-action
      label="订单号"
      placeholder="请输入订单号"
      @search="loadProduce"
    >
      <template #action>
        <div style="width: 120px">
          <select v-model="orderParam" class="orderSelect">
            <option value="">默认排序</option>
            <option value="code">单号</option>
            <option value="order_code">订单号</option>
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
            单号：{{item.code}}
          </span>
          <span style="margin-left: 1%;margin-right: 3%; display: inline-block; ">
            订单号：{{item.orderCode}}
          </span>
          <span>
            {{item.status ? '未完成' : '已完成'}}
          </span>
        </p>
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
  import request from '../../api/request'

  export default {
    name: 'list',
    data () {
      return {
        userInfo: {},
        isCommonUser: true,
        produceList: [],
        page: {
          pageNo: 1,
          pageSize: 5,
          total: 0,
        },
        orderCode: '',
        orderParam: "",
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
        let pageParams = {
          pageNo: this.page.pageNo,
          pageSize: this.page.pageSize,
          orderParam: this.orderParam,
          orderCode: this.orderCode
        }
        request.pageQryProduce(pageParams)
          .then(res => {
            if (res.code === 0) {
              this.produceList = res.data.data
              this.page.pageNo = res.data.pageNo
              this.page.pageSize = res.data.pageSize
              this.page.total = res.data.total
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      produceDetail (item) {
        this.$router.push({name: 'produceDetail',params: {produceId: item.id}})
      },
      onClickLeft () {
        this.$router.back()
      },
      createProduce () {
        if (this.isCommonUser) {
          return
        }
        this.$router.push({name: 'produceAdd'})
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
      }
    },
    created () {
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.isCommonUser = this.userInfo.roleId == 3 ? true : false
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
