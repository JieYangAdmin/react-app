import React from 'react';
import { HashRouter , Switch , Route } from 'react-router-dom';
import Home from '@/pages/Home';
import ErrorPages from '@/pages/Error';

const RouterLink = () => (
    <HashRouter>
        <Switch>
            {/* exact:路径必须和地址完全一致 */}

            {/* 首页 */}
            <Route path="/" exact component={Home}></Route>
            {/* 404 页面 */}
            <Route component={ErrorPages}></Route>
        </Switch>
    </HashRouter>
);

export default RouterLink;