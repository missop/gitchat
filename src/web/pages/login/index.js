import React from 'react';
import Home from '@/pages/home'
import {APILOGIN} from '@/service'

export default function Login() {
    function afterConfirm() {
        window.location.reload();
        const originalLink = sessionStorage.getItem('originalLink');
        if (originalLink) {
            sessionStorage.removeItem('originalLink');
            window.location.href = originalLink;
            return;
        }
        window.location.href = '/';
    }

    return (
        <Home apiLink={APILOGIN}
              content='登陆成功！要前往首页吗？'
              isLogin={false}
              afterConfirm={afterConfirm}>
        </Home>
    )
}
