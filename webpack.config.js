const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin'); // 导入 在内存中自动生成 index 页面的插件

// 创建一个插件的实例对象
const htmlPlugin = new HtmlWebPackPlugin({
    template: path.join(__dirname, './public/index.html'), // 源文件
    filename: 'index.html', // 生成的内存中首页的名称
});


// 向外暴露一个打包的配置对象; 
// webpack基于nodejs构建，支持所有的Node API和语法
// webpack默认只能打包处理.js文件，像.png,.vue等无法直接处理，所以需要配置第三方的loader；
// 一般来说，带s的是数组，不带的是对象
module.exports = {
    // mode选项必须
    mode: 'development', // development:开发环境  production:产品环境（压缩dist/main.js）
    // 在webpack 4.x中，有一个 约定大于配置 的约定，默认打包入口路径是 src -> index.js
    plugins: [
        htmlPlugin
    ],
    module: { // 所有第三方模块的配置规则
        rules: [ // 第三方匹配规则(test:后缀名,use:loader,exclude:排除项，一定要加，不然会出错)
            {
                test: /\.js|jsx$/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /.css$/,
                use: [
                    //loader执行顺序从下向上
                    'style-loader',
                    {
                        loader: 'css-loader', // css-loader 可以通过 "?"添加参数  "?modules" 启用css模块化
                        options: {
                            importLoaders: 1,// 如果在样式文档里再import进其他的样式文档，则可能不再走下面两个loader,设置importLoaders让他重新再走一遍loader
                        }
                    }
                ],
            },
            { 
                test: /.less$/, 
                use: [
                    require.resolve('style-loader'),
                    { 
                        loader: require.resolve('css-loader'), 
                        options: { 
                            importLoaders: 1, 
                        }, 
                    }, 
                    { 
                        loader: require.resolve('less-loader') 
                    }
                ], 
            },
            {
                // 打包处理 字体文件 的loader
                test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
                use: 'url-loader'
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            // 单位：字节， 8Kb
                            // 如果图片的大小比 8kb 小，图片就会被处理为 base64
                            // 如果图片的大小大于或等于 8kb ，url-loader会自动调用 file-loader 来对图片重命名处理
                            // limit: 8192
                            limit: 49877
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json'], // 表示这几个文件类型的后缀名可以省略
        alias: { // 别名
            '@': path.join(__dirname, './src') // @ 表示项目根目录中src这一层路径
        }
    },
    devServer: {
        historyApiFallback: true
    }
}