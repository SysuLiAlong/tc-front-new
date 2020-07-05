<template>
    <div>
        <van-nav-bar
            title="材料"
            left-text= "返回"
            right-text= "新建材料"
            @click-left="onClickLeft"
            @click-right="createMaterial"
        />
      <van-search
        v-model="code"
        show-action
        label="材料编码"
        placeholder="请输入搜索关键词"
        @search="getMaterial"
      >
        <template #action>
          <div @click="getMaterial">搜索</div>
        </template>
      </van-search>
      <van-list>
          <van-cell v-for="item in materialList">
            <div>
              <span class="code">{{item.code}}</span>
              <span class="typeName">{{item.typeName}}</span>
              <van-button size="small" class="delete" @click="onDelete(item.id)">删除</van-button>
            </div>
          </van-cell>
        </van-list>

      <van-dialog
            v-model="show" title="新建材料" show-cancel-button
            @confirm="save"
        >
          <van-form @submit="onSubmit" ref="form">
            <van-field
              v-model="newCode"
              name="code"
              label="材料编号"
              placeholder="材料编号"
              :rules="[{ required: true, message: '请填写材料编号' }]"
            />
            <van-field
              clickable
              name="type"
              :value="typeLabel"
              label="材料类型"
              placeholder="点击选择类型"
              @click="picker"
            />
            <van-field
              v-show="showNewType"
              v-model="newTypeName"
              name="typeName"
              label="材料类型"
              placeholder="输入材料类型"
            />
          </van-form>
        </van-dialog>
      <van-popup v-model="showPicker" position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="showPicker = false"
        />
      </van-popup>
    </div>
</template>

<script>
import Toast from 'vant/lib/toast'
import request from '@/api/request'

export default {
  name: 'Material',
  data () {
    return {
      materialList: [],
      typeList: [],
      columns: [],
      userInfo: null,
      loading: false,
      finished: false,
      code: null,
      newCode: null,
      show: false,
      showPicker: false,
      typeLabel: null,
      typeValue: null,
      showNewType: false,
      newTypeName: null
    }
  },
  methods : {
    getMaterial () {
      request.listMaterial(this.code)
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.code == 0) {
            this.materialList = res.data
          } else {
            Toast.fail(res.msg)
          }
        })
    },
    getTypes () {
      request.listTypes()
        .then(res => {
          if(res.code === 0) {
            this.typeList = res.data
            this.columns = []
            this.typeList.push({value:-1,label:'新类型'})
            this.typeList.forEach(material => {
              this.columns.push(material.label)
            })
          } else {
            Toast.fail(res.msg)
          }
        })
    },
    onClickLeft () {
      this.$router.back()
    },
    createMaterial () {
      this.show = true
    },
    save () {
      this.$refs.form.submit()
    },
    onConfirm(value) {
      this.typeLabel = value
      this.showPicker = false;
    },
    onDelete(id) {
      request.deleteMaterial(id)
        .then(res => {
          if(res.code === 0) {
            Toast("删除成功")
            this.getMaterial()
          } else {
            Toast.fail(res.msg)
          }
        })
    },
    onSubmit(values) {
      let data = {
        type: this.typeValue,
        typeName: this.typeLabel,
        code: this.newCode
      }
      if(this.typeValue === -1) {
        data.typeName = this.newTypeName
      }
      request.addMaterial(data)
        .then(res => {
          if(res.code === 0) {
            Toast.success("新增成功")
            this.show = false
            this.getMaterial()
          } else {
            Toast.fail(res.msg)
          }
        })
    },
    picker() {
      this.showPicker = true
      this.getTypes()
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.getMaterial()
  },
  watch: {
    typeLabel: function (val) {
      if (val === '新类型') {
        this.showNewType = true
      } else {
        this.showNewType = false
      }
      this.typeList.forEach(type => {
        if (type.label === val) {
          this.typeValue = type.value
          return
        }
      })
    },
  }
}
</script>

<style scoped>
.code {
  float: left;
  width: 50px;
}
.typeName {
  margin-left: 80px;
  width: 50px;
  text-align: center;
}
.delete {
  float: right;
}
</style>
