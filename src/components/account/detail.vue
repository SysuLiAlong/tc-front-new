<template>
    <div>
      <van-nav-bar
        title="编辑账号"
        left-text= "返回"
        right-text= "保存"
        @click-left="onClickLeft"
        @click-right="saveAccount"
      />
      <p>
        <span class="labelWidth">用户名：</span>
        <input type="text" v-model="accountDetail.userName">
      </p>
      <p>
        <span class="labelWidth">姓名：</span>
        <input type="text" v-model="accountDetail.realName">
      </p>
      <p>
        <span class="labelWidth">权限：</span>
        <select v-model="accountDetail.role" style="width: 152px;padding: 1px 2px">
          <option :value="role.commonUser">{{role.commonUserName}}</option>
          <option :value="role.admin">{{role.adminName}}</option>
          <option :value="role.superAdmin">{{role.superAdminName}}</option>
        </select>
      </p>
      <van-divider></van-divider>
      <div style="width: 100%;margin-top: 10px">
        <van-button  size="small" style="float: left; margin-left: 15%" @click="showReset = true">重置密码</van-button>
        <van-button  size="small" style="float: right; margin-right: 15%" @click="showDelete = true">删除账号</van-button>
      </div>

      <van-dialog
        v-model="showReset" title="重置密码" show-cancel-button
        :before-close="beforeCloseReset"
        @close="closeReset"
      >
        <div>
          <p>
            <span style="display: inline-block;margin-left: 3%;width: 25%">新密码：</span>
            <input type="password" v-model="newPassword" placeholder="请输入新密码">
          </p>
          <p>
            <span style="display: inline-block;margin-left: 3%;width: 25%">确认密码：</span>
            <input type="password" v-model="confirmPassword" placeholder="请输入新密码">
          </p>
        </div>
      </van-dialog>

      <van-dialog
        v-model="showDelete" title="删除账号" show-cancel-button
        :before-close="beforeDeleteAccount"
      >
      </van-dialog>
    </div>
</template>

<script>
  import Toast from 'vant/lib/toast'
  import request from '../../api/request'
  import {role} from '../../constant'
  export default {
    name: 'detail.vue',
    data () {
      return {
        accountId: '',
        accountDetail: {},
        role: role,
        showReset: false,
        showDelete: false,
        newPassword: null,
        confirmPassword: null
      }
    },
    methods: {
      initData () {
        this.accountId = ''
        this.accountDetail = {}
      },
      loadAccountDetail () {
        request.accountDetail(this.accountId)
          .then(res => {
            if (res.code === 0) {
              this.accountDetail = res.data
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      onClickLeft () {
        this.$router.back()
      },
      saveAccount () {
        request.updateAccount(this.accountDetail)
          .then(res => {
            if (res.code === 0) {
              Toast("保存成功！")
              this.$router.back()
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      beforeCloseReset (action,done) {
        if (action == 'confirm') {
          if (!this.newPassword || this.newPassword == '' || !this.confirmPassword || this.confirmPassword == '') {
            Toast({
              position: 'top',
              message: '密码不能为空！'
            })
            done(false)
          } else if (this.newPassword != this.confirmPassword) {
            Toast({
              position: 'top',
              message: '密码不一致，请重新输入！'
            })
            done(false)
          } else {
            request.resetPasswd(this.accountId,this.newPassword)
              .then(res => {
                if (res.code === 0) {
                  done(true)
                  Toast("重置成功！")
                } else {
                  done(false)
                  Toast({
                    position: 'top',
                    message: res.msg
                  })
                }
              })
          }
        } else {
          done(true)
        }
      },
      closeReset () {
        this.newPassword = null
        this.confirmPassword = null
      },
      beforeDeleteAccount (action,done) {
        if (action == 'confirm') {
          request.deleteAccount(this.accountId)
            .then(res => {
              if (res.code === 0) {
                Toast("删除成功！")
                done(true)
                this.$router.back()
              } else {
                done(false)
              }
            })
        } else {
          done(true)
        }
      }
    },
    created () {
      this.initData()
      this.accountId = this.$route.params.accountId
      this.loadAccountDetail(this.accountId)
    },
    watch: {
      'accountDetail.role': {
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
          this.accountDetail.roleName = roleName;
        },
        deep: true,
        immediate: true
      }
    },
  }
</script>

<style scoped>
.labelWidth {
  margin-left: 4%;
  width: 20%;
  display: inline-block;
}
</style>
