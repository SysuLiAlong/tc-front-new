/**
 * 根据环境入参, 动态require不同的配置文件
 * 在 webpack.base.conf.js中 required 此模块
 * 并在 webpack.base.conf.js 通过 DefinePlugin 插件传递到src中即可
 *
 */

/**
 *
 webpack.base.conf.js 中:

 const envConfig = require('./webpack.env.conf')

 plugins: [
  // http://vuejs.github.io/vue-loader/en/workflow/production.html
  new webpack.DefinePlugin({
    'process.env': envConfig
  })
 ]
 *
 */

// 定义参数配置
const argv = require('yargs')
  .option('environment', {
    alias: ['e', 'env'],
    describe: '指定某个环境'
  })
  .demandOption(['environment'], '请从下面的环境中选择一个 : --env [dev, prod]').argv;

// 获取环境变量
const env = argv.environment;
process.stdout.write('the specify env is '+ env +'\n');

// require指定的环境配置文件
const envConfigFile = "../config/" + env + ".env.js";
process.stdout.write('env config file is '+ envConfigFile +'\n');

module.exports = require(envConfigFile);
