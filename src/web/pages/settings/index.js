import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './index.less'
import Modal from '@common/modal'
import Button from "@common/button";

const Settings = () => {
    const [visible, changeVisible] = useState(false);

    useEffect(() => {
        /*...*/
    });

    function _showModal() {
        changeVisible(true);
    }

    function _hideModal() {
        changeVisible(false);
    }

    function logout() {
        /*...*/
    }

    function _openUrl(url) {
        window.open(url);
    }

    function isProduction() {
        return process.env.NODE_ENV === 'production';
    }

    // 跳转至github
    const githubStarRender = (
        <div className="githubStarRender" onClick={() => _openUrl('https://github.com/aermin/react-chat')}>
            <svg className="icon githubIcon" aria-hidden="true">
                <use xlinkHref="#icon-github-copy"/>
            </svg>
            <span className="starTitle">
          源码 & star
        </span>
        </div>
    );

    return (
        <div className="setting">
            <Modal
                title='退出登录'
                showModal={visible}
                content='亲爱的你，确定要退出登录吗？？'
                afterConfirm={logout}
                afterClose={_hideModal}
            />
            {githubStarRender}
            <div className="contact"
                 onClick={() => this._openUrl('https://github.com/aermin/blog/issues/63')}>开启PWA(将ghChat安装到桌面)
            </div>
            {isProduction() ? (
                <div> style={{marginBottom: '120px'}}
                    <Link className="contact" to="/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e">项目交流群</Link>
                </div>
            ) : (
                <div style={{marginBottom: '120px'}}>
                    <div className="contact"
                         onClick={() => this._openUrl('https://im.aermin.top/group_chat/ddbffd80-3663-11e9-a580-d119b23ef62e')}>项目交流群
                    </div>
                </div>
            )}
            <Button click={_showModal} children="退出登录"/>
        </div>
    );
};

export default Settings;
