<template>
    <div>
      <van-nav-bar
        title="新建账号"
        left-text= "返回"
        right-text= "保存"
        @click-left="onClickLeft"
        @click-right="saveAccount"
      />
      <p>
        <span class="labelWidth">用户名：</span>
        <input type="text" class="myInput" v-model="account.userName">
      </p>
      <p>
        <span class="labelWidth">密码：</span>
        <input type="password" class="myInput" v-model="account.password">
      </p>
      <p>
        <span class="labelWidth">确认密码：</span>
        <input type="password" class="myInput" v-model="confirmPassword">
      </p>
      <p>
        <span class="labelWidth">姓名：</span>
        <input type="text" class="myInput" v-model="account.realName">
      </p>
      <p>
        <span class="labelWidth">权限：</span>
        <select v-model="account.role" class="mySelect">
          <option :value="role.commonUser">{{role.commonUserName}}</option>
          <option :value="role.admin">{{role.adminName}}</option>
          <option :value="role.superAdmin">{{role.superAdminName}}</option>
        </select>
      </p>
    </div>
</template>

<script>
  import request from '../../api/request'
  import Toast from 'vant/lib/toast'
  import {role} from '../../constant'

  export default {
    name: 'add',
    data () {
      return {
        account: {
          userName: '',
          realName: '',
          password: '',
          role: '',
          roleName: ''
        },
        confirmPassword: '',
        role: role
      }
    },
    methods: {
      initData () {
        this.account = {
          userName: '',
          realName: '',
          password: '',
          role: '',
          roleName: ''
        }
        this.confirmPassword = null
      },
      onClickLeft () {
        this.$router.back()
      },
      saveAccount () {
        if (!this.confirmPassword || !this.account.password
            || !this.account.userName || !this.account.realName || !this.account.role) {
          Toast.fail("请填写完整表单，再保存！")
          return
        } else if (this.confirmPassword != this.account.password) {
          Toast.fail("密码不一致，请重新填写！")
          return
        } else {
          request.addAccount(this.account)
            .then(res => {
              if (res.code === 0) {
                Toast("保存成功！")
                this.$router.back()
              } else {
                Toast.fail(res.msg)
              }
            })
        }

      },
    },
    watch: {
      'account.role': {
        handler (newName) {
          let roleName = ''
          switch (newName) {
            case this.role.commonUser:
              roleName = this.role.commonUserName;
              break;
            case this.role.admin:
              roleName = this.role.adminName;
              break;
            case this.role.superAdmin:
              roleName = this.superAdminName;
              break;
            default:
              roleName = null;
          }
          this.account.roleName = roleName;
        },
        deep: true,
        immediate: true
      }
    },
    created () {
      this.initData()
    }
  }
</script>

<style scoped>
  .labelWidth {
    margin-left: 4%;
    width: 20%;
    display: inline-block;
  }
  .mySelect {
    background:#fafdfe;
    height:28px;
    width:146px;
    line-height:28px;
    border:1px solid #9bc0dd;
    -moz-border-radius:2px;
    -webkit-border-radius:2px;
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
