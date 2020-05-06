<template>
  <div>
    <van-nav-bar
      title="流程"
      left-text= "返回"
      right-text= "新建流程"
      @click-left="onClickLeft"
      @click-right="createProcess"
    />
    <van-list>
      <van-cell v-for="item in processList">
        <div>
          <span class="name">{{item.name}}</span>
          <span class="chargeUser">{{item.chargeUserName}}</span>
          <van-button size="mini" class="delete" @click="onDelete(item.id)">删除</van-button>
          <van-button size="mini" class="edit" @click="onEdit(item)">编辑</van-button>
        </div>
      </van-cell>
    </van-list>
    <van-dialog
      v-model="show" title="新建流程" show-cancel-button
      :beforeClose= beforeClose
    >
      <van-form @submit="onSubmit" ref="form">
        <van-field
          v-model="name"
          label="流程名称"
          :rules="[{ required: true, message: '请填写流程名称' }]"
        />
        <van-field
          clickable
          :value="chargeUserName"
          label="负责人"
          @click="picker"
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
  import role from '../constant'
  import request from '../api/request'
  import Toast from 'vant/lib/toast'
  export default {
    name: 'Process',
    data() {
      return {
        userList: [],
        columns: [],
        show: false,
        showPicker: false,
        processList: [],
        id: null,
        name: null,
        chargeUserId: null,
        chargeUserName: null
      }
    },
    methods: {
      getProcessList( ){
        request.listProcess()
          .then(res => {
            if(res.code === 0) {
              this.processList = res.data
            }
          })
      },
      getUserList() {
        request.userOptions(role.processAdmin)
          .then(res => {
            if(res.code === 0) {
              this.columns = []
              this.userList = res.data;
              this.userList.forEach(user => {
                this.columns.push(user.label)
              })
            }
          })
      },
      onConfirm(value) {
        console.log('value',value)
        this.chargeUserName = value
        this.showPicker = false;
      },
      clearForm() {
        this.showPicker = false,
        this.id = null,
        this.name= null,
        this.chargeUserId= null
        this.chargeUserName= null

      },
      onClickLeft() {
        this.$router.back()
      },
      createProcess () {
        this.show = true
      },
      onDelete (id) {
        request.deleteProcess(id)
          .then(res => {
            if(res.code === 0) {
              Toast.success("删除成功")
              this.getProcessList()
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      onEdit (item) {
        this.name = item.name
        this.chargeUserName = item.chargeUserName
        this.chargeUserId = item.chargeUserId
        this.id = item.id
        this.show = true
      },
      picker() {
        this.showPicker = true
        this.getUserList()
      },
      onSubmit (value) {
        console.log(value)
        let data = {
          id: this.id,
          name: this.name,
          chargeUserId: this.chargeUserId,
          chargeUserName: this.chargeUserName
        }
        if(this.id != null) {
          request.updateProcess(data)
            .then(res => {
              if(res.code === 0) {
                Toast.success("修改成功")
                this.clearForm();
                this.getProcessList()
              } else {
                Toast.fail(res.msg)
              }
            })
        } else {
          request.addProcess(data)
            .then(res => {
              if(res.code === 0) {
                Toast.success("新增成功")
                this.clearForm();
                this.getProcessList()
              } else {
                Toast.fail(res.msg)
              }
            })
        }
      },
      async beforeClose (action,done) {
        if(action == 'confirm') {
          this.$refs.form.submit()
          //todo 异步关闭
          done()
        } else {
          this.clearForm()
          done()
        }
      }
    },
    created () {
      this.getProcessList()
    },
    watch: {
      chargeUserName: function (val) {
        this.userList.forEach(user => {
          if(user.label == val){
            this.chargeUserId = user.value
            return
          }
        })
      }
    }
  }
</script>

<style scoped>
  .name {
    float: left;
    width: 50px;
  }
  .chargeUser {
    margin-left: 80px;
    width: 50px;
    text-align: center;
  }
  .delete {
    margin-left: 5px;
    float: right;
  }
  .edit {
    float : right;
  }
</style>
