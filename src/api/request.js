import instance from './instance'
import api from './index'

const login = (userName,password) => {
    return instance({
        url: api.auth.login,
        method: 'post',
        data: {
          userName: userName,
          password: password
        }
    })
}

const listMaterial = (code) => {
    return instance({
        url: api.material.list,
        method: 'get',
        params: {
            code: code
        }
    })
}

const listTypes = () => {
  return instance({
    url: api.material.type.options,
    method: 'get'
  })
}

const addMaterial = (data) => {
  return instance({
    url: api.material.add,
    method: 'post',
    data: data
  })
}

const deleteMaterial = (id) => {
  return instance({
    url: api.material.delete + '/' + id,
    method: 'post'
  })
}

const changePassword = (oldPassword, newPassword) => {
  return instance({
    url: api.user.changePassword,
    method: 'post',
    data: {
      oldPassword: oldPassword,
      newPassword: newPassword
    }
  })
}

const addProcess = (data) => {
  return instance({
    url: api.process.add,
    method: 'post',
    data: data
  })
}

const updateProcess = (data) => {
  return instance({
    url: api.process.update,
    method: 'post',
    data: data
  })
}

const userOptions = (roleId) => {
  return instance({
    url: api.user.options,
    method: 'get',
    params: {roleId: roleId}
  })
}

const listProcess = () => {
  return instance({
    url: api.process.list,
    method: 'get'
  })
}

const deleteProcess = (id) => {
  return instance({
    url: api.process.delete + id,
    method: 'post'
  })
}

const getProductDetail = (productId) => {
  return instance({
    url: api.product.detail + productId,
    method: 'get'
  })
}

const listMaterialsByType = (typeId) => {
  return instance({
    url: api.material.options,
    method: 'get',
    params: {typeId: typeId}
  })
}

const addProduct = (detailParam) => {
  return instance({
    url: api.product.add,
    method: 'post',
    data: detailParam
  })
}

const updateProduct = (detailParam) => {
  return instance({
    url: api.product.update,
    method: 'post',
    data: detailParam
  })
}

const deleteProduct = (productId) => {
  return instance({
    url: api.product.delete + productId,
    method: 'post'
  })
}

const pageQryProduct = (pageQryParam) => {
  console.log('pageQryParam',pageQryParam)
  return instance({
    url: api.product.page,
    method: 'post',
    data: pageQryParam
  })
}

const detailProduct = (productId) => {
  return instance({
    url: api.product.detail + productId,
    method: 'get'
  })
}

const productOptions = () => {
  return instance({
    url: api.product.options,
    method: 'get'
  })
}

const pageQryAccount = (pageQryParam) => {
  return instance({
    url: api.user.page,
    method: 'post',
    data: pageQryParam
  })
}

const pageQryProduce = (queryParam) => {
  return instance({
    url: api.produce.pageQry,
    method: 'post',
    data: queryParam
  })
}

const addProduce = (data) => {
  return instance({
    url: api.produce.add,
    method: 'post',
    data: data
  })
}

const deleteProduce = (produceId) => {
  return instance({
    url: api.produce.delete.replace("{produceId}",produceId),
    method: 'post',
  })
}

const addProduceMsg = (data) => {
  return instance({
    url: api.produce.addMsg,
    method: 'post',
    data: data
  })
}

const listProduceProcess = (produceId) => {
  return instance({
    url: api.produce.listProduceProcess.replace("{produceId}",produceId),
    method: 'get'
  })
}

const listProduceMsg = (produceId) => {
  return instance({
    url: api.produce.listProduceMsg.replace("{produceId}",produceId),
    method: 'get'
  })
}

const detailProduce = (produceId) => {
  return instance({
    url: api.produce.detail.replace("{produceId}",produceId),
    method: 'get'
  })
}

const acceptProduce = (data) => {
  return instance({
    url: api.produce.accept,
    method: 'post',
    data: data
  })
}

const rejectProduce = (data) => {
  return instance({
    url: api.produce.reject,
    method: 'post',
    data: data
  })
}

const transmitProduce = (data) => {
  return instance({
    url: api.produce.transmit,
    method: 'post',
    data: data
  })
}

const getLastProduceProcess = (produceId) => {
  return instance({
    url: api.produce.lastProduceProcess.replace("{produceId}",produceId),
    method: 'get'
  })
}

const getCurrentProduceProcess = (produceId) => {
  return instance({
    url: api.produce.currentProduceProcess.replace("{produceId}",produceId),
    method: 'get'
  })
}

const getNextProduceProcess = (produceId) => {
  return instance({
    url: api.produce.nextProduceProcess.replace("{produceId}",produceId),
    method: 'get'
  })
}

const getAllUser = () => {
  return instance({
    url: api.user.all,
    method: 'get'
  })
}

const accountDetail = (accountId) => {
  return instance({
    url: api.user.detail + accountId,
    method: 'get'
  })
}

const updateAccount = (data) => {
  return instance({
    url: api.user.update,
    method: 'post',
    data: data
  })
}

const resetPasswd = (accountId,newPassword) => {
  return instance({
    url: api.user.resetPasswd,
    method: 'post',
    data: {
      newPassword: newPassword,
      userId: accountId
    }
  })
}

const deleteAccount = (accountId) => {
  return instance({
    url: api.user.delete + accountId,
    method: 'post'
  })
}

const addAccount = (accountParam) => {
  return instance({
    url: api.user.add,
    method: 'post',
    data: accountParam
  })
}
export default {
  login,
  listMaterial,
  listTypes,
  addMaterial,
  deleteMaterial,
  changePassword,
  addProcess,
  updateProcess,
  userOptions,
  listProcess,
  deleteProcess,
  getProductDetail,
  listMaterialsByType,
  addProduct,
  updateProduct,
  deleteProduct,
  pageQryProduct,
  detailProduct,
  productOptions,
  pageQryAccount,
  pageQryProduce,
  addProduce,
  deleteProduce,
  addProduceMsg,
  listProduceProcess,
  listProduceMsg,
  detailProduce,
  acceptProduce,
  rejectProduce,
  transmitProduce,
  getLastProduceProcess,
  getCurrentProduceProcess,
  getNextProduceProcess,
  getAllUser,
  accountDetail,
  updateAccount,
  resetPasswd,
  deleteAccount,
  addAccount
}
