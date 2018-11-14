module.exports = {
  lintOnSave: undefined,
  devServer: {
    // 设置代理
    proxy: {
      '/': {
        target: 'http://10.10.10.36:9000', // 域名
        // target: 'http://127.0.0.1:9000', // 域名
        // target: 'http://172.16.216.206:8006', // 域名
        ws: false, // 是否启用websockets
        changOrigin: true, // 开启代理
        pathRequiresRewrite: {
          '^/': '/'
        }
      }
    }
  }

}
