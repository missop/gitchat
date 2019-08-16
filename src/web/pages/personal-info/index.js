import React, {useState} from 'react';
import './index.less'
/*引入公用方法*/
import classnames from 'classnames';
/*引入组件*/
import UserAvatar from '@common/user-avatar';
import Button from '@common/button'
import ModalBase from './modal-base'

function _openUrl(url) {
    const formatUrl = /https:\/\/|http:\/\//.test(url) ? url : `https://${url}`;
    window.open(formatUrl);
}

/*personalInfo的UI组件*/
const PersonalInfoUI = (props) => {
    const {
        userInfo, goToChat, isContact, deleteContact,
        showContactButton, showShareIcon, showShareModal
    } = props;
    const {
        name, location,
        website, github,
        intro, avatar, company,
    } = userInfo;
    return (
        <div className="userInfo">
            <UserAvatar name={name} size="50"/>
            {name && <p className="name">{name}</p>}
            {intro && <p>{`介绍: ${intro}`}</p>}
            {location && <p>{`来自: ${location}`}</p>}
            {company && <p>{`公司: ${company}`}</p>}
            {website && <p className="website" onClick={() => _openUrl(website)}>{`网站: ${website}`}</p>}
            {github && <p className="github" onClick={() => _openUrl(github)}>{`github: ${github}`}</p>}
            {/*私聊此人按钮是否显示 showContactButton*/}
            {showContactButton && (
                <Button className={classnames('personalInfoBtn', 'chatBtn')}
                        click={goToChat}>私聊此人</Button>
            )}
            {/*如果是好友才显示删除此人 isContact*/}
            {isContact && (
                <Button className={classnames('personalInfoBtn', 'deleteBtn')}
                        click={deleteContact}>删除此人</Button>
            )}
            {/*如果点击的是自己的头像则显示分享按钮 showShareIcon*/}
            {showShareIcon && (
                <svg
                    onClick={showShareModal}
                    className="icon shareIcon"
                    aria-hidden="true">
                    <use xlinkHref="#icon-share"/>
                </svg>
            )}
        </div>
    )
}

const ModalRender = ModalBase(PersonalInfoUI);

/*在PersonalInfo中处理私聊、删除、分享的逻辑*/
const PersonalInfo = (props) => {
    const {userInfo, visible, hideModal, showShareModal, showShareIcon, showContactButton} = props;

    function goToChat() {

    }

    function deleteContact() {

    }

    return (
        <ModalRender
            goToChat={goToChat}
            deleteContact={deleteContact}
            userInfo={userInfo}
            visible={visible}
            cancel={hideModal}
            showShareModal={showShareModal}
            showShareIcon={showShareIcon}
            showContactButton={showContactButton}
        />
    );
};

export default PersonalInfo;
