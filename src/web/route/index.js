import React from 'react'
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom'
import loadable from '@loadable/component';

const FUNCTION_ROUTERS = ['/', '/robot_chat', '/group_chat/:to_group_id', '/private_chat/:user_id', '/setting'];
const AUTH_ROUTERS = ['/login', '/register'];

/*首页左边栏目*/
function MainView(props) {
    const {pathname} = props.location;
    /*缓存登录之前的页面地址，登录之后跳转*/
    if (AUTH_ROUTERS.indexOf(pathname) < 0 && !localStorage.getItem('userInfo')) {
        sessionStorage.setItem('originalLink', window.location.href);
        props.history.push('/login');
    }

    let MainViewClassName;
    if (pathname === '/' || pathname === '/setting') {
        MainViewClassName = 'layout-left';
    } else {
        MainViewClassName = 'layout-left-mobile';
    }

    return (
        <div className={MainViewClassName}>
            <Route component={loadable(() => import('@pages/tab'))}/>
            <Route path={['/', '/robot_chat', '/group_chat/:to_group_id', '/private_chat/:user_id']} exact
                   component={loadable(() => import('@pages/home-page-list'))}/>
            <Route path="/setting" exact component={loadable(() => import('@pages/settings'))}/>
        </div>
    )
}

/*首页右边栏目*/
function RightView(props) {
    return (
        <div className="right-view">right-view</div>
    )
}

export default function () {
    return (
        <Router>
            <div className="layout-wrapper">
                <Switch>
                    <Route path="/login" exact component={loadable(() => import('@pages/login'))}/>
                    <Route path="/register" exact component={loadable(() => import('@pages/register'))}/>
                    <Route exact path={FUNCTION_ROUTERS}>
                        <Route path={FUNCTION_ROUTERS} exact component={MainView}/>
                        <Route path={FUNCTION_ROUTERS} exact component={RightView}/>
                    </Route>
                    <Route path="/page404" exact component={loadable(() => import('@pages/page-404'))}/>
                    <Redirect to='/page404'/>
                </Switch>
            </div>
        </Router>
    );
}
