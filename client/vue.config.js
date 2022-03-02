
module.exports = {
    devServer: {
        host: 'localhost',
        port: 8080,
        proxy: {
            '/wongblog': {
                target: 'http://mall-pre.springboot.cn',
                changeOrigin: true,
                pathRewrite: {
                    '/wongblog': ''
                }
            }
        }
    }
}