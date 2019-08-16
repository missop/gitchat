import React from 'react';
import Home from '@/pages/home'
import {APIREGISTER} from '@/service'

export default function Register() {
    function afterConfirm() {
        window.location.href = '/login';
    }

    return (
        <Home apiLink={APIREGISTER}
              content='注册成功！要前往登录页吗？'
              isLogin={true}
              afterConfirm={afterConfirm}>
        </Home>
    )
}
