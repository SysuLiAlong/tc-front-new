import instance from './instance'
import api from './index'

const login = (userName,password) => {
    return instance({
        url: api.auth.login,
        method: 'post',
        params:{
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
  detailProduct
}
