// eslint-disable-next-line camelcase
const base_url = process.env.API_HOST
export default {
  auth: {
    // eslint-disable-next-line camelcase
    login: base_url + 'auth/login'
  },
  user: {
    changePassword: base_url + 'user/change_password',
    options: base_url + 'user/options'
  },
  process: {
    add: base_url + 'process/add',
    update: base_url + 'process/update',
    list: base_url + 'process/list',
    delete: base_url + 'process/delete/'
  },
  material: {
    // eslint-disable-next-line camelcase
    list: base_url + 'material/list',
    add: base_url + 'material/add',
    delete: base_url + 'material/delete',
    options: base_url + 'material/options',
    type: {
      options: base_url + 'material/type/options'
    }
  },
  product: {
    detail: base_url + 'product/',
    add: base_url + 'product/add',
    update: base_url + 'product/update',
    delete: base_url + 'product/delete/',
    page: base_url + 'product/page'
  }
}
