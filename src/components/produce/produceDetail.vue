<template>
  <div>
    <van-nav-bar
      title="生产计划"
      left-text= "返回"
      :right-text= "isCommonUser ? null : '删除'"
      @click-left="onClickLeft"
      @click-right="deleteProduce"
    />
    <van-list
      v-for="item in produceProductList"
    >
      <div class="produceDetailClass">
        <p>
          <span
            style="margin-left: 3%; display: inline-block; width: 40%; color: #1989fa; text-decoration:underline"
            @click="produceProductDetail(item.id)"
          >
            产品名称：{{item.productName}}
          </span>
          <span style="margin-left: 1%; display: inline-block; ">
            产品编码：{{item.productCode}}
          </span>
        </p>
        <p>
          <span style="margin-left: 3%; display: inline-block; width: 40%;">
            当前流程：{{item.currentProcess}}
          </span>
          <span style="margin-left: 1%; display: inline-block; width: 30%;">
            负责人：{{item.chargeUserName}}
          </span>
          <span style="margin-left: 1%; display: inline-block; width: 20%;">
            数量：{{item.mount}}
          </span>
        </p>
      </div>
    </van-list>
  </div>
</template>

<script>
  import request from '../../api/request'
  import Toast from 'vant/lib/toast'
  import {role} from './../../constant'

  export default {
    name: 'detail',
    data () {
      return {
        userInfo: {},
        isCommonUser: true,
        produceId: '',
        produceProductList:[],
      }
    },
    computed: {
      isEnd: function () {
        return this.lastProcess.status === 3
      }
    },
    methods: {
      initData () {
        this.produceId = ''
        this.produceProductList = []

      },
      onClickLeft () {
        this.$router.back()
      },
      deleteProduce () {
        if (this.isCommonUser) {
          return
        }
        request.deleteProduce(this.produceId)
          .then(res => {
            if (res.code === 0) {
              Toast("删除成功")
              this.$router.back()
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      produceProductDetail(produceProductId) {
        this.$router.replace({name: 'produceProductDetail',params: {produceProductId: produceProductId, produceId: this.produceId}})
      },
      loadProduceProduct(produceId) {
        request.loadProduceProduct(produceId)
          .then(res => {
            if (res.code === 0) {
              this.produceProductList = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
      }
    },
    created () {
      console.log('created')
      this.initData()
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.isCommonUser = this.userInfo.roleId == role.commonUser ? true : false
      console.log('produceId', this.$route.params.produceId)
      this.produceId = this.$route.params.produceId
      this.loadProduceProduct(this.produceId)
    }
  }
</script>

<style scoped>
  .produceDetailClass {
    border: 3px #ebedf0 solid;
  }
</style>
