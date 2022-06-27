/**
 * vue脚手架的配置文件
 */
module.exports = {
    publicPath: './',
    assetsDir: 'staticDir',
    //配置多入口文件
    pages: {
        //C端
        FrontOfficeSystem: {
            // page 的入口
            entry: 'src/pages/FrontOfficeSystem/main.js',
            // 模板来源
            template: 'public/FrontOfficeSystem.html',
            // 在 dist/index.html 的输出
            filename: 'FrontOfficeSystem.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '开放平台',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'FrontOfficeSystem']
        },
        //快盘后台
        BackOfficeSystem: {
            // page 的入口
            entry: 'src/pages/BackOfficeSystem/main.js',
            // 模板来源
            template: 'public/BackOfficeSystem.html',
            // 在 dist/index.html 的输出
            filename: 'BackOfficeSystem.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: 'Saas平台',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'BackOfficeSystem']
        }
    },
    productionSourceMap: false,
    devServer: {
        proxy: {
            '/api': {
                target: 'http://dev-inter.open.kuaipantech.com/api-saas',
                // target: 'http://192.168.1.11:8085/api-saas',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
