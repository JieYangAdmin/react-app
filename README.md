## 创建基本的webpack4.x项目
### 初始化包
```bash
   npm init -y
```

### 新建目录结构
创建 src 源代码目录， dist 产品目录

src/index.html, src/index.js(入口文件), src/package.config.js(配置文件)

### 安装webpack
```bash
    npm i webpack webpack-cli webpack-dev-server html-webpack-plugin -D
    ## webpack webpack-cli (webpack和webpack的脚手架)
    ## webpack-dev-server(快速搭建本地运行环境的工具)
    ## html-webpack-plugin(在内存生成 html 页面,我们处理 main.js)
```
在webpack 4.x中，有一个 约定大于配置 的约定，默认打包入口路径是 src -> index.js,打包的输出文件是dist/main.js

// webpack-dev-server(实时编译) 打包好的 main.js 是托管到内存中，所以在项目根目录中是看不到的；
// 但是，我们可以认为，在跟目录中，有一个看不见的main.js
package.json/ scripts -> "dev": "webpack-dev-server --open --port 3000 --hot --progress --compress --host 127.0.0.1"  (npm run dev)
(--open:默认编译后自动打开浏览器, --port 3000: 更改端口号, --progress: 打包进度, --compress: 压缩, --host 127.0.0.1: 指定域名)

#### src/package.config.js
```bash
    const path = require('path');
    const HtmlWebPackPlugin = require('html-webpack-plugin'); ## 导入 在内存中自动生成 index 页面的插件

    ## 创建一个插件的实例对象
    const htmlPlugin = new HtmlWebPackPlugin({
        template: path.join(__dirname,'./public/index.html'), ## 源文件
        filename: 'index.html' ## 生成的内存中首页的名称
    });


    ## 向外暴露一个打包的配置对象; 
    ## webpack基于nodejs构建，支持所有的Node API和语法
    module.exports = {
        ## mode选项必须
        mode: 'development', ## development:开发环境  production:产品环境（压缩dist/main.js）
        ## 在webpack 4.x中，有一个 约定大于配置 的约定，默认打包入口路径是 src -> index.js
        plugins: [
            htmlPlugin
        ]
    }
```

## 安装配置react
```bash
    npm i react react-dom -S

    ## src/index.js
    import React from 'react'; ## 创建组件、虚拟DOM元素，生命周期
    import ReactDom from 'react-dom'; ## 把创建好的 组件 和 虚拟 DOM 放在页面上展示


    ## 创建虚拟DOM元素
    ## 参数1： 创建的元素的类型，字符串，表示元素的名称
    ## 参数2： 是一个对象或null，表示 当前这个DOM元素的属性
    ## 参数3： 子节点（包括 其它 虚拟DOM 获取 文本子节点）
    ## 参数n: 其它子节点

    ## const myh1 =  React.createElement('h1',null,'这是一个h1');
    const myh1 =  React.createElement('h1',{id:"myh1",title:"this is a h1"},'这是一个h1');

    ## 使用ReactDom 把虚拟DOM 渲染到页面上
    ## 参数1： 要渲染的那个虚拟DOM元素
    ## 参数2： 指定虚拟DOM容器
    ReactDom.render(myh1,document.getElementById('app'));

```

```bash
    ## 在js文件中，默认不支持类似于HTML的标记，否则会打包失败；
    ## 可以使用babel转换标签（类似于这种在js中混合使用HTML的语法叫做JSX）
    ## 使用JSX语法的本质是将标签转化为React.createElement()形式来执行的

    ## 1. 安装babel包
    ## 官方默认babel-loader | babel 对应的版本需要一致: 即babel-loader需要搭配最新版本babel
    ### (1) 7.x版本
    npm i babel-core babel-loader babel-plugin-transform-runtime -D
    npm i babel-preset-env babel-preset-stage-0 -D
    npm i babel-preset-react -D ## 安装识别转换jsx语法的包
    ### (2) 8.x版本
    npm i babel-loader '@babel/core' '@babel/preset-env' '@babel/runtime' '@babel/plugin-transform-runtime' -D
    npm i '@babel/plugin-proposal-class-properties' -D
    npm i '@babel/preset-react' -D ## 安装识别转换jsx语法的包

    ## 2. webpack默认只能打包处理.js文件，像.png,.vue等无法直接处理，所以需要配置第三方的loader；
    ## package.config.js / module.exports / module
    module: { ## 所有第三方模块的配置规则
        rules: [ ## 第三方匹配规则(test:后缀名,use:loader,exclude:排除项，一定要加，不然会出错)
            { test: /\.js|jsx$/, use: 'babel-loader', exclude: /node_modules/ }
        ]
    }

    ## 3. 添加babel的配置文件, 项目根目录 / .babelrc(json的配置文件)
    ### (1) 7.x版本
    {
        "presets":["env","stage-0","react"], ## 所有语法
        "plugins": ["transform-runtime"] ## 所有插件
    }

    ### (2) 8.x版本
    {
    　　"presets": ["@babel/preset-env","@babel/preset-react"], ## 所有语法
    　　"plugins": ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties"] ## 所有插件
    }
```

### 配置webpack

(1) 通过配置webpack,从而在导入组件的时候可以省略后缀

```bash
    ## package.config.js / module.exports / resolve
    resolve: {
        extensions: ['.js','.jsx','.json'] ## 表示这几个文件类型的后缀名可以省略
    }
```

(2) 设置 @ 为 项目根目录/src 节点

```bash
    ## package.config.js / module.exports / resolve 
    
    resolve: {
        extensions: ['.js','.jsx','.json'], ## 表示这几个文件类型的后缀名可以省略
        alias: { ## 别名
            '@': path.join(__dirname,'./src') ## @ 表示项目根目录中src这一层路径
        }
    }
```

### 配置css

```bash
    npm i style-loader css-loader -D
```

配置webpack.config.js/module.exports/module/rules
```bash
    {
        test: /.css$/,
        use: [
            ## loader执行顺序从下向上
            'style-loader',
            {
                loader: 'css-loader',
                options: {
                    importLoaders: 1,## 如果在样式文档里再import进其他的样式文档，则可能不再走下面两个loader,设置importLoaders让他重新再走一遍loader
                    modules: true, ##css模块化加载
                }
            }
        ],
    },
```

### 配置 字体、图片、less

```bash
    npm i url-loader file-loader -D  
    npm i less less-loader -D 
```

配置webpack.config.js/module.exports/module/rules

```bash
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
        ## 打包处理 字体文件 的loader
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: 'url-loader'
    },
    {
        test: /\.(jpg|jpeg|png|gif)$/,
        use: [
            {
                loader: 'url-loader',
                options: {
                    ## 单位：字节， 8Kb
                    ## 如果图片的大小比 8kb 小，图片就会被处理为 base64
                    ## 如果图片的大小大于或等于 8kb ，url-loader会自动调用 file-loader 来对图片重命名处理
                    ## limit: 8192
                    limit: 49877
                }
            }
        ]
    }
```

## 完善项目包

安装路由、中间件、redux等等来完善项目包
- 新建src/assets: 项目公共css,js,image
- 新建src/components: 公共模板组件
- 新建src/pages: 页面模板组件
- 新建src/router: 路由
- 新建src/store: 全局状态管理(redux)

### 安装路由
```bash
    npm i react-router-dom -D
```

新建src/router/index.js

```bash
    import React from 'react';
    ## import { BrowserRouter as HashRouter,Switch,Route } from 'react-router-dom'; BrowserRouter 需要单独进行配置
    import { HashRouter , Switch , Route } from 'react-router-dom';
    import Home from '@/pages/Home';
    import ErrorPages from '@/pages/Error';

    const RouterLink = () => (
        <HashRouter>
            <Switch>
                ## {/* exact:路径必须和地址完全一致 */}

                ## {/* 首页 */}
                <Route path="/" exact component={Home}></Route>
                ## {/* 404 页面 */}
                <Route component={ErrorPages}></Route>
            </Switch>
        </HashRouter>
    );

    export default RouterLink;
```

src/App.js

```bash
    ## 引入路由
    import RouterLink from '@/router';

    ## 添加
    <RouterLink></RouterLink>
```

### 状态管理(redux)及中间件

```bash
    npm i redux react-redux redux-thunk immutable react-immutable -D
    ## immutable对象是不可直接赋值的对象，它可以有效的避免错误赋值的问题
    ## redux-thunk中间件:Redux store 仅支持同步数据流。使用 thunk 等中间件可以帮助在 Redux 应用中实现异步性
```


