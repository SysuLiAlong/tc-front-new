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
        @search="loadMaterial"
      >
        <template #action>
          <div @click="loadMaterial">搜索</div>
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

      <div style="width: 100%;margin-top: 10px">
        <van-button color="#1E38FA" size="small" style="float: left; margin-left: 15%" @click="lastPage">上一页</van-button>
        <van-button color="#1E38FA" size="small" style="float: right; margin-right: 15%" @click="nextPage">下一页</van-button>
      </div>
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
      newTypeName: null,
      page: {
        pageNo: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods : {
    loadMaterial () {
      let data = {
        code: this.code,
        pageNo: this.page.pageNo,
        pageSize: this.page.pageSize
      }
      request.pageQryMaterial(data)
        .then(res => {
          // eslint-disable-next-line eqeqeq
          if (res.code == 0) {
            this.materialList = res.data.data
            this.page = {
              pageNo: res.data.pageNo,
              pageSize: res.data.pageSize,
              total: res.data.total
            }
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
    },
    lastPage () {
      if (this.page.pageNo <= 1) {
        Toast("已经是第一页了！")
      } else {
        this.page.pageNo = this.page.pageNo - 1
        this.loadMaterial()
      }
    },
    nextPage () {
      if (this.page.pageNo * this.page.pageSize + this.page.pageSize > this.page.total) {
        Toast("已经是最后一页了！")
      } else {
        this.page.pageNo = this.page.pageNo + 1
        this.loadMaterial()
      }
    }
  },
  created () {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.loadMaterial()
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
  width: 130px;
}
.typeName {
  margin-left: 30px;
  width: 50px;
  text-align: center;
}
.delete {
  float: right;
}
</style>
