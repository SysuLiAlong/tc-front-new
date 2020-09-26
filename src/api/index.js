// eslint-disable-next-line camelcase
const base_url = process.env.API_HOST
export default {
  auth: {
    // eslint-disable-next-line camelcase
    login: base_url + 'auth/login'
  },
  user: {
    changePassword: base_url + 'user/change_password',
    logout: base_url + 'user/logout',
    options: base_url + 'user/options',
    page: base_url + 'user/page',
    detail: base_url + 'user/detail/',
    delete: base_url + 'user/delete/',
    all: base_url + 'user/all',
    update: base_url + 'user/update',
    resetPasswd: base_url + 'user/reset_password',
    add: base_url + 'user/add'
  },
  process: {
    add: base_url + 'process/add',
    update: base_url + 'process/update',
    list: base_url + 'process/list',
    delete: base_url + 'process/delete/',
    detail: base_url + 'process/detail/',
    exChangePriority: base_url + 'process/exchange/priority'
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
    page: base_url + 'product/page',
    options: base_url + 'product/options'
  },
  produce: {
    pageQry: base_url + 'produce/page_qry',
    add: base_url + 'produce/add',
    listProduceProduct: base_url + 'produce/',
    addMsg: base_url + 'produce/msg/add',
    listProduceProcess: base_url + 'produce/process/{produce_product_id}',
    listProduceMsg: base_url + 'produce/msg/{produce_product_id}',
    detail: base_url + 'produce/detail/{produce_product_id}',
    accept: base_url + 'produce/process/accept',
    reject: base_url + 'produce/process/reject',
    transmit: base_url + 'produce/process/transmit',
    nextProduceProcess: base_url + 'produce/process/next/{produce_product_id}',
    currentProduceProcess: base_url + 'produce/process/current/{produce_product_id}',
    lastProduceProcess: base_url + 'produce/process/last/{produce_product_id}',
    delete: base_url + 'produce/delete/{produceId}'
  }
}
