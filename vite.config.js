const {resolve} = require('path');

const config = {
    // 打包后的跟路径
    base:'./',
    alias: {
        '@/': resolve(__dirname, 'src')
    },
    // 代理，最重要，其他的都可以有默认配置
    // proxy: {
    //     '/api': {
    //         target: 'http://localhost:3000',
    //         changeOrigin: true,
    //     }
    // }
};
export default config;