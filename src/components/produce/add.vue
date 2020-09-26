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

    <van-list
      v-for="(item, index) in addedProductList"
    >
      <div class="addProduceClass">
        <van-field v-model="item.code" label="产品编码" placeholder="请输入产品编码"/>
        <van-field v-model="item.mount" label="生产数量" placeholder="请输入生产数量"/>
        <van-field :value="item.mount / item.numsPerStove" v-if="item.numsPerStove" disabled label="炉数"/>
        <van-button type="info" size="small" style="margin-top: 5px;margin-left: 5px" @click="addProduceProduct(item)">新增</van-button>
        <van-button type="danger" size="small" style="margin-top: 5px;margin-left: 5px" @click="deleteProduceProduct(index)">删除</van-button>
      </div>
    </van-list>

    <van-field
      v-model="produceParam.description"
      label="描述"
      type="textarea"
      placeholder="请描述生产计划"
      autosize
    />
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
          description: "",
          produceProductParams: []
        },
        addedProductList: [],
        isSaved: false,
        selectedProduct: null,
        productCode: null,
        canAdd: true
      }
    },
    methods: {
      initData () {
        this.isSaved = false
        this.canAdd = true
        this.produceParam = {
          orderCode: "",
          description: "",
          produceProductParams: []
        }
        this.addedProductList = [{
          code: null,
          mount: null,
          numsPerStove: null
        }]
      },
      onClickLeft () {
        this.$router.back()
      },
      async saveProduce () {
        if (this.isSaved) {
          Toast("已经保存！")
          return
        }
        if (!this.produceParam.orderCode) {
          Toast("订单号不能为空！")
          return
        }
        if (this.addedProductList.length === 0) {
          Toast("至少添加一个产品！")
          return
        }

        for (let index = 0; index < this.addedProductList.length; index++) {
          let item = this.addedProductList[index]
          if (!item.code || !item.mount) {
            Toast("产品编码和数量不能为空！")
            return;
          }
          // 第一条和最后一条记录保存时校验code和mount，并且获取productId
          if (index === 0 || index === this.addedProductList.length - 1) {
            console.log('111')
            await this.queryProductByCode(item)
          }
        }
        if (this.canAdd) {
          console.log('4444')
          request.addProduce(this.produceParam)
            .then(res => {
              console.log('555')
              if (res.code === 0) {
                this.isSaved = true
                Toast("保存成功")
              } else {
                Toast.fail(res.msg)
              }
            })
        }

      },
      addProduceProduct(item) {
        if (!item.code || !item.mount) {
          Toast("产品编码和数量不能为空！")
          return;
        }
        this.queryProductByCode(item)

        let newItem = {
          code : null,
          productId : null,
          mount : null,
          numsPerStove : null
        }
        this.addedProductList.push(newItem)
      },
      deleteProduceProduct(index) {
        this.addedProductList.splice(index, 1)
      },
      async queryProductByCode(item) {
        console.log('222')
        await request.queryProductByCode(item.code)
          .then(res => {
            if (res.code === 0) {
              let product = {
                productId: res.data.id,
                mount: item.mount
              }
              this.produceParam.produceProductParams.push(product)
            } else {
              console.log('333')
              Toast.fail(res.msg)
              this.canAdd = false
            }
          })
      }
    },
    created () {
      this.initData()
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
  .addProduceClass {
    width: 98%;
    border: 3px #ebedf0 solid;
  }
</style>
