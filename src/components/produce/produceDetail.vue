<template>
  <div>
    <van-nav-bar
      title="生产计划"
      left-text= "返回"
      :right-text= "isCommonUser ? null : '删除'"
      @click-left="onClickLeft"
      @click-right="showDelete = true"
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

    <van-dialog
      v-model="showDelete" title="填写原因" show-cancel-button
      :before-close="beforeDeleteProduce"
      @close="comment = ''"
    >
      <van-field
        v-model="comment"
        label="原因"
        type="textarea"
        placeholder="请输入原因"
        autosize
      />
    </van-dialog>
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
        comment: '',
        showDelete: false
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
      beforeDeleteProduce (action, done) {
        if (action == "confirm") {
          if (this.isCommonUser) {
            Toast({
              message: '对不起，只有超级管理员才能删除！',
              position: 'top'
            });
            return
          }
          if (this.comment == "") {
            Toast({
              message: "请填写完原因再确认！",
              position: 'top'
            })
            done(false)
            return
          }
          request.deleteProduce(this.produceId, this.comment)
            .then(res => {
              if (res.code === 0) {
                Toast({
                  message: "删除成功！",
                  position: 'top'
                })
                done(true)
                this.$router.back()
              } else {
                Toast({
                  message: res.msg,
                  position: 'top'
                })
                done(false)
              }
            })
        } else {
          done(true)
        }
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
