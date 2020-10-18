import instance from './instance'
import api from './index'

const login = (userName,password,remember) => {
    return instance({
        url: api.auth.login,
        method: 'post',
        data: {
          userName: userName,
          password: password,
          remember: remember
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

const pageQryMaterial = (data) => {
    return instance({
        url: api.material.page,
        method: 'post',
        data: data
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

const userOptions = () => {
  return instance({
    url: api.user.options,
    method: 'get',
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

const queryProductByCode = (code) => {
  return instance({
    url: api.product.queryByCode,
    method: 'get',
    params: {
      code: code
    }
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

const loadProduceProduct = (produceId) => {
  return instance({
    url: api.produce.listProduceProduct + produceId,
    method: 'get'
  })
}

const deleteProduce = (produceId, comment) => {
  return instance({
    url: api.produce.delete.replace("{produceId}",produceId),
    method: 'post',
    params: {
      comment: comment
    }
  })
}

const addProduceMsg = (data) => {
  return instance({
    url: api.produce.addMsg,
    method: 'post',
    data: data
  })
}

const listProduceProcess = (produceProductId) => {
  return instance({
    url: api.produce.listProduceProcess.replace("{produce_product_id}",produceProductId),
    method: 'get'
  })
}

const listProduceMsg = (produceProductId) => {
  return instance({
    url: api.produce.listProduceMsg.replace("{produce_product_id}",produceProductId),
    method: 'get'
  })
}

const detailProduceProduct = (produceProductId) => {
  return instance({
    url: api.produce.detail.replace("{produce_product_id}",produceProductId),
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

const getLastProduceProcess = (produceProductId) => {
  return instance({
    url: api.produce.lastProduceProcess.replace("{produce_product_id}",produceProductId),
    method: 'get'
  })
}

const getCurrentProduceProcess = (produceProductId) => {
  return instance({
    url: api.produce.currentProduceProcess.replace("{produce_product_id}",produceProductId),
    method: 'get'
  })
}

const getNextProduceProcess = (produceProductId) => {
  return instance({
    url: api.produce.nextProduceProcess.replace("{produce_product_id}",produceProductId),
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

const processDetail = (processsId) => {
  return instance({
    url: api.process.detail + processsId,
    method: 'get'
  })
}

const exChangePriority = (first,second) => {
  return instance({
    url: api.process.exChangePriority,
    method: 'get',
    params: {
      first: first,
      second: second
    }
  })
}

const logout = () => {
  return instance({
    url: api.user.logout,
    method: 'post'
  })
}

const uploadImage = (image) => {
  return instance({
    url: api.file.uploadImage,
    method: 'post',
    data: image
  })
}

const downLoadImage = (imageName) => {
  return instance({
    url: api.file.downLoadImage,
    method: 'get',
    responseType: 'blob',
    params: {
      imageName: imageName
    }
  })
}

const pageQryAlarm = (queryParam) => {
  return instance({
    url: api.alarm.pageQry,
    method: 'post',
    data: queryParam
  })
}



export default {
  login,
  listMaterial,
  pageQryMaterial,
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
  queryProductByCode,
  pageQryAccount,
  pageQryProduce,
  addProduce,
  loadProduceProduct,
  deleteProduce,
  addProduceMsg,
  listProduceProcess,
  listProduceMsg,
  detailProduceProduct,
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
  addAccount,
  processDetail,
  exChangePriority,
  logout,
  uploadImage,
  downLoadImage,
  pageQryAlarm
}
