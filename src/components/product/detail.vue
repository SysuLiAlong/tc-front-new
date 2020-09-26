<template>
  <div>
    <van-nav-bar
      title="产品信息"
      left-text= "返回"
      right-text= "保存"
      @click-left="onClickLeft"
      @click-right="saveProduct"
    />
    <van-field
      v-model="product.code" label="产品编码"
      placeholder="请输入产品编码"
    />
    <van-field
      v-model="product.name" label="产品名称"
      placeholder="请输入产品名称"
    />
    <van-field
      v-model="product.numsPerStove" type="digit"
      label="产品数量/炉" placeholder="请输入产品数量/炉"
    />
    <van-field
      v-model="product.alertPercent" type="digit"
      label="次品报警率" placeholder="请输入次品报警率（%）"
    />
    <van-field
      v-model="product.weight" type="number"
      label="单重" placeholder="单重"
    />
    <van-field
      v-model="product.imageCode"
      label="图元" placeholder="图元"
    />


    <van-divider>所需材料</van-divider>
    <van-list>
      <div v-for="(item,index) in materialList">
        <van-cell>
          <div>
            <span class="label">{{item.code}}</span>
            <span class="content">{{item.typeName}}</span>
            <van-button size="small" class="delete" @click="onDeleteMaterial(index)">删除</van-button>
          </div>
        </van-cell>
      </div>
    </van-list>
    <van-button size="small" class="leftButton" @click="addMaterial">增加材料</van-button>
    <van-divider>流程</van-divider>
    <van-list>
      <div v-for="(item,index) in processList">
        <van-cell>
          <div>
            <span class="label">{{item.name}}</span>
            <span class="content">{{item.chargeUserName}}</span>
            <van-button size="small" class="delete" @click="onDeleteProcess(index)">删除</van-button>
          </div>
        </van-cell>
      </div>
    </van-list>
    <van-button size="small" class="leftButton" @click="editProcess">编辑流程</van-button>
    <van-divider>报警规则</van-divider>
    <van-list>
      <div v-for="(item,index) in ruleList">
        <van-cell>
          <div>
            <span class="label">{{item.procName}}</span>
            <span class="content">{{item.intervals}}</span>
            <van-button size="small" class="delete" @click="onDeleteRule(index)">删除</van-button>
          </div>
        </van-cell>
      </div>
    </van-list>
    <van-button size="small" class="leftButton" @click="addRule">增加规则</van-button>
    <van-divider>其他</van-divider>
    <textarea v-model="product.description" class="textarea-inherit" rows="3"></textarea>
    <div style="margin: 3px 50px 10px 50px;" v-show="!isAdd">
      <van-button block type="danger" @click="deleteProduct">
        删除
      </van-button>
    </div>
    <!--弹窗-->
    <van-dialog
      v-model="showMaterail" title="添加材料" show-cancel-button
      @open="loadMaterialTypes"
      :before-close="beforeCloseMaterial"
      @close="initMaterial"
    >
      <div style="text-align: center">
        <select class="mySelect materialSelect"
                v-model="selectedMaterialType"
        >
          <option value="">请选择材料类型</option>
          <option v-for="option in materialTypeOptions" :value="option.value + ',' + option.label">{{option.label}}</option>
        </select>
        <select class="mySelect materialSelect"
                v-model="selectedMaterial"
        >
          <option value="">请选择材料</option>
          <option v-for="option in materialOptions" :value="option.value + ',' + option.label">{{option.label}}</option>
        </select>
      </div>
    </van-dialog>

    <van-dialog
      v-model="showProcess" title="编辑流程" show-cancel-button
      @open="loadProcess"
      @close="initProcess"
      @confirm="saveProcess">
      <div style="padding: 20px 10px;text-align: center">
        <van-checkbox-group v-model="selectedProcess" direction="horizontal">
          <van-checkbox
            v-for="item in allProcess"
            :name="item.id"
          >
            {{item.name}}
          </van-checkbox>
        </van-checkbox-group>
      </div>
    </van-dialog>

    <van-dialog
      v-model="showRule" title="增加规则" show-cancel-button
      @open="loadRule"
      @close="initRule"
      :before-close="beforeCloseRule"
      >
      <van-cell title="流程">
        <select v-model="ruleProcess" id="processId" class="mySelect">
          <option value="">请选择流程</option>
          <option
            v-for="item in allProcess"
            :value="item.id">
            {{item.name}}
          </option>
        </select>
      </van-cell>

      <van-cell title="时间间隔(天)">
        <input type="number" class="myInput" v-model="ruleInterval">
      </van-cell>
    </van-dialog>

  </div>
</template>

<script>

  import request from '../../api/request'
  import Toast from 'vant/lib/toast'
  import {Dialog} from 'vant'

  export default {
    name: 'Product',
    data () {
      return {
        productId: '',
        isAdd: true,
        materialList: [],
        processList: [],
        ruleList: [],
        product: {},
        //material
        showMaterail: false,
        materialOptions: [],
        materialTypeOptions: [],
        selectedMaterialType: "",
        selectedMaterial: "",
        //process
        showProcess: false,
        allProcess: [],
        selectedProcess: [],
        //rule
        showRule: false,
        ruleProcess: "",
        ruleInterval: null

      }
    },
    methods : {
      initData () {
        this.productId = ''
        this.isAdd = true
        this.materialList = []
        this.processList = []
        this.ruleList = []
        this.product = {}
        //material
        this.showMaterail = false
        this.materialOptions = []
        this.materialTypeOptions = []
        this.selectedMaterialType = ""
        this.selectedMaterial = ""
        //process
        this.showProcess = false
        this.allProcess = []
        this.selectedProcess = []
        //rule
        this.showRule = false
        this.ruleProcess = []
        this.ruleInterval = null

      },
      onClickLeft () {
        Dialog.confirm({
          message: '内容还没保存，确认离开？',
        })
          .then(() => {
            this.$router.back()
          })
          .catch(() => {

          });
      },
      deleteProduct () {
        request.deleteProduct(this.productId)
          .then(res => {
            if (res.code === 0) {
              Toast("删除成功！")
              this.$router.back()
            } else {
              Toast.fail(res.msg)
            }
          })
      },
      saveProduct () {
        let processArr = []
        let materialArr = []
        if (this.processList.length !== 0) {
          this.processList.forEach(process => {
            processArr.push({
              processId: process.id
            })
          })
        }
        if (this.materialList.length !== 0) {
          this.materialList.forEach(material => {
            materialArr.push({
              materialId: material.id
            })
          })
        }
        let detailParam = {
          productParam: this.product,
          processParams: processArr,
          materialParams: materialArr,
          ruleParams: this.ruleList
        }
        if (!this.checkProductParam(this.product)) {
          return
        }
        if (this.isAdd) {
          request.addProduct(detailParam)
            .then(res => {
              if (res.code === 0) {
                Toast("新增成功！")
                this.$router.back()
              } else {
                Toast.fail(res.msg)
              }
            })
        } else {
          request.updateProduct(detailParam)
            .then(res => {
              if (res.code === 0) {
                Toast("修改成功！")
                this.$router.back()
              } else {
                Toast.fail(res.msg)
              }
            })
        }
      },
      checkProductParam () {
        if (!this.product.code) {
          Toast("请填写产品编码")
          return false
        }
        if (!this.product.name) {
          Toast("请填写产品名称")
          return false
        }
        if (!this.product.numsPerStove) {
          Toast("请填写每炉数量")
          return false
        }
        if (!this.product.alertPercent) {
          Toast("请填写报警率")
          return false
        } else {
          let reg = new RegExp("^(\\d|[1-9]\\d|100)$")
          if (!reg.test(this.product.alertPercent)) {
            Toast("报警率在0~100之间")
            return false
          }
        }
        return true
      },
      containChecked (list , newItem, col) {
        let isContain = false
        let key = 'id'
        if (col) {
          key = col
        }
        list.forEach(item => {
          if (item[key] == newItem[key]) {
            isContain = true
            Toast("已经存在，不要重复提交！")
            return
          }
        })
        return isContain
      },
      //material
      addMaterial () {
        this.showMaterail = true
      },
       beforeCloseMaterial (action, done) {
        if (action == "confirm") {
          if (this.selectedMaterialType == "" || this.selectedMaterial == "") {
            Toast("请选择材料和材料类型再保存！")
            done(false)
            return
          }
          let typeArr = this.selectedMaterialType.split(",",2)
          let materialArr = this.selectedMaterial.split(",",2)
          let newItem = {
            code: materialArr[1],
            id: materialArr[0],
            type: typeArr[0],
            typeName: typeArr[1]
          }
          if (!this.containChecked(this.materialList, newItem)) {
            this.materialList.push(newItem)
            done(true)
          } else {
            done(false)
          }
        } else {
          done(true)
        }
      },
      loadMaterialTypes () {
        request.listTypes()
          .then(res => {
            if (res.code === 0) {
              this.materialTypeOptions = res.data
            }
          })
      },
      initMaterial () {
        this.materialTypeOptions = []
        this.selectedMaterialType = ""
        this.selectedMaterial = ""
        this.materialOptions = []
      },
      onDeleteMaterial (index) {
        this.materialList.splice(index,1)
      },
      //process
      loadProcess () {
        request.listProcess()
          .then(res => {
            if (res.code === 0) {
              this.allProcess = res.data
              this.initSelectedProcess()
            }
          })
      },
      initProcess () {
        this.showProcess = false
      },
      initSelectedProcess () {
        if (this.processList == null || this.processList.length ===0) {
          this.selectedProcess = []
          return
        } else {
          let arr = []
          this.processList.forEach(process => {
            arr.push(process.id)
          })
          this.selectedProcess = arr
        }
      },
      onDeleteProcess (index) {
        this.processList.splice(index,1)
      },
      saveProcess () {
        if (this.selectedProcess.length === 0) {
          return
        }
        let arr = []
        this.selectedProcess.forEach(selected => {
          this.allProcess.forEach(process => {
            if(process.id == selected) {
              arr.push(process)
              return
            }
          })
        })
        this.processList = arr
      },
      //rule
      loadRule () {
        request.listProcess()
          .then(res => {
            if (res.code === 0) {
              this.allProcess = res.data
            }
          })
      },
      initRule () {
        this.ruleProcess = ""
        this.ruleInterval = null
      },
      onDeleteRule (index) {
        this.ruleList.splice(index, 1)
      },
      beforeCloseRule (action, done) {
        if (action == "confirm") {
          if (this.ruleProcess == "" || this.ruleInterval == null) {
            Toast("请填写完整表单！")
            done(false)
            return
          } else {
            let procName = null
            this.allProcess.forEach(process => {
              if (process.id == this.ruleProcess) {
                procName = process.name
                return
              }
            })
            let rule = {
              processId: this.ruleProcess,
              procName: procName,
              intervals: this.ruleInterval
            }
            if (!this.containChecked(this.ruleList, rule, 'procId')) {
              this.ruleList.push(rule)
              done(true)
            } else {
              done(false)
            }
          }
        } else {
          done(true)
        }
      },
      editProcess () {
        this.showProcess = true
      },
      addRule () {
        this.showRule = true
      },
    },
    created () {
      this.initData()
      let productId = this.$route.params.productId
      if (productId !== null && productId !== undefined) {
        this.productId = productId
        this.isAdd = false
        request.getProductDetail(productId)
          .then(res => {
            if(res.code === 0) {
              this.product = res.data.product
              this.materialList = res.data.materials
              this.processList = res.data.processes
              this.ruleList = res.data.rules
            } else {
              Toast(res.msg)
              this.$router.back()
            }
          })
      }
    },
    watch: {
      selectedMaterialType: function (val) {
        if (val === null || val === undefined || val == "") {
          this.materialOptions = []
          return
        }
        let arr = val.split(",")
        request.listMaterialsByType(arr[0])
          .then(res => {
            if (res.code === 0) {
              this.materialOptions = res.data
            }
          })
      }
    },
  }
</script>

<style scoped>
  .label {
    float: left;
    width: 50px;
  }
  .content {
    margin-left: 80px;
    width: 50px;
    text-align: center;
  }
  .delete {
    float: right;
  }
  .textarea-inherit {
    width: 95%;
    margin: 3px;
    padding: 3px;
    overflow: auto;
  }
  .leftButton {
    margin-left: 16px;
  }
  .materialSelect {
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .mySelect {
    background:#fafdfe;
    height:28px;
    width:140px;
    line-height:28px;
    border:1px solid #9bc0dd;
    -moz-border-radius:2px;
    -webkit-border-radius:2px;
  }
  .myInput {
    background:#fafdfe;
    height:24px;
    width:135px;
    padding-left: 5px;;
    line-height:28px;
    border:1px solid #9bc0dd;
    -moz-border-radius:2px;
    -webkit-border-radius:2px;
    border-radius:2px;
  }
</style>
