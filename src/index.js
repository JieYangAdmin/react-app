// webpack-dev-server 打包好的 main.js 是托管到内存中，所以在项目根目录中是看不到的；
// 但是，我们可以认为，在跟目录中，有一个看不见的main.js

import React from 'react'; // 创建组件、虚拟DOM元素，生命周期
import ReactDom from 'react-dom'; // 把创建好的 组件 和 虚拟 DOM 放在页面上展示

import App from '@/App';

// 创建虚拟DOM元素
// 参数1： 创建的元素的类型，字符串，表示元素的名称
// 参数2： 是一个对象或null，表示 当前这个DOM元素的属性
// 参数3： 子节点（包括 其它 虚拟DOM 获取 文本子节点）
// 参数n: 其它子节点

// const myh1 =  React.createElement('h1',null,'这是一个h1');
// const myh1 =  React.createElement('h1',{id:"myh1",title:"this is a h1"},'这是一个h1');

// 配置完babel,使用JSX语法
// const odiv = <div className="odiv">这是<h3>JSX</h3>语法</div>

// 使用ReactDom 把虚拟DOM 渲染到页面上
// 参数1： 要渲染的那个虚拟DOM元素
// 参数2： 指定虚拟DOM容器
ReactDom.render(<App />,document.getElementById('app'));
