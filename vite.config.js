const {resolve} = require('path');

const config = {
    // 打包后的根路径
    base:'./',
    assetsDir: 'assets',
    alias: {
        '/@/': resolve(__dirname, 'src')
    },
    // 代理，最重要，其他的都可以有默认配置
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:3000',
    //         changeOrigin: true,
    //     }
    // }
    // 端口
    port: 6954,
    // 是否自动开启浏览器
    open: true,
    // 开启控制台输出日志
    // silent: false,
    // 哪个第三方的包需要重新编译
    optimizeDeps:[],
};
export default config;