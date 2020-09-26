<template>
  <div>
    <van-nav-bar
      title="生产计划"
      left-text= "返回"
      :right-text= "isCommonUser ? null : '删除'"
      @click-left="onClickLeft"
      @click-right="deleteProduce"
    />

    <van-list>
      <div v-for="item in produceProductList">
        <p>
          <span
            style="margin-left: 3%; display: inline-block; width: 40%; color: #1989fa; text-decoration:underline"
            @click="produceProductDetail(item.id)"
          >
            产品名称：{{item.productName}}
          </span>
          <span style="margin-left: 1%;margin-right: 3%; display: inline-block; ">
            产品编码：{{item.productCode}}
          </span>
        </p>
        <p>
          <span>
            当前流程：{{item.currentProcess}}
          </span>
          <span>
            负责人：{{item.chargeUserName}}
          </span>
          <span>
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
        this.$router.push({name: 'productDetail',params: {produceProductId: produceProductId}})
      },
      loadProduceProduct(produceId) {
        request.loadProduceProduct(produceId)
          .then(res => {
            if (res.code === 0) {
              this.produceProductList = res.data.data
            } else {
              Toast.fail(res.msg)
            }
          })
      }
    },
    created () {
      this.initData()
      this.userInfo = JSON.parse(localStorage.getItem("userInfo"))
      this.isCommonUser = this.userInfo.roleId == role.commonUser ? true : false
      this.produceId = this.$route.params.produceId
      this.loadProduceProduct(this.produceId)
    }
  }
</script>

<style scoped>
  .textarea-inherit {
    width: 80%;
    margin: 3px;
    padding: 3px;
    overflow: auto;
  }
  .myInput {
    background:#fafdfe;
    height:24px;
    width:140px;
    padding-left: 5px;;
    line-height:28px;
    border:1px solid #9bc0dd;
    -moz-border-radius:2px;
    -webkit-border-radius:2px;
    border-radius:2px;
  }
</style>
