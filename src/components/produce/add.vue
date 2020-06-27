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
          :value="item.code">
          {{item.name}}
        </option>
      </select>
    </van-cell>
    <van-field v-model="produceParam.stove" type="digit" label="产品数量/炉" placeholder="请输入炉数"/>
    <van-field label="其他" disabled>
      <template #button>
        <van-button size="small" type="primary" @click="editable = !editable">{{editable ? '保存' : '编辑'}}</van-button>
      </template>
    </van-field>
    <textarea v-model="produceParam.description" :disabled=!editable class="textarea-inherit"  rows="5"></textarea>
  </div>
</template>

<script>

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
        editable: false
      }
    },
    methods: {
      initData () {
        this.productList.push({code: 1,name: 1})
      },
      onClickLeft () {
        this.$router.back()
      },
      saveProduce () {

      },
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
