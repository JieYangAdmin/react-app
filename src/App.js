import React , { Component } from 'react';
// 引入全局公共css,js
import '@/assets/index.less';
import '@/assets/index';

// 引入路由
import RouterLink from '@/router';

class App extends React.Component {
    constructor(props){ // 类中的构造器
        // 一个子类，通过extends关键字继承了父类，在子类的constructor构造函数中，必须优先调用super()
        // super是一个函数，而且它是父类的构造器，子类中的super就是父类中constructor构造器的一个引用
        super(props);
        this.state = {}
    }
    render(){
        return (
            <div>
                <RouterLink></RouterLink>
            </div>
        )
    }
}


export default App;