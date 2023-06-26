

const { overrideDevServer} = require('customize-cra');

// 覆盖react app webpack的跨域配置
const devServerConfig = () => config => {
  return {
    ...config,
    // 服务开启gzip
    compress: true,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:5001',
        changeOrigin: false,
      }
    }
  }
}

module.exports = {
  devServer: overrideDevServer(
    devServerConfig()
  )
}