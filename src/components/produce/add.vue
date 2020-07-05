<template>
  <div>
    <van-nav-bar
      title="新建生产计划"
      left-text= "返回"
      right-text= "保存"
      @click-left="onClickLeft"
      @click-right="saveProduce"
    />
    <van-field v-model="produceParam.orderCode" label="订单号" placeholder="请输入订单号"/>
    <van-cell title="产品">
      <select v-model="produceParam.productCode" class="mySelect">
        <option value="">请选择产品</option>
        <option
          v-for="item in productList"
          :value="item.value">
          {{item.label}}
        </option>
      </select>
    </van-cell>
    <van-field v-model="produceParam.stove" type="digit" label="产品数量/炉" placeholder="请输入炉数"/>
    <van-field label="其他" disabled>
      <template #button>
        <van-button size="small" type="primary" @click="editable = !editable">{{editable ? '保存' : '编辑'}}</van-button>
      </template>
    </van-field>
    <textarea v-model="produceParam.content" :disabled=!editable class="textarea-inherit"  rows="5"></textarea>
  </div>
</template>

<script>

  import request from '../../api/request'
  import Toast from 'vant/lib/toast'

  export default {
    name: 'add',
    data () {
      return {
        produceParam: {
          orderCode: "",
          productCode: "",
          stove: null,
          description: ""
        },
        productList: [],
        editable: false,
        isSaved: false,
      }
    },
    methods: {
      initData () {
        this.editable = false
        this.isSaved = false
        this.produceParam = {
          orderCode: "",
          productCode: "",
          stove: null,
          description: ""
        }
      },
      loadProductOptions () {
        request.productOptions()
          .then(res => {
            if (res.code === 0) {
              this.productList = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      onClickLeft () {
        this.$router.back()
      },
      saveProduce () {
        if (this.isSaved) {
          Toast.fail("您已经保存了，如需修改，请先返回再进行修改！")
          return
        }
        request.addProduce(this.produceParam)
          .then(res => {
            if (res.code === 0) {
              this.isSaved = true
              Toast("保存成功")
            } else {
              Toast.fail(res.msg)
            }
          })
      },
    },
    created () {
      this.initData()
      this.loadProductOptions()
    }
  }
</script>

<style scoped>
  .textarea-inherit {
    width: 95%;
    margin: 3px;
    padding: 3px;
    overflow: auto;
  }
  .mySelect {
    background:#ffffff;
    height:28px;
    width:140px;
    line-height:24px;
    border:1px solid #ffffff;
    -moz-border-radius:2px;
    -webkit-border-radius:2px;
  }
</style>
