import React, {useState} from 'react';
import {Link} from "react-router-dom";
import './index.less'
import Toast from '@common/toast'
import Request from '@utils/request'
import Button from '@common/button'
import Modal from '@common/modal'
import UserAvatar from "@common/user-avatar";

function Home(props) {
    /*登录与注册的不同点：接口地址不同，按钮文字不同*/
    const {apiLink, content, isLogin, afterConfirm} = props;

    /*设置用户名初始值*/
    const [name, setName] = useState('');
    /*设置密码*/
    const [password, setPass] = useState('');
    /*设置弹层的隐藏与否*/
    const [showModal, setShowModal] = useState(false);

    const computed = {
        false: {loginClass: 'active', registerClass: 'inactive', buttonName: '登录'},
        true: {loginClass: 'inactive', registerClass: 'active', buttonName: '注册'}
    }

    async function handleLogin() {
        if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(name)) {
            Toast.error('用户名只能由汉字，数字，字母，下划线组成');
            return;

        }
        if (!/^[A-Za-z0-9]+$/.test(password)) {
            Toast.error('密码只能由字母数字组成');
            return;
        }
        try {
            const res = await Request.axios('post', apiLink, {name, password});
            if (res && res.success) {
                localStorage.setItem('userInfo', JSON.stringify(res.userInfo))
                setShowModal(true)
            } else {
                Toast.error(res.message);
            }
        } catch (error) {
            Toast.error('网络错误,请稍后重试');
        }
    }

    /* function afterConfirm() {
         window.location.reload();
         const originalLink = sessionStorage.getItem('originalLink');
         if (originalLink) {
             sessionStorage.removeItem('originalLink');
             window.location.href = originalLink;
             return;
         }
         window.location.href = '/';
     }*/

    function afterClose() {
        setShowModal(false)
    }

    return (
        <div className="login">
            <div className="formContent fadeInDown">
                <p className="ghChatLogo">
                    <img src="https://cdn.aermin.top/ghChatIcon.png" alt="ghChatLogo"/>
                </p>
                <Link to='/login'>
                    <span className={computed[isLogin]['loginClass']}>登录</span>
                </Link>
                <Link to='/register'>
                    <span className={computed[isLogin]['registerClass']}>注册</span>
                </Link>
                <div className="userAvatarWrapper">
                    <UserAvatar name={name || 'Ÿ'} size="100"/>
                </div>
                <div className="center">
                    <input
                        type="text" name="name" placeholder="用户名"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                </div>
                <div className="center">
                    <input
                        type="password" name="password" placeholder="密码"
                        value={password}
                        onChange={(e) => {
                            setPass(e.target.value)
                        }}
                    />
                </div>
                <div className="center">
                    {/*<input type="button" onClick={handleLogin} value={computed[isLogin]['buttonName']}/>*/}
                    <Button click={handleLogin}>{computed[isLogin]['buttonName']}</Button>
                </div>
            </div>
            <Modal content={content} title='提示'
                   afterConfirm={afterConfirm}
                   afterClose={afterClose}
                   showModal={showModal}>
            </Modal>
        </div>
    )
}

export default Home;
