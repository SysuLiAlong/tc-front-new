<template>
  <div>
    <van-nav-bar
      title="产品"
      left-text= "返回"
      right-text= "新建产品"
      @click-left="onClickLeft"
      @click-right="createProduct"
    />
    <van-search
      v-model="name"
      show-action
      label="产品名称"
      placeholder="请输入搜索关键词"
      @search="loadProduct"
    >
      <template #action>
        <div @click="loadProduct">搜索</div>
      </template>
    </van-search>
    <van-list>
      <p v-for="(item,index) in productList">
        <span style="display: inline-block;margin-left: 4%;width: 40%;color: #1989fa; text-decoration:underline"
              @click="detail(item.id)">{{item.code}}</span>
        <span style="display: inline-block;margin-right: 4%;float: right">{{item.name}}</span>
      </p>
      <van-divider></van-divider>
    </van-list>

    <div style="width: 100%;margin-top: 10px">
      <van-button color="#1E38FA" size="small" style="float: left; margin-left: 15%" @click="lastPage">上一页</van-button>
      <van-button color="#1E38FA" size="small" style="float: right; margin-right: 15%" @click="nextPage">下一页</van-button>
    </div>
  </div>
</template>

<script>
  import request from '../../api/request'
  import Toast from 'vant/lib/toast'

  export default {
    name: 'Product',
    data () {
      return {
        productList: [],
        page: {
          pageNo: 1,
          pageSize: 10,
          total: 0,
        },
        name: null,
      }
    },
    methods : {
      initData () {
        this.productList = []
        this.page = {
          pageNo: 1,
          pageSize: 10,
          total: 0,
        },
        this.name = null,
        this.show = false
      },
      loadProduct () {
        let pageParams = {
          pageNo: this.page.pageNo,
          pageSize: this.page.pageSize,
          queryParams: {
            name: this.name
          }
        }
        request.pageQryProduct(pageParams)
          .then(res => {
            if (res.code === 0) {
              this.productList = res.data.data
              this.page.pageNo = res.data.pageNo
              this.page.pageSize = res.data.pageSize
              this.page.total = res.data.total
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      onClickLeft () {
        this.$router.back()
      },
      createProduct () {
        this.$router.push({name: 'productDetail'})
      },
      detail (productId) {
        this.$router.push({name: 'productDetail',params: {productId: productId}})
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
      this.loadProduct()
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }
  .block {
    width: 80px;
    text-align: left;
    padding-left: 20px;
    background-color: #ffffff;
  }
</style>
